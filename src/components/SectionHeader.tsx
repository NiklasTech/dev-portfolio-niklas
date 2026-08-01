interface SectionHeaderProps {
  label: string;
  title: string;
}

export function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <div className="mb-16">
      <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">
        {label}
      </p>
      <h2 className="font-display text-4xl md:text-5xl text-ink">{title}</h2>
      <div className="mt-10 h-px bg-line" />
    </div>
  );
}
