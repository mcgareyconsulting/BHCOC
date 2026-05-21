# BHCOC — Black History Committee of Orange County

A statically-rendered Next.js site for the Black History Committee of Orange County, Inc., a 501(c)(3) nonprofit based in Orlando, Florida.

## Stack

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- No backend / no database — all pages are static. Forms use `mailto:`.

## Pages

- `/` — Home (hero, mission, programs, CTA)
- `/about` — Mission, history, school partners
- `/members` — Committees & volunteers
- `/events` — Upcoming events & year-round programs
- `/donate` — Giving tiers and ways to give
- `/contact` — Contact info and message form

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build

```bash
npm run build && npm start
```

## Deploy

Deploy to Vercel, Netlify, or any static host. There is no server-side runtime required beyond Next.js itself.
