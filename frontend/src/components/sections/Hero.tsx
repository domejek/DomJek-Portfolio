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
    <header className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-light py-20 text-white md:py-24">
      <div className="pointer-events-none absolute -top-1/2 -right-1/5 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.15),transparent_70%)]" />
      <div className="container relative z-10 grid items-center gap-8 md:grid-cols-[1fr_300px] md:gap-16">
        <div className="animate-fade-in-left">
          <h1 className="mb-2 text-4xl font-extrabold leading-tight md:text-[2.8rem]">
            <span className="text-primary-light">{personal.name}</span> — {personal.role}
          </h1>
          <h2 className="mb-6 text-xl font-medium text-gray-light md:text-2xl">{personal.subtitle}</h2>

          <div className="mb-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-light md:text-base">
            {heroMeta.map((item) => (
              <div key={item.icon} className="flex items-center gap-2">
                <Icon name={item.icon} width={18} height={18} className="shrink-0 text-primary-light" />
                <span>{item.content}</span>
              </div>
            ))}
          </div>

          <p className="mb-8 max-w-[620px] leading-relaxed">{personal.description}</p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={scrollTo('projects')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary-light px-7 py-3.5 text-base font-semibold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_8px_24px_rgba(59,130,246,0.4)]"
            >
              <Icon name="github" width={18} height={18} />
              Projekte ansehen
            </button>
            <a
              href={personal.resumePdf}
              download
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-7 py-3.5 text-base font-semibold text-white no-underline transition-all hover:border-white hover:bg-white/10"
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
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-7 py-3.5 text-base font-semibold text-white no-underline transition-all hover:border-white hover:bg-white/10"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>

        <div className="animate-fade-in-right flex justify-center">
          <div className="relative">
            <div className="absolute inset-[-8px] rounded-full bg-gradient-to-br from-primary-light to-accent opacity-50 blur-xl" />
            <img
              src={personal.profileImage}
              alt="Dominik Jeksties am Schreibtisch, Softwareentwickler aus Hagen"
              className="relative z-10 h-[260px] w-[260px] rounded-full border-4 border-white/20 object-cover shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
              width={260}
              height={260}
            />
          </div>
        </div>
      </div>
    </header>
  );
}