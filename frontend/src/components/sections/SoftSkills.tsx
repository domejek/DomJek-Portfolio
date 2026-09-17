import { softSkills } from '../../data/skills';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon, type IconName } from '../ui/Icons';
import { SectionTitle } from '../ui/SectionTitle';

export function SoftSkills() {
  const ref = useScrollAnimation<HTMLDivElement>('.animate-on-scroll');

  return (
    <section id="skills" className="py-20 md:py-24">
      <div className="container" ref={ref}>
        <SectionTitle title="Arbeitsweise & Soft Skills" subtitle="Was mich als Teamkollegen ausmacht" kicker="Persönlichkeit" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {softSkills.map((skill) => (
            <div
              key={skill.title}
              className="animate-on-scroll rounded-lg border border-slate-200 bg-white p-8 shadow-sm-custom transition-colors hover:border-primary-light/60"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                <Icon name={skill.icon as IconName} width={24} height={24} className="text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-navy">{skill.title}</h3>
              <p className="text-sm leading-relaxed text-gray">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}