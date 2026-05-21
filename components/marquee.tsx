export function Marquee({ items }: { items: string[] }) {
  // duplicate items so the loop is seamless
  const all = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-6">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-cream to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-cream to-transparent z-10" />
      <div className="marquee">
        {all.map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-6 text-ink/70 font-display text-xl whitespace-nowrap"
          >
            <span>{s}</span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
