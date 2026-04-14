# DomJek Portfolio

Ein modernes, cloud-natives Portfolio-Projekt mit Kubernetes- und Cloudflare Workers-Deployment.

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-Ready-F38020?logo=cloudflare&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Hono](https://img.shields.io/badge/Hono.js-4.0-EE4266?logo=hono&logoColor=white)

## Features

- Responsive Single-Page Portfolio
- RESTful Backend API (Hono.js)
- Cloudflare Workers Deployment (Serverless)
- Kubernetes-Orchestrierung (Optional)
- Containerized mit Docker
- Static Assets Serving direkt vom Worker
- GitHub Actions CI/CD

## Deployment-Optionen

| Platform | Beschreibung | Performance |
|----------|-------------|-------------|
| **Cloudflare Workers** | Serverless, Global Edge, Kostenlos bis 100k Requests/Tag | ⚡ Edge |
| **Kubernetes** | Self-hosted, Kubernetes-Cluster | ☸️ Self-hosted |
| **Docker** | Container, lokal oder Cloud | 🐳 Universal |

## Tech Stack

| Bereich | Technologien |
|---------|-------------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Backend | Node.js 20, Hono.js |
| Serverless | Cloudflare Workers |
| Container | Docker, Node.js |
| Orchestrierung | Kubernetes (k8s) |

## Projektstruktur

```
DomJek-Portfolio/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── backend/
│   ├── server.js          # Hono.js Server
│   ├── wrangler.jsonc     # Cloudflare Workers Config
│   ├── .env               # Lokale Secrets
│   ├── .env.example       # Template für Secrets
│   ├── package.json
│   └── data/
│       ├── projects.json
│       └── tech-stack.json
├── k8s/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── backend-deployment.yaml
│   └── backend-service.yaml
├── Dockerfile
├── deploy.sh
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
cd backend

# .env Datei erstellen
cp .env.example .env
# CLOUDFLARE_API_TOKEN=your_token_here

# Abhängigkeiten installieren
npm install

# Lokaler Node.js Server (Port 3000)
npm start

# ODER: Cloudflare Worker simuliert (Port 8788)
npm run dev:worker
```

| Command | Beschreibung | Port |
|---------|-------------|------|
| `npm start` | Lokaler Node.js Server | 3000 |
| `npm run dev:worker` | Wrangler Worker Dev | 8788 |

### Deployment

```bash
# Cloudflare Workers deployen
npx wrangler deploy
```

### GitHub Actions Setup

1. **GitHub Secret hinzufügen:**
   - Repository → Settings → Secrets → Actions
   - `CLOUDFLARE_API_TOKEN` mit deinem Token erstellen

2. **Automatisch deployen:**
   - Push auf `main` → Automatischer Deploy
   - Oder: Actions → "Deploy to Cloudflare Workers" → Run workflow

---

## Kubernetes Deployment (Optional)

### Voraussetzungen

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) mit Kubernetes
- kubectl CLI
- Git

### Schnellstart

```bash
# Repository klonen
git clone https://github.com/domejek/DomJek-Portfolio.git
cd DomJek-Portfolio

# Deployment starten
./deploy.sh
```

Das Script führt automatisch aus:
1. Prüft Docker & Kubernetes Status
2. Baut die Docker Images
3. Erstellt Kubernetes Ressourcen
4. Startet Port-Forwarding

Nach erfolgreichem Deployment:
- Anwendung: http://localhost:8080

### Kubernetes Ressourcen

```bash
# Pods anzeigen
kubectl get pods -n portfolio

# Services anzeigen
kubectl get services -n portfolio

# Logs ansehen
kubectl logs -f <pod-name> -n portfolio

# Alle Ressourcen
kubectl get all -n portfolio

# Namespace löschen
kubectl delete namespace portfolio
```

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
      "description": "Diese Portfolio-Webseite läuft auf Cloudflare Workers...",
      "technologies": ["JavaScript", "Hono.js", "Cloudflare Workers"],
      "github": "https://github.com/domejek/DomJek-Portfolio"
    }
  ],
  "count": 6
}
```

---

## Lokale Entwicklung (Docker)

```bash
cd backend
npm install
npm start
```

Server läuft dann auf http://localhost:3000

---

## GitHub Actions

Das Projekt verwendet GitHub Actions für CI/CD:

| Workflow | Trigger | Beschreibung |
|----------|---------|--------------|
| `ci.yml` | Push/PR auf main | Linting, Build & API Tests |
| `docker-publish.yml` | Push auf main, Tags | Build & Push zu GHCR |
| `kubernetes-deploy.yml` | Manual | Deploy zu K8s Cluster |
| `cloudflare-deploy.yml` | Push auf main, Manual | Deploy zu Cloudflare Workers |

### Setup für Cloudflare Deployment

1. API Token erstellen (siehe oben)
2. GitHub Secret `CLOUDFLARE_API_TOKEN` hinzufügen
3. Push auf main → Automatischer Deploy

### Setup für Kubernetes Deployment

1. Kubeconfig als Secret speichern:
   ```bash
   cat ~/.kube/config | base64 | pbcopy
   ```
2. In GitHub: Settings → Secrets → Actions → `KUBE_CONFIG`

### Manuell deployen

1. GitHub → Actions → Workflow wählen
2. "Run workflow"

---

## Autor

**Dominik Jeksties**
- Full-Stack Developer | Cloud-Native Enthusiast
- Hagen, Germany

[![GitHub](https://img.shields.io/badge/GitHub-domejek-181717?logo=github)](https://github.com/domejek)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Dominik_Jeksties-0A66C2?logo=linkedin)](https://www.linkedin.com/in/dominik-jeksties-0162a7216/)

## Lizenz

MIT License
