#!/usr/bin/env bash
# Portfolio Backend API Tests
# Nutzung: BASE_URL=http://localhost:3000 ./scripts/test-api.sh
# Default: der Full-Stack von 'just dev' (wrangler) auf :8788

set -uo pipefail

BASE_URL="${BASE_URL:-http://localhost:8788}"
RETRY_MAX="${RETRY_MAX:-30}"          # Sekunden, bis der Server bereit sein muss
RETRY_INTERVAL="${RETRY_INTERVAL:-1}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS=0
FAIL=0

ok()  { echo -e "${GREEN}✓ $1${NC}"; PASS=$((PASS + 1)); }
bad() { echo -e "${RED}✗ $1${NC}";  FAIL=$((FAIL + 1)); }

wait_for_server() {
    echo -e "${YELLOW}⏳ Warte auf Server unter $BASE_URL ...${NC}"
    for i in $(seq 1 "$RETRY_MAX"); do
        if curl -sf "$BASE_URL/health" >/dev/null 2>&1; then
            echo -e "${GREEN}✓ Server bereit (nach ${i}s)${NC}"
            return 0
        fi
        sleep "$RETRY_INTERVAL"
    done
    bad "Server nach ${RETRY_MAX}s nicht erreichbar unter $BASE_URL"
    echo -e "${YELLOW}   Tipp: 'just dev' (Full-Stack :8788) oder 'just api' (nur API :3000)${NC}"
    exit 1
}

# Prüft, ob der Body "success": true enthält (eigentliche JSON-Datenvalidierung)
json_success_ok() {
    printf '%s\n' "$1" | node -e "
        let s = '';
        process.stdin.on('data', d => s += d);
        process.stdin.on('end', () => {
            try {
                const json = JSON.parse(s);
                process.exit(json.success === true ? 0 : 1);
            } catch {
                process.exit(1);
            }
        });
    " >/dev/null 2>&1
}

check_endpoint() {
    local path="$1"
    local name="$2"
    local response status body

    response=$(curl -s -w '\n%{http_code}' "$BASE_URL$path")
    status=$(printf '%s\n' "$response" | tail -n1)
    body=$(printf '%s\n' "$response" | sed '$d')   # Statuszeile entfernen

    if [ "$status" != "200" ]; then
        bad "$name → GET $path: HTTP $status (erwartet 200)"
        return 1
    fi
    if ! json_success_ok "$body"; then
        bad "$name → GET $path: HTTP 200, aber 'success' ist nicht true"
        return 1
    fi
    ok "$name → GET $path: HTTP 200, success:true"
}

wait_for_server

check_endpoint "/health"         "Health-Check "
check_endpoint "/api/projects"   "Projekte     "
check_endpoint "/api/tech-stack" "Tech-Stack   "

echo ""
echo "──────────────────────────────────────────"
echo -e "Ergebnis: ${GREEN}${PASS} bestanden${NC}, ${RED}${FAIL} fehlgeschlagen${NC}"
[ "$FAIL" -gt 0 ] && exit 1
exit 0