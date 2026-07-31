/**
 * Partner extended-bio panel — spec: slides in right→left over the main screen.
 * Color photo left (radius 8px), full text right. Close button top-right with
 * arrow icon, 2px border #183760. Name Cormorant Garamond Bold 36px #2f5c99,
 * role/credentials Inter Bold 13px #2f5c99, bio body Inter Light 14px #183760.
 */
import { useEffect } from "react";
import { X } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { CONTENT } from "@/lib/content";

export type PartnerKey = "grant" | "bruce";

const PARTNER_META: Record<
  PartnerKey,
  { name: string; role: string; photo?: string; initials: string }
> = {
  grant: {
    name: "Grant E. Kaplan",
    role: "Managing Partner · J.D., LL.M.",
    photo: "/manus-storage/grant_photo_9afaf89d.jpg",
    initials: "GK",
  },
  bruce: {
    name: "Bruce C. Kaplan",
    role: "Founding Partner · Former Miami-Dade County Commissioner",
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663863390635/yTqnVxZuyVPYqGkX.png",
    initials: "BK",
  },
};

export default function BioPanel({
  partner,
  onClose,
}: {
  partner: PartnerKey | null;
  onClose: () => void;
}) {
  const { lang } = useLang();

  useEffect(() => {
    if (partner) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [partner, onClose]);

  const meta = partner ? PARTNER_META[partner] : null;
  const paras = partner ? CONTENT.extBios[partner][lang] : [];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-[#183760]/40 transition-opacity duration-300 ${
          partner ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      {/* Sliding panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-3xl bg-[#f5f5f5] shadow-[-24px_0_48px_rgba(24,55,96,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          partner ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!partner}
      >
        {meta && (
          <div className="h-full overflow-y-auto p-8 lg:p-12">
            <div className="flex justify-end mb-6">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 border-2 border-[#183760] text-[#183760] text-[14px] font-bold px-4 py-2 rounded-sm hover:bg-[#183760] hover:text-[#f5f5f5] active:scale-[0.97] transition-all duration-200"
              >
                <X className="h-4 w-4" />
                Close
              </button>
            </div>

            <div className="grid md:grid-cols-[240px_1fr] gap-8 items-start">
              {meta.photo ? (
                <img
                  src={meta.photo}
                  alt={`${meta.name} — Kaplan & Kaplan`}
                  className="w-full rounded-[8px] object-cover shadow-md"
                />
              ) : (
                <div className="w-full aspect-[3/4] rounded-[8px] bg-[#e6edf7] flex items-center justify-center shadow-md">
                  <span className="font-display font-bold text-6xl text-[#2f5c99]">
                    {meta.initials}
                  </span>
                </div>
              )}

              <div>
                <h3 className="font-display font-bold text-[36px] leading-tight text-[#2f5c99]">
                  {meta.name}
                </h3>
                <p className="mt-2 text-[13px] font-bold text-[#2f5c99] uppercase tracking-wide">
                  {meta.role}
                </p>
                <div className="mt-6 space-y-4">
                  {paras.map((p, i) => (
                    <p key={i} className="text-[14px] font-light text-[#183760] leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
