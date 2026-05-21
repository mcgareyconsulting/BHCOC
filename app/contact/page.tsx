import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Contact | BHCOC" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        subtitle="Questions about events, sponsorship, scholarships, or volunteering? Reach out — we'd love to hear from you."
      />

      <section className="mx-auto max-w-6xl px-6 py-24 grid lg:grid-cols-[1fr_1.3fr] gap-12">
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

        {/* Form */}
        <form
          className="relative rounded-3xl border border-ink/10 bg-cream p-8 md:p-10 grid gap-5 shadow-soft"
          action="mailto:info@thebhcoc.com"
          method="post"
          encType="text/plain"
        >
          <div className="absolute -top-3 left-8 inline-flex items-center gap-2 bg-clay text-cream text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full">
            ✉ Send a message
          </div>
          <h3 className="font-display text-2xl mt-2">We&apos;ll get back to you.</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="grid gap-1.5 text-sm">
              <span className="text-ink/65">Name</span>
              <input
                name="name"
                required
                className="rounded-xl border border-ink/15 bg-paper/40 px-4 py-3 outline-none focus:border-gold focus:bg-cream transition"
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="text-ink/65">Email</span>
              <input
                type="email"
                name="email"
                required
                className="rounded-xl border border-ink/15 bg-paper/40 px-4 py-3 outline-none focus:border-gold focus:bg-cream transition"
              />
            </label>
          </div>
          <label className="grid gap-1.5 text-sm">
            <span className="text-ink/65">Subject</span>
            <input
              name="subject"
              className="rounded-xl border border-ink/15 bg-paper/40 px-4 py-3 outline-none focus:border-gold focus:bg-cream transition"
            />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="text-ink/65">Message</span>
            <textarea
              name="message"
              rows={6}
              required
              className="rounded-xl border border-ink/15 bg-paper/40 px-4 py-3 outline-none focus:border-gold focus:bg-cream transition resize-none"
            />
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-cream font-medium hover:bg-clay transition"
          >
            Send message →
          </button>
          <p className="text-xs text-ink/50">
            This form opens your email client. For urgent inquiries please call
            the number listed.
          </p>
        </form>
      </section>
    </>
  );
}
