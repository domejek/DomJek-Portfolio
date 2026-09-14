import { quickFacts } from '../../data/quickfacts';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon, type IconName } from '../ui/Icons';
import { SectionTitle } from '../ui/SectionTitle';

export function QuickFacts() {
  const ref = useScrollAnimation<HTMLDivElement>('.animate-on-scroll');

  return (
    <section className="bg-light py-20 md:py-24">
      <div className="container" ref={ref}>
        <SectionTitle title="Auf einen Blick" subtitle="Die wichtigsten Fakten für einen schnellen Überblick" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="animate-on-scroll rounded-xl border border-black/5 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-light/10 to-accent/10">
                <Icon name={fact.icon as IconName} width={26} height={26} className="text-primary" />
              </div>
              <div className="mb-1 text-xl font-bold text-navy">{fact.value}</div>
              <div className="text-sm text-gray">{fact.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}