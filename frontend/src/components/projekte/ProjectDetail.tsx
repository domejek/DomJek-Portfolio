import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProjects } from '../../lib/api';
import { getBlogPost } from '../../data/blog';
import type { Project } from '../../types';
import { Icon } from '../ui/Icons';
import { TechTags } from '../ui/TechTags';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects()
      .then((res) => {
        const found = res.projects.find((p) => p.slug === slug || p.name === slug);
        setProject(found ?? null);
      })
      .catch(() => setProject(null));
  }, [slug]);

  const relatedPost = slug ? getBlogPost(slug === 'energiemarktdarstellung' ? 'energiemarkt-visualisierung-python-plotly' : '') : undefined;

  if (!project) {
    return (
      <div className="container py-20 text-center">
        <h1 className="mb-4 font-display text-3xl font-semibold text-navy">Projekt nicht gefunden</h1>
        <Link to="/#projects" className="font-semibold text-primary no-underline hover:text-primary-dark">
          Zurück zu den Projekten
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-light py-12">
        <div className="container mx-auto max-w-[720px]">
          <Link
            to="/#projects"
            className="mb-6 inline-block text-[0.95rem] font-medium text-gray no-underline hover:text-primary-light"
          >
            &larr; Zurück zu den Projekten
          </Link>
          <h1 className="mb-4 font-display text-3xl font-semibold text-navy md:text-4xl">{project.name}</h1>
          <TechTags tags={project.technologies} />
        </div>
      </section>

      <section className="container py-8">
        <div className="mx-auto max-w-[720px]">
          <h2 className="mb-4 mt-8 text-2xl font-bold text-navy">Über das Projekt</h2>
          <p className="mb-6 leading-relaxed text-slate">{project.description}</p>

          <h2 className="mb-4 mt-8 text-2xl font-bold text-navy">Technische Details</h2>
          <ul className="mb-6 ml-6 list-disc leading-relaxed text-slate">
            {project.technologies.map((tech) => (
              <li key={tech} className="mb-2">{tech}</li>
            ))}
          </ul>

          <h2 className="mb-4 mt-8 text-2xl font-bold text-navy">Link</h2>
          <p className="mb-6">
            <a
              href={project.github}
              target="_blank"
              rel="noopener nofollow"
              className="group inline-flex items-center gap-2 font-semibold text-primary no-underline hover:text-primary-dark"
            >
              <Icon name="github" width={16} height={16} />
              {project.github.replace('https://', '')}
              <Icon name="chevron-right" width={16} height={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </p>

          {relatedPost && (
            <>
              <h2 className="mb-4 mt-8 text-2xl font-bold text-navy">Zum Blog-Beitrag</h2>
              <p>
                <Link to={`/blog/${relatedPost.meta.slug}`} className="font-medium text-primary no-underline hover:text-primary-dark">
                  {relatedPost.meta.title}
                </Link>
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}