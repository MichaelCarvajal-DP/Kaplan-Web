/**
 * Specialties — Canva reference fidelity:
 * Left column: thick blue vertical rule at far left; uppercase bold "LEGAL SERVICES"
 * header with chevron; plain blue items, active item = small blue accent bar + bold;
 * below the list a separate outlined "CONSULTING SERVICES ▾" box that expands.
 * Right column: large icon beside a HUGE serif title (Cormorant Garamond Bold),
 * ~3 justified paragraphs in blue-toned text, "SCHEDULE A CONSULTATION" solid button
 * aligned bottom-right.
 */
import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { CONTENT } from "@/lib/content";
import { PRACTICE_ICONS } from "@/lib/practiceIcons";
import { splitParagraphs } from "@/lib/paragraphs";
import { ChevronDown } from "lucide-react";

export default function Specialties({
  vertical,
  onVerticalChange,
}: {
  vertical: "legal" | "consulting";
  onVerticalChange: (v: "legal" | "consulting") => void;
}) {
  const { lang } = useLang();
  const [selected, setSelected] = useState<string>(CONTENT.legalOrder[0]);
  const [fading, setFading] = useState(false);

  // When the vertical changes (e.g., from Hero buttons), select its first item.
  useEffect(() => {
    const order = vertical === "legal" ? CONTENT.legalOrder : CONTENT.consultingOrder;
    setFading(true);
    const t = setTimeout(() => {
      setSelected(order[0]);
      setFading(false);
    }, 180);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vertical]);

  const select = (key: string, v: "legal" | "consulting") => {
    if (v !== vertical) onVerticalChange(v);
    if (key === selected) return;
    setFading(true);
    setTimeout(() => {
      setSelected(key);
      setFading(false);
    }, 150);
  };

  const practice = CONTENT.practices[selected as keyof typeof CONTENT.practices];
  const Icon = PRACTICE_ICONS[selected];
  const paragraphs = splitParagraphs(practice.desc[lang]);

  const goContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const legalOpen = vertical === "legal";
  const consultingOpen = vertical === "consulting";

  const renderGroup = (
    v: "legal" | "consulting",
    label: string,
    order: readonly string[],
    open: boolean,
  ) => (
    <div>
      <button
        onClick={() => onVerticalChange(v)}
        className="w-full flex items-center justify-between gap-3 text-left"
      >
        <span
          className="text-[19px] font-bold uppercase tracking-wide text-[#2f5c99]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {label}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-[#2f5c99] shrink-0 transition-transform duration-300 ${
            open ? "" : "-rotate-90"
          }`}
          strokeWidth={2.5}
          fill="currentColor"
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-1">
            {order.map((key) => {
              const isActive = key === selected && open;
              return (
                <li key={key}>
                  <button
                    onClick={() => select(key, v)}
                    className={`relative w-full text-left pl-4 pr-2 py-2 text-[17px] transition-colors duration-200 ${
                      isActive
                        ? "font-semibold text-[#183760]"
                        : "font-normal text-[#2f5c99] hover:text-[#183760]"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[#2f5c99]" />
                    )}
                    {CONTENT.practices[key as keyof typeof CONTENT.practices].name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <section id="specialties" className="bg-white py-16 lg:py-28 scroll-mt-[72px]">
      <div className="container">
        <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-20">
          {/* Left sidebar — Canva: thick blue rule down the far left */}
          <div className="self-start lg:sticky lg:top-[100px] w-full border-l-[3px] border-[#2f5c99] pl-6 py-2">
            {renderGroup("legal", CONTENT.tabLegal[lang], CONTENT.legalOrder, legalOpen)}

            {/* Consulting Services — outlined dropdown box per Canva */}
            <div
              className={`mt-10 border-2 border-[#2f5c99] rounded-md transition-all duration-300 ${
                consultingOpen ? "px-5 py-4" : "px-5 py-3.5"
              }`}
            >
              {renderGroup(
                "consulting",
                CONTENT.tabConsulting[lang],
                CONTENT.consultingOrder,
                consultingOpen,
              )}
            </div>
          </div>

          {/* Right detail panel */}
          <div
            className={`transition-all duration-300 ${
              fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            {/* Icon beside the huge serif title, per Canva */}
            <div className="flex items-center gap-6 mb-8">
              {Icon && (
                <Icon
                  className="h-16 w-16 lg:h-20 lg:w-20 text-[#2f5c99] shrink-0"
                  strokeWidth={1.25}
                />
              )}
              <h2 className="font-display font-bold text-[40px] md:text-[56px] lg:text-[68px] leading-[1.05] text-[#2f5c99]">
                {practice.name}
              </h2>
            </div>

            <div className="flex flex-col gap-5 max-w-3xl">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[16px] lg:text-[17px] text-[#2f5c99] leading-[1.65] text-justify"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 flex justify-end max-w-3xl">
              <button
                onClick={goContact}
                className="bg-[#2f5c99] text-white font-bold uppercase tracking-wide text-[15px] px-8 py-4 rounded-lg hover:bg-[#183760] active:scale-[0.97] transition-all duration-200 shadow-md"
              >
                {CONTENT.cta[lang]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
