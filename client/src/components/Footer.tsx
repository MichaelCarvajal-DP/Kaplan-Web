/**
 * Footer — spec: bg #183760, four info columns + bottom bar with rights and
 * mandatory legal disclaimer. Logo silver/#f5f5f5, column titles Cormorant Bold
 * 16px #e6edf7, links Inter Light 13px #f5f5f5, 1px divider #2f5c99, bottom
 * text Inter Light 12px #e6edf7.
 */
import { useLang } from "@/contexts/LanguageContext";
import { CONTENT } from "@/lib/content";
import { toast } from "sonner";

const LOGO = "/manus-storage/logo_color_198cf3c1.png";

const TAGLINE: Record<string, string> = {
  en: "Providing sophisticated legal and advisory counsel for complex global matters.",
  es: "Brindando asesoría legal y de consultoría sofisticada para asuntos globales complejos.",
  fr: "Conseil juridique et stratégique sophistiqué pour des affaires mondiales complexes.",
  pt: "Oferecendo aconselhamento jurídico e consultivo sofisticado para questões globais complexas.",
  it: "Consulenza legale e strategica sofisticata per questioni globali complesse.",
};

const DISCLAIMER: Record<string, string> = {
  en: "Attorney Advertising. Prior results do not guarantee a similar outcome.",
  es: "Publicidad de Abogados. Los resultados anteriores no garantizan un desenlace similar.",
  fr: "Publicité d'avocats. Les résultats passés ne garantissent pas un résultat similaire.",
  pt: "Publicidade de Advogados. Resultados anteriores não garantem um resultado semelhante.",
  it: "Pubblicità Legale. I risultati precedenti non garantiscono un esito simile.",
};

const COL_TITLES: Record<string, [string, string, string]> = {
  en: ["The Firm", "Practice Areas", "Legal"],
  es: ["La Firma", "Áreas de Práctica", "Legales"],
  fr: ["Le Cabinet", "Domaines d'Expertise", "Juridique"],
  pt: ["O Escritório", "Áreas de Atuação", "Jurídico"],
  it: ["Lo Studio", "Aree di Pratica", "Legale"],
};

const LEGAL_LINKS: Record<string, string[]> = {
  en: ["Privacy Policy", "Terms of Use", "Disclaimer"],
  es: ["Política de Privacidad", "Términos de Uso", "Aviso Legal"],
  fr: ["Politique de Confidentialité", "Conditions d'Utilisation", "Avertissement"],
  pt: ["Política de Privacidade", "Termos de Uso", "Aviso Legal"],
  it: ["Informativa sulla Privacy", "Termini di Utilizzo", "Avvertenze"],
};

export default function Footer() {
  const { lang } = useLang();
  const nav = CONTENT.nav[lang];
  const cols = COL_TITLES[lang];

  const scrollTo = (id: string) => {
    if (id === "blog") {
      toast("Blog coming soon");
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const firmLinks: { label: string; id: string }[] = [
    { label: nav[1], id: "about" },
    { label: nav[2], id: "team" },
    { label: nav[3], id: "blog" },
    { label: nav[4], id: "contact" },
  ];

  const practiceLinks = [
    "Business Law",
    "Immigration Law",
    "Civil Litigation",
    "Estate Planning",
    "Government Relations & Contracting",
    "Latin America Practice",
  ];

  return (
    <footer className="bg-[#183760]">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 — logo + tagline */}
          <div>
            <img
              src={LOGO}
              alt="Kaplan & Kaplan Legal & Advisory Footer Monogram"
              className="h-12 w-auto brightness-0 invert opacity-90"
            />
            <p className="mt-5 text-[13px] font-light text-[#f5f5f5]/85 leading-relaxed max-w-xs">
              {TAGLINE[lang]}
            </p>
          </div>

          {/* Column 2 — The Firm */}
          <div>
            <h4 className="font-display font-bold text-[16px] text-[#e6edf7] mb-4">{cols[0]}</h4>
            <ul className="space-y-2.5">
              {firmLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="text-[13px] font-light text-[#f5f5f5] hover:text-[#e6edf7] hover:underline underline-offset-4 transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Practice Areas */}
          <div>
            <h4 className="font-display font-bold text-[16px] text-[#e6edf7] mb-4">{cols[1]}</h4>
            <ul className="space-y-2.5">
              {practiceLinks.map((p) => (
                <li key={p}>
                  <button
                    onClick={() => scrollTo("specialties")}
                    className="text-left text-[13px] font-light text-[#f5f5f5] hover:text-[#e6edf7] hover:underline underline-offset-4 transition-colors"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Legal + contact */}
          <div>
            <h4 className="font-display font-bold text-[16px] text-[#e6edf7] mb-4">{cols[2]}</h4>
            <ul className="space-y-2.5">
              {LEGAL_LINKS[lang].map((l) => (
                <li key={l}>
                  <button
                    onClick={() => toast("Coming soon")}
                    className="text-[13px] font-light text-[#f5f5f5] hover:text-[#e6edf7] hover:underline underline-offset-4 transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] font-light text-[#f5f5f5]/85 leading-relaxed">
              201 Alhambra Cir., Suite 600, Coral Gables, FL 33136
              <br />
              <a href="tel:+13054072420" className="hover:underline underline-offset-4">
                305-407-2420
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2f5c99]">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[12px] font-light text-[#e6edf7]">
            © {new Date().getFullYear()} Kaplan &amp; Kaplan Legal and Advisory. All rights reserved.
          </p>
          <p className="text-[12px] font-light text-[#e6edf7]/90">{DISCLAIMER[lang]}</p>
        </div>
      </div>
    </footer>
  );
}

