interface SkillDotsProps {
  level: number;
  total?: number;
}

export function SkillDots({ level, total = 5 }: SkillDotsProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${
            i < level ? 'bg-primary' : 'bg-slate-200'
          }`}
        />
      ))}
    </div>
  );
}