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

      <section className="mx-auto max-w-6xl px-6 py-20 grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-xl">Group & corporate packages</h3>
            <p className="mt-2 text-ink/75">Vernard Batson</p>
            <a
              href="tel:+14076681865"
              className="mt-1 inline-block font-display text-2xl gold-underline"
            >
              (407) 668-1865
            </a>
          </div>

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
            <p className="mt-1 text-ink/75">
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

        <form
          className="rounded-2xl border border-ink/10 bg-cream p-8 grid gap-4"
          action="mailto:info@thebhcoc.com"
          method="post"
          encType="text/plain"
        >
          <h3 className="font-display text-2xl">Send a message</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="grid gap-1 text-sm">
              <span className="text-ink/70">Name</span>
              <input
                name="name"
                required
                className="rounded-lg border border-ink/15 bg-white px-3 py-2 outline-none focus:border-gold"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-ink/70">Email</span>
              <input
                type="email"
                name="email"
                required
                className="rounded-lg border border-ink/15 bg-white px-3 py-2 outline-none focus:border-gold"
              />
            </label>
          </div>
          <label className="grid gap-1 text-sm">
            <span className="text-ink/70">Subject</span>
            <input
              name="subject"
              className="rounded-lg border border-ink/15 bg-white px-3 py-2 outline-none focus:border-gold"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-ink/70">Message</span>
            <textarea
              name="message"
              rows={6}
              required
              className="rounded-lg border border-ink/15 bg-white px-3 py-2 outline-none focus:border-gold"
            />
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-cream font-medium hover:bg-clay transition"
          >
            Send message
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
