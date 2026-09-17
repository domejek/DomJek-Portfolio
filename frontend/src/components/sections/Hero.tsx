import { personal } from '../../data/personal';
import { Icon, type IconName } from '../ui/Icons';
import { Link } from 'react-router-dom';

const heroMeta: { icon: IconName; content: React.ReactNode }[] = [
  { icon: 'map-pin', content: personal.location },
  { icon: 'calendar', content: personal.availability },
  { icon: 'mail', content: <a href={`mailto:${personal.email}`} className="text-inherit no-underline">{personal.email}</a> },
  { icon: 'phone', content: <a href={personal.phoneHref} className="text-inherit no-underline">{personal.phone}</a> },
  { icon: 'send', content: personal.languages[0] },
];

export function Hero() {
  const scrollTo = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-navy py-20 text-white md:py-24">
      <div className="container grid items-center gap-12 md:grid-cols-[1fr_320px] md:gap-16">
        <div className="animate-fade-in-left">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gray-light">
            {personal.role}
          </span>
          <h1 className="mb-3 font-serif text-4xl font-semibold leading-tight text-white md:text-[3rem]">
            {personal.name}
          </h1>
          <h2 className="mb-6 text-xl font-medium text-gray-light md:text-2xl">{personal.subtitle}</h2>

          <p className="mb-8 max-w-[620px] leading-relaxed text-white/80">{personal.description}</p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={scrollTo('projects')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary-light px-6 py-3 text-base font-semibold text-white no-underline transition-colors hover:bg-primary"
            >
              <Icon name="github" width={18} height={18} />
              Projekte ansehen
            </button>
            <a
              href={personal.resumePdf}
              download
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-base font-semibold text-white no-underline transition-colors hover:border-white hover:bg-white/10"
            >
              <Icon name="download" width={18} height={18} />
              Lebenslauf (PDF)
            </a>
            <Link
              to="/#contact"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50);
              }}
              className="inline-flex items-center gap-2 border-b border-white/30 py-3 text-base font-medium text-white/85 no-underline transition-colors hover:border-white hover:text-white"
            >
              Kontakt aufnehmen
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-gray-light">
            {heroMeta.map((item) => (
              <div key={item.icon} className="flex items-center gap-2">
                <Icon name={item.icon} width={16} height={16} className="shrink-0 text-primary-light" />
                <span>{item.content}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-in-right flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-xl border border-primary-light/40" />
            <img
              src={personal.profileImage}
              alt="Dominik Jeksties am Schreibtisch, Softwareentwickler aus Hagen"
              className="relative z-10 h-[300px] w-[270px] rounded-xl border border-white/15 object-cover object-top"
              width={270}
              height={300}
            />
          </div>
        </div>
      </div>
    </header>
  );
}