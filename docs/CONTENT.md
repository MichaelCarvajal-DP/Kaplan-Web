# Content & Translation Guide

This guide explains how to edit the website's copy, translations, practice areas, and partner biographies. No build-tool knowledge is required beyond running the dev server to preview changes.

## Where Copy Lives

Nearly all text is centralized in **`client/src/lib/content.ts`**, organized as content slots keyed by the five language codes: `en` (English), `es` (Spanish), `fr` (French), `pt` (Portuguese), `it` (Italian).

| Slot | Controls |
| --- | --- |
| `nav` | The five navigation labels in the header and footer |
| `cta` | The "Schedule a Consultation" button label |
| `heroTitle`, `heroSub` | Hero headline and subheadline |
| `tabLegal`, `tabConsulting` | Sidebar group labels in Specialties |
| `legalOrder`, `consultingOrder` | Which practice areas appear, and in what order |
| `practices` | Every practice area's name and long description, per language |
| `about` | The About section statement and stat labels |
| `form` | All labels, placeholders, and options in the intake form |
| `footer` | Footer column headings, links, disclaimer |
| `shortBios` | The two-paragraph bios shown in the Team section |
| `extBios` | The full biographies shown in the slide-in panel |

A few strings that are specific to one section are colocated at the top of that section's component file using the same `Record<Lang, string>` shape — for example `TEAM_TITLE`, `TEAM_INTRO`, `ROLE`, `COMMISSIONER`, and `LANGS` in `client/src/components/Team.tsx`.

## Editing Rules

1. **Always edit all five languages together.** Every slot must have `en`, `es`, `fr`, `pt`, and `it` values; a missing key will surface as a blank string or a TypeScript error.
2. **Keep long descriptions as single strings.** The `splitParagraphs` helper breaks them into balanced justified paragraphs automatically. If you need explicit paragraph breaks, insert `\n` characters — the helper honors them.
3. **Do not rename slot keys** without updating the components that read them (search the key name across `client/src/components/`).
4. **Preview with deep links.** Append `?lang=es` (or `fr`, `pt`, `it`) to the local dev URL to load a language directly, e.g. `http://localhost:3000/?lang=pt`.

## Adding or Reordering a Practice Area

1. Add a new entry under `practices` in `content.ts` with a unique key and a `name` + `desc` for each of the five languages.
2. Add the key to `legalOrder` or `consultingOrder` in the position you want it to appear.
3. Add an icon for the key in `client/src/lib/practiceIcons.tsx`.

## Updating Partner Information

- **Short bios** (Team section): edit `shortBios.grant` / `shortBios.bruce` in `content.ts`.
- **Extended bios** (slide-in panel): edit `extBios.grant` / `extBios.bruce`.
- **Credentials lines** (schools, commissioner role, spoken languages): edit the `PARTNERS`, `COMMISSIONER`, and `LANGS` tables at the top of `client/src/components/Team.tsx`.
- **Photos**: partner photo URLs are set in `Team.tsx` (`photo` field) and `BioPanel.tsx`. Bruce currently renders a "BCK" monogram tile because no photograph has been supplied; to add one, upload the image to the hosting storage and set his `photo` field.

## Contact Details

The office address and phone number appear in `Contact.tsx` and in the `footer` slot of `content.ts`. Update both places when details change.
