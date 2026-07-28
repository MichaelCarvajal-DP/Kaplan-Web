/**
 * Hero — spec: Brickell/Miami architectural photo bg with 10% #f5f5f5 overlay,
 * centered text. H1 Cormorant Garamond Bold 48px #183760, sub Inter Light 18px #183760.
 * Two buttons: primary (bg #2f5c99) Legal Services, secondary (transparent, 1px border
 * #2f5c99, text #183760) Consulting Services — switch the Specialties vertical.
 */
import { useLang } from "@/contexts/LanguageContext";
import { CONTENT } from "@/lib/content";

const HERO_IMG = "/manus-storage/hero_brickell_0d881ddd.jpg";

export default function Hero({
  onSelectVertical,
}: {
  onSelectVertical: (v: "legal" | "consulting") => void;
}) {
  const { lang } = useLang();

  const pick = (v: "legal" | "consulting") => {
    onSelectVertical(v);
    document.getElementById("specialties")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative min-h-[92vh] flex items-center justify-center pt-[72px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
        role="img"
        aria-label="K&K Hero Section Image — Brickell, Miami"
      />
      {/* 10% opaque #f5f5f5 overlay per spec + soft gradient for text legibility */}
      <div className="absolute inset-0 bg-[#f5f5f5]/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f5]/85 via-[#f5f5f5]/60 to-[#f5f5f5]/85" />

      <div className="relative z-10 container text-center max-w-4xl mx-auto px-4">
        <h1
          className="font-display font-bold text-[#183760] text-4xl md:text-5xl lg:text-[48px] leading-[1.15] tracking-tight"
        >
          {CONTENT.heroTitle[lang]}
        </h1>
        <p className="mt-6 text-[17px] md:text-[18px] font-light text-[#183760] max-w-2xl mx-auto leading-relaxed">
          {CONTENT.heroSub[lang]}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => pick("legal")}
            className="w-full sm:w-auto bg-[#2f5c99] text-[#f5f5f5] font-bold text-[15px] px-8 py-3.5 rounded-sm hover:bg-[#183760] active:scale-[0.97] transition-all duration-200 shadow-md"
          >
            {CONTENT.tabLegal[lang]}
          </button>
          <button
            onClick={() => pick("consulting")}
            className="w-full sm:w-auto bg-transparent border border-[#2f5c99] text-[#183760] font-bold text-[15px] px-8 py-3.5 rounded-sm hover:bg-[#2f5c99]/10 active:scale-[0.97] transition-all duration-200"
          >
            {CONTENT.tabConsulting[lang]}
          </button>
        </div>
      </div>
    </section>
  );
}
