FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci --only=production

WORKDIR /app
COPY backend/server.js ./backend/
COPY backend/data/ ./backend/data/
COPY frontend/ ./frontend/

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

WORKDIR /app/backend
CMD ["node", "server.js"]
