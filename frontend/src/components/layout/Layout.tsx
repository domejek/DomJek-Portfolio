import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useStructuredData } from '../../hooks/useStructuredData';
import { buildPersonSchema, buildWebSiteSchema } from '../../lib/structuredData';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  useStructuredData([
    { id: 'person', data: buildPersonSchema() },
    { id: 'website', data: buildWebSiteSchema() },
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollRestoration />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}