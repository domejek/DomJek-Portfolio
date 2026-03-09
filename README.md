# DomJek Portfolio

Ein modernes, cloud-natives Portfolio-Projekt mit Kubernetes-Deployment.

![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

## Features

- Responsive Single-Page Portfolio
- RESTful Backend API (Node.js/Express)
- Containerized mit Docker
- Kubernetes-Orchestrierung
- Single-Container-Architektur (Backend servt auch Frontend)
- Automatisches Deployment-Script

## Tech Stack

| Bereich | Technologien |
|---------|-------------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Backend | Node.js 20, Express.js |
| Container | Docker, Node.js (Frontend + Backend) |
| Orchestrierung | Kubernetes (k8s) |

## Projektstruktur

```
DomJek-Portfolio/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── backend/
│   ├── server.js
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

## Voraussetzungen

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) mit aktiviertem Kubernetes
- kubectl CLI
- Git

## Schnellstart

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
      "name": "Kubernetes Portfolio",
      "description": "Portfolio-Webseite auf Kubernetes...",
      "technologies": ["JavaScript", "Node.js", "Docker", "Kubernetes"],
      "github": "https://github.com/..."
    }
  ],
  "count": 4
}
```

## Kubernetes Ressourcen

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

## Lokale Entwicklung (ohne Kubernetes)

```bash
cd backend
npm install
npm start
```

Server läuft dann auf http://localhost:3000

## Deployment stoppen

```bash
# Port-Forwarding beenden: CTRL+C

# Alle Ressourcen entfernen
kubectl delete namespace portfolio
```

## Autor

**Dominik Jeksties**
- Full-Stack Developer | DevOps Enthusiast
- Hagen, Germany

[![GitHub](https://img.shields.io/badge/GitHub-domejek-181717?logo=github)](https://github.com/domejek)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Dominik_Jeksties-0A66C2?logo=linkedin)](https://www.linkedin.com/in/dominik-jeksties-0162a7216/)

## GitHub Actions

Das Projekt verwendet GitHub Actions für CI/CD:

| Workflow | Trigger | Beschreibung |
|----------|---------|--------------|
| `ci.yml` | Push/PR auf main | Linting, Build & API Tests |
| `docker-publish.yml` | Push auf main, Tags | Build & Push zu GHCR |
| `kubernetes-deploy.yml` | Manual (workflow_dispatch) | Deploy zu K8s Cluster |

### Setup für Kubernetes Deployment

1. Kubeconfig als Secret speichern:
   ```bash
   cat ~/.kube/config | base64 | pbcopy
   ```
2. In GitHub: Settings → Secrets → Actions → `KUBE_CONFIG`

### Manuell deployen

1. GitHub → Actions → "Kubernetes Deploy"
2. Environment wählen (staging/production)
3. "Run workflow"

## Lizenz

MIT License
