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
    <header className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-light via-white to-white py-20 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="container relative grid items-center gap-12 md:grid-cols-[1fr_320px] md:gap-16">
        <div className="animate-fade-in-left">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {personal.role}
          </span>
          <h1 className="mb-3 font-display text-4xl font-semibold leading-tight text-navy md:text-[3rem]">
            {personal.name}
          </h1>
          <h2 className="mb-6 text-xl font-medium text-gray md:text-2xl">{personal.subtitle}</h2>

          <p className="mb-8 max-w-[620px] leading-relaxed text-slate">{personal.description}</p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={scrollTo('projects')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-white no-underline shadow-sm-custom transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Icon name="github" width={18} height={18} />
              Projekte ansehen
            </button>
            <a
              href={personal.resumePdf}
              download
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-navy no-underline transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
              className="inline-flex items-center gap-2 border-b border-slate-400 py-3 text-base font-medium text-navy no-underline transition-colors hover:border-primary hover:text-primary"
            >
              Kontakt aufnehmen
            </Link>
          </div>

          <div className="mt-10 grid max-w-[620px] grid-cols-1 gap-x-6 gap-y-2 border-t border-slate-200 pt-6 text-sm text-gray sm:grid-cols-2">
            {heroMeta.map((item) => (
              <div key={item.icon} className="flex items-center gap-2">
                <Icon name={item.icon} width={16} height={16} className="shrink-0 text-primary" />
                <span>{item.content}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-in-right flex justify-center md:justify-end">
          <img
            src={personal.profileImage}
            alt="Dominik Jeksties am Schreibtisch, Softwareentwickler aus Hagen"
            className="h-[300px] w-[270px] rounded-xl border border-slate-200 object-cover object-top shadow-md-custom"
            width={270}
            height={300}
          />
        </div>
      </div>
    </header>
  );
}