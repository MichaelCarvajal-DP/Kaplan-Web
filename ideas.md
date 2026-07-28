# Kaplan & Kaplan Legal and Advisory — Design Ground Truth

This is a REPLICATION task. The marketing team provided:
1. A Microsoft Loop spec (full copy in /home/ubuntu/upload/pasted_content.txt) with exact typography, colors, and 5-language copy (EN/ES/FR/PT/IT).
2. A Canva design (DAHM7QPsaQQ) as visual reference — hero, specialties, about, team, contact, footer layouts.

The Loop spec + Canva design ARE the chosen approach. Fidelity to them overrides all other guidance.

## Locked design tokens (from spec)
- Palette: `#f5f5f5` (light surface), `#e6edf7` (light blue section bg), `#183760` (dark navy text/footer bg), `#2f5c99` (accent blue).
- Fonts: **Cormorant Garamond** (headings, Bold) + **Inter** (body, Light/Bold). Google Fonts.
- Buttons: primary = bg #2f5c99, text #f5f5f5, Inter Bold; secondary = transparent, 1px border #2f5c99, text #183760.
- Active nav link: 2px underline #2f5c99. Sidebar active item: 3px vertical bar #2f5c99.

## Section structure (one page)
1. Sticky header (#f5f5f5): logo left, nav center (Specialties / About Us / Team / Blog / Contact), right: flag language selector (US/ES/FR/BR/IT) + CTA "Schedule a Consultation".
2. Hero: B&W Brickell Miami photo bg + light overlay; H1 Cormorant 48px #183760; sub Inter Light 18px; two tab buttons Legal / Consulting scrolling to Specialties.
3. Specialties: left sidebar menu (bg #e6edf7, rounded) + right detail panel (title Cormorant 32px, body Inter Light 15px lh 1.6, line icon #2f5c99). Legal tab: 8 items; Consulting tab: 6 items (2 shared). Smooth tab transition.
4. About Us (#e6edf7): asymmetric 2 cols — narrow left manifesto Cormorant Bold 28px; right editorial Inter Light 16px; metrics 40+ / 6 in Cormorant Bold 56px #2f5c99 with tracked all-caps labels.
5. Team (dark navy bg per Canva): intro + 2 partner cards (Grant photo; Bruce "BCK" monogram), short bio, "READ FULL BIOGRAPHY" → slide-in panel from right (#f5f5f5, heavy left shadow, photo radius 8px, name Cormorant 36px #2f5c99, bio Inter Light 14px #183760, close button 2px border #183760).
6. Intake form (#e6edf7): 1/3 title + address/phone, 2/3 form (First/Last Name, Email, Phone with intl dial-code prefix, Area of Interest select, Message) → "Submit Secure Inquiry →" button.
7. Footer (#183760): white logo, tagline, 4 columns (Company / Practice Areas / Legal), bottom bar 1px divider #2f5c99, © + "Attorney Advertising. Prior results do not guarantee a similar outcome."

## i18n
Language switcher with 5 flags; ALL copy (nav, hero, 14 practice descriptions, about, bios short+extended, form, footer) from the Loop spec, per language. Default EN.

## Assets
/home/ubuntu/kk_assets/: logo_color.png, hero_brickell.jpg, grant_photo.jpg, flag_us/es/fr/it/br.png. White footer logo via recreated SVG/CSS filter. 13 practice line icons as inline SVG (lucide), stroke #2f5c99.
