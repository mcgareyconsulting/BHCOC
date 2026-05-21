import Link from "next/link";
import { Marquee } from "@/components/marquee";
import { Ornament } from "@/components/ornament";

const partnerSchools = [
  "Pineloch Elementary",
  "Olympia High School",
  "Valencia College",
  "University of Central Florida",
  "Florida A&M University",
  "Bethune-Cookman University",
  "Edward Waters College",
  "Florida Memorial University",
  "Rollins College"
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden grain">
        {/* layered background */}
        <div className="absolute inset-0 -z-20 bg-ink" />
        <div
          className="absolute inset-0 -z-10 opacity-90 animate-ken-burns"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 15% 30%, rgba(201,161,74,0.35) 0%, transparent 45%), radial-gradient(ellipse at 85% 75%, rgba(160,48,30,0.4) 0%, transparent 50%), radial-gradient(circle at 60% 10%, rgba(31,61,43,0.5) 0%, transparent 55%)"
          }}
        />
        {/* diagonal stripe overlay */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #FAF6EE 0 2px, transparent 2px 18px)"
          }}
          aria-hidden
        />

        <div className="mx-auto max-w-6xl px-6 pt-28 pb-32 md:pt-40 md:pb-40 text-cream relative">
          <div className="reveal">
            <span className="eyebrow text-gold">
              Est. 2002 · Orlando, Florida
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.98] max-w-4xl">
              Celebrating, preserving,
              <br />
              and teaching{" "}
              <span className="relative inline-block">
                <span className="relative z-10 italic text-gold">
                  African American
                </span>
                <span
                  className="absolute left-0 right-0 bottom-1 h-3 bg-clay/40 -skew-x-6 -z-0"
                  aria-hidden
                />
              </span>{" "}
              history.
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-cream/80 leading-relaxed">
              A volunteer-led 501(c)(3) nonprofit funding scholarships, hosting
              community events, and bringing the stories of Black history to
              schools, families, and neighborhoods across Central Florida.
            </p>
            <div className="mt-12 flex flex-wrap gap-4 items-center">
              <Link
                href="/events"
                className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-ink font-medium hover:bg-gold-light transition shadow-lift"
              >
                See upcoming events
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center gap-3 rounded-full border border-cream/30 px-7 py-3.5 text-cream hover:bg-cream hover:text-ink transition"
              >
                Support our work
              </Link>
            </div>
          </div>

          {/* floating accent card */}
          <div className="hidden lg:block absolute right-8 top-32 w-72 rotate-[3deg] bg-cream text-ink p-5 rounded-2xl shadow-lift border border-gold/30">
            <div className="text-[10px] uppercase tracking-[0.25em] text-clay">
              Save the date
            </div>
            <div className="mt-2 font-display text-2xl leading-tight">
              Black History Month Gala
            </div>
            <div className="mt-2 text-sm text-ink/70">
              February 2026 · Rosen Centre Orlando
            </div>
            <div className="mt-4 h-px bg-ink/10" />
            <div className="mt-3 text-xs text-ink/60">
              Scholarships · Tribute · Community
            </div>
          </div>
        </div>

        {/* curve into next section */}
        <svg
          className="absolute -bottom-px left-0 right-0 w-full h-12 text-cream"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,48 C480,0 960,0 1440,48 Z" fill="currentColor" />
        </svg>
      </section>

      {/* IMPACT STATS */}
      <section className="mx-auto max-w-6xl px-6 -mt-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-4 bg-cream border border-ink/10 shadow-soft rounded-3xl p-3">
          {[
            {
              stat: "$450K+",
              label: "Donated to schools & universities",
              color: "text-clay"
            },
            {
              stat: "$450K+",
              label: "Awarded in student scholarships",
              color: "text-forest"
            },
            {
              stat: "23+",
              label: "Years serving Central Florida",
              color: "text-gold-dark"
            }
          ].map((item) => (
            <div
              key={item.label}
              className="p-7 rounded-2xl hover:bg-paper/60 transition group"
            >
              <div
                className={`font-display text-4xl md:text-5xl ${item.color} group-hover:scale-[1.03] transition origin-left`}
              >
                {item.stat}
              </div>
              <div className="mt-2 text-sm text-ink/70 leading-relaxed">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="mx-auto max-w-6xl px-6 py-28 grid gap-14 md:grid-cols-[1fr_1.3fr] items-start">
        <div>
          <span className="eyebrow text-clay">Our Mission</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
            A community of <em className="text-gold-dark">volunteers</em>{" "}
            committed to telling the full story.
          </h2>
          <Ornament className="mt-6" />
        </div>
        <div className="text-ink/80 text-lg leading-relaxed space-y-5">
          <p className="first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:text-clay first-letter:mr-3 first-letter:float-left first-letter:leading-[0.85]">
            For more than two decades, the Black History Committee of Orange
            County has brought together educators, civic leaders, and neighbors
            who believe that Black history is American history — and that it
            deserves to be celebrated all year long.
          </p>
          <p>
            We award scholarships to the next generation of leaders, partner
            with schools across the state, and host community programs that
            span storytelling, the arts, and remembrance.
          </p>
          <Link
            href="/about"
            className="inline-block mt-3 font-medium gold-underline"
          >
            Learn more about us →
          </Link>
        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <section className="border-y border-ink/10 bg-paper/50">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="text-center text-[11px] uppercase tracking-[0.3em] text-ink/50 pt-4">
            Schools & universities we support
          </div>
          <Marquee items={partnerSchools} />
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <div className="max-w-2xl">
          <span className="eyebrow text-clay">What we do</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
            Programs that fund, teach, and remember.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Scholarships",
              body:
                "Annual scholarships for Black and African American students attending HBCUs, Florida colleges, and universities across the state.",
              accent: "bg-gold",
              num: "01"
            },
            {
              title: "Community Events",
              body:
                "From Black History Month galas and festivals on the lawn to storytelling hours at Head Start centers and Christmas Givebacks.",
              accent: "bg-clay",
              num: "02"
            },
            {
              title: "Education Partnerships",
              body:
                "Direct support and programming with Pineloch Elementary, Olympia High, Valencia, UCF, FAMU, Bethune-Cookman, and more.",
              accent: "bg-forest",
              num: "03"
            }
          ].map((p) => (
            <article
              key={p.title}
              className="card-hover relative bg-cream rounded-3xl p-8 border border-ink/10 overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 font-display text-[7rem] leading-none text-ink/[0.04] select-none">
                {p.num}
              </div>
              <span
                className={`relative inline-block h-2 w-12 rounded-full ${p.accent}`}
                aria-hidden
              />
              <h3 className="relative mt-5 font-display text-2xl">{p.title}</h3>
              <p className="relative mt-3 text-ink/75 leading-relaxed">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* QUOTE / PULL QUOTE */}
      <section className="bg-forest text-cream relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, #C9A14A 0%, transparent 35%)"
          }}
          aria-hidden
        />
        <div className="mx-auto max-w-4xl px-6 py-24 text-center relative">
          <Ornament className="mx-auto" color="#C9A14A" />
          <blockquote className="mt-6 font-display text-2xl md:text-4xl leading-snug italic">
            “Black history is American history — and it deserves to be told,
            taught, and celebrated all year long.”
          </blockquote>
          <Ornament className="mx-auto mt-6" color="#C9A14A" />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <div className="rounded-[2rem] bg-ink text-cream p-10 md:p-16 relative overflow-hidden">
          <div
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,161,74,0.55) 0%, transparent 70%)"
            }}
            aria-hidden
          />
          <div
            className="absolute -left-40 bottom-0 h-80 w-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(160,48,30,0.5) 0%, transparent 70%)"
            }}
            aria-hidden
          />
          <div className="relative grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
            <div>
              <span className="eyebrow text-gold">Get involved</span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
                Help us fund the next scholarship.
              </h2>
              <p className="mt-5 text-cream/80 max-w-md text-lg">
                Every gift — large or small — goes directly toward students,
                programs, and preserving the legacy of Central Florida&apos;s
                Black community.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-ink font-medium hover:bg-gold-light transition shadow-lift"
              >
                Donate now →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-cream/30 px-7 py-3.5 hover:bg-cream hover:text-ink transition"
              >
                Get involved
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
