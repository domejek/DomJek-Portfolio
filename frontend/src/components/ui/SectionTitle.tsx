interface SectionTitleProps {
  title: string;
  subtitle?: string;
  kicker?: string;
}

export function SectionTitle({ title, subtitle, kicker }: SectionTitleProps) {
  return (
    <div className="mb-10">
      {kicker && (
        <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {kicker}
        </span>
      )}
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-navy md:text-4xl">
        {title}
      </h2>
      <div className="mt-4 h-px w-12 bg-primary" />
      {subtitle && (
        <p className="mt-4 max-w-[620px] text-lg leading-relaxed text-gray">{subtitle}</p>
      )}
    </div>
  );
}