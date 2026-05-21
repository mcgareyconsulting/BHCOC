export function PageHeader({
  eyebrow,
  title,
  subtitle
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {eyebrow && (
          <span className="text-xs uppercase tracking-[0.25em] text-gold">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 font-display text-4xl md:text-5xl max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-cream/75 text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
