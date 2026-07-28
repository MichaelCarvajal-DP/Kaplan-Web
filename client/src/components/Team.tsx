/**
 * Team section — Canva reference: "A Team of Professionals" on medium-blue (#2f5c99)
 * background. Heading (Cormorant, white, two lines) with a vertical divider and an
 * intro sentence to its right. Two partner columns: Bruce first (BCK monogram tile),
 * Grant second (color photo tile, rounded 8px). Each column: small square portrait
 * left, name (Cormorant white, "…, Esq.") + role + credentials (Inter bold) right,
 * then justified light bio paragraphs and an outlined white "READ FULL BIOGRAPHY"
 * button that opens the slide-in BioPanel.
 */
import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { CONTENT } from "@/lib/content";
import { splitParagraphs } from "@/lib/paragraphs";
import BioPanel, { type PartnerKey } from "./BioPanel";

const READ_MORE: Record<string, string> = {
  en: "Read Full Biography",
  es: "Leer Biografía Completa",
  fr: "Lire la Biographie Complète",
  pt: "Ler Biografia Completa",
  it: "Leggi la Biografia Completa",
};

const TEAM_TITLE: Record<string, [string, string]> = {
  en: ["A Team of", "Professionals"],
  es: ["Un Equipo de", "Profesionales"],
  fr: ["Une Équipe de", "Professionnels"],
  pt: ["Uma Equipe de", "Profissionais"],
  it: ["Una Squadra di", "Professionisti"],
};

const TEAM_INTRO: Record<string, string> = {
  en: "Our attorneys bring decades of combined experience and multilingual capabilities to serve our diverse clientele.",
  es: "Nuestros abogados aportan décadas de experiencia combinada y capacidades multilingües para servir a nuestra diversa clientela.",
  fr: "Nos avocats apportent des décennies d'expérience combinée et des capacités multilingues au service de notre clientèle diversifiée.",
  pt: "Nossos advogados reúnem décadas de experiência combinada e capacidades multilíngues para atender nossa clientela diversificada.",
  it: "I nostri avvocati offrono decenni di esperienza combinata e competenze multilingue al servizio della nostra clientela diversificata.",
};

const ROLE: Record<PartnerKey, Record<string, string>> = {
  grant: {
    en: "Managing Partner",
    es: "Socio Director",
    fr: "Associé Gérant",
    pt: "Sócio-Diretor",
    it: "Managing Partner",
  },
  bruce: {
    en: "Partner",
    es: "Socio",
    fr: "Associé",
    pt: "Sócio",
    it: "Partner",
  },
};

const COMMISSIONER: Record<string, string> = {
  en: "Former Miami-Dade County Commissioner (Chairman, Health & Public Safety)",
  es: "Excomisionado del Condado de Miami-Dade (Presidente, Salud y Seguridad Pública)",
  fr: "Ancien Commissaire du Comté de Miami-Dade (Président, Santé et Sécurité Publique)",
  pt: "Ex-Comissário do Condado de Miami-Dade (Presidente, Saúde e Segurança Pública)",
  it: "Ex Commissario della Contea di Miami-Dade (Presidente, Salute e Sicurezza Pubblica)",
};

const LANGS: Record<PartnerKey, Record<string, string>> = {
  bruce: {
    en: "English, Spanish",
    es: "Inglés, Español",
    fr: "Anglais, Espagnol",
    pt: "Inglês, Espanhol",
    it: "Inglese, Spagnolo",
  },
  grant: {
    en: "English, Spanish, Portuguese",
    es: "Inglés, Español, Portugués",
    fr: "Anglais, Espagnol, Portugais",
    pt: "Inglês, Espanhol, Português",
    it: "Inglese, Spagnolo, Portoghese",
  },
};

type Partner = {
  key: PartnerKey;
  name: string;
  photo?: string;
  monogram?: string;
  credentials: (lang: string) => string[];
};

const PARTNERS: Partner[] = [
  {
    key: "bruce",
    name: "Bruce C. Kaplan, Esq.",
    monogram: "BCK",
    credentials: (lang) => [
      "Brooklyn Law School, JD | Union College, BA History",
      COMMISSIONER[lang],
      LANGS.bruce[lang],
    ],
  },
  {
    key: "grant",
    name: "Grant E. Kaplan, Esq.",
    photo: "/manus-storage/grant_photo_9afaf89d.jpg",
    credentials: (lang) => [
      "American University Washington College of Law, JD | University of Maryland, BA",
      LANGS.grant[lang],
    ],
  },
];

export default function Team() {
  const { lang } = useLang();
  const [open, setOpen] = useState<PartnerKey | null>(null);

  return (
    <section id="team" className="bg-[#2f5c99] py-20 lg:py-28 scroll-mt-[72px]">
      <div className="container">
        {/* Heading + divider + intro */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 mb-16 lg:mb-20">
          <h2 className="font-display font-bold text-white text-[44px] lg:text-[64px] leading-[1.05] shrink-0">
            {TEAM_TITLE[lang][0]}
            <br />
            {TEAM_TITLE[lang][1]}
          </h2>
          <div className="hidden md:block w-[3px] self-stretch my-3 bg-white/70" aria-hidden="true" />
          <p className="text-white/90 text-lg lg:text-[22px] font-light leading-snug max-w-2xl">
            {TEAM_INTRO[lang]}
          </p>
        </div>

        {/* Partner columns */}
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20">
          {PARTNERS.map((p) => (
            <article key={p.key} className="flex flex-col">
              <div className="flex items-start gap-6 lg:gap-8">
                {p.photo ? (
                  <img
                    src={p.photo}
                    alt={`${p.name} — Kaplan & Kaplan`}
                    className="w-40 h-52 lg:w-[210px] lg:h-[260px] object-cover object-top rounded-lg shrink-0 grayscale"
                  />
                ) : (
                  <div className="w-40 h-52 lg:w-[210px] lg:h-[260px] bg-[#e6edf7] rounded-lg flex items-center justify-center shrink-0">
                    <span className="font-display font-bold text-5xl lg:text-6xl text-[#2f5c99]">
                      {p.monogram}
                    </span>
                  </div>
                )}
                <div className="pt-1">
                  <h3 className="font-display font-bold text-white text-[30px] lg:text-[38px] leading-tight">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-white font-bold text-[15px]">{ROLE[p.key][lang]}</p>
                  {p.credentials(lang).map((c, i) => (
                    <p key={i} className="mt-3 text-white font-bold text-[15px] leading-snug max-w-md">
                      {c}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {splitParagraphs(CONTENT.shortBios[p.key][lang], 2).map((para, i) => (
                  <p
                    key={i}
                    className="text-white/90 font-light text-[15px] leading-relaxed text-justify"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <button
                onClick={() => setOpen(p.key)}
                className="mt-8 self-start bg-[#f5f5f5] text-[#2f5c99] font-bold uppercase tracking-wide text-[13px] px-7 py-3.5 rounded-md shadow-md hover:bg-white transition-colors duration-200 active:scale-[0.97]"
              >
                {READ_MORE[lang]}
              </button>
            </article>
          ))}
        </div>
      </div>

      <BioPanel partner={open} onClose={() => setOpen(null)} />
    </section>
  );
}
