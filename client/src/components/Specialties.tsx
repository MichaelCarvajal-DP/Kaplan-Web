/**
 * Specialties — spec: bg #f5f5f5. Two tabs (Legal 8 items / Consulting 6 items;
 * Government Relations & LatAm shared). Left sidebar menu: bg #e6edf7, rounded,
 * active indicator = 3px vertical line #2f5c99. Right panel: title Cormorant
 * Garamond Bold 32px #183760, body Inter Light 15px #183760 lh 1.6, minimalist
 * line icon in #2f5c99. Smooth transition on tab change.
 */
import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { CONTENT } from "@/lib/content";
import { PRACTICE_ICONS } from "@/lib/practiceIcons";

export default function Specialties({
  vertical,
  onVerticalChange,
}: {
  vertical: "legal" | "consulting";
  onVerticalChange: (v: "legal" | "consulting") => void;
}) {
  const { lang } = useLang();
  const order = vertical === "legal" ? CONTENT.legalOrder : CONTENT.consultingOrder;
  const [selected, setSelected] = useState<string>(order[0]);
  const [fading, setFading] = useState(false);

  // Reset selection when the vertical changes
  useEffect(() => {
    setFading(true);
    const t = setTimeout(() => {
      setSelected(order[0]);
      setFading(false);
    }, 180);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vertical]);

  const select = (key: string) => {
    if (key === selected) return;
    setFading(true);
    setTimeout(() => {
      setSelected(key);
      setFading(false);
    }, 150);
  };

  const practice = CONTENT.practices[selected as keyof typeof CONTENT.practices];
  const Icon = PRACTICE_ICONS[selected];

  return (
    <section id="specialties" className="bg-[#f5f5f5] py-20 lg:py-28 scroll-mt-[72px]">
      <div className="container">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-12 border-b border-[#2f5c99]/15 pb-0">
          {(["legal", "consulting"] as const).map((v) => (
            <button
              key={v}
              onClick={() => onVerticalChange(v)}
              className={`px-6 py-3 text-[14px] font-bold transition-colors duration-200 border-b-2 -mb-px ${
                vertical === v
                  ? "text-[#183760] border-[#2f5c99]"
                  : "text-[#183760]/50 border-transparent hover:text-[#183760]"
              }`}
            >
              {v === "legal" ? CONTENT.tabLegal[lang] : CONTENT.tabConsulting[lang]}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-10">
          {/* Left sidebar menu */}
          <nav className="bg-[#e6edf7] rounded-xl p-3 self-start w-full">
            {order.map((key) => {
              const isActive = key === selected;
              return (
                <button
                  key={key}
                  onClick={() => select(key)}
                  className={`relative w-full text-left px-4 py-3.5 rounded-md text-[14px] transition-all duration-200 ${
                    isActive
                      ? "bg-[#f5f5f5] font-bold text-[#183760] shadow-sm"
                      : "font-normal text-[#183760]/80 hover:bg-[#f5f5f5]/60"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-[#2f5c99] rounded-full" />
                  )}
                  {CONTENT.practices[key as keyof typeof CONTENT.practices].name}
                </button>
              );
            })}
          </nav>

          {/* Right detail panel */}
          <div
            className={`transition-all duration-300 ${
              fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            {Icon && (
              <div className="w-14 h-14 rounded-lg bg-[#e6edf7] flex items-center justify-center mb-6">
                <Icon className="h-7 w-7 text-[#2f5c99]" strokeWidth={1.5} />
              </div>
            )}
            <h2 className="font-display font-bold text-3xl lg:text-[32px] text-[#183760] mb-6">
              {practice.name}
            </h2>
            <p className="text-[15px] font-light text-[#183760] leading-[1.6] max-w-3xl whitespace-pre-line">
              {practice.desc[lang]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

