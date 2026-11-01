import { useEffect } from 'react';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SITE_URL,
} from '../lib/seo';

type MetaType = 'website' | 'article';

interface PageMetaOptions {
  title: string;
  description: string;
  /** Pfad ohne Domain, z. B. `/blog/mein-beitrag`. */
  path: string;
  image?: string;
  imageAlt?: string;
  type?: MetaType;
  noindex?: boolean;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Setzt Title, Description, Canonical und Social-Metas pro Route.
 *
 * Die Tags werden aktualisiert statt neu angehängt, damit die statischen
 * Fallbacks aus `index.html` nicht doppelt im `<head>` landen. Beim späteren
 * Prerendering friert der Snapshot genau diesen Zustand ein.
 */
export function usePageMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  type = 'website',
  noindex = false,
}: PageMetaOptions): void {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const imageUrl = /^https?:\/\//.test(image) ? image : `${SITE_URL}${image}`;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:image:alt', imageAlt);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:locale', 'de_DE');
    upsertMeta('property', 'og:site_name', 'Dominik Jeksties');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);

    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
  }, [title, description, path, image, imageAlt, type, noindex]);
}
