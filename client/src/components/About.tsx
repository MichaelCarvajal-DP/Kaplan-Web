/**
 * Firm Philosophy (About Us) — spec: bg #e6edf7, asymmetric two-column layout.
 * Narrow left column: large manifesto (Cormorant Garamond, first sentence).
 * Right column: short editorial text (Inter Light 16px #183760).
 * Below: two floating metric highlights — numbers Cormorant Bold 56px #2f5c99,
 * labels Inter Bold 11px #183760 all-caps wide tracking.
 */
import { useLang } from "@/contexts/LanguageContext";
import { CONTENT } from "@/lib/content";

const METRIC_LABELS: Record<string, [string, string]> = {
  en: ["Years Combined Experience", "Languages Spoken"],
  es: ["Años de Experiencia Combinada", "Idiomas Hablados"],
  fr: ["Années d'Expérience Combinée", "Langues Parlées"],
  pt: ["Anos de Experiência Combinada", "Idiomas Falados"],
  it: ["Anni di Esperienza Combinata", "Lingue Parlate"],
};

export default function About() {
  const { lang } = useLang();
  const full = CONTENT.about[lang];
  const splitIdx = full.indexOf(". ");
  const manifesto = splitIdx > -1 ? full.slice(0, splitIdx + 1) : full;
  const editorial = splitIdx > -1 ? full.slice(splitIdx + 2) : "";
  const labels = METRIC_LABELS[lang];

  return (
    <section id="about" className="bg-[#e6edf7] py-20 lg:py-28 scroll-mt-[72px]">
      <div className="container">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
          <h2 className="font-display font-semibold text-[#183760] text-3xl md:text-4xl lg:text-[38px] leading-[1.25]">
            {manifesto}
          </h2>
          <p className="text-[16px] font-light text-[#183760] leading-relaxed lg:pt-2">
            {editorial}
          </p>
        </div>

        {/* Floating metrics */}
        <div className="mt-14 flex flex-col sm:flex-row gap-6 lg:gap-10 lg:ml-auto lg:max-w-2xl">
          {[
            { num: "40+", label: labels[0] },
            { num: "6", label: labels[1] },
          ].map((m) => (
            <div
              key={m.label}
              className="flex-1 bg-[#f5f5f5] rounded-lg shadow-lg shadow-[#183760]/10 px-8 py-7 -mb-4"
            >
              <div className="font-display font-bold text-[56px] leading-none text-[#2f5c99]">
                {m.num}
              </div>
              <div className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#183760]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
