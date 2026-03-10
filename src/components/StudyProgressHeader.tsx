"use client";

interface StudyProgressHeaderProps {
  title: string;
  current: number;
  total: number;
  label?: string;
}

export default function StudyProgressHeader({
  title,
  current,
  total,
  label = "cards",
}: StudyProgressHeaderProps) {
  const progress = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;

  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold text-accent-light">{title}</h2>
      <p className="text-white/40 text-sm">
        {current} / {total} {label}
      </p>
      <div className="w-48 h-1.5 bg-white/5 rounded-full mt-2 mx-auto overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
