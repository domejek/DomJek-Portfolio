FROM node:20-alpine AS frontend-build

WORKDIR /build/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM node:20-alpine

RUN apk add --no-cache nginx

WORKDIR /app

COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci --omit=dev

WORKDIR /app
COPY backend/server.js backend/local.js ./backend/
COPY backend/data/ ./backend/data/
COPY --from=frontend-build /build/frontend/dist/ ./frontend/dist/
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY start.sh ./
RUN chmod +x start.sh

EXPOSE 80 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["./start.sh"]
