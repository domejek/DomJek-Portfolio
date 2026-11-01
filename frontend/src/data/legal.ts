/**
 * Zentrale Angaben für Impressum und Datenschutzerklärung.
 *
 * Die Kontaktdaten stehen in `legal.local.json` – diese Datei ist gitignored und
 * wird nicht ins Repository übernommen. Vorlage: `legal.local.example.json`.
 *
 * Fehlt die Datei (z. B. im CI-Build), greifen die Defaults. Der Build bricht
 * dadurch nicht; das Impressum ist dann allerdings unvollständig.
 */
interface LegalContact {
  name?: string;
  street?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  email?: string;
  phone?: string;
  phoneHref?: string;
  vatId?: string;
}

interface LegalInfo extends Required<LegalContact> {
  supervisoryAuthority: { name: string; address: string; url: string };
  updatedAt: string;
}

const defaults: Required<LegalContact> = {
  name: 'Dominik Jeksties',
  street: '',
  postalCode: '',
  city: 'Hagen',
  country: 'Deutschland',
  email: 'dominik@jeksties.de',
  phone: '',
  phoneHref: '',
  vatId: '',
};

// Fehlt die Datei, liefert das Glob ein leeres Objekt – kein Build-Fehler.
const localFiles = import.meta.glob<{ default: LegalContact }>('./legal.local.json', {
  eager: true,
});

const localContact: LegalContact = Object.values(localFiles)[0]?.default ?? {};

export const legal: LegalInfo = {
  ...defaults,
  ...localContact,
  supervisoryAuthority: {
    name: 'Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen',
    address: 'Kavalleriestraße 2–4, 40213 Düsseldorf',
    url: 'https://www.ldi.nrw.de',
  },
  updatedAt: 'November 2026',
};

/** Anschriftzeilen ohne leere Einträge – leere Zeilen werden nicht gerendert. */
export const addressLines: string[] = [
  legal.street,
  `${legal.postalCode} ${legal.city}`.trim(),
  legal.country,
].filter((line) => line.length > 0);

export const addressComplete = legal.street.length > 0 && legal.postalCode.length > 0;

if (import.meta.env.DEV && !addressComplete) {
  console.warn(
    '[legal] Anschrift unvollständig: `legal.local.json` aus `legal.local.example.json` anlegen und ausfüllen, sonst ist das Impressum nicht § 5 DDG konform.',
  );
}
