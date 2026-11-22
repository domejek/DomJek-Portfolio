#!/usr/bin/env node
/**
 * Rendert alle öffentlichen Routen nach `vite build` mit Puppeteer aus und
 * schreibt das fertige HTML als `dist/<route>/index.html`.
 *
 * Ablauf:
 *   1. `dist` über `vite preview` lokal servieren.
 *   2. Jede Route mit einer echten Browser-Engine laden (networkidle + H1 +
 *      kanonische URL), API-Antworten aus `backend/data` fixturieren.
 *   3. Alle Snapshots schreiben – erst danach verifizieren, damit kein
 *      teilweise beschriebenes `dist` gelesen wird.
 *   4. Prüfen: mit JS genau ein H1 und keine Konsolenfehler, ohne JS derselbe
 *      Inhalt und sichtbare Scroll-Animationen.
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { preview } from 'vite';
import { collectSitemapEntries } from './generate-sitemap.mjs';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');

const BROWSER_ARGS = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'];
const TARGET_TIMEOUT = 60_000;
const SELECTOR_TIMEOUT = 20_000;

function outputPath(route) {
  const relative = route.replace(/^\/+/, '');
  return path.join(distDir, relative, 'index.html');
}

/**
 * `vite preview` liefert Verzeichnis-Indizes nur mit Trailingslash aus. Die
 * deployment-Konfigurationen (nginx/Cloudflare) dienen die Dateien ohne
 * Trailingslash unter der kanonischen URL aus; für die Verifikation zählt
 * hier der Inhalt der gerade geschriebenen Datei.
 */
function verificationUrl(route, baseUrl) {
  return new URL(route === '/' ? '/' : `${route}/`, baseUrl).href;
}

async function loadApiFixtures() {
  const sources = [
    { pathname: '/api/projects', file: path.resolve(rootDir, '../backend/data/projects.json'), key: 'projects' },
    { pathname: '/api/tech-stack', file: path.resolve(rootDir, '../backend/data/tech-stack.json'), key: 'techStack' },
  ];
  const fixtures = new Map();

  for (const { pathname, file, key } of sources) {
    if (!existsSync(file)) continue;

    const raw = JSON.parse(await readFile(file, 'utf8'));
    const items = Array.isArray(raw) ? raw : (raw[key] ?? []);
    fixtures.set(
      pathname,
      JSON.stringify({ success: true, [key]: items, count: items.length }),
    );
  }

  return fixtures;
}

/** Die SPA fragt Projekt-/Tech-Daten zur Laufzeit ab; der Preview-Server liefert nur statische Dateien. */
async function interceptApiRequests(page, fixtures) {
  await page.setRequestInterception(true);

  page.on('request', (request) => {
    void (async () => {
      try {
        const { pathname } = new URL(request.url());
        const body = fixtures.get(pathname);
        if (body !== undefined) {
          await request.respond({
            status: 200,
            contentType: 'application/json',
            headers: { 'access-control-allow-origin': '*' },
            body,
          });
        } else {
          await request.continue();
        }
      } catch {
        // Die Anfrage wurde z. B. schon von einem anderen Handler beendet.
      }
    })();
  });
}

function collectBrowserErrors(page) {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  return errors;
}

