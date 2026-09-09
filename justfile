set shell := ["bash", "-e", "-u", "-o", "pipefail", "-c"]

# Projekt-Übersicht anzeigen
default:
    @just --list

# Abhängigkeiten installieren (einmalig + nach neuen Dependencies)
setup:
    cd backend && npm install

# Full-Stack App lokal (Frontend + API) — läuft auf http://localhost:8788
dev:
    cd backend && npm run dev:worker -- --port 8788

# Nur Backend-API auf http://localhost:3000 (node --watch, Hot-Reload)
api:
    cd backend && npm run dev

# Lokaler CI-Durchlauf: startet Backend auf :3000, testet, stoppt wieder
test:
    ./scripts/test-ci.sh

# Testet das gerade laufende Dev-System (wrangler auf :8788)
test-suite:
    ./scripts/test-api.sh

# Static Server für die reine Frontend-Ansicht auf http://localhost:4173
serve:
    cd frontend && python3 -m http.server 4173

# Alle laufenden Dev-Prozesse beenden
clean:
    pkill -f "node local.js" || true
    pkill -f "wrangler/bin/wrangler" || true