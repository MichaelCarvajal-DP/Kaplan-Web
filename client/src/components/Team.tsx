/**
 * Partner directory (Team & Bios) — deep navy section (#183760) per Canva reference.
 * Two partner cards with photo/monogram, name (Cormorant), role, short bio, and a
 * "Read Full Biography" button that opens the right slide-in BioPanel.
 */
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { CONTENT } from "@/lib/content";
import BioPanel, { type PartnerKey } from "./BioPanel";

const READ_MORE: Record<string, string> = {
  en: "Read Full Biography",
  es: "Leer Biografía Completa",
  fr: "Lire la Biographie Complète",
  pt: "Ler Biografia Completa",
  it: "Leggi la Biografia Completa",
};

const TEAM_TITLE: Record<string, string> = {
  en: "Partner Directory",
  es: "Directorio de Socios",
  fr: "Répertoire des Associés",
  pt: "Diretório de Sócios",
  it: "Elenco dei Soci",
};

const PARTNERS: {
  key: PartnerKey;
  name: string;
  role: string;
  photo?: string;
  initials: string;
}[] = [
  {
    key: "grant",
    name: "Grant E. Kaplan",
    role: "Managing Partner",
    photo: "/manus-storage/grant_photo_9afaf89d.jpg",
    initials: "GK",
  },
  {
    key: "bruce",
    name: "Bruce C. Kaplan",
    role: "Partner",
    initials: "BK",
  },
];

export default function Team() {
  const { lang } = useLang();
  const [open, setOpen] = useState<PartnerKey | null>(null);

  return (
    <section id="team" className="bg-[#183760] py-20 lg:py-28 scroll-mt-[72px]">
      <div className="container">
        <h2 className="font-display font-bold text-3xl lg:text-[40px] text-[#e6edf7] mb-14">
          {TEAM_TITLE[lang]}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {PARTNERS.map((p) => (
            <article
              key={p.key}
              className="bg-[#f5f5f5] rounded-lg overflow-hidden shadow-xl shadow-black/20 flex flex-col"
            >
              {p.photo ? (
                <img
                  src={p.photo}
                  alt={`${p.name} — ${p.role}, Kaplan & Kaplan`}
                  className="w-full h-80 object-cover object-top grayscale"
                />
              ) : (
                <div className="w-full h-80 bg-[#e6edf7] flex items-center justify-center">
                  <span className="font-display font-bold text-7xl text-[#2f5c99]/70">
                    {p.initials}
                  </span>
                </div>
              )}
              <div className="p-7 lg:p-8 flex flex-col flex-1">
                <h3 className="font-display font-bold text-[28px] text-[#183760]">{p.name}</h3>
                <p className="mt-1 text-[13px] font-bold uppercase tracking-[0.14em] text-[#2f5c99]">
                  {p.role}
                </p>
                <p className="mt-4 text-[14px] font-light text-[#183760] leading-relaxed flex-1">
                  {CONTENT.shortBios[p.key][lang]}
                </p>
                <button
                  onClick={() => setOpen(p.key)}
                  className="mt-6 inline-flex items-center gap-2 self-start text-[13px] font-bold uppercase tracking-wide text-[#2f5c99] border-b-2 border-[#2f5c99] pb-1 hover:text-[#183760] hover:border-[#183760] transition-colors duration-200"
                >
                  {READ_MORE[lang]}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <BioPanel partner={open} onClose={() => setOpen(null)} />
    </section>
  );
}

