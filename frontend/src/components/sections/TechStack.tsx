import { useEffect, useState } from 'react';
import { fallbackTechStack, fetchTechStack } from '../../lib/api';
import type { TechItem } from '../../types';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../ui/Icons';
import { SectionTitle } from '../ui/SectionTitle';
import { SkillDots } from '../ui/SkillDots';

const fallbackLevels: Record<string, number> = {
  'PHP & Laravel': 5,
  Python: 4,
  'JavaScript & NodeJS': 4,
  'React & HTML/CSS': 4,
  PostgreSQL: 5,
  'InfluxDB & MySQL': 4,
  'Grafana & Prometheus': 5,
  'Docker & Portainer': 4,
  'Linux/Ubuntu & Apache/Nginx': 4,
  'Kirby CMS': 3,
  'Git & REST API': 4,
};

export function TechStack() {
  const [items, setItems] = useState<TechItem[]>(fallbackTechStack);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useScrollAnimation<HTMLDivElement>('.animate-on-scroll', [loading]);

  useEffect(() => {
    fetchTechStack()
      .then((res) => {
        const withLevels = res.techStack.map((item) => ({
          ...item,
          level: item.level ?? fallbackLevels[item.name] ?? 4,
        }));
        setItems(withLevels);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'API-Fehler');
        setLoading(false);
      });
  }, []);

  const displayItems = loading
    ? fallbackTechStack.map((item) => ({ ...item, level: item.level ?? fallbackLevels[item.name] ?? 4 }))
    : items;

  return (
    <section id="tech" className="bg-navy py-20 text-white md:py-24">
      <div className="container" ref={ref}>
        <SectionTitle
          title="Tech Stack"
          subtitle="Technologien und Tools, die ich täglich einsetze"
          dark
        />
        {error && !loading && (
          <p className="mb-4 text-center text-sm text-gray-light">Hinweis: {error} – zeige lokale Daten.</p>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((item) => (
            <div
              key={item.name}
              className="animate-on-scroll rounded-xl border border-white/8 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary-light hover:bg-white/10 hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)]"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-light to-accent">
                  <Icon name="code" width={22} height={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg text-white">{item.name}</h3>
                  <div className="text-[0.8rem] font-semibold tracking-wide text-accent uppercase">
                    {item.category}
                  </div>
                </div>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-white/70">{item.description}</p>
              {item.level != null && <SkillDots level={item.level} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}