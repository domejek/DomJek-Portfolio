import { Link, useLocation } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

export function NotFound() {
  const { pathname } = useLocation();

  usePageMeta({
    title: 'Seite nicht gefunden – Dominik Jeksties',
    description: 'Die aufgerufene Seite existiert nicht oder wurde verschoben.',
    path: pathname,
    noindex: true,
  });

  return (
    <div className="container py-20 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">404</p>
      <h1 className="mb-4 font-display text-3xl font-semibold text-navy md:text-4xl">
        Seite nicht gefunden
      </h1>
      <p className="mb-6 text-gray">
        Die aufgerufene Seite existiert nicht oder wurde verschoben.
      </p>
      <Link to="/" className="font-semibold text-primary no-underline hover:text-primary-dark">
        Zur Startseite
      </Link>
    </div>
  );
}
