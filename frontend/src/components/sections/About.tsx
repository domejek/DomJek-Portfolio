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
        <SectionTitle title="Über mich" subtitle="Wer ich bin und was mich antreibt" />
        <div className="grid gap-12 lg:grid-cols-2 md:gap-16">
          <div className="animate-on-scroll">
            <h3 className="mb-4 text-xl font-bold text-navy md:text-2xl">
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
                  <Icon name="check" width={20} height={20} className="text-success" />
                  <span className="text-navy">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-on-scroll relative mx-auto max-w-fit">
            <img
              src={personalImage}
              alt="Dominik Jeksties - Softwareentwickler für Backend & Monitoring"
              loading="lazy"
              width={400}
              height={400}
              className="relative z-10 mx-auto block h-52 w-52 rounded-full object-cover object-top shadow-xl sm:h-60 sm:w-60 md:h-72 md:w-72"
            />
            <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-4">
              <div className="z-20 rounded-2xl border border-white/40 bg-white px-8 py-4 text-center shadow-lg">
                <div className="text-3xl font-bold text-navy">2+</div>
                <div className="text-sm text-gray">Jahre Erfahrung</div>
              </div>
              <div className="z-20 rounded-2xl border border-white/40 bg-white px-8 py-4 text-center shadow-lg">
                <div className="text-3xl font-bold text-navy">100%</div>
                <div className="text-sm text-gray">Engagement</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}