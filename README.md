# DomJek Portfolio

Ein modernes, cloud-natives Portfolio-Projekt mit React-Frontend, Hono.js-Backend und Deployment über Docker sowie Cloudflare Workers.

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-Ready-F38020?logo=cloudflare&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Hono](https://img.shields.io/badge/Hono.js-4.0-EE4266?logo=hono&logoColor=white)

## Features

- Responsive React Single-Page-Portfolio (Vite + TypeScript + Tailwind CSS v4)
- Blog-Sektion mit MDX-Artikeln
- RESTful Backend API (Hono.js)
- Cloudflare Workers Deployment (Serverless)
- Containerized mit Docker (Nginx + Node.js)
- Statische Assets direkt vom Worker ausgeliefert
- GitHub Actions CI/CD

## Deployment-Optionen

| Platform | Beschreibung | Performance |
|----------|-------------|-------------|
| **Cloudflare Workers** | Serverless, Global Edge, Kostenlos bis 100k Requests/Tag | ⚡ Edge |
| **Docker** | Container, lokal oder Cloud (GHCR) | 🐳 Universal |

## Tech Stack

| Bereich | Technologien |
|---------|-------------|
| Frontend | React 19, Vite 8, TypeScript, Tailwind CSS v4, React Router |
| Blog | MDX (@mdx-js/rollup, @mdx-js/react) |
| Backend | Node.js 20, Hono.js |
| Serverless | Cloudflare Workers |
| Container | Docker, Nginx |

## Projektstruktur

```
DomJek-Portfolio/
├── frontend/
│   ├── index.html
│   ├── vite.config.ts       # Dev-Proxy zu :3000, Tailwind, MDX
│   ├── Dockerfile           # Multi-Stage Nginx-Image
│   ├── nginx.conf           # SPA-Fallback + /api-Proxy
│   └── src/
│       ├── components/      # Layout, Sections, Blog, Projekte, UI
│       ├── pages/           # HomePage, BlogList, BlogPost, ProjectDetail
│       ├── content/blog/    # MDX-Artikel
│       ├── data/            # Lokale Inhalte (Timeline, Skills, FAQ, ...)
│       ├── lib/api.ts       # Hono-API-Client mit Fallbacks
│       ├── hooks/           # useScrollAnimation, useMobileNav
│       └── types/
├── backend/
│   ├── server.js            # Hono.js Server
│   ├── local.js             # Node.js-Adapter (@hono/node-server)
│   ├── wrangler.jsonc       # Cloudflare Workers Config
│   ├── package.json
│   └── data/
│       ├── projects.json
│       └── tech-stack.json
├── .github/workflows/       # CI, Cloudflare-Deploy, Docker-Publish
├── scripts/
│   ├── test-api.sh          # Endpoint-Tests (BASE_URL-konfigurierbar)
│   └── test-ci.sh           # Lokaler CI-Durchlauf
├── justfile                 # Dev-/Test-Kommandos (just dev, just test, ...)
├── Dockerfile               # Kombiniertes Image (Nginx + Node.js)
└── README.md
```

---

## Cloudflare Workers Deployment (Empfohlen)

### Voraussetzungen

- [Node.js 20+](https://nodejs.org/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- Cloudflare Account

### API Token erstellen

1. [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) → API Tokens
2. "Create Token" → "Edit Cloudflare Workers" Vorlage
3. Permissions: Workers → Edit
4. Token kopieren

### Lokale Entwicklung

```bash
cd frontend && npm install && npm run dev   # Frontend: http://localhost:5173
cd backend && npm install && npm start      # API: http://localhost:3000
```

Der Vite-Dev-Server proxyt `/api`-Requests automatisch an `http://localhost:3000`.

| Command | Beschreibung | Port |
|---------|-------------|------|
| `frontend: npm run dev` | Vite Dev-Server | 5173 |
| `backend: npm start` | Lokaler Node.js Server | 3000 |
| `backend: npm run dev` | Node.js Server mit Watch-Modus | 3000 |
| `backend: npm run dev:worker` | Wrangler Worker Dev | 8788 |

### Deployment

```bash
cd frontend && npm run build   # erzeugt frontend/dist
cd backend && npx wrangler deploy
```

`wrangler.jsonc` bindet `frontend/dist` als Statics-Assets ein (`run_worker_first` für `/api/*`).

### GitHub Actions Setup

1. **GitHub Secret hinzufügen:**
   - Repository → Settings → Secrets → Actions
   - `CLOUDFLARE_API_TOKEN` mit deinem Token erstellen
2. **Automatisch deployen:**
   - Push auf `main` → Automatischer Deploy
   - Oder: Actions → "Deploy to Cloudflare Workers" → Run workflow

---

## API Endpoints

| Endpoint | Methode | Beschreibung |
|----------|---------|--------------|
| `/health` | GET | API Status |
| `/api/tech-stack` | GET | Tech Stack Daten |
| `/api/projects` | GET | Projekt-Liste |

### Beispiel Response

**GET** `/api/projects`
```json
{
  "success": true,
  "projects": [
    {
      "name": "DomJek-Portfolio",
      "slug": "domjek-portfolio",
      "description": "Diese Portfolio-Webseite läuft als dockerisierte Microservices mit einem React/Nginx-Frontend und einer Node.js-API. Demonstriert Container-Deployment und moderne DevOps-Praktiken.",
      "technologies": ["JavaScript", "React", "Node.js", "Docker", "Nginx", "Cloudflare Workers"],
      "github": "https://github.com/domejek/DomJek-Portfolio"
    }
  ],
  "count": 4
}
```

---

## Lokale Entwicklung & Tests (just)

Einmalig:

```bash
brew install just
just setup
```

Danach alle Kommandos aus dem Projekt-Root:

| Kommando | Beschreibung | URL |
|----------|--------------|-----|
| `just dev` | Full-Stack (Vite-Frontend + API), Hot-Reload | http://localhost:5173 |
| `just api` | Nur Backend-API (`node --watch`) | http://localhost:3000 |
| `just frontend` | Nur Vite Dev-Server | http://localhost:5173 |
| `just build` | Frontend-Produktions-Build | — |
| `just test` | Lokaler CI-Durchlauf: startet Backend auf :3000, testet, stoppt | — |
| `just test-suite` | Testet das gerade laufende Dev-System | — |
| `just clean` | Beendet alle laufenden Dev-Prozesse | — |
| `just setup` | Installiert Backend- & Frontend-Dependencies | — |

So testest du lokal, ohne zu committen/pushen (`just test` entspricht dem GitHub-Actions-Job `ci.yml` → `test-backend`):

```bash
just test
```

Das überprüft `/health`, `/api/projects` und `/api/tech-stack` auf HTTP 200 und `"success": true`.

---

## Docker

Das Root-`Dockerfile` baut ein kombiniertes Image (Nginx :80 + Node.js-API :3000) und ist Multi-Stage — es baut das React-Frontend selbst:

```bash
docker build -t portfolio-backend:latest .
docker run -p 8080:80 -p 3000:3000 portfolio-backend:latest
```

- Frontend: http://localhost:8080
- API: http://localhost:8080/api/projects

Das `frontend/Dockerfile` erzeugt zusätzlich ein reines Nginx-Image (nur das gebaute Frontend).

Das Workflow `docker-publish.yml` baut und pusht außerdem `ghcr.io/<owner>/portfolio-backend:latest` zu GitHub Container Registry.

---

## GitHub Actions

Das Projekt verwendet GitHub Actions für CI/CD:

| Workflow | Trigger | Beschreibung |
|----------|---------|--------------|
| `ci.yml` | Push/PR auf main | Linting, TypeScript-Check, Build & API Tests |
| `docker-publish.yml` | Manuell | Build & Push zu GHCR |
| `cloudflare-deploy.yml` | Push auf main, Manuell | Deploy zu Cloudflare Workers |

### Setup für Cloudflare Deployment

1. API Token erstellen (siehe oben)
2. GitHub Secret `CLOUDFLARE_API_TOKEN` hinzufügen
3. Push auf main → Automatischer Deploy

---

## Autor

**Dominik Jeksties**
- Full-Stack Developer | Cloud-Native Enthusiast
- Hagen, Germany

[![GitHub](https://img.shields.io/badge/GitHub-domejek-181717?logo=github)](https://github.com/domejek)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Dominik_Jeksties-0A66C2?logo=linkedin)](https://www.linkedin.com/in/dominik-jeksties-0162a7216/)

## Lizenz

MIT License