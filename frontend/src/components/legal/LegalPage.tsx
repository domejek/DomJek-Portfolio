import type { ReactNode } from 'react';

interface LegalPageProps {
  title: string;
  updatedAt: string;
  children: ReactNode;
}

export function LegalPage({ title, updatedAt, children }: LegalPageProps) {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-[720px]">
        <h1 className="mb-2 font-display text-3xl font-semibold leading-tight text-navy md:text-4xl">
          {title}
        </h1>
        <p className="mb-10 text-sm text-gray">Stand: {updatedAt}</p>
        <div className="space-y-10 text-slate">{children}</div>
      </div>
    </div>
  );
}

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section>
      <h2 className="mb-3 font-display text-xl font-semibold text-navy">{title}</h2>
      <div className="space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}
