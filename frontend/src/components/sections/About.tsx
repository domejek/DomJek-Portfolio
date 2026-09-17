import { aboutHighlights } from '../../data/personal';
import personalImage from '../../assets/profile.webp';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../ui/Icons';
import { SectionTitle } from '../ui/SectionTitle';

export function About() {
  const ref = useScrollAnimation<HTMLDivElement>('.animate-on-scroll');

  return (
    <section id="about" className="py-20 md:py-24">
      <div className="container" ref={ref}>
        <SectionTitle title="Wer ich bin und was mich antreibt" kicker="Über mich" />
        <div className="grid gap-12 lg:grid-cols-2 md:gap-16">
          <div className="animate-on-scroll">
            <h3 className="mb-4 font-serif text-xl font-semibold leading-snug text-navy md:text-2xl">
              Softwareentwickler für Full-Stack-Entwicklung – Frontend &amp; Backend
            </h3>
            <p className="mb-4 leading-relaxed text-gray">
              Als Full-Stack-Entwickler baue ich responsive Frontends ebenso wie Datenschnittstellen,
              Datenbankanbindungen und Monitoring-Infrastrukturen. Mit fundierten Kenntnissen in PHP,
              Python, JavaScript, HTML &amp; CSS sowie Erfahrung mit dem CMS Kirby habe ich in mehreren
              beruflichen Stationen erfolgreich echte Produktivsysteme mit- und weiterentwickelt.
            </p>
            <p className="mb-8 leading-relaxed text-gray">
              Von der NAC-Engine über Energiemarkt-Dashboards bis zu automatisierten Report-Systemen
              und dem neuen Besucherbereich. Ich arbeite strukturiert, eigenverantwortlich und schätze
              sauberen, gut dokumentierten Code.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {aboutHighlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Icon name="check" width={18} height={18} className="shrink-0 text-success" />
                  <span className="text-navy">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-on-scroll flex flex-col items-center gap-6 lg:items-start">
            <div className="relative">
              <img
                src={personalImage}
                alt="Dominik Jeksties - Softwareentwickler für Backend & Monitoring"
                loading="lazy"
                width={400}
                height={400}
                className="relative z-10 block h-64 w-64 rounded-full border border-slate-200 object-cover object-top shadow-md-custom sm:h-72 sm:w-72"
              />
            </div>
            <div className="grid w-full max-w-[340px] grid-cols-2 gap-4">
              <div className="rounded-md border border-slate-200 bg-white px-6 py-4 text-center shadow-sm-custom">
                <div className="font-serif text-2xl font-semibold text-navy">3+</div>
                <div className="text-sm text-gray">Jahre Erfahrung</div>
              </div>
              <div className="rounded-md border border-slate-200 bg-white px-6 py-4 text-center shadow-sm-custom">
                <div className="font-serif text-2xl font-semibold text-navy">100%</div>
                <div className="text-sm text-gray">Engagement</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}