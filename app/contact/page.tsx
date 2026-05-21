import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";

export const metadata = { title: "Contact | BHCOC" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        subtitle="Questions about events, sponsorship, scholarships, or volunteering? Reach out — we'd love to hear from you."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-12">
        {/* Contact details */}
        <div className="space-y-8">
          <div className="rounded-3xl border border-gold/30 bg-gold/[0.06] p-7">
            <span className="eyebrow text-clay">Sponsorship</span>
            <h3 className="mt-3 font-display text-xl">
              Group & corporate packages
            </h3>
            <p className="mt-2 text-ink/75">Vernard Batson</p>
            <a
              href="tel:+14076681865"
              className="mt-2 inline-flex items-center gap-2 font-display text-3xl text-ink hover:text-clay transition"
            >
              <span aria-hidden>☎</span>
              (407) 668-1865
            </a>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl">Email</h3>
              <a
                href="mailto:info@thebhcoc.com"
                className="mt-1 inline-block text-ink/85 gold-underline"
              >
                info@thebhcoc.com
              </a>
            </div>

            <div>
              <h3 className="font-display text-xl">Mailing area</h3>
              <p className="mt-1 text-ink/75 leading-relaxed">
                Orlando, Florida
                <br />
                Orange County
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl">Follow</h3>
              <ul className="mt-2 space-y-1 text-ink/85">
                <li>
                  <a
                    href="https://www.facebook.com/people/The-Black-History-Committee-of-Orange-County-Inc/100092875966307/"
                    target="_blank"
                    rel="noreferrer"
                    className="gold-underline"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <ContactForm />
      </section>
    </>
  );
}
