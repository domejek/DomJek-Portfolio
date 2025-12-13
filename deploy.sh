#!/bin/bash

# Portfolio Kubernetes Deployment Script
# Dieses Script startet alles automatisch

set -e  # Bei Fehler abbrechen

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Portfolio Kubernetes Deployment${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Funktion für Erfolgsmeldungen
success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Funktion für Infos
info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Funktion für Warnungen
warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Funktion für Fehler
error() {
    echo -e "${RED}✗ $1${NC}"
    exit 1
}

# 1. Prüfe ob Docker läuft
info "Prüfe Docker Status..."
if ! docker info > /dev/null 2>&1; then
    error "Docker läuft nicht! Bitte starte Docker Desktop."
fi
success "Docker läuft"

# 2. Prüfe ob Kubernetes aktiviert ist
info "Prüfe Kubernetes Status..."
if ! kubectl cluster-info > /dev/null 2>&1; then
    warning "Kubernetes ist nicht aktiviert in Docker Desktop!"
    echo ""
    echo -e "${YELLOW}Bitte aktiviere Kubernetes:${NC}"
    echo "1. Docker Desktop öffnen"
    echo "2. Settings → Kubernetes"
    echo "3. ✓ Enable Kubernetes"
    echo "4. Apply & Restart"
    echo ""
    read -p "Drücke Enter wenn Kubernetes aktiviert ist..."
    
    # Warte bis Kubernetes bereit ist
    info "Warte auf Kubernetes..."
    until kubectl cluster-info > /dev/null 2>&1; do
        echo -n "."
        sleep 2
    done
    echo ""
fi
success "Kubernetes läuft"

# 3. Cluster-Info anzeigen
info "Cluster-Informationen:"
kubectl cluster-info
kubectl get nodes
echo ""

# 4. Alte Deployments aufräumen (falls vorhanden)
info "Räume alte Deployments auf..."
kubectl delete namespace portfolio --ignore-not-found=true
sleep 5
success "Cleanup abgeschlossen"

# 5. Docker Images bauen
echo ""
info "Baue Docker Images..."

if [ ! -d "frontend" ]; then
    error "Frontend-Ordner nicht gefunden! Bist du im richtigen Verzeichnis?"
fi

if [ ! -d "backend" ]; then
    error "Backend-Ordner nicht gefunden! Bist du im richtigen Verzeichnis?"
fi

info "Baue Frontend Image..."
docker build -t portfolio-frontend:latest ./frontend || error "Frontend Build fehlgeschlagen"
success "Frontend Image gebaut"

info "Baue Backend Image..."
docker build -t portfolio-backend:latest ./backend || error "Backend Build fehlgeschlagen"
success "Backend Image gebaut"

# Images anzeigen
echo ""
info "Gebaute Images:"
docker images | grep portfolio
echo ""

# 6. Kubernetes Ressourcen deployen
info "Deploye Kubernetes Ressourcen..."

if [ ! -d "k8s" ]; then
    error "k8s-Ordner nicht gefunden! Bist du im richtigen Verzeichnis?"
fi

# Schritt 1: Namespace erstellen
info "Erstelle Namespace..."
kubectl apply -f k8s/namespace.yaml || error "Namespace-Erstellung fehlgeschlagen"
success "Namespace erstellt"

# Warte bis Namespace wirklich bereit ist
info "Warte auf Namespace-Initialisierung..."
sleep 3

# Schritt 2: ConfigMap erstellen (falls vorhanden)
if [ -f "k8s/configmap.yaml" ]; then
    info "Erstelle ConfigMap..."
    kubectl apply -f k8s/configmap.yaml || warning "ConfigMap-Erstellung fehlgeschlagen (nicht kritisch)"
    success "ConfigMap erstellt"
fi

# Schritt 3: Deployments erstellen
info "Erstelle Deployments..."
kubectl apply -f k8s/frontend-deployment.yaml || error "Frontend-Deployment fehlgeschlagen"
kubectl apply -f k8s/backend-deployment.yaml || error "Backend-Deployment fehlgeschlagen"
success "Deployments erstellt"

# Schritt 4: Services erstellen
info "Erstelle Services..."
kubectl apply -f k8s/frontend-service.yaml || error "Frontend-Service fehlgeschlagen"
kubectl apply -f k8s/backend-service.yaml || error "Backend-Service fehlgeschlagen"
success "Services erstellt"

# 7. Warte auf Pods
echo ""
info "Warte bis alle Pods bereit sind..."
echo "Dies kann 30-60 Sekunden dauern..."
echo ""

# Zeige Pod-Status während sie starten
info "Pod-Status:"
kubectl get pods -n portfolio

# Warte auf Frontend Pods
echo ""
info "Warte auf Frontend Pods..."
kubectl wait --for=condition=ready pod -l app=frontend -n portfolio --timeout=120s || {
    echo ""
    error "Frontend Pods sind nicht bereit geworden. Logs:"
    kubectl logs -l app=frontend -n portfolio --tail=20
    exit 1
}
success "Frontend Pods sind bereit"

# Warte auf Backend Pods
info "Warte auf Backend Pods..."
kubectl wait --for=condition=ready pod -l app=backend -n portfolio --timeout=120s || {
    echo ""
    error "Backend Pods sind nicht bereit geworden. Logs:"
    kubectl logs -l app=backend -n portfolio --tail=20
    exit 1
}
success "Backend Pods sind bereit"

# 8. Status anzeigen
echo ""
info "Deployment Status:"
echo ""
kubectl get all -n portfolio
echo ""

# 9. Port-Forwarding starten
echo ""
info "Starte Port-Forwarding..."
echo ""
warning "Port-Forwarding läuft in diesem Terminal-Fenster"
warning "Drücke CTRL+C um zu beenden"
echo ""

# Cleanup Funktion für sauberes Beenden
cleanup() {
    echo ""
    info "Beende Port-Forwarding..."
    kill $FRONTEND_PID 2>/dev/null || true
    kill $BACKEND_PID 2>/dev/null || true
    success "Port-Forwarding beendet"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Starte Port-Forwarding im Hintergrund
kubectl port-forward service/frontend 8080:80 -n portfolio > /dev/null 2>&1 &
FRONTEND_PID=$!

kubectl port-forward service/backend 8081:80 -n portfolio > /dev/null 2>&1 &
BACKEND_PID=$!

# Warte kurz damit Port-Forwarding startet
sleep 5

# Test ob erreichbar
echo ""
info "Teste Verbindungen..."
if curl -s -f http://localhost:8080 > /dev/null 2>&1; then
    success "Frontend ist erreichbar unter http://localhost:8080"
else
    warning "Frontend möglicherweise noch nicht bereit (starte trotzdem)"
fi

if curl -s -f http://localhost:8081/index.php > /dev/null 2>&1; then
    success "Backend ist erreichbar unter http://localhost:8081"
else
    warning "Backend möglicherweise noch nicht bereit (starte trotzdem)"
fi

# Erfolgsmeldung
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  🎉 Deployment erfolgreich!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}📱 Deine Anwendung läuft jetzt:${NC}"
echo ""
echo -e "   ${GREEN}Frontend:${NC} http://localhost:8080"
echo -e "   ${GREEN}Backend:${NC}  http://localhost:8081"
echo -e "   ${GREEN}API:${NC}      http://localhost:8081/api/projects.php"
echo ""
echo -e "${YELLOW}🌐 Öffne deinen Browser und besuche:${NC}"
echo -e "   ${YELLOW}http://localhost:8080${NC}"
echo ""
echo -e "${BLUE}📊 Nützliche Befehle:${NC}"
echo -e "   kubectl get pods -n portfolio        # Pod-Status"
echo -e "   kubectl logs -f <pod-name> -n portfolio  # Logs ansehen"
echo -e "   kubectl get all -n portfolio         # Alle Ressourcen"
echo ""
echo -e "${YELLOW}⚠️  Drücke CTRL+C um Port-Forwarding zu beenden${NC}"
echo ""

# Halte Script am Laufen
wait