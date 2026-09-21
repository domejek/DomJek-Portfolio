import { volunteering } from '../../data/volunteering';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../ui/Icons';
import { SectionTitle } from '../ui/SectionTitle';

export function Volunteering() {
  const ref = useScrollAnimation<HTMLDivElement>('.animate-on-scroll');

  return (
    <section id="volunteering" className="py-20 md:py-24">
      <div className="container" ref={ref}>
        <SectionTitle
          title="Digitale Teilhabe & Ehrenamt"
          subtitle="Ich gebe mein Wissen weiter und mache digitale Werkzeuge für Menschen zugänglich, die bisher wenig Berührung damit hatten."
          kicker="Engagement"
        />
        <div className="animate-on-scroll rounded-lg border border-slate-200 bg-light p-8 shadow-sm-custom md:p-10">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Icon name="users" width={24} height={24} className="text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold leading-snug text-navy md:text-2xl">
              {volunteering.title}
            </h3>
          </div>
          <p className="mb-8 max-w-[720px] leading-relaxed text-gray">{volunteering.description}</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {volunteering.highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-lg border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-primary-light/60 hover:shadow-md-custom"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Icon name="check" width={18} height={18} className="shrink-0 text-success" />
                  <h4 className="font-semibold text-navy">{highlight.title}</h4>
                </div>
                <p className="text-sm leading-relaxed text-gray">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}