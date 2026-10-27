<h1 align="center">DawnWave</h1>
<p align="center">Welcome to the official website of DawnWave, where creativity meets innovation in game development.</p>

<p align="center">
  <a href="https://www.dawnwave.com.tr" title="Visit DawnWave">🌐 Website</a>
</p>

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19
- [next-intl](https://next-intl.dev) for the `en` / `tr` locales (`/en`, `/tr`)
- Tailwind CSS 4, shadcn/ui (Radix) components, CSS modules for custom effects
- react-hook-form + zod for the forms, nodemailer + Gmail for sending emails

## Requirements

- [Node.js](https://nodejs.org/en/download) 20.9 or newer
- npm (the repository uses `package-lock.json`)

## Getting started

```bash
git clone https://github.com/keremketenci/DawnWave-website.git
cd DawnWave-website

npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000. The site redirects to `/en` or `/tr` based on the browser language.

## Environment variables

All variables are documented in [`.env.example`](.env.example).

| Variable                   | Description                                                          |
| -------------------------- | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | Public URL used for canonical/hreflang links, sitemap, Open Graph.   |
| `GMAIL_USER`               | Gmail address that sends the form emails.                            |
| `GMAIL_APP_PASSWORD`       | Google App Password for that account (requires 2-Step Verification). |
| `CONTACT_EMAIL`            | Optional inbox for submissions, defaults to `GMAIL_USER`.            |
| `UPSTASH_REDIS_REST_URL`   | Optional Upstash Redis REST URL for shared rate limiting.            |
| `UPSTASH_REDIS_REST_TOKEN` | Optional Upstash Redis REST token.                                   |

### Sending form emails with Gmail

1. Enable 2-Step Verification on the Gmail account.
2. Create an App Password at https://myaccount.google.com/apppasswords.
3. Set `GMAIL_USER` and `GMAIL_APP_PASSWORD`.

Messages arrive with subjects prefixed `[DawnWave İletişim]` / `[DawnWave Bülten]` and the visitor's
address as _Reply-To_, so hitting _Reply_ in Gmail answers them directly.

The form endpoints (`/api/contact`, `/api/subscribe`) return `500` until the Gmail variables are set.

## Scripts

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start the development server.           |
| `npm run build`        | Create a production build.              |
| `npm start`            | Serve the production build.             |
| `npm run lint`         | Run ESLint.                             |
| `npm run typecheck`    | Generate route types and run `tsc`.     |
| `npm run format`       | Format the code with Prettier.          |
| `npm run format:check` | Check formatting without writing files. |

## Project structure

```
messages/               Translations (en.json, tr.json)
public/                 Static assets (icons, images)
src/
  app/
    [locale]/           Localized layout and home page (statically generated)
    api/                Form endpoints (contact, subscribe)
    robots.ts           robots.txt
    sitemap.ts          sitemap.xml
  components/
    layout/             Navbar, mobile navigation, language switcher, footer
    sections/           Page sections (Hero, Team, JoinUs, Contact, Subscribe)
    effects/            Animated/decorative components (background, labels, loader)
    ui/                 Reusable UI: buttons, cards, carousels, form fields, icons
      shadcn/           shadcn/ui primitives
  data/                 Static content (team, jobs, socials, navigation, media)
  hooks/                Client hooks
  i18n/                 next-intl routing, navigation and request config
  lib/                  Utilities (SEO, mail, validation, rate limiting, ...)
  proxy.ts              Locale detection / redirects (next-intl)
```

Below-the-fold sections fade in on scroll (`data-reveal`, see `src/components/effects/ScrollReveal.tsx`),
images load lazily and YouTube videos only load the player after a click. All motion is disabled
for visitors with _reduce motion_ enabled.

Components are Server Components by default; `"use client"` is only used where state, effects or browser APIs are needed (forms, carousels with autoplay, menus, clipboard buttons).

## Content

- Team members, open positions, social links and game servers live in `src/data/`.
- Texts live in `messages/en.json` and `messages/tr.json` (both files must have the same keys).
