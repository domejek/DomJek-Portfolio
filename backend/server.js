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

// Feste App-Routen, falls dist/routes.json einmal fehlt. Die vollständige Liste
// inklusive Blog- und Projekt-Slugs erzeugt frontend/scripts/generate-sitemap.mjs.
const FALLBACK_ROUTES = new Set(['/', '/blog', '/impressum', '/datenschutz']);
const FALLBACK_ROUTE_PATTERNS = [/^\/blog\/[^/]+$/, /^\/projekte\/[^/]+$/];
const FILE_EXTENSION = /\.[a-z0-9]{1,8}$/i;

function normalizePathname(pathname) {
    if (pathname.length > 1 && pathname.endsWith('/')) {
        return pathname.replace(/\/+$/, '') || '/';
    }
    return pathname;
}

function isKnownFallbackRoute(pathname) {
    return (
        FALLBACK_ROUTES.has(pathname) ||
        FALLBACK_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname))
    );
}

async function loadKnownRoutes(env, requestUrl) {
    try {
        const response = await env.ASSETS.fetch(new URL('/routes.json', requestUrl));
        if (!response.ok) return null;

        const routes = await response.json();
        if (!Array.isArray(routes)) return null;

        return new Set(routes.map(normalizePathname));
    } catch {
        // Ohne Route-Liste greift der statische Fallback unten.
        return null;
    }
}

async function serveAppShell(c, status) {
    const shell = await c.env.ASSETS.fetch(
        new Request(new URL('/index.html', c.req.url), { method: 'GET' }),
    );
    if (!shell.ok) return null;

    const headers = new Headers(shell.headers);
    if (status === 404) {
        headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    return new Response(c.req.method === 'HEAD' ? null : shell.body, { status, headers });
}

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

// Unbekannte Pfade: bekannte App-Routen bekommen das SPA-Shell mit 200,
// unbekannte Navigationspfade dasselbe Shell mit echtem 404. Fehlende Dateien
// (z. B. /llms.txt) werden nie durch HTML ersetzt.
app.notFound(async (c) => {
    const url = new URL(c.req.url);
    const pathname = normalizePathname(url.pathname);

    if (pathname === '/api' || pathname.startsWith('/api/')) {
        return c.json({ success: false, error: 'Not Found' }, 404);
    }

    // Lokales Node-Backend und CI haben kein Assets-Binding.
    if (!c.env?.ASSETS) {
        return c.text('Not Found', 404);
    }

    const isGetOrHead = c.req.method === 'GET' || c.req.method === 'HEAD';
    const wantsHtml =
        c.req.header('sec-fetch-mode') === 'navigate' ||
        (c.req.header('accept') ?? '').includes('text/html');

    if (!isGetOrHead || !wantsHtml || FILE_EXTENSION.test(pathname)) {
        return c.env.ASSETS.fetch(c.req.raw);
    }

    const assetResponse = await c.env.ASSETS.fetch(c.req.raw);
    if (assetResponse.ok) {
        return assetResponse;
    }

    const knownRoutes = await loadKnownRoutes(c.env, c.req.url);
    const isKnown = knownRoutes
        ? knownRoutes.has(pathname)
        : isKnownFallbackRoute(pathname);

    const shell = await serveAppShell(c, isKnown ? 200 : 404);
    return shell ?? assetResponse;
});

export { app };

export default {
    fetch: app.fetch
};
