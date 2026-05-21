import { PageHeader } from "@/components/page-header";

export const metadata = {
  title: "About | BHCOC"
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Volunteers, neighbors, and educators committed to Black history."
        subtitle="The Black History Committee of Orange County, Inc. has served Central Florida for more than 23 years as a 501(c)(3) nonprofit organization."
      />

      <section className="mx-auto max-w-4xl px-6 py-20 space-y-12">
        <div>
          <h2 className="font-display text-2xl md:text-3xl">Our Mission</h2>
          <p className="mt-4 text-ink/80 text-lg leading-relaxed">
            We are a group of dedicated volunteers, enthusiastic about
            celebrating and educating the public on African American history.
            Through scholarships, partnerships, and community events, we honor
            the past, support the present, and invest in the next generation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-ink/10 p-7 bg-cream">
            <h3 className="font-display text-xl">Our History</h3>
            <p className="mt-3 text-ink/75 leading-relaxed">
              Founded more than two decades ago, BHCOC was created by community
              members who wanted to ensure that the contributions of African
              Americans in Orange County and across Florida were preserved,
              celebrated, and shared.
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 p-7 bg-cream">
            <h3 className="font-display text-xl">Our Reach</h3>
            <p className="mt-3 text-ink/75 leading-relaxed">
              We&apos;ve directed more than <strong>$450,000</strong> to schools,
              colleges, and universities throughout Florida, and awarded more
              than <strong>$450,000</strong> in scholarships to students who
              will become tomorrow&apos;s leaders.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl md:text-3xl">Schools we&apos;ve supported</h2>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-ink/80">
            {[
              "Pineloch Elementary",
              "Olympia High School",
              "Valencia College",
              "University of Central Florida",
              "Florida A&M University",
              "Bethune-Cookman University",
              "Edward Waters College",
              "Florida Memorial University",
              "Rollins College"
            ].map((s) => (
              <li
                key={s}
                className="flex items-center gap-3 rounded-lg border border-ink/10 px-4 py-3"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-gold" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-forest text-cream p-8">
          <h3 className="font-display text-2xl">Our Values</h3>
          <div className="mt-6 grid sm:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-gold font-display text-lg">Legacy</div>
              <p className="mt-2 text-cream/80">
                Honoring the people and stories that built our community.
              </p>
            </div>
            <div>
              <div className="text-gold font-display text-lg">Education</div>
              <p className="mt-2 text-cream/80">
                Funding scholars and teaching history through every program.
              </p>
            </div>
            <div>
              <div className="text-gold font-display text-lg">Service</div>
              <p className="mt-2 text-cream/80">
                Showing up for neighbors through givebacks and outreach.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
