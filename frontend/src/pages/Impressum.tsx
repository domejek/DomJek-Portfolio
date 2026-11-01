import { LegalPage, LegalSection } from '../components/legal/LegalPage';
import { addressLines, legal } from '../data/legal';
import { usePageMeta } from '../hooks/usePageMeta';

export function Impressum() {
  usePageMeta({
    title: 'Impressum – Dominik Jeksties',
    description: 'Impressum und Kontaktangaben von Dominik Jeksties.',
    path: '/impressum',
  });

  return (
    <LegalPage title="Impressum" updatedAt={legal.updatedAt}>
      <LegalSection title="Angaben gemäß § 5 DDG">
        <p>
          {legal.name}
          <br />
          {addressLines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <p>
          E-Mail:{' '}
          <a href={`mailto:${legal.email}`} className="text-primary underline underline-offset-2 hover:text-primary-dark">
            {legal.email}
          </a>
          {legal.phone.length > 0 && (
            <>
              <br />
              Telefon:{' '}
              <a
                href={legal.phoneHref || `tel:${legal.phone.replace(/[^+\d]/g, '')}`}
                className="text-primary underline underline-offset-2 hover:text-primary-dark"
              >
                {legal.phone}
              </a>
            </>
          )}
        </p>
        {legal.vatId.length > 0 && (
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: {legal.vatId}
          </p>
        )}
      </LegalSection>

      <LegalSection title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          {legal.name}, Anschrift wie oben.
        </p>
      </LegalSection>

      <LegalSection title="Haftung für Inhalte">
        <p>
          Die Inhalte dieser Seiten wurden mit Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
          und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Als Diensteanbieter
          bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
          Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
      </LegalSection>

      <LegalSection title="Haftung für Links">
        <p>
          Dieses Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte kein Einfluss
          besteht. Deshalb kann für diese fremden Inhalte auch keine Gewähr übernommen werden. Für
          die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
          Rechtsverstöße überprüft; rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
          erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete
          Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
          werden derartige Links umgehend entfernt.
        </p>
      </LegalSection>

      <LegalSection title="Urheberrecht">
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
          deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
          privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
