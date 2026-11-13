import { useEffect } from 'react';

export interface StructuredDataEntry {
  /** Eindeutige Kennung, über die das Schema pro Route ersetzt und entfernt wird. */
  id: string;
  data: Record<string, unknown>;
}

const SCRIPT_SELECTOR = 'script[type="application/ld+json"][data-structured-data]';

function serialize(data: Record<string, unknown>): string {
  // `<` maskieren, damit Inhalte wie `</script>` das Script-Tag nicht beenden.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function scriptSelector(id: string): string {
  return `${SCRIPT_SELECTOR}[data-structured-data="${id}"]`;
}

/**
 * Schreibt JSON-LD-Schemata in den `<head>` und hält sie aktuell.
 *
 * Jedes Schema läuft unter einer festen `id`. Beim Unmount der Komponente –
 * also beim Routenwechsel – wird genau dieses Script wieder entfernt. Dadurch
 * bleibt nach dem Verlassen eines Blogbeitrags kein veraltetes
 * `BlogPosting`-Schema zurück.
 */
export function useStructuredData(entries: StructuredDataEntry[]): void {
  const serialized = entries.map(({ id, data }) => ({ id, json: serialize(data) }));
  const signature = JSON.stringify(serialized);

  useEffect(() => {
    const ids = serialized.map(({ id, json }) => {
      let script = document.head.querySelector<HTMLScriptElement>(scriptSelector(id));

      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.structuredData = id;
        document.head.appendChild(script);
      }

      script.textContent = json;
      return id;
    });

    return () => {
      for (const id of ids) {
        document.head.querySelector(scriptSelector(id))?.remove();
      }
    };
    // `signature` enthält alle IDs und Inhalte; der Effekt soll nur laufen,
    // wenn sich tatsächlich ein Schema ändert.
  }, [signature]); // oxlint-disable-line react-hooks/exhaustive-deps
}
