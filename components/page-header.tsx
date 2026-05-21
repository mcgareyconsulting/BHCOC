import { Ornament } from "@/components/ornament";

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
    <section className="relative isolate overflow-hidden bg-ink text-cream grain">
      <div
        className="absolute inset-0 -z-10 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 10% 20%, rgba(201,161,74,0.28) 0%, transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(160,48,30,0.3) 0%, transparent 55%)"
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #FAF6EE 0 2px, transparent 2px 18px)"
        }}
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 reveal">
        {eyebrow && <span className="eyebrow text-gold">{eyebrow}</span>}
        <h1 className="mt-5 font-display text-5xl md:text-6xl leading-[1.02] max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-cream/75 text-lg md:text-xl leading-relaxed">
            {subtitle}
          </p>
        )}
        <Ornament className="mt-8" color="#C9A14A" />
      </div>
      <svg
        className="absolute -bottom-px left-0 right-0 w-full h-10 text-cream"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0,48 C480,0 960,0 1440,48 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
