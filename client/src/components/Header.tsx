/**
 * Sticky header — Canva reference: white bg, larger logo left, centered nav
 * (Specialties / About Us / Team / Blog, active = blue underline), right column:
 * solid "CONTACT US" button with a visible row of 5 flag icons directly beneath it.
 */
import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { CONTENT, type Lang } from "@/lib/content";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";

const LOGO = "/manus-storage/logo_color_198cf3c1.png";

const FLAGS: { lang: Lang; src: string; label: string }[] = [
  { lang: "en", src: "/manus-storage/flag_us_0892fa05.png", label: "English" },
  { lang: "es", src: "/manus-storage/flag_es_6f5f4c7d.png", label: "Español" },
  { lang: "fr", src: "/manus-storage/flag_fr_5e681694.png", label: "Français" },
  { lang: "pt", src: "/manus-storage/flag_br_59dcc0b7.png", label: "Português" },
  { lang: "it", src: "/manus-storage/flag_it_30512f8f.png", label: "Italiano" },
];

// Canva header nav shows 4 items; "Contact Us" is the button on the right.
const SECTION_IDS = ["specialties", "about", "team", "contact"];
export default function Header() {
  const { lang, setLang } = useLang();
  const [active, setActive] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = CONTENT.nav[lang];
  useEffect(() => {
    const ratios: Record<string, number> = {};
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios[e.target.id] = e.intersectionRatio;
        });
        const best = Object.entries(ratios).reduce<[string, number]>(
          (acc, [id, r]) => (r > acc[1] ? [id, r] : acc),
          ["", 0],
        );
        if (best[1] > 0.05) setActive(best[0]);
      },
      { threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.5, 0.7, 1.0] },
    );
    const allIds = ["top", ...SECTION_IDS];
    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  const go = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (!el) {
      toast("Coming soon");
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#2f5c99]/10">
      <div className="container flex items-center justify-between h-[92px]">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center shrink-0"
          title="Kaplan & Kaplan Attorneys at Law Miami"
        >
          <img
            src={LOGO}
            alt="Kaplan & Kaplan Legal & Advisory Main Logo"
            className="h-14 w-auto"
          />
        </a>

        {/* Center nav */}
        <nav className="hidden lg:flex items-center gap-12">
          {SECTION_IDS.map((id, i) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`text-[16px] font-medium pb-1.5 border-b-2 transition-all duration-200 ${
                active === id
                  ? "border-[#2f5c99] text-[#2f5c99]"
                  : "border-transparent text-[#1f2937] hover:text-[#2f5c99] hover:border-[#2f5c99]/40"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {(NAV_LABELS[lang] ?? NAV_LABELS.en)[i]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* CTA + flags column, per Canva reference */}
          <div className="hidden md:flex flex-col items-end gap-2">
            <button
              onClick={() => go("contact")}
              className="inline-flex items-center bg-[#2f5c99] text-white text-[14px] font-bold uppercase tracking-wide px-7 py-2.5 rounded-lg hover:bg-[#183760] active:scale-[0.97] transition-all duration-200"
            >
              {nav[4] /* Contact Us */}
            </button>
            <div className="flex items-center gap-2.5 pr-0.5">
              {FLAGS.map((f) => (
                <button
                  key={f.lang}
                  onClick={() => setLang(f.lang)}
                  title={f.label}
                  aria-label={f.label}
                  className={`transition-all duration-200 rounded-[2px] ${
                    f.lang === lang
                      ? "ring-2 ring-[#2f5c99] ring-offset-1 scale-105"
                      : "opacity-80 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <img src={f.src} alt={f.label} className="h-[15px] w-[24px] object-cover rounded-[2px] shadow-sm" />
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-[#183760]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden bg-white border-t border-[#2f5c99]/10 px-6 py-4 flex flex-col gap-3">
          {SECTION_IDS.map((id, i) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`text-left text-[15px] font-bold py-1 pl-3 border-l-2 transition-all duration-200 ${
                active === id
                  ? "border-[#2f5c99] text-[#2f5c99]"
                  : "border-transparent text-[#183760]"
              }`}
            >
              {(NAV_LABELS[lang] ?? NAV_LABELS.en)[i]}
            </button>
          ))}
          <div className="flex items-center gap-3 py-2">
            {FLAGS.map((f) => (
              <button
                key={f.lang}
                onClick={() => setLang(f.lang)}
                aria-label={f.label}
                className={`rounded-[2px] ${f.lang === lang ? "ring-2 ring-[#2f5c99] ring-offset-1" : "opacity-80"}`}
              >
                <img src={f.src} alt={f.label} className="h-[15px] w-[24px] object-cover rounded-[2px]" />
              </button>
            ))}
          </div>
          <button
            onClick={() => go("contact")}
            className="mt-1 bg-[#2f5c99] text-white text-[13px] font-bold uppercase px-5 py-3 rounded-lg text-center"
          >
            {nav[4]}
          </button>
        </nav>
      )}
    </header>
  );
}
const NAV_LABELS: Record<string, string[]> = {
  en: ["Specialties", "About Us", "Team", "Contact Us"],
  es: ["Especialidades", "Sobre Nosotros", "Equipo", "Contacto"],
  fr: ["Spécialités", "À Propos", "Équipe", "Contact"],
  pt: ["Especialidades", "Sobre Nós", "Equipe", "Contato"],
  it: ["Specialità", "Chi Siamo", "Team", "Contatti"],
};
