interface SectionTitleProps {
  title: string;
  subtitle?: string;
  dark?: boolean;
}

export function SectionTitle({ title, subtitle, dark }: SectionTitleProps) {
  return (
    <div>
      <h2
        className={`text-center text-3xl font-bold tracking-tight md:text-4xl ${
          dark ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
        <span className="mx-auto mt-3 block h-[3px] w-[50px] rounded-full bg-gradient-to-r from-primary-light to-accent" />
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-4 mb-12 max-w-[600px] text-center text-lg ${
            dark ? 'text-gray-light' : 'text-gray'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}