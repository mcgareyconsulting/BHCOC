import { PageHeader } from "@/components/page-header";
import Link from "next/link";

export const metadata = { title: "Donate | BHCOC" };

const PAYPAL_BUSINESS = "bhcocinc@gmail.com";
const EVENT_NAME =
  "22nd Black History Scholarship Awards & Juneteenth Celebration Gala";
const TICKET_PRICE = 100;

const ticketUrl = `https://www.paypal.com/cgi-bin/webscr?${new URLSearchParams({
  cmd: "_xclick",
  business: PAYPAL_BUSINESS,
  item_name: `${EVENT_NAME} — Ticket`,
  amount: TICKET_PRICE.toString(),
  currency_code: "USD",
  no_shipping: "1"
}).toString()}`;

const donateUrl = `https://www.paypal.com/donate?${new URLSearchParams({
  business: PAYPAL_BUSINESS,
  item_name: "Black History Committee of Orange County",
  currency_code: "USD"
}).toString()}`;

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Support BHCOC"
        title="Reserve your seat at the 2026 Gala."
        subtitle="Tickets to our annual Scholarship Awards & Juneteenth Celebration Gala directly fund scholarships and community programs. Every ticket is a donation to a 501(c)(3) nonprofit."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-6 md:gap-8 items-stretch">
          {/* Ticket card */}
          <article className="relative rounded-3xl bg-ink text-cream p-7 sm:p-10 md:p-12 overflow-hidden shadow-lift">
            <div
              className="absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-40"
              style={{
                background:
                  "radial-gradient(circle, #C9A14A 0%, transparent 70%)"
              }}
              aria-hidden
            />
            <div className="relative">
              <span className="eyebrow text-gold">Gala ticket</span>
              <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl leading-tight">
                {EVENT_NAME}
              </h2>
              <dl className="mt-6 grid sm:grid-cols-2 gap-5 text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-cream/55">
                    Date
                  </dt>
                  <dd className="mt-1 font-medium text-cream">
                    Sat, June 27, 2026 · 6:00 PM EST
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-cream/55">
                    Venue
                  </dt>
                  <dd className="mt-1 font-medium text-cream">
                    Rosen Centre Hotel
                  </dd>
                  <dd className="text-cream/60 text-[13px] leading-snug">
                    9840 International Drive, Orlando, FL 32819
                  </dd>
                </div>
              </dl>

              <div className="mt-8 h-px bg-cream/15" />

              <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-2">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-cream/55">
                    Individual ticket
                  </div>
                  <div className="mt-1 font-display text-5xl text-gold">
                    ${TICKET_PRICE}
                  </div>
                </div>
                <div className="text-xs text-cream/60 pb-2">
                  price includes tax
                </div>
              </div>

              <a
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-ink font-medium hover:bg-gold-light transition shadow-lift"
              >
                Buy ticket with PayPal →
              </a>

              <p className="mt-5 text-sm text-cream/65 leading-relaxed">
                Group and corporate packages are available. Contact Vernard
                Batson at{" "}
                <a
                  href="tel:+14076681865"
                  className="text-gold hover:text-gold-light"
                >
                  (407) 668-1865
                </a>{" "}
                or{" "}
                <Link
                  href="/contact"
                  className="text-gold hover:text-gold-light"
                >
                  send us a message
                </Link>
                .
              </p>
            </div>
          </article>

          {/* Donate card */}
          <article className="rounded-3xl bg-cream border border-ink/10 p-6 sm:p-8 md:p-10 flex flex-col">
            <span className="eyebrow text-clay">Or give directly</span>
            <h3 className="mt-3 font-display text-2xl leading-snug">
              Donate any amount to BHCOC.
            </h3>
            <p className="mt-4 text-ink/75 leading-relaxed text-sm">
              Prefer to give without a ticket? Make a tax-deductible
              contribution in any amount. Funds go directly to scholarships,
              community events, and education programs across Central Florida.
            </p>

            <a
              href={donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-cream font-medium hover:bg-clay transition"
            >
              Donate with PayPal →
            </a>

            <div className="mt-8 pt-6 border-t border-ink/10 text-sm text-ink/70 space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                <span>501(c)(3) — gifts are tax-deductible</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-clay" />
                <span>Checks payable to BHCOC, Inc.</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
