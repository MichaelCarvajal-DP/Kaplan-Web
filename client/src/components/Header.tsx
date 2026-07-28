/**
 * Sticky header — spec: bg #f5f5f5, logo left, centered nav (Inter Bold 14px #183760,
 * active = 2px underline #2f5c99), right: flag language selector (US/ES/FR/BR/IT) + CTA
 * (bg #2f5c99, white text, Inter Bold 13px).
 */
import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { CONTENT, type Lang } from "@/lib/content";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { toast } from "sonner";

const LOGO = "/manus-storage/logo_color_198cf3c1.png";

const FLAGS: { lang: Lang; src: string; label: string }[] = [
  { lang: "en", src: "/manus-storage/flag_us_0892fa05.png", label: "English" },
  { lang: "es", src: "/manus-storage/flag_es_6f5f4c7d.png", label: "Español" },
  { lang: "fr", src: "/manus-storage/flag_fr_5e681694.png", label: "Français" },
  { lang: "pt", src: "/manus-storage/flag_br_59dcc0b7.png", label: "Português" },
  { lang: "it", src: "/manus-storage/flag_it_30512f8f.png", label: "Italiano" },
];

const SECTION_IDS = ["specialties", "about", "team", "blog", "contact"];

export default function Header() {
  const { lang, setLang } = useLang();
  const [active, setActive] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = CONTENT.nav[lang];
  const current = FLAGS.find((f) => f.lang === lang)!;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setMobileOpen(false);
    if (id === "blog") {
      toast("Blog coming soon");
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f5]/95 backdrop-blur-sm border-b border-[#2f5c99]/10">
      <div className="container flex items-center justify-between h-[72px]">
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
            className="h-11 w-auto"
          />
        </a>

        {/* Center nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {SECTION_IDS.map((id, i) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`text-[14px] font-bold text-[#183760] pb-1 border-b-2 transition-colors duration-200 ${
                active === id ? "border-[#2f5c99]" : "border-transparent hover:border-[#2f5c99]/40"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {nav[i]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-[#e6edf7] transition-colors">
              <img src={current.src} alt={current.label} className="h-4 w-6 object-cover rounded-[2px] shadow-sm" />
              <span className="hidden sm:inline text-[12px] font-semibold text-[#183760] uppercase">{lang}</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#183760]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#f5f5f5] border-[#2f5c99]/20">
              {FLAGS.map((f) => (
                <DropdownMenuItem
                  key={f.lang}
                  onClick={() => setLang(f.lang)}
                  className={`gap-2.5 cursor-pointer ${f.lang === lang ? "bg-[#e6edf7]" : ""}`}
                >
                  <img src={f.src} alt={f.label} className="h-4 w-6 object-cover rounded-[2px]" />
                  <span className="text-[13px] text-[#183760]">{f.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* CTA */}
          <button
            onClick={() => go("contact")}
            className="hidden md:inline-flex items-center bg-[#2f5c99] text-[#f5f5f5] text-[13px] font-bold px-5 py-2.5 rounded-sm hover:bg-[#183760] active:scale-[0.97] transition-all duration-200"
          >
            {CONTENT.cta[lang]}
          </button>

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
        <nav className="lg:hidden bg-[#f5f5f5] border-t border-[#2f5c99]/10 px-6 py-4 flex flex-col gap-3">
          {SECTION_IDS.map((id, i) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="text-left text-[15px] font-bold text-[#183760] py-1"
            >
              {nav[i]}
            </button>
          ))}
          <button
            onClick={() => go("contact")}
            className="mt-2 bg-[#2f5c99] text-[#f5f5f5] text-[13px] font-bold px-5 py-3 rounded-sm text-center"
          >
            {CONTENT.cta[lang]}
          </button>
        </nav>
      )}
    </header>
  );
}

