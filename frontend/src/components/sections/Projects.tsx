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
        <SectionTitle title="Ausgewählte Projekte aus Beruf und Freizeit" kicker="Arbeit" />
        {error && !loading && (
          <p className="mb-4 text-sm text-gray">Hinweis: {error} – zeige lokale Daten.</p>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {display.map((project) => (
            <div
              key={project.name}
              className="animate-on-scroll group flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm-custom transition-all hover:-translate-y-0.5 hover:border-primary-light/60 hover:shadow-md-custom md:p-7"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <Icon name="code" width={24} height={24} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold leading-snug text-navy">{project.name}</h3>
              </div>
              <p className="mb-5 flex-1 leading-relaxed text-gray">{project.description}</p>
              <TechTags tags={project.technologies} />
              <div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener nofollow"
                  className="group inline-flex items-center gap-2 font-semibold text-primary no-underline transition-colors hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <Icon name="github" width={16} height={16} />
                  Auf GitHub ansehen
                  <Icon name="chevron-right" width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}