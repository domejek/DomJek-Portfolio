export const SITE_URL = 'https://dominikjeksties.de';
export const DEFAULT_OG_IMAGE = '/images/og-card.png';
export const DEFAULT_OG_IMAGE_ALT = 'Dominik Jeksties – Softwareentwickler aus Hagen';

/**
 * Kürzt Text auf eine Länge, die in Suchergebnissen nicht abgeschnitten wird.
 * Schneidet an der letzten Wortgrenze und entfernt Satzzeichen am Ende.
 */
export function truncate(text: string, maxLength = 155): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;

  const cut = normalized.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const shortened = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
  return `${shortened.replace(/[,.;:!?]$/, '')}…`;
}
