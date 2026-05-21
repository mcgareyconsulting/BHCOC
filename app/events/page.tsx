import { PageHeader } from "@/components/page-header";
import Link from "next/link";

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
    accent: "from-clay/30 to-transparent"
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
      <section className="mx-auto max-w-6xl px-6 py-24">
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
            ))}
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
          <div className="mx-auto max-w-6xl px-6 py-24">
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
