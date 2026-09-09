#!/usr/bin/env bash
# Lokaler CI-Durchlauf — entspricht .github/workflows/ci.yml (Job "test-backend")
# Startet das Backend auf Port 3000, testet alle Endpoints und stoppt es wieder.

set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PORT="${PORT:-3000}"
BASE_URL="http://localhost:$PORT"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Port-Konflikt erkennen (z.B. wenn 'just api' schon läuft)
if lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    echo -e "${RED}✗ Port $PORT ist bereits belegt.${NC}"
    echo "  Läuft evtl. schon 'just api'? Beende ihn oder nutze: PORT=3001 just test"
    exit 1
fi

echo -e "${YELLOW}▶ Starte temporäres Backend auf $BASE_URL ...${NC}"

# exec → node ersetzt die Subshell, damit $! wirklich der Node-Prozess ist (sauberer Kill)
(cd backend && exec env PORT="$PORT" node local.js) &
SERVER_PID=$!

cleanup() {
    echo -e "${YELLOW}▶ Stoppe temporäres Backend ...${NC}"
    kill "$SERVER_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

BASE_URL="$BASE_URL" ./scripts/test-api.sh
exit $?