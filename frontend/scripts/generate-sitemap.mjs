#!/usr/bin/env node
/**
 * Erzeugt nach dem Build die vollständige sitemap.xml in `dist/`.
 *
 * Quellen:
 *   - feste Routen (`/`, `/blog`)
 *   - alle Blog-Slugs aus `src/content/blog/*.mdx`
 *   - alle Projekt-Slugs aus `../backend/data/projects.json`
 */
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const blogDir = path.join(rootDir, 'src/content/blog');
const projectsFile = path.resolve(rootDir, '../backend/data/projects.json');

const SITE = 'https://dominikjeksties.de';

const toIsoDate = (date) => date.toISOString().slice(0, 10);

async function collectBlogUrls() {
  const files = (await readdir(blogDir)).filter((file) => file.endsWith('.mdx')).sort();
  const entries = [];

  for (const file of files) {
    const fullPath = path.join(blogDir, file);
    const source = await readFile(fullPath, 'utf8');
    const slug = source.match(/slug:\s*['"]([^'"]+)['"]/)?.[1];

    if (!slug) {
      console.warn(`[sitemap] Kein slug in ${file} gefunden – übersprungen.`);
      continue;
    }

    const { mtime } = await stat(fullPath);
    entries.push({ path: `/blog/${slug}`, lastmod: toIsoDate(mtime) });
  }

  return entries;
}

async function collectProjectUrls() {
  if (!existsSync(projectsFile)) {
    // Passiert z. B. im Docker-Build des Frontends, dessen Kontext nur `frontend/` ist.
    console.warn('[sitemap] backend/data/projects.json nicht gefunden – Projekt-URLs übersprungen.');
    return [];
  }

  const raw = JSON.parse(await readFile(projectsFile, 'utf8'));
  const projects = Array.isArray(raw) ? raw : (raw.projects ?? []);
  const { mtime } = await stat(projectsFile);
  const lastmod = toIsoDate(mtime);

  return projects
    .map((project) => project.slug ?? project.name)
    .filter(Boolean)
    .map((slug) => ({ path: `/projekte/${slug}`, lastmod }));
}

const today = toIsoDate(new Date());
const entries = [
  { path: '/', lastmod: today },
  { path: '/blog', lastmod: today },
  { path: '/impressum', lastmod: today },
  { path: '/datenschutz', lastmod: today },
  ...(await collectBlogUrls()),
  ...(await collectProjectUrls()),
];

const urls = entries
  .map(
    ({ path: routePath, lastmod }) =>
      `  <url>\n    <loc>${SITE}${encodeURI(routePath)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await mkdir(distDir, { recursive: true });
await writeFile(path.join(distDir, 'sitemap.xml'), xml, 'utf8');

console.log(`[sitemap] ${entries.length} URLs → dist/sitemap.xml`);
