# Architecture

This document describes how the Kaplan & Kaplan website is put together: the rendering model, the component map, state management, and the styling system.

## Rendering Model

The site is a **client-rendered single-page application**. Vite builds a static bundle (`dist/`) that any static host can serve. There is no server-side rendering, API layer, or database; the `server/` directory in the repository is an inert placeholder inherited from the project template and is not deployed logic the site depends on.

`client/src/main.tsx` mounts `<App />`, which wires up the router (Wouter), the `ThemeProvider`, and the `LanguageProvider`. The only meaningful route is `/` (`pages/Home.tsx`); unknown paths fall through to `pages/NotFound.tsx`.

## Page Composition

`Home.tsx` composes the page as a vertical sequence of section components. Each section is self-contained: it reads the active language, pulls its copy from `content.ts` (or a colocated translation table), and renders.

| Order | Component | Purpose |
| --- | --- | --- |
| 1 | `Header` | Sticky white nav: logo, 4 nav items, solid CONTACT US button, row of 5 flag buttons (language switcher). Nav items smooth-scroll to section anchors. |
| 2 | `Hero` | Full-width Brickell skyline photograph with the two-line serif headline and two CTAs (Schedule a Consultation → contact form; View Practice Areas → specialties). |
| 3 | `Specialties` | Two-mode practice explorer. A blue-ruled sidebar lists Legal Services (7 areas) with an outlined toggle to Consulting Services (6 areas); the right panel shows the selected practice's icon, serif title, justified description paragraphs, and a consultation CTA. |
| 4 | `About` | Firm philosophy statement plus stat cards (40+ years combined experience, 6 languages spoken). |
| 5 | `Team` | "A Team of Professionals" on the brand-blue background. Bruce C. Kaplan first (BCK monogram tile, credentials, short bio), Grant E. Kaplan second (photo tile, credentials, short bio). Buttons open `BioPanel`. |
| 6 | `Contact` | "Initiate a Consultation" intake form (name, email, phone with country code, area of interest, matter overview). Visual only — no submission wiring. |
| 7 | `Footer` | Firm blurb, sitemap columns, address/phone, attorney-advertising disclaimer. |

`BioPanel` is an overlay rather than a section: a right-to-left slide-in panel showing a partner's photograph and full extended biography, closed via an arrow button — matching the Canva spec for the Partner Directory.

## State Management

There are only two pieces of global state, both provided by React context:

- **Language** (`contexts/LanguageContext.tsx`): holds the active `Lang` (`en | es | fr | pt | it`). Initialized from the `?lang=` query parameter when present (used for QA deep links), defaulting to English. Components call `useLang()` and index into translation records.
- **Theme** (`contexts/ThemeContext.tsx`): template-provided light/dark scaffolding; the site ships in light mode.

Everything else (selected practice area, open bio panel, mobile menu) is local `useState` inside the owning component.

## Content Layer

`lib/content.ts` is the single source of truth for site copy. It exports:

- `Lang` — the union type of supported language codes.
- `CONTENT` — an object whose top-level keys are content slots (`nav`, `cta`, `heroTitle`, `heroSub`, `tabLegal`, `tabConsulting`, `legalOrder`, `consultingOrder`, `practices`, `about`, `form`, `footer`, `shortBios`, `extBios`), each holding per-language values.

`lib/paragraphs.ts` provides `splitParagraphs(text, target)`, which breaks long single-string descriptions into balanced multi-sentence paragraphs at render time so justified text blocks match the mockups without duplicating content per paragraph.

`lib/practiceIcons.tsx` maps each practice-area key to its line icon used in the Specialties detail panel.

## Styling System

Tailwind CSS 4 with design tokens declared in `client/src/index.css`. The brand palette (`#183760` navy, `#2f5c99` brand blue, `#e6edf7` ice blue, `#f5f5f5` off-white) is used directly in section components to guarantee fidelity to the Canva reference. Display headings use Cormorant Garamond (`font-display`); body and UI text use Inter. Fonts load from the Google Fonts CDN in `client/index.html`.

shadcn/ui components (under `components/ui/`) provide accessible primitives (select, dialog, etc.) where interactive controls are needed, notably in the contact form.

## Assets

Images (hero skyline, Grant's portrait, logo) are hosted on Manus storage (`/manus-storage/...` URLs) rather than committed to the repository, per the hosting platform's deployment constraints. If migrating hosts, download these assets and update the URLs in the referencing components (`Hero.tsx`, `Team.tsx`, `BioPanel.tsx`, `Header.tsx`, `Footer.tsx`).
