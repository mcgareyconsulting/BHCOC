import { PageHeader } from "@/components/page-header";
import Link from "next/link";

export const metadata = { title: "Members | BHCOC" };

const committees = [
  {
    name: "Board of Directors",
    role: "Governance & Strategy",
    body: "Sets the vision and stewards the organization's mission, finances, and partnerships.",
    accent: "bg-clay"
  },
  {
    name: "Scholarship Committee",
    role: "Student Awards",
    body: "Reviews applications and selects each year's BHCOC scholarship recipients.",
    accent: "bg-gold"
  },
  {
    name: "Events Committee",
    role: "Community Programming",
    body: "Plans and executes the Gala, Festival on the Lawn, and seasonal events.",
    accent: "bg-forest"
  },
  {
    name: "Education Outreach",
    role: "School Partnerships",
    body: "Coordinates with schools and universities to deliver programs and funding.",
    accent: "bg-umber"
  },
  {
    name: "Volunteer Corps",
    role: "Community Service",
    body: "The hands and hearts that make every program and event possible.",
    accent: "bg-clay"
  },
  {
    name: "Founding Members",
    role: "Est. 2002",
    body: "The original visionaries who founded BHCOC more than two decades ago.",
    accent: "bg-gold"
  }
];

export default function MembersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Members"
        title="The people behind the mission."
        subtitle="BHCOC is powered by a community of volunteers — leaders, teachers, students, and neighbors — who give their time to make our work possible."
      />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {committees.map((c) => (
            <article
              key={c.name}
              className="card-hover group relative rounded-3xl border border-ink/10 bg-cream p-7 overflow-hidden"
            >
              <span
                className={`absolute top-0 left-0 h-1 w-full ${c.accent}`}
                aria-hidden
              />
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 rounded-full bg-ink text-gold font-display text-xl flex items-center justify-center">
                  {c.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                  <span className="absolute -bottom-1 -right-1 inline-block h-3 w-3 rounded-full bg-clay ring-2 ring-cream" />
                </div>
                <div>
                  <h3 className="font-display text-lg leading-tight">
                    {c.name}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink/55 mt-1">
                    {c.role}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-ink/75 text-sm leading-relaxed">
                {c.body}
              </p>
              <div className="mt-6 h-px bg-ink/5" />
              <span className="mt-4 inline-flex items-center gap-2 text-xs text-ink/55">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                Currently active
              </span>
            </article>
          ))}
        </div>

        {/* Big CTA */}
        <div className="mt-20 rounded-[2rem] bg-ink text-cream p-10 md:p-14 relative overflow-hidden">
          <div
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,161,74,0.5) 0%, transparent 70%)"
            }}
            aria-hidden
          />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <span className="eyebrow text-gold">Join us</span>
              <h3 className="mt-4 font-display text-3xl md:text-4xl">
                Become a member.
              </h3>
              <p className="mt-4 text-cream/80 text-lg">
                Whether you want to volunteer at events, join a committee, or
                lend your skills, we welcome anyone passionate about
                celebrating Black history.
              </p>
            </div>
            <Link
              href="/contact"
              className="self-start inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-ink font-medium hover:bg-gold-light transition shadow-lift"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
