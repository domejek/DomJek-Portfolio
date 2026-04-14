import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import projects from './data/projects.json' with { type: 'json' };
import techStack from './data/tech-stack.json' with { type: 'json' };

const app = new Hono();

app.use('*', logger());
app.use('*', cors());

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
    return c.json({
        success: true,
        projects: projects,
        count: projects.length
    });
});

app.get('/api/tech-stack', (c) => {
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
