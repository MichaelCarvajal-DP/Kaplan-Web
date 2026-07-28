# Kaplan & Kaplan Legal and Advisory — Website

A multilingual marketing website for **Kaplan & Kaplan Legal and Advisory**, a boutique law and advisory firm based in Doral, Florida. The site presents the firm's legal and consulting practice areas, partner biographies, and a consultation intake form in **five languages** (English, Spanish, French, Portuguese, Italian).

**Production:** [https://kaplanlegal.net](https://kaplanlegal.net) (also `www.kaplanlegal.net` and `kaplanlaw-zpgkyesn.manus.space`)

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 4 + shadcn/ui (Radix primitives) |
| Routing | Wouter (client-side, single-page) |
| Fonts | Cormorant Garamond (display serif) + Inter (body) |
| Hosting | Manus (autoscale static hosting) |

This is a **static frontend-only** project — there is no backend or database. The `server/` and `shared/` directories are template compatibility placeholders only.

## Getting Started

```bash
pnpm install       # install dependencies
pnpm dev           # start dev server (Vite, http://localhost:3000)
pnpm check         # TypeScript type-check
pnpm build         # production build (outputs to dist/)
pnpm format        # prettier
```

## Project Structure

```
client/
  index.html                  ← HTML entry (Google Fonts, meta/SEO tags)
  src/
    main.tsx                  ← React entry point
    App.tsx                   ← Routes, ThemeProvider, LanguageProvider
    index.css                 ← Design tokens & global theme (Tailwind 4)
    pages/
      Home.tsx                ← Single-page composition of all sections
      NotFound.tsx
    components/
      Header.tsx              ← Sticky nav, logo, CONTACT US button, 5 flag language switcher
      Hero.tsx                ← Brickell skyline hero + headline + CTAs
      Specialties.tsx         ← Legal/Consulting practice-area explorer (sidebar + detail panel)
      About.tsx               ← Firm philosophy + stat blocks (40+ years, 6 languages)
      Team.tsx                ← "A Team of Professionals" partner section
      BioPanel.tsx            ← Slide-in extended biography panel (Grant / Bruce)
      Contact.tsx             ← Consultation intake form (visual only, no submission backend)
      Footer.tsx              ← Sitemap links, address, attorney-advertising disclaimer
      ui/                     ← shadcn/ui primitives
    contexts/
      LanguageContext.tsx     ← Global language state (?lang=xx deep-link supported)
      ThemeContext.tsx
    lib/
      content.ts              ← ALL site copy in 5 languages (single source of truth)
      paragraphs.ts           ← Splits long copy into balanced justified paragraphs
      practiceIcons.tsx       ← Icon mapping for practice areas
```

## Internationalization

All copy lives in [`client/src/lib/content.ts`](client/src/lib/content.ts) keyed by language code (`en`, `es`, `fr`, `pt`, `it`). Components read the active language from `LanguageContext` via the `useLang()` hook. The header flag selector switches languages instantly with no page reload, and `?lang=es` (etc.) can be appended to the URL for deep-linking and QA.

A small number of section-specific strings (e.g., the Team section headings and credentials) are colocated in their components using the same `Record<Lang, string>` pattern.

See [docs/CONTENT.md](docs/CONTENT.md) for a full guide to editing copy and translations.

## Design System

The visual design replicates the firm's approved Canva mockups.

| Token | Value | Usage |
| --- | --- | --- |
| Navy | `#183760` | Headings, body text on light backgrounds, footer |
| Brand blue | `#2f5c99` | Buttons, accents, Team section background |
| Ice blue | `#e6edf7` | Tinted panels, monogram tiles |
| Off-white | `#f5f5f5` | Section backgrounds, light buttons |

Typography pairs **Cormorant Garamond** (bold serif) for display headings with **Inter** for UI and body copy. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the component-level breakdown.

## Deployment

The site is hosted on Manus autoscale hosting with auto-publish: every saved checkpoint in the Manus project is published to production immediately. Custom domains (`kaplanlegal.net`, `www.kaplanlegal.net`) are bound through the Manus dashboard.

To build for any static host manually, run `pnpm build` and serve the `dist/` output.

## Known Limitations / Roadmap

- The consultation intake form is **visual only** — it does not submit anywhere yet (requires a backend or form service).
- The **Blog** navigation item is a placeholder with no destination page.
- Bruce C. Kaplan's portrait uses a "BCK" monogram tile until a photograph is provided.

## License

Proprietary — © 2026 Kaplan & Kaplan Legal and Advisory. All rights reserved. This repository is private and its contents are not licensed for reuse.
