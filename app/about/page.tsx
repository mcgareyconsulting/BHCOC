import { PageHeader } from "@/components/page-header";
import { Ornament } from "@/components/ornament";

export const metadata = {
  title: "About | BHCOC"
};

const timeline = [
  {
    year: "2002",
    title: "BHCOC is founded",
    body: "A small group of educators and community leaders in Orange County come together to celebrate, preserve, and teach African American history."
  },
  {
    year: "2010s",
    title: "Festival on the Lawn grows",
    body: "Annual Black History Month programming expands into a multi-day community festival serving thousands of Central Floridians."
  },
  {
    year: "Today",
    title: "$450K+ in scholarships",
    body: "We've awarded over $450,000 in student scholarships and contributed more than $450,000 to local schools and universities."
  }
];

const schools = [
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

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Volunteers, neighbors, and educators committed to Black history."
        subtitle="The Black History Committee of Orange County, Inc. has served Central Florida for more than 23 years as a 501(c)(3) nonprofit organization."
      />

      {/* Mission */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <div>
            <span className="eyebrow text-clay">Our Mission</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl leading-tight">
              Honoring the past. Investing in the future.
            </h2>
            <Ornament className="mt-5" />
          </div>
          <p className="text-ink/80 text-lg leading-relaxed">
            We are a group of dedicated volunteers, enthusiastic about
            celebrating and educating the public on African American history.
            Through scholarships, partnerships, and community events, we honor
            the past, support the present, and invest in the next generation
            of leaders.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-paper/60 border-y border-ink/10">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="text-center mb-14">
            <span className="eyebrow text-clay">Our Journey</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              Two decades of service.
            </h2>
          </div>
          <ol className="relative grid md:grid-cols-3 gap-8">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden />
            {timeline.map((t, i) => (
              <li key={t.year} className="relative">
                <div className="flex md:block items-start gap-4">
                  <div className="relative z-10 inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-ink text-gold font-display text-lg md:text-xl ring-4 ring-cream">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="md:mt-6">
                    <div className="font-display text-2xl text-clay">
                      {t.year}
                    </div>
                    <div className="mt-1 font-display text-lg">{t.title}</div>
                    <p className="mt-2 text-ink/75 text-sm leading-relaxed">
                      {t.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Schools we've supported */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="eyebrow text-clay">Partners</span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl">
            Schools & universities we&apos;ve supported.
          </h2>
        </div>
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {schools.map((s, i) => (
            <li
              key={s}
              className="card-hover flex items-center gap-4 rounded-2xl border border-ink/10 bg-cream px-5 py-4"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold-dark font-display text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-medium text-ink/85">{s}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="rounded-[2rem] bg-forest text-cream p-10 md:p-14 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, #C9A14A 0%, transparent 40%)"
            }}
            aria-hidden
          />
          <div className="relative">
            <span className="eyebrow text-gold">Our Values</span>
            <h3 className="mt-4 font-display text-3xl md:text-4xl">
              What guides our work.
            </h3>
            <div className="mt-10 grid sm:grid-cols-3 gap-8">
              {[
                {
                  k: "Legacy",
                  v: "Honoring the people and stories that built our community."
                },
                {
                  k: "Education",
                  v: "Funding scholars and teaching history through every program."
                },
                {
                  k: "Service",
                  v: "Showing up for neighbors through givebacks and outreach."
                }
              ].map((val) => (
                <div key={val.k}>
                  <div className="text-gold font-display text-2xl">{val.k}</div>
                  <div className="mt-2 h-px w-10 bg-gold/50" />
                  <p className="mt-3 text-cream/85 leading-relaxed">{val.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
