import { PageHeader } from "@/components/page-header";
import Link from "next/link";

export const metadata = { title: "Events | BHCOC" };

const upcoming = [
  {
    title: "Black History Month Gala",
    month: "Feb",
    day: "TBD",
    year: "2026",
    location: "Rosen Centre Orlando · 9840 International Dr",
    description:
      "Our signature annual evening of celebration, scholarship awards, and tribute to Central Florida changemakers.",
    accent: "from-clay/30 to-transparent"
  },
  {
    title: "Festival on the Lawn",
    month: "Spr",
    day: "—",
    year: "2026",
    location: "Downtown Orlando",
    description:
      "A free community festival featuring music, food, art, and storytelling — celebrating African American heritage for all ages.",
    accent: "from-forest/30 to-transparent"
  },
  {
    title: "Scholarship Awards Ceremony",
    month: "Sum",
    day: "—",
    year: "2026",
    location: "TBA · Orange County",
    description:
      "Honoring this year's scholarship recipients as they head to HBCUs and Florida universities.",
    accent: "from-gold/40 to-transparent"
  }
];

const ongoing = [
  {
    title: "Head Start Storytelling Hours",
    description:
      "Volunteer readers visit local Head Start centers to share stories celebrating Black history and culture.",
    icon: "📖"
  },
  {
    title: "Christmas Givebacks",
    description:
      "Annual outreach providing gifts and support to citizens with kidney disease throughout the holiday season.",
    icon: "🎁"
  }
];

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Gather, celebrate, give back."
        subtitle="Our calendar runs all year — from headline galas to quiet, meaningful service in our neighborhoods."
      />

      {/* Upcoming */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-display text-3xl md:text-4xl">Upcoming</h2>
          <span className="text-sm text-ink/55">Save the dates</span>
        </div>

        <div className="grid gap-6">
          {upcoming.map((e) => (
            <article
              key={e.title}
              className={`card-hover relative rounded-3xl border border-ink/10 bg-gradient-to-br ${e.accent} bg-cream p-6 md:p-8 grid md:grid-cols-[160px_1fr_auto] gap-6 items-center`}
            >
              {/* Date block */}
              <div className="flex md:flex-col items-center md:items-start gap-4">
                <div className="bg-ink text-cream rounded-2xl px-5 py-4 text-center md:w-full">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-gold">
                    {e.month}
                  </div>
                  <div className="font-display text-3xl mt-1">{e.day}</div>
                  <div className="text-xs text-cream/60 mt-0.5">{e.year}</div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-2xl md:text-3xl leading-tight">
                  {e.title}
                </h3>
                <p className="mt-1 text-sm text-ink/55 flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                  {e.location}
                </p>
                <p className="mt-4 text-ink/80 leading-relaxed max-w-2xl">
                  {e.description}
                </p>
              </div>

              <Link
                href="/contact"
                className="self-start md:self-center inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-cream text-sm hover:bg-clay transition whitespace-nowrap"
              >
                Inquire →
              </Link>
            </article>
          ))}
        </div>

        {/* Sponsor banner */}
        <div className="mt-16 rounded-3xl border border-gold/30 bg-gold/[0.08] p-7 md:p-9 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <span className="eyebrow text-clay">Group & corporate</span>
            <h3 className="mt-3 font-display text-2xl">Sponsorships & tables</h3>
            <p className="mt-2 text-ink/75 max-w-xl">
              For sponsorship and table reservations, contact{" "}
              <strong>Vernard Batson</strong>.
            </p>
          </div>
          <a
            href="tel:+14076681865"
            className="self-start md:self-auto inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-cream font-display text-xl"
          >
            (407) 668-1865
          </a>
        </div>
      </section>

      {/* Year-round programs */}
      <section className="bg-paper/60 border-y border-ink/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="font-display text-3xl md:text-4xl">
            Year-round programs
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {ongoing.map((p) => (
              <article
                key={p.title}
                className="card-hover relative rounded-3xl bg-forest text-cream p-8 overflow-hidden"
              >
                <div
                  className="absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-30"
                  style={{
                    background:
                      "radial-gradient(circle, #C9A14A 0%, transparent 70%)"
                  }}
                  aria-hidden
                />
                <div className="relative">
                  <div className="text-3xl">{p.icon}</div>
                  <h3 className="mt-4 font-display text-2xl text-gold">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-cream/85 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
