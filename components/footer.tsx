import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-cream/80 mt-24 relative overflow-hidden">
      <div className="kente-bar" aria-hidden />
      <div
        className="absolute -right-32 -top-20 h-80 w-80 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #C9A14A 0%, transparent 70%)"
        }}
        aria-hidden
      />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #FAF6EE 0 2px, transparent 2px 22px)"
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream text-ink font-display text-xl font-bold">
              B
              <span className="absolute -bottom-1 -right-1 inline-block h-3 w-3 rounded-full bg-clay ring-2 ring-ink" />
            </span>
            <span className="font-display text-xl text-cream leading-tight">
              Black History Committee
              <br />
              <span className="text-cream/60 text-sm tracking-wider uppercase">
                of Orange County, Inc.
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed">
            A 501(c)(3) nonprofit organization celebrating and educating the
            public on African American history in Central Florida for more
            than two decades.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-ink text-sm font-medium hover:bg-gold-light transition"
            >
              Donate →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-cream/20 px-5 py-2.5 text-sm hover:bg-cream/10 transition"
            >
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-display text-cream mb-4 text-base">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/about" className="hover:text-gold transition">About</Link></li>
            <li><Link href="/members" className="hover:text-gold transition">Members</Link></li>
            <li><Link href="/events" className="hover:text-gold transition">Events</Link></li>
            <li><Link href="/donate" className="hover:text-gold transition">Donate</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-cream mb-4 text-base">Connect</h4>
          <ul className="space-y-2.5 text-sm">
            <li>Orlando, Florida</li>
            <li>
              <a
                href="https://www.facebook.com/people/The-Black-History-Committee-of-Orange-County-Inc/100092875966307/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold transition"
              >
                Facebook ↗
              </a>
            </li>
            <li>
              <a href="mailto:bhcocinc@gmail.com" className="hover:text-gold transition">
                bhcocinc@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+14076681865" className="hover:text-gold transition">
                (407) 668-1865
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-cream/10">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-cream/50 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Black History Committee of Orange County, Inc. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            501(c)(3) nonprofit organization
          </span>
        </div>
      </div>
    </footer>
  );
}
