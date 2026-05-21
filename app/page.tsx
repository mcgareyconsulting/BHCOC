import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-forest" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #C9A14A 0, transparent 35%), radial-gradient(circle at 80% 60%, #A0301E 0, transparent 40%)"
            }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36 text-cream">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-gold">
            Est. 2002 · Orlando, Florida
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl">
            Celebrating, preserving, and teaching{" "}
            <span className="text-gold">African American history</span> in Central Florida.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream/80">
            The Black History Committee of Orange County is a volunteer-led 501(c)(3)
            nonprofit that funds scholarships, hosts community events, and brings the
            stories of Black history to schools, families, and neighborhoods.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="inline-flex items-center rounded-full bg-gold px-6 py-3 text-ink font-medium hover:bg-gold-light transition"
            >
              See upcoming events
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center rounded-full border border-cream/30 px-6 py-3 text-cream hover:bg-cream hover:text-ink transition"
            >
              Support our work
            </Link>
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="mx-auto max-w-6xl px-6 -mt-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-4 bg-cream border border-ink/10 shadow-sm rounded-2xl p-2">
          {[
            { stat: "$450K+", label: "Donated to schools & universities" },
            { stat: "$450K+", label: "Awarded in student scholarships" },
            { stat: "23+", label: "Years serving Central Florida" }
          ].map((item) => (
            <div
              key={item.label}
              className="p-6 rounded-xl bg-cream hover:bg-gold/5 transition"
            >
              <div className="font-display text-3xl text-clay">{item.stat}</div>
              <div className="mt-1 text-sm text-ink/70">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-6 py-24 grid gap-12 md:grid-cols-2 items-start">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-clay">
            Our Mission
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            A community of volunteers committed to telling the full story.
          </h2>
        </div>
        <div className="text-ink/80 text-lg leading-relaxed space-y-4">
          <p>
            For more than two decades, the Black History Committee of Orange County
            has brought together educators, civic leaders, and neighbors who believe
            that Black history is American history — and that it deserves to be
            celebrated all year long.
          </p>
          <p>
            We award scholarships to the next generation of leaders, partner with
            schools across the state, and host community programs that span
            storytelling, the arts, and remembrance.
          </p>
          <Link
            href="/about"
            className="inline-block mt-2 font-medium gold-underline"
          >
            Learn more about us →
          </Link>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-ink/[0.03] border-y border-ink/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl md:text-4xl max-w-2xl">
            What we do
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Scholarships",
                body:
                  "Annual scholarships for Black and African American students attending HBCUs, Florida colleges, and universities across the state.",
                accent: "bg-gold"
              },
              {
                title: "Community Events",
                body:
                  "From Black History Month galas and festivals on the lawn to storytelling hours at Head Start centers and Christmas Givebacks for citizens with kidney disease.",
                accent: "bg-clay"
              },
              {
                title: "Education Partnerships",
                body:
                  "Direct support and programming for Pineloch Elementary, Olympia High, Valencia College, UCF, FAMU, Bethune-Cookman, Edward Waters, FMU, and Rollins.",
                accent: "bg-forest"
              }
            ].map((p) => (
              <article
                key={p.title}
                className="bg-cream rounded-2xl p-7 border border-ink/10 hover:shadow-md transition"
              >
                <span
                  className={`inline-block h-2 w-10 rounded-full ${p.accent}`}
                  aria-hidden
                />
                <h3 className="mt-4 font-display text-2xl">{p.title}</h3>
                <p className="mt-3 text-ink/75 leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-3xl bg-ink text-cream p-10 md:p-14 relative overflow-hidden">
          <div
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, #C9A14A 0%, transparent 70%)" }}
            aria-hidden
          />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl">
                Help us fund the next scholarship.
              </h2>
              <p className="mt-4 text-cream/80 max-w-md">
                Every gift — large or small — goes directly toward students,
                programs, and preserving the legacy of Central Florida&apos;s Black
                community.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/donate"
                className="inline-flex items-center rounded-full bg-gold px-6 py-3 text-ink font-medium hover:bg-gold-light"
              >
                Donate now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-cream/30 px-6 py-3 hover:bg-cream hover:text-ink transition"
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
