import { personal } from '../data/personal';
import type { BlogPostMeta } from '../types';
import { DEFAULT_OG_IMAGE, SITE_URL } from './seo';

/** JSON-LD-Objekt mit den für schema.org nötigen Pflichtfeldern. */
export interface JsonLdObject {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const GERMAN_MONTHS: Record<string, string> = {
  januar: '01',
  februar: '02',
  märz: '03',
  maerz: '03',
  april: '04',
  mai: '05',
  juni: '06',
  juli: '07',
  august: '08',
  september: '09',
  oktober: '10',
  november: '11',
  dezember: '12',
};

function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

/**
 * Wandelt das Anzeige-Datum eines Beitrags (`Mai 2026`, `15. Mai 2026` oder
 * bereits ISO-Format) in ein vollständiges ISO-8601-Datum für schema.org um.
 *
 * Bei reinen Monatsangaben wird der Monatserste verwendet, weil
 * `datePublished` laut Schema.org ein vollständiges Datum verlangt.
 */
export function toIsoPublicationDate(date: string): string | undefined {
  const value = date.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const dayMonthYear = value.match(/^(\d{1,2})\.\s*([A-Za-zÄÖÜäöüß]+)\s+(\d{4})$/);
  if (dayMonthYear) {
    const month = GERMAN_MONTHS[dayMonthYear[2].toLowerCase()];
    if (!month) return undefined;
    return `${dayMonthYear[3]}-${month}-${dayMonthYear[1].padStart(2, '0')}`;
  }

  const monthYear = value.match(/^([A-Za-zÄÖÜäöüß]+)\s+(\d{4})$/);
  if (monthYear) {
    const month = GERMAN_MONTHS[monthYear[1].toLowerCase()];
    if (!month) return undefined;
    return `${monthYear[2]}-${month}-01`;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
}

/**
 * Person-Schema für den Seiteninhaber.
 *
 * `sameAs` verknüpft die Entität mit GitHub und LinkedIn, `knowsAbout` macht
 * die fachlichen Schwerpunkte maschinenlesbar.
 */
export function buildPersonSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: personal.name,
    jobTitle: personal.jobTitle,
    description: personal.description,
    url: `${SITE_URL}/`,
    image: absoluteUrl(personal.profileImage),
    email: `mailto:${personal.email}`,
    sameAs: [personal.githubUrl, personal.linkedinUrl],
    knowsAbout: personal.knowsAbout,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hagen',
      addressRegion: 'Nordrhein-Westfalen',
      addressCountry: 'DE',
    },
  };
}

/** WebSite-Schema mit Verweis auf die Person als Publisher. */
export function buildWebSiteSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: personal.name,
    url: `${SITE_URL}/`,
    description: personal.description,
    inLanguage: 'de-DE',
    publisher: { '@id': PERSON_ID },
  };
}

/**
 * BlogPosting-Schema für einen einzelnen Beitrag.
 *
 * `datePublished` wird aus dem Anzeige-Datum abgeleitet, sofern im Frontmatter
 * kein explizites ISO-Datum hinterlegt ist.
 */
export function buildBlogPostingSchema(meta: BlogPostMeta): JsonLdObject {
  const url = `${SITE_URL}/blog/${meta.slug}`;
  const datePublished = meta.datePublished ?? toIsoPublicationDate(meta.date);

  const schema: JsonLdObject = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: meta.title,
    description: meta.excerpt,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: [absoluteUrl(meta.image ?? DEFAULT_OG_IMAGE)],
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: personal.name,
      url: `${SITE_URL}/`,
    },
    publisher: { '@type': 'Person', '@id': PERSON_ID, name: personal.name },
    inLanguage: 'de-DE',
    articleSection: meta.category,
    keywords: meta.tags.join(', '),
    isPartOf: { '@id': WEBSITE_ID },
  };

  if (datePublished) {
    schema.datePublished = datePublished;
    schema.dateModified = datePublished;
  }

  return schema;
}
