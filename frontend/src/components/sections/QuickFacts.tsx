import { quickFacts } from '../../data/quickfacts';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon, type IconName } from '../ui/Icons';
import { SectionTitle } from '../ui/SectionTitle';

export function QuickFacts() {
  const ref = useScrollAnimation<HTMLDivElement>('.animate-on-scroll');

  return (
    <section className="bg-light py-20 md:py-24">
      <div className="container" ref={ref}>
        <SectionTitle title="Auf einen Blick" subtitle="Die wichtigsten Fakten für einen schnellen Überblick" kicker="Kurzprofil" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="animate-on-scroll rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm-custom transition-all hover:-translate-y-0.5 hover:shadow-md-custom"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                <Icon name={fact.icon as IconName} width={24} height={24} className="text-primary" />
              </div>
              <div className="mb-1 font-display text-2xl font-semibold text-navy">{fact.value}</div>
              <div className="text-sm text-gray">{fact.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}