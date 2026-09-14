import { softSkills } from '../../data/skills';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon, type IconName } from '../ui/Icons';
import { SectionTitle } from '../ui/SectionTitle';

export function SoftSkills() {
  const ref = useScrollAnimation<HTMLDivElement>('.animate-on-scroll');

  return (
    <section id="skills" className="py-20 md:py-24">
      <div className="container" ref={ref}>
        <SectionTitle title="Arbeitsweise & Soft Skills" subtitle="Was mich als Teamkollegen ausmacht" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {softSkills.map((skill) => (
            <div
              key={skill.title}
              className="group relative animate-on-scroll overflow-hidden rounded-xl border border-black/5 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-to-r from-primary-light to-accent transition-transform duration-300 group-hover:scale-x-100" />
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-light/10 to-accent/10">
                <Icon name={skill.icon as IconName} width={28} height={28} className="text-primary" />
              </div>
              <h3 className="mb-2 text-lg text-navy">{skill.title}</h3>
              <p className="text-sm leading-relaxed text-gray">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}