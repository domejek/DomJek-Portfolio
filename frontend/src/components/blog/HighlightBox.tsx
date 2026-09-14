export function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-r-lg border-l-4 border-primary-light bg-light p-5">
      <div className="text-base leading-relaxed text-slate">{children}</div>
    </div>
  );
}