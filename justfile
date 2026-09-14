set shell := ["bash", "-e", "-u", "-o", "pipefail", "-c"]

default:
    @just --list

setup:
    cd backend && npm install
    cd frontend && npm install

dev:
    cd frontend && npm run dev & cd backend && npm run dev

api:
    cd backend && npm run dev

frontend:
    cd frontend && npm run dev

build:
    cd frontend && npm run build

test:
    ./scripts/test-ci.sh

test-suite:
    ./scripts/test-api.sh

clean:
    pkill -f "node local.js" || true
    pkill -f "vite" || true
