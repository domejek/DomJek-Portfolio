import { LegalPage, LegalSection } from '../components/legal/LegalPage';
import { addressLines, legal } from '../data/legal';
import { usePageMeta } from '../hooks/usePageMeta';

export function Datenschutz() {
  usePageMeta({
    title: 'Datenschutz – Dominik Jeksties',
    description:
      'Informationen zur Verarbeitung personenbezogener Daten beim Besuch von dominikjeksties.de.',
    path: '/datenschutz',
  });

  return (
    <LegalPage title="Datenschutzerklärung" updatedAt={legal.updatedAt}>
      <p className="leading-relaxed">
        Diese Erklärung informiert darüber, welche personenbezogenen Daten beim Besuch dieser Website
        verarbeitet werden und welche Rechte daraus folgen. Die Website ist eine rein informative
        Portfolio-Seite ohne Benutzerkonten, Shop oder Kontaktformular.
      </p>

      <LegalSection title="Verantwortlicher">
        <p>
          {legal.name}
          <br />
          {addressLines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
          E-Mail:{' '}
          <a href={`mailto:${legal.email}`} className="text-primary underline underline-offset-2 hover:text-primary-dark">
            {legal.email}
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Hosting und Server-Logfiles">
        <p>
          Diese Website wird über Cloudflare Workers ausgeliefert. Anbieter ist die Cloudflare, Inc.,
          101 Townsend St., San Francisco, CA 94107, USA. Cloudflare verarbeitet dabei technisch
          notwendige Verbindungsdaten, um die Seite auszuliefern und Angriffe abzuwehren. Mit dem
          Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.
        </p>
        <p>
          Bei jedem Aufruf werden automatisch Informationen in Server-Logfiles gespeichert:
          IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene URL, übertragene Datenmenge,
          Referrer sowie Browser- und Betriebssystemkennung. Diese Daten dienen ausschließlich der
          Sicherstellung eines störungsfreien Betriebs und der Systemsicherheit.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und
          stabilen Auslieferung). Die Daten werden gelöscht, sobald sie für die genannten Zwecke nicht
          mehr erforderlich sind.
        </p>
        <p>
          Da der Anbieter seinen Sitz in den USA hat, kann eine Übermittlung in ein Drittland
          stattfinden. Cloudflare ist nach dem EU-US Data Privacy Framework zertifiziert; ergänzend
          gelten die Standardvertragsklauseln der Europäischen Kommission.
        </p>
      </LegalSection>

      <LegalSection title="Schriftarten">
        <p>
          Zur einheitlichen Darstellung der Schriften werden derzeit Webfonts von Google Fonts geladen.
          Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
          Beim Laden der Schriften wird die IP-Adresse an Google übertragen; dabei kann nicht
          ausgeschlossen werden, dass Daten auch an Server in den USA übermittelt werden.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer ansprechenden
          und konsistenten Darstellung). Die Schriften sollen künftig lokal von diesem Server
          ausgeliefert werden; dieser Abschnitt entfällt dann.
        </p>
      </LegalSection>

      <LegalSection title="Kontaktaufnahme">
        <p>
          Bei einer Kontaktaufnahme per E-Mail werden die übermittelten Angaben (E-Mail-Adresse,
          Name, Inhalt der Nachricht) zur Bearbeitung der Anfrage gespeichert. Rechtsgrundlage ist
          Art. 6 Abs. 1 lit. b DSGVO bei vertragsbezogenen Anfragen, ansonsten Art. 6 Abs. 1 lit. f
          DSGVO. Die Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine
          gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </LegalSection>

      <LegalSection title="Cookies und Analyse">
        <p>
          Diese Website setzt keine Cookies zu Analyse- oder Marketingzwecken und verwendet keine
          Tracking-, Statistik- oder Werbedienste. Es findet keine Profilbildung statt.
        </p>
      </LegalSection>

      <LegalSection title="Externe Links">
        <p>
          Die Website verlinkt auf Profile bei GitHub und LinkedIn. Es handelt sich um einfache Links;
          Inhalte Dritter werden nicht eingebettet. Beim Anklicken gelten die Datenschutzbestimmungen
          des jeweiligen Anbieters.
        </p>
      </LegalSection>

      <LegalSection title="Ihre Rechte">
        <p>Nach der DSGVO stehen Ihnen folgende Rechte zu:</p>
        <ul className="ml-6 list-disc space-y-1">
          <li>Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        </ul>
        <p>
          Zur Ausübung genügt eine Nachricht an{' '}
          <a href={`mailto:${legal.email}`} className="text-primary underline underline-offset-2 hover:text-primary-dark">
            {legal.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Beschwerderecht">
        <p>
          Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Zuständig ist:
        </p>
        <p>
          {legal.supervisoryAuthority.name}
          <br />
          {legal.supervisoryAuthority.address}
          <br />
          <a
            href={legal.supervisoryAuthority.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary-dark"
          >
            {legal.supervisoryAuthority.url.replace('https://', '')}
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Keine automatisierte Entscheidungsfindung">
        <p>
          Es findet keine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne des
          Art. 22 DSGVO statt.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
