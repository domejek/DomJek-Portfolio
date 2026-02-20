# DomJek Portfolio

Ein modernes, cloud-natives Portfolio-Projekt mit Kubernetes-Deployment.

![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?logo=php&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

## Features

- Responsive Single-Page Portfolio
- RESTful Backend API (PHP)
- Containerized mit Docker
- Kubernetes-Orchestrierung
- Microservices-Architektur
- Automatisches Deployment-Script

## Tech Stack

| Bereich | Technologien |
|---------|-------------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Backend | PHP 8.2, Apache |
| Container | Docker, Nginx (Frontend), PHP-Apache (Backend) |
| Orchestrierung | Kubernetes (k8s) |
| Webserver | Nginx, Apache |

## Projektstruktur

```
DomJek-Portfolio/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── nginx.conf
│   └── Dockerfile
├── backend/
│   ├── index.php
│   ├── api/
│   │   ├── tech-stack.php
│   │   └── projects.php
│   └── Dockerfile
├── k8s/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── backend-deployment.yaml
│   └── backend-service.yaml
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
git clone https://github.com/dein-username/DomJek-Portfolio.git
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
- Frontend: http://localhost:8080
- Backend API: http://localhost:8081

## API Endpoints

| Endpoint | Methode | Beschreibung |
|----------|---------|--------------|
| `/index.php` | GET | API Status |
| `/api/tech-stack.php` | GET | Tech Stack Daten |
| `/api/projects.php` | GET | Projekt-Liste |

### Beispiel Response

**GET** `/api/projects.php`
```json
{
  "success": true,
  "projects": [
    {
      "name": "Kubernetes Portfolio",
      "description": "Portfolio-Webseite auf Kubernetes...",
      "technologies": ["JavaScript", "PHP", "Docker", "Kubernetes"],
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

**Frontend:**
```bash
cd frontend
# Mit einem lokalen Server (z.B. Live Server Extension)
# Oder: python3 -m http.server 8080
```

**Backend:**
```bash
cd backend
php -S localhost:8081
```

## Deployment stoppen

```bash
# Port-Forwarding beenden: CTRL+C

# Alle Ressourcen entfernen
kubectl delete namespace portfolio
```

## Autor

**Dominik Jeksties**
- Full-Stack Developer
- Cloud-Native Enthusiast

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
