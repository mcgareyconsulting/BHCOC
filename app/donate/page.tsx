import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Donate | BHCOC" };

const tiers = [
  {
    amount: "$25",
    name: "Storyteller",
    perks: "Funds books and supplies for Head Start storytelling sessions."
  },
  {
    amount: "$100",
    name: "Friend",
    perks: "Supports community events and outreach throughout the year."
  },
  {
    amount: "$500",
    name: "Patron",
    perks: "Helps fund a student scholarship for an HBCU or Florida university.",
    featured: true
  },
  {
    amount: "$1,000+",
    name: "Legacy",
    perks: "Named recognition and impact across multiple programs."
  }
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Support BHCOC"
        title="Your gift powers scholarships, programs, and remembrance."
        subtitle="The Black History Committee of Orange County is a 501(c)(3) nonprofit. Every dollar is tax-deductible and goes directly toward our mission."
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid md:grid-cols-4 gap-5">
          {tiers.map((t) => (
            <article
              key={t.amount}
              className={`rounded-2xl p-6 border transition ${
                t.featured
                  ? "bg-ink text-cream border-ink shadow-xl scale-[1.02]"
                  : "bg-cream border-ink/10 hover:shadow-md"
              }`}
            >
              <div
                className={`text-xs uppercase tracking-[0.2em] ${
                  t.featured ? "text-gold" : "text-clay"
                }`}
              >
                {t.name}
              </div>
              <div className="mt-2 font-display text-3xl">{t.amount}</div>
              <p
                className={`mt-4 text-sm leading-relaxed ${
                  t.featured ? "text-cream/85" : "text-ink/70"
                }`}
              >
                {t.perks}
              </p>
              <button
                disabled
                className={`mt-6 w-full rounded-full py-2 text-sm font-medium ${
                  t.featured
                    ? "bg-gold text-ink hover:bg-gold-light"
                    : "bg-ink text-cream hover:bg-clay"
                } transition`}
              >
                Give {t.amount}
              </button>
            </article>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-ink/10 p-7 bg-cream">
            <h3 className="font-display text-2xl">Other ways to give</h3>
            <ul className="mt-4 space-y-3 text-ink/80">
              <li>· Mail a check, payable to <em>Black History Committee of Orange County, Inc.</em></li>
              <li>· Sponsor a scholarship or named award</li>
              <li>· Become an event sponsor or underwriter</li>
              <li>· Donate stock, in-kind goods, or planned gifts</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-clay text-cream p-7">
            <h3 className="font-display text-2xl">Tax-deductible</h3>
            <p className="mt-3 text-cream/90 leading-relaxed">
              BHCOC is a registered 501(c)(3) nonprofit organization. Your
              contribution may be tax-deductible to the fullest extent allowed
              by law. We&apos;ll send a receipt for every gift.
            </p>
            <a
              href="/contact"
              className="mt-5 inline-flex items-center rounded-full bg-cream text-clay px-5 py-2 font-medium hover:bg-gold transition"
            >
              Request giving info
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
