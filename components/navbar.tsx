"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-ink/10 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-gold font-display text-xl font-bold ring-1 ring-gold/40 group-hover:ring-gold transition">
            B
            <span className="absolute -bottom-1 -right-1 inline-block h-3 w-3 rounded-full bg-clay ring-2 ring-cream" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold">BHCOC</span>
            <span className="hidden sm:block text-[11px] tracking-wider uppercase text-ink/60">
              Black History Committee · Orange County
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative py-1 transition ${
                  active ? "text-ink" : "text-ink/70 hover:text-ink"
                }`}
              >
                {l.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-gold transition-all ${
                    active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  } origin-left`}
                />
              </Link>
            );
          })}
          <Link
            href="/donate"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-cream hover:bg-clay transition shadow-soft"
          >
            <span>Donate</span>
            <span aria-hidden>→</span>
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg border border-ink/15 bg-cream/70"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-cream">
          <div className="mx-auto max-w-6xl px-6 py-3 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 border-b border-ink/5 text-ink/80 hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex justify-center items-center rounded-full bg-ink px-5 py-3 text-cream"
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
