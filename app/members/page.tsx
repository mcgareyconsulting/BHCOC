import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Members | BHCOC" };

const members = [
  { name: "Founding Members", role: "Est. 2002" },
  { name: "Board of Directors", role: "Governance & Strategy" },
  { name: "Scholarship Committee", role: "Student Awards" },
  { name: "Events Committee", role: "Community Programming" },
  { name: "Education Outreach", role: "School Partnerships" },
  { name: "Volunteer Corps", role: "Community Service" }
];

export default function MembersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Members"
        title="The people behind the mission."
        subtitle="BHCOC is powered by a community of volunteers — leaders, teachers, students, and neighbors — who give their time to make our work possible."
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m) => (
            <article
              key={m.name}
              className="group rounded-2xl border border-ink/10 bg-cream p-7 hover:-translate-y-1 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-ink text-gold font-display text-xl flex items-center justify-center">
                  {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-display text-lg">{m.name}</h3>
                  <p className="text-sm text-ink/60">{m.role}</p>
                </div>
              </div>
              <div className="mt-5 h-1 w-12 rounded-full bg-gold" />
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-ink text-cream p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl">Become a member</h3>
            <p className="mt-2 text-cream/75 max-w-lg">
              Whether you want to volunteer at events, join a committee, or
              simply lend your skills, we welcome anyone passionate about
              celebrating Black history.
            </p>
          </div>
          <a
            href="/contact"
            className="self-start md:self-auto inline-flex items-center rounded-full bg-gold px-6 py-3 text-ink font-medium hover:bg-gold-light transition"
          >
            Get in touch
          </a>
        </div>
      </section>
    </>
  );
}
