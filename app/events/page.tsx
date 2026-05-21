import { PageHeader } from "@/components/page-header";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Events | BHCOC" };

type Event = {
  title: string;
  month: string;
  day: string;
  year: string;
  // ISO date used to determine upcoming vs. past. For ranges, use the END date.
  endDate: string;
  location: string;
  accent: string;
  featured?: boolean;
};

const events: Event[] = [
  {
    title: "Black History Month Proclamation",
    month: "Jan",
    day: "27",
    year: "2026",
    endDate: "2026-01-27",
    location: "Orange County Administration Center",
    accent: "from-clay/30 to-transparent"
  },
  {
    title: "Art Exhibit by Nasanee",
    month: "Feb",
    day: "1 – Mar 1",
    year: "2026",
    endDate: "2026-03-01",
    location: "Orange County Administration Center",
    accent: "from-gold/40 to-transparent"
  },
  {
    title:
      "Storytelling Hour — The BHCOC reads to students of Rosemont Elementary School",
    month: "Feb",
    day: "12",
    year: "2026",
    endDate: "2026-02-12",
    location: "Orlando, FL",
    accent: "from-forest/30 to-transparent"
  },
  {
    title: "Artist Reception",
    month: "Feb",
    day: "13",
    year: "2026",
    endDate: "2026-02-13",
    location: "Orange County Administration Center",
    accent: "from-clay/30 to-transparent"
  },
  {
    title: "31st Annual Black History Month Festival and Lunch on the Lawn",
    month: "Feb",
    day: "20",
    year: "2026",
    endDate: "2026-02-20",
    location: "Orange County Administration Center",
    accent: "from-gold/40 to-transparent"
  },
  {
    title:
      "22nd Black History Scholarship Awards and Juneteenth Celebration Gala",
    month: "Jun",
    day: "27",
    year: "2026",
    endDate: "2026-06-27",
    location: "Rosen Centre Hotel · 9840 International Drive, Orlando, FL 32819",
    accent: "from-clay/30 to-transparent",
    featured: true
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

function FeaturedGalaCard({ event }: { event: Event }) {
  return (
    <article className="relative overflow-hidden rounded-3xl bg-ink text-cream shadow-lift">
      <div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,161,74,0.55) 0%, transparent 70%)"
        }}
        aria-hidden
      />
      <div
        className="absolute -left-32 -bottom-32 h-80 w-80 rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(160,48,30,0.5) 0%, transparent 70%)"
        }}
        aria-hidden
      />

      <div className="relative grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-10 p-5 sm:p-6 md:p-10">
        {/* Left: details */}
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-gold" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-medium">
              Featured · Save the date
            </span>
          </div>

          <h3 className="mt-5 font-display text-2xl sm:text-3xl md:text-4xl leading-tight">
            {event.title}
          </h3>

          <p className="mt-3 text-cream/75 max-w-xl leading-relaxed">
            Join us to celebrate excellence, heritage, and future leaders — an
            unforgettable evening of honor, inspiration, and celebration.
          </p>

          <dl className="mt-7 grid sm:grid-cols-2 gap-5 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-cream/55">
                Date
              </dt>
              <dd className="mt-1 font-medium text-cream">
                Sat, {event.month} {event.day}, {event.year} · 6:00 PM EST
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-cream/55">
                Venue
              </dt>
              <dd className="mt-1 font-medium text-cream">Rosen Centre Hotel</dd>
              <dd className="text-cream/60 text-[13px] leading-snug">
                9840 International Drive, Orlando, FL 32819
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-cream/55">
                Theme
              </dt>
              <dd className="mt-1 font-display text-lg text-gold italic">
                Dreams Do Come True
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-cream/55">
                Ticket
              </dt>
              <dd className="mt-1 font-medium text-cream">
                $100 · price includes tax
              </dd>
            </div>
          </dl>

          {/* Keynote speaker */}
          <div className="mt-8 pt-7 border-t border-cream/15">
            <div className="flex items-center gap-5">
              <div className="relative h-20 w-20 shrink-0 rounded-full overflow-hidden ring-2 ring-gold/60">
                <Image
                  src="/events/erin-jackson.jpeg"
                  alt="Erin Jackson, Olympic gold medalist"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-cream/55">
                  Keynote speaker
                </div>
                <div className="mt-1 font-display text-2xl text-cream">
                  Erin Jackson
                </div>
                <div className="text-sm text-gold">Olympic Gold Medalist</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-ink font-medium hover:bg-gold-light transition shadow-lift"
            >
              Get tickets →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-cream hover:bg-cream hover:text-ink transition"
            >
              Sponsorship & tables
            </Link>
          </div>

          <p className="mt-5 text-xs text-cream/55 italic">
            Formal invitation to follow.
          </p>
        </div>

        {/* Right: flyer */}
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] mx-auto lg:mx-0">
          <div className="relative rotate-[1.5deg] rounded-2xl overflow-hidden shadow-lift ring-1 ring-gold/30">
            <Image
              src="/events/gala-2026-flyer.png"
              alt="Save the Date flyer for the 22nd Black History Scholarship Awards and Juneteenth Celebration Gala"
              width={720}
              height={1080}
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 360px, 90vw"
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function partitionByDate(list: Event[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming: Event[] = [];
  const past: Event[] = [];
  for (const e of list) {
    if (new Date(e.endDate) >= today) upcoming.push(e);
    else past.push(e);
  }
  upcoming.sort((a, b) => a.endDate.localeCompare(b.endDate));
  past.sort((a, b) => b.endDate.localeCompare(a.endDate));
  return { upcoming, past };
}

export default function EventsPage() {
  const { upcoming, past } = partitionByDate(events);

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Gather, celebrate, give back."
        subtitle="Our calendar runs all year — from headline galas to quiet, meaningful service in our neighborhoods."
      />

      {/* Upcoming */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-display text-3xl md:text-4xl">Upcoming</h2>
          <span className="text-sm text-ink/55">Save the dates</span>
        </div>

        {upcoming.length === 0 ? (
          <p className="text-ink/60">
            No upcoming events on the calendar right now — check back soon.
          </p>
        ) : (
          <div className="grid gap-6">
            {upcoming.map((e) =>
              e.featured ? (
                <FeaturedGalaCard key={e.title} event={e} />
              ) : (
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
                    <p className="mt-2 text-sm text-ink/55 flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                      {e.location}
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="self-start md:self-center inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-cream text-sm hover:bg-clay transition whitespace-nowrap"
                  >
                    Inquire →
                  </Link>
                </article>
              )
            )}
          </div>
        )}

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

      {/* Past events */}
      {past.length > 0 && (
        <section className="bg-paper/60 border-y border-ink/10">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-display text-3xl md:text-4xl">Past events</h2>
              <span className="text-sm text-ink/55">Looking back</span>
            </div>

            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {past.map((e) => (
                <li
                  key={e.title}
                  className="grid md:grid-cols-[140px_1fr_auto] gap-2 md:gap-8 py-5 items-baseline"
                >
                  <div className="text-sm font-medium text-ink/70">
                    {e.month} {e.day}, {e.year}
                  </div>
                  <div className="font-display text-lg md:text-xl leading-snug text-ink/85">
                    {e.title}
                  </div>
                  <div className="text-sm text-ink/55 md:text-right">
                    {e.location}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Year-round programs */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
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
