export function TechTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[0.8rem] font-medium text-slate"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}