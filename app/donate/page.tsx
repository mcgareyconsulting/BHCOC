import { PageHeader } from "@/components/page-header";
import Link from "next/link";

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
    perks: "Named recognition and lasting impact across multiple programs."
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

      <section className="mx-auto max-w-6xl px-6 py-24">
        {/* Impact strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {[
            { v: "$25", k: "buys storytelling books" },
            { v: "$100", k: "powers a community event" },
            { v: "$500", k: "supports one scholar" }
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-2xl border border-ink/10 bg-paper/50 px-5 py-4"
            >
              <div className="font-display text-2xl text-clay">{s.v}</div>
              <div className="text-sm text-ink/65">{s.k}</div>
            </div>
          ))}
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-4 gap-5">
          {tiers.map((t) => (
            <article
              key={t.amount}
              className={`relative rounded-3xl p-7 border transition ${
                t.featured
                  ? "bg-ink text-cream border-ink shadow-lift md:scale-[1.04]"
                  : "bg-cream border-ink/10 card-hover"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-gold text-ink text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full">
                  ★ Most loved
                </span>
              )}
              <div
                className={`text-xs uppercase tracking-[0.25em] ${
                  t.featured ? "text-gold" : "text-clay"
                }`}
              >
                {t.name}
              </div>
              <div className="mt-3 font-display text-4xl">{t.amount}</div>
              <div
                className={`mt-3 h-px ${
                  t.featured ? "bg-cream/15" : "bg-ink/10"
                }`}
              />
              <p
                className={`mt-4 text-sm leading-relaxed ${
                  t.featured ? "text-cream/85" : "text-ink/75"
                }`}
              >
                {t.perks}
              </p>
              <button
                disabled
                className={`mt-6 w-full rounded-full py-2.5 text-sm font-medium transition ${
                  t.featured
                    ? "bg-gold text-ink hover:bg-gold-light"
                    : "bg-ink text-cream hover:bg-clay"
                }`}
              >
                Give {t.amount}
              </button>
            </article>
          ))}
        </div>

        {/* Other ways + tax */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-ink/10 p-8 bg-cream">
            <span className="eyebrow text-clay">More ways to give</span>
            <h3 className="mt-3 font-display text-2xl">Other ways to give</h3>
            <ul className="mt-5 space-y-3 text-ink/80">
              {[
                "Mail a check, payable to BHCOC, Inc.",
                "Sponsor a scholarship or named award",
                "Become an event sponsor or underwriter",
                "Donate stock, in-kind goods, or planned gifts"
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-clay text-cream p-8 relative overflow-hidden">
            <div
              className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full opacity-40"
              style={{
                background:
                  "radial-gradient(circle, #C9A14A 0%, transparent 70%)"
              }}
              aria-hidden
            />
            <div className="relative">
              <span className="eyebrow text-gold">501(c)(3)</span>
              <h3 className="mt-3 font-display text-2xl">Tax-deductible</h3>
              <p className="mt-3 text-cream/90 leading-relaxed">
                BHCOC is a registered 501(c)(3) nonprofit organization. Your
                contribution may be tax-deductible to the fullest extent allowed
                by law. We&apos;ll send a receipt for every gift.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream text-clay px-6 py-3 font-medium hover:bg-gold hover:text-ink transition"
              >
                Request giving info →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
