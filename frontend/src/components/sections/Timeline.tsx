import { timeline } from '../../data/timeline';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { TechTags } from '../ui/TechTags';
import { SectionTitle } from '../ui/SectionTitle';

export function Timeline() {
  const ref = useScrollAnimation<HTMLDivElement>('.animate-on-scroll');

  return (
    <section id="timeline" className="py-20 md:py-24">
      <div className="container" ref={ref}>
        <SectionTitle title="Meine berufliche Entwicklung und Meilensteine" kicker="Werdegang" />
        <div className="relative border-l-2 border-primary/15 pl-8 md:pl-12">
          {timeline.map((entry) => (
            <div key={`${entry.date}-${entry.title}`} className="relative mb-10 last:mb-0">
              <div className="absolute top-1 -left-[37px] h-4 w-4 rounded-full border-[3px] border-primary bg-white md:-left-[49px]" />
              <div className="animate-on-scroll rounded-lg border border-slate-200 bg-white p-6 shadow-sm-custom transition-shadow hover:shadow-md-custom md:p-7">
                <div className="mb-1 text-sm font-semibold text-primary-light">{entry.date}</div>
                <div className="mb-1 text-xl font-bold text-navy">{entry.title}</div>
                <div className="mb-4 font-medium text-gray">{entry.company}</div>
                {entry.descriptions.map((desc, i) => (
                  <p key={i} className={`mb-2 leading-relaxed text-gray ${i > 0 ? 'mt-2' : ''}`}>
                    {desc}
                  </p>
                ))}
                {entry.techTags && <TechTags tags={entry.techTags} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}