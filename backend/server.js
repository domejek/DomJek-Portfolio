import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import projects from './data/projects.json' with { type: 'json' };
import techStack from './data/tech-stack.json' with { type: 'json' };

const app = new Hono();

// Projektdaten ändern sich gelegentlich: kurz cachen, danach im Hintergrund
// revalidieren. Bewusst kein `immutable`, damit Updates ankommen.
const API_CACHE_CONTROL = 'public, max-age=300, stale-while-revalidate=86400';

// Statische Assets bekommen ihre Header über frontend/public/_headers.
// API-Antworten des Workers müssen sie selbst setzen.
const API_SECURITY_HEADERS = {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=()'
};

app.use('*', logger());
app.use('*', cors());

app.use('/api/*', async (c, next) => {
    await next();
    for (const [name, value] of Object.entries(API_SECURITY_HEADERS)) {
        c.header(name, value);
    }
});

app.get('/health', (c) => {
    return c.json({
        success: true,
        message: 'Portfolio Backend API is running!',
        version: '2.0.0',
        cloudflare: true,
        timestamp: new Date().toISOString()
    });
});

app.get('/api/projects', (c) => {
    c.header('Cache-Control', API_CACHE_CONTROL);
    return c.json({
        success: true,
        projects: projects,
        count: projects.length
    });
});

app.get('/api/tech-stack', (c) => {
    c.header('Cache-Control', API_CACHE_CONTROL);
    return c.json({
        success: true,
        techStack: techStack,
        count: techStack.length
    });
});

export { app };

export default {
    fetch: app.fetch
};