async function waitForRoute(page, url, route) {
  await page.goto(url, { waitUntil: 'networkidle0', timeout: TARGET_TIMEOUT });
  await page.waitForSelector('h1', { timeout: SELECTOR_TIMEOUT });
  // Die Route-spezifischen Meta-Tags werden in einem Effect gesetzt; die
  // kanonische URL ist dafür ein verlässliches Signal.
  await page.waitForFunction(
    (expected) => document.querySelector('link[rel="canonical"]')?.getAttribute('href')?.endsWith(expected),
    { timeout: SELECTOR_TIMEOUT },
    route,
  );
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

async function snapshotRoute(browser, baseUrl, route, fixtures) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await interceptApiRequests(page, fixtures);
  const errors = collectBrowserErrors(page);

  try {
    await waitForRoute(page, new URL(route, baseUrl).href, route);

    const state = await page.evaluate(() => ({
      title: document.title,
      h1: [...document.querySelectorAll('h1')].map((element) => element.textContent?.trim() ?? ''),
    }));

    if (state.h1.length !== 1 || !state.h1[0]) {
      throw new Error(`Erwartet genau ein H1, gefunden: ${JSON.stringify(state.h1)}`);
    }
    if (errors.length > 0) {
      throw new Error(`Konsolenfehler auf ${route}: ${errors.join(' | ')}`);
    }

    // Die Animationen werden nur mit JS aktiviert (siehe main.tsx/index.css).
    // Ohne die Klasse ist das statische HTML auch mit deaktiviertem JS lesbar.
    await page.evaluate(() => document.documentElement.classList.remove('js'));
    const html = await page.content();

    return { route, html, title: state.title, h1: state.h1[0] };
  } finally {
    await page.close();
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function verifyWithJs(browser, baseUrl, snapshot, fixtures) {
  const page = await browser.newPage();
  await interceptApiRequests(page, fixtures);
  const errors = collectBrowserErrors(page);

  try {
    await waitForRoute(page, verificationUrl(snapshot.route, baseUrl), snapshot.route);
    await page.waitForFunction(() => document.querySelectorAll('h1').length === 1, {
      timeout: SELECTOR_TIMEOUT,
    });

    const state = await page.evaluate(() => ({
      title: document.title,
      h1: [...document.querySelectorAll('h1')].map((element) => element.textContent?.trim() ?? ''),
    }));

    assert(state.h1.length === 1, `${snapshot.route}: doppelter oder fehlender H1 nach dem Laden: ${JSON.stringify(state.h1)}`);
    assert(state.h1[0] === snapshot.h1, `${snapshot.route}: H1 nach dem Laden verändert: ${state.h1[0]}`);
    assert(state.title === snapshot.title, `${snapshot.route}: Titel nach dem Laden verändert: ${state.title}`);
    assert(errors.length === 0, `${snapshot.route}: Konsolenfehler nach dem Laden: ${errors.join(' | ')}`);
  } finally {
    await page.close();
  }
}

async function verifyWithoutJs(browser, baseUrl, snapshot) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setJavaScriptEnabled(false);

  try {
    await page.goto(verificationUrl(snapshot.route, baseUrl), {
      waitUntil: 'networkidle0',
      timeout: TARGET_TIMEOUT,
    });

    const state = await page.evaluate(() => ({
      title: document.title,
      h1: [...document.querySelectorAll('h1')].map((element) => element.textContent?.trim() ?? ''),
      hiddenAnimated: [...document.querySelectorAll('.animate-on-scroll')].filter(
        (element) => getComputedStyle(element).opacity === '0',
      ).length,
    }));

    assert(state.h1.length === 1, `${snapshot.route}: ohne JS fehlt der H1 oder er ist doppelt: ${JSON.stringify(state.h1)}`);
    assert(state.h1[0] === snapshot.h1, `${snapshot.route}: ohne JS anderer H1: ${state.h1[0]}`);
    assert(state.title === snapshot.title, `${snapshot.route}: ohne JS anderer Titel: ${state.title}`);
    assert(state.hiddenAnimated === 0, `${snapshot.route}: ${state.hiddenAnimated} animierte Elemente bleiben ohne JS unsichtbar`);
  } finally {
    await context.close();
  }
}

async function main() {
  assert(existsSync(distDir), 'dist/ fehlt – zuerst `vite build` ausführen.');

  const entries = await collectSitemapEntries();
  const routes = [...new Set(entries.map(({ path: route }) => route))].sort();
  assert(routes.length > 0, 'Keine Routen zum Prerendern gefunden.');

  const fixtures = await loadApiFixtures();
  const server = await preview({
    preview: { host: '127.0.0.1', port: 0, strictPort: false },
    logLevel: 'warn',
  });
  const address = server.httpServer.address();
  const baseUrl = new URL(server.resolvedUrls?.local?.[0] ?? `http://127.0.0.1:${address.port}/`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: BROWSER_ARGS,
    });

    console.log(`[prerender] ${routes.length} Routen werden gerendert …`);
    const snapshots = [];
    for (const route of routes) {
      const snapshot = await snapshotRoute(browser, baseUrl, route, fixtures);
      snapshots.push(snapshot);
      console.log(`[prerender] ${route} → ${snapshot.title}`);
    }

    for (const snapshot of snapshots) {
      const target = outputPath(snapshot.route);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, snapshot.html, 'utf8');
    }

    for (const snapshot of snapshots) {
      await verifyWithJs(browser, baseUrl, snapshot, fixtures);
      await verifyWithoutJs(browser, baseUrl, snapshot);
    }

    console.log(`[prerender] ${snapshots.length} HTML-Dateien geschrieben und verifiziert (mit/ohne JS).`);
  } finally {
    await browser?.close();
    await new Promise((resolve, reject) => {
      server.httpServer.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

main().catch((error) => {
  console.error(`[prerender] ${error.message}`);
  process.exitCode = 1;
});
