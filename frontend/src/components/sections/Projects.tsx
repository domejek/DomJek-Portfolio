import { useEffect, useState } from 'react';
import { fetchProjects } from '../../lib/api';
import type { Project } from '../../types';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../ui/Icons';
import { SectionTitle } from '../ui/SectionTitle';
import { TechTags } from '../ui/TechTags';

const fallbackProjects: Project[] = [
  {
    name: 'DomJek-Portfolio',
    slug: 'domjek-portfolio',
    description: 'Diese Portfolio-Webseite läuft als dockerisierte Microservices mit React/Nginx-Frontend und Node.js-API',
    technologies: ['JavaScript', 'React', 'Node.js', 'Docker', 'Nginx', 'Cloudflare Workers'],
    github: 'https://github.com/domejek/DomJek-Portfolio',
  },
  {
    name: 'Absences Grafana Kimai',
    slug: 'absences-grafana-kimai',
    description: 'Visualisierung von Abwesenheiten aus dem Zeiterfassungstool Kimai',
    technologies: ['PHP', 'Grafana', 'Kimai', 'API'],
    github: 'https://github.com/domejek/Absences_Grafana_Kimai',
  },
  {
    name: 'DomJek-LaravelREST',
    slug: 'domjek-laravelrest',
    description: 'RESTful API mit Laravel – vollständiges CRUD mit Authentifizierung',
    technologies: ['PHP', 'Laravel', 'REST API', 'MySQL'],
    github: 'https://github.com/domejek/DomJek-LaravelREST',
  },
  {
    name: 'Energiemarktdarstellung',
    slug: 'energiemarktdarstellung',
    description: 'Darstellung der aFFR & FCR Werte vom deutschen Energiemarkt',
    technologies: ['Python', 'Pandas', 'Selenium', 'Plotly'],
    github: 'https://github.com/domejek/DomJek-Energiemarktdarstellung',
  },
];

export function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useScrollAnimation<HTMLDivElement>('.animate-on-scroll', [loading]);

  useEffect(() => {
    fetchProjects()
      .then((res) => {
        setProjects(
          res.projects.map((p) => ({
            ...p,
            slug: p.slug ?? fallbackProjects.find((f) => f.name === p.name)?.slug,
          })),
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'API-Fehler');
        setLoading(false);
      });
  }, []);

  const display = loading ? fallbackProjects : projects;

  return (
    <section id="projects" className="bg-light py-20 md:py-24">
      <div className="container" ref={ref}>
        <SectionTitle title="Projekte" subtitle="Ausgewählte Projekte aus Beruf und Freizeit" />
        {error && !loading && (
          <p className="mb-4 text-center text-sm text-gray">Hinweis: {error} – zeige lokale Daten.</p>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {display.map((project) => (
            <div
              key={project.name}
              className="animate-on-scroll flex flex-col overflow-hidden rounded-xl border border-black/5 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative bg-gradient-to-br from-navy to-navy-light p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                  <Icon name="code" width={24} height={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary-light to-accent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-5 flex-1 leading-relaxed text-gray">{project.description}</p>
                <TechTags tags={project.technologies} />
                <div className="mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener nofollow"
                    className="group flex items-center justify-center gap-2 font-semibold text-primary no-underline transition-colors hover:text-primary-dark"
                  >
                    <Icon name="github" width={16} height={16} />
                    Auf GitHub ansehen
                    <Icon name="chevron-right" width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}