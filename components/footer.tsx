import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-cream/80 mt-24">
      <div className="kente-bar" aria-hidden />
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink font-display text-lg font-bold">
              B
            </span>
            <span className="font-display text-xl text-cream">
              Black History Committee of Orange County
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed">
            A 501(c)(3) nonprofit organization celebrating and educating the public
            on African American history in Central Florida for more than two decades.
          </p>
        </div>

        <div>
          <h4 className="font-display text-cream mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-gold">About</Link></li>
            <li><Link href="/members" className="hover:text-gold">Members</Link></li>
            <li><Link href="/events" className="hover:text-gold">Events</Link></li>
            <li><Link href="/donate" className="hover:text-gold">Donate</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-cream mb-3">Connect</h4>
          <ul className="space-y-2 text-sm">
            <li>Orlando, Florida</li>
            <li>
              <a
                href="https://www.facebook.com/people/The-Black-History-Committee-of-Orange-County-Inc/100092875966307/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                Facebook
              </a>
            </li>
            <li>
              <a href="mailto:info@thebhcoc.com" className="hover:text-gold">
                info@thebhcoc.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-cream/50 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Black History Committee of Orange County, Inc. All rights reserved.</span>
          <span>501(c)(3) nonprofit organization</span>
        </div>
      </div>
    </footer>
  );
}
