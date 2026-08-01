/**
 * About Us — matches reference image:
 * 1. Header: large "About Us" title (Cormorant, #183760) + vertical divider + tagline
 * 2. Body two-column (35% left / 65% right):
 *    Left  — 40+ and 6 side by side, each with large number + label below
 *    Right — two full body paragraphs, verbatim
 * bg #e6edf7, palette #183760 / #2f5c99, Cormorant Garamond + Inter
 * Responsive: stacks to single column on mobile
 */
import { useLang } from "@/contexts/LanguageContext";

const SECTION_LABEL: Record<string, string> = {
  en: "About Us",
  es: "Sobre Nosotros",
  fr: "À Propos",
  pt: "Sobre Nós",
  it: "Chi Siamo",
};

const TAGLINE: Record<string, string> = {
  en: "Representation grounded in preparation, absolute discretion, and steady judgment.",
  es: "Representación fundamentada en la preparación, discreción absoluta y buen juicio.",
  fr: "Une représentation reposant sur la préparation, une discrétion absolue et un jugement sûr.",
  pt: "Representação fundamentada em preparação, discrição absoluta e julgamento seguro.",
  it: "Rappresentanza fondata su preparazione, discrezione assoluta e giudizio saldo.",
};

const METRIC_LABELS: Record<string, [string, string]> = {
  en: ["Years Combined\nExperience", "Languages\nSpoken"],
  es: ["Años de Experiencia\nCombinada", "Idiomas\nHablados"],
  fr: ["Années d'Expérience\nCombinée", "Langues\nParlées"],
  pt: ["Anos de Experiência\nCombinada", "Idiomas\nFalados"],
  it: ["Anni di Esperienza\nCombinata", "Lingue\nParlate"],
};

const PARA1: Record<string, string> = {
  en: "At Kaplan & Kaplan Legal and Advisory, strong representation begins with a clear understanding of your commercial and personal objectives. We approach every matter with the precision, care, and tailored strategy required for complex, high-stakes challenges.",
  es: "En Kaplan & Kaplan Legal and Advisory, una representación sólida comienza con una comprensión clara de sus objetivos comerciales y personales. Abordamos cada asunto con la precisión, el cuidado y la estrategia personalizada requeridos para desafíos complejos y de alto impacto.",
  fr: "Chez Kaplan & Kaplan Legal and Advisory, une représentation solide commence par une compréhension claire de vos objectifs commerciaux et personnels. Nous abordons chaque dossier avec la précision, le soin et la stratégie sur mesure requis pour des enjeux complexes et à forts risques.",
  pt: "Na Kaplan & Kaplan Legal and Advisory, uma representação sólida começa com uma compreensão clara de seus objetivos comerciais e pessoais. Abordamos cada assunto com a precisão, o cuidado e a estratégia personalizada exigidos para desafios complexos e de alto impacto.",
  it: "In Kaplan & Kaplan Legal and Advisory, una rappresentanza solida inizia con una chiara comprensione dei vostri obiettivi commerciali e personali. Affrontiamo ogni questione con la precisione, la cura e la strategia su misura richieste per sfide complesse e ad alto rischio.",
};

const PARA2: Record<string, string> = {
  en: "We build lasting relationships grounded in trust and diligence. Whether structuring a cross-border transaction, navigating government scrutiny, or resolving a sensitive dispute, our goal is to deliver Tier-1 institutional expertise with the dedicated responsiveness of a sophisticated boutique firm.",
  es: "Construimos relaciones duraderas basadas en la confianza y la diligencia. Ya sea estructurando una transacción transfronteriza, navegando el escrutinio gubernamental o resolviendo una disputa sensible, nuestro objetivo es brindar experiencia institucional de Nivel 1 con la capacidad de respuesta de una firma boutique sofisticada.",
  fr: "Nous construisons des relations durables fondées sur la confiance et la diligence. Qu'il s'agisse de structurer une transaction transfrontalière, de naviguer dans un contrôle gouvernemental ou de résoudre un différend sensible, notre objectif est d'offrir une expertise institutionnelle de premier plan avec la réactivité d'un cabinet boutique.",
  pt: "Construímos relacionamentos duradouros baseados em confiança e diligência. Seja estruturando uma transação transfronteiriça, navegando pelo escrutínio governamental ou resolvendo uma disputa sensível, nosso objetivo é oferecer expertise institucional de Tier-1 com a capacidade de resposta de um escritório boutique sofisticado.",
  it: "Costruiamo relazioni durature fondate sulla fiducia e la diligenza. Che si tratti di strutturare una transazione transfrontaliera, navigare il controllo governativo o risolvere una controversia delicata, il nostro obiettivo è offrire un'esperienza istituzionale di Tier-1 con la reattività di uno studio boutique sofisticato.",
};

export default function About() {
  const { lang } = useLang();
  const sectionLabel = SECTION_LABEL[lang] ?? "About Us";
  const tagline = TAGLINE[lang] ?? TAGLINE.en;
  const labels = METRIC_LABELS[lang] ?? METRIC_LABELS.en;
  const para1 = PARA1[lang] ?? PARA1.en;
  const para2 = PARA2[lang] ?? PARA2.en;

  return (
    <section id="about" className="bg-[#e6edf7] py-16 lg:py-24 scroll-mt-[72px]">
      <div className="container max-w-6xl mx-auto px-6 lg:px-16">

        {/* ── Header: large title + vertical divider + tagline ── */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-14 lg:mb-20">
          <h2 className="font-display font-bold text-[#183760] text-[40px] md:text-[52px] lg:text-[60px] leading-[1.05] shrink-0">
            {sectionLabel}
          </h2>
          <div className="hidden md:block w-[3px] h-[50px] my-1 bg-[#183760]/40 shrink-0" aria-hidden="true" />
          <p className="text-[#183760]/90 text-base md:text-lg lg:text-[20px] font-light leading-snug max-w-2xl">
            {tagline}
          </p>
        </div>

        {/* ── Body: two-column on lg, stacked on mobile ── */}
        <div className="grid lg:grid-cols-[35fr_65fr] gap-10 lg:gap-16 items-start">

          {/* Left — metrics side by side */}
          <div className="flex flex-row gap-10 lg:gap-14 items-start">
            {[
              { num: "40+", label: labels[0] },
              { num: "6",   label: labels[1] },
            ].map((m) => (
              <div key={m.label} className="flex flex-col items-center">
                <div className="font-display font-bold text-[64px] md:text-[80px] lg:text-[88px] leading-none text-[#2f5c99]">
                  {m.num}
                </div>
                <div className="mt-2 text-[11px] md:text-[13px] font-bold uppercase tracking-[0.15em] text-[#183760] whitespace-pre-line text-center">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Right — two full paragraphs */}
          <div className="flex flex-col gap-5">
            <p className="text-[15px] md:text-[16px] lg:text-[17px] font-light text-[#183760] leading-relaxed text-justify">
              {para1}
            </p>
            <p className="text-[15px] md:text-[16px] lg:text-[17px] font-light text-[#183760] leading-relaxed text-justify">
              {para2}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
