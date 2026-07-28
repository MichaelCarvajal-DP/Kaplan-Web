/**
 * Hero — Canva reference: washed-out Brickell photo, HUGE two-line serif headline
 * (Cormorant Garamond Bold, ~72-96px desktop) in #183760, gray-blue sans subheadline,
 * CTAs: solid uppercase "SCHEDULE A CONSULTATION" + white outlined "VIEW PRACTICE AREAS".
 */
import { useLang } from "@/contexts/LanguageContext";
import { CONTENT } from "@/lib/content";

const HERO_IMG = "/manus-storage/hero_brickell_0d881ddd.jpg";

const VIEW_PRACTICE: Record<string, string> = {
  en: "View Practice Areas",
  es: "Ver Áreas de Práctica",
  fr: "Voir les Domaines d'Expertise",
  pt: "Ver Áreas de Atuação",
  it: "Vedi le Aree di Attività",
};

export default function Hero({
  onSelectVertical,
}: {
  onSelectVertical: (v: "legal" | "consulting") => void;
}) {
  const { lang } = useLang();

  const goContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const goPractices = () => {
    onSelectVertical("legal");
    document.getElementById("specialties")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative min-h-[92vh] flex items-center justify-center pt-[92px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
        role="img"
        aria-label="K&K Hero Section Image — Brickell, Miami"
      />
      {/* 10% opaque #f5f5f5 overlay per spec + soft gradient for text legibility */}
      <div className="absolute inset-0 bg-[#f5f5f5]/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f5]/85 via-[#f5f5f5]/60 to-[#f5f5f5]/85" />

      <div className="relative z-10 container text-center max-w-6xl mx-auto px-4">
        <h1
          className="font-display font-bold text-[#183760] text-[44px] md:text-[68px] lg:text-[88px] leading-[1.08] tracking-tight text-balance"
        >
          {CONTENT.heroTitle[lang]}
        </h1>
        <p className="mt-8 text-[18px] md:text-[22px] font-normal text-[#4b5b74] max-w-3xl mx-auto leading-relaxed">
          {CONTENT.heroSub[lang]}
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={goContact}
            className="w-full sm:w-auto bg-[#2f5c99] text-white font-bold uppercase tracking-wide text-[15px] px-9 py-4 rounded-lg hover:bg-[#183760] active:scale-[0.97] transition-all duration-200 shadow-md"
          >
            {CONTENT.cta[lang]}
          </button>
          <button
            onClick={goPractices}
            className="w-full sm:w-auto bg-white/95 border border-[#c8d4e6] text-[#2f5c99] font-bold uppercase tracking-wide text-[15px] px-9 py-4 rounded-lg hover:bg-white hover:border-[#2f5c99] active:scale-[0.97] transition-all duration-200 shadow-sm"
          >
            {VIEW_PRACTICE[lang]}
          </button>
        </div>
      </div>
    </section>
  );
}
