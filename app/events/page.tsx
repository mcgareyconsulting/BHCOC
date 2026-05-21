import { PageHeader } from "@/components/page-header";
import Link from "next/link";

export const metadata = { title: "Events | BHCOC" };

const upcoming = [
  {
    title: "Black History Month Gala",
    date: "February 2026",
    location: "Rosen Centre Orlando · 9840 International Dr, Orlando, FL",
    description:
      "Our signature annual evening of celebration, scholarship awards, and tribute to Central Florida changemakers."
  },
  {
    title: "Festival on the Lawn",
    date: "Spring 2026",
    location: "Downtown Orlando",
    description:
      "A free community festival featuring music, food, art, and storytelling — celebrating African American heritage for all ages."
  },
  {
    title: "Scholarship Awards Ceremony",
    date: "Summer 2026",
    location: "TBA · Orange County",
    description:
      "Honoring this year's scholarship recipients as they head to HBCUs and Florida universities."
  }
];

const ongoing = [
  {
    title: "Head Start Storytelling Hours",
    description:
      "Volunteer readers visit local Head Start centers to share stories celebrating Black history and culture."
  },
  {
    title: "Christmas Givebacks",
    description:
      "Annual outreach providing gifts and support to citizens with kidney disease throughout the holiday season."
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

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-2xl md:text-3xl">Upcoming</h2>

        <div className="mt-8 grid gap-6">
          {upcoming.map((e) => (
            <article
              key={e.title}
              className="rounded-2xl border border-ink/10 bg-cream p-6 md:p-8 grid md:grid-cols-[200px_1fr] gap-6 items-start hover:shadow-md transition"
            >
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-clay">
                  Save the date
                </div>
                <div className="mt-2 font-display text-2xl">{e.date}</div>
              </div>
              <div>
                <h3 className="font-display text-2xl">{e.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{e.location}</p>
                <p className="mt-3 text-ink/80 leading-relaxed">
                  {e.description}
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-block text-sm font-medium gold-underline"
                >
                  Inquire about tickets →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <h2 className="mt-20 font-display text-2xl md:text-3xl">
          Year-round programs
        </h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {ongoing.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl bg-forest text-cream p-7"
            >
              <h3 className="font-display text-xl text-gold">{p.title}</h3>
              <p className="mt-3 text-cream/85 leading-relaxed">{p.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-ink/10 p-6 md:p-8 bg-cream">
          <p className="text-sm text-ink/70">
            <strong>Group & corporate packages:</strong> contact Vernard Batson at{" "}
            <a href="tel:+14076681865" className="gold-underline">
              (407) 668-1865
            </a>{" "}
            for sponsorship and table reservations.
          </p>
        </div>
      </section>
    </>
  );
}
