#!/bin/sh
set -e

echo "Starting Portfolio..."

node /app/backend/local.js &
NODE_PID=$!
echo "Backend API started on port 3000 (PID $NODE_PID)"

nginx -g 'daemon off;' &
NGINX_PID=$!
echo "Frontend started on port 80 (PID $NGINX_PID)"

trap 'kill $NODE_PID $NGINX_PID 2>/dev/null; exit 0' SIGTERM SIGINT

wait