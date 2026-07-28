/**
 * Intake form — spec: bg #e6edf7, 1/3 vs 2/3 layout. Left: title Cormorant Bold
 * 36px #183760 + physical contact info. Right: secure 6-field form; inputs bg
 * #f5f5f5 with 1px #2f5c99 border, Inter Light 14px; intl phone prefix select;
 * submit button bg #2f5c99 text #f5f5f5 Inter Bold 14px "Submit Secure Inquiry →".
 */
import { useState } from "react";
import { MapPin, Phone, ArrowRight, Lock } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/contexts/LanguageContext";
import { CONTENT } from "@/lib/content";

const LABELS: Record<
  string,
  {
    fullName: string;
    email: string;
    phone: string;
    interest: string;
    overview: string;
    submit: string;
    select: string;
    sent: string;
    required: string;
  }
> = {
  en: {
    fullName: "Full Name*",
    email: "Email Address*",
    phone: "Phone Number*",
    interest: "Primary Area of Interest",
    overview: "Subject Matter Overview",
    submit: "Submit Secure Inquiry",
    select: "Select an area…",
    sent: "Your inquiry has been received. We will respond with discretion.",
    required: "Please complete the required fields.",
  },
  es: {
    fullName: "Nombre Completo*",
    email: "Correo Electrónico*",
    phone: "Número de Teléfono*",
    interest: "Área Principal de Interés",
    overview: "Resumen del Asunto",
    submit: "Enviar Consulta Segura",
    select: "Seleccione un área…",
    sent: "Su consulta ha sido recibida. Responderemos con discreción.",
    required: "Por favor complete los campos requeridos.",
  },
  fr: {
    fullName: "Nom Complet*",
    email: "Adresse E-mail*",
    phone: "Numéro de Téléphone*",
    interest: "Domaine d'Intérêt Principal",
    overview: "Aperçu du Sujet",
    submit: "Envoyer une Demande Sécurisée",
    select: "Sélectionnez un domaine…",
    sent: "Votre demande a été reçue. Nous répondrons avec discrétion.",
    required: "Veuillez remplir les champs obligatoires.",
  },
  pt: {
    fullName: "Nome Completo*",
    email: "Endereço de E-mail*",
    phone: "Número de Telefone*",
    interest: "Área Principal de Interesse",
    overview: "Resumo do Assunto",
    submit: "Enviar Consulta Segura",
    select: "Selecione uma área…",
    sent: "Sua consulta foi recebida. Responderemos com discrição.",
    required: "Por favor, preencha os campos obrigatórios.",
  },
  it: {
    fullName: "Nome Completo*",
    email: "Indirizzo E-mail*",
    phone: "Numero di Telefono*",
    interest: "Area di Interesse Principale",
    overview: "Panoramica della Questione",
    submit: "Invia Richiesta Riservata",
    select: "Seleziona un'area…",
    sent: "La sua richiesta è stata ricevuta. Risponderemo con discrezione.",
    required: "Si prega di compilare i campi obbligatori.",
  },
};

const DIAL_CODES = [
  { code: "+1", label: "US +1" },
  { code: "+34", label: "ES +34" },
  { code: "+33", label: "FR +33" },
  { code: "+55", label: "BR +55" },
  { code: "+39", label: "IT +39" },
  { code: "+52", label: "MX +52" },
  { code: "+44", label: "UK +44" },
  { code: "+351", label: "PT +351" },
];

const inputCls =
  "w-full bg-[#f5f5f5] border border-[#2f5c99] rounded-sm px-4 py-3 text-[14px] font-light text-[#183760] placeholder:text-[#183760]/50 focus:outline-none focus:ring-2 focus:ring-[#2f5c99]/40 transition-shadow";

export default function Contact() {
  const { lang } = useLang();
  const t = LABELS[lang];
  const full = CONTENT.form[lang];
  const splitIdx = full.indexOf(". ");
  const title = splitIdx > -1 ? full.slice(0, splitIdx + 1) : full;
  const sub = splitIdx > -1 ? full.slice(splitIdx + 2) : "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    dial: "+1",
    phone: "",
    interest: "",
    overview: "",
  });

  const practiceNames = [
    ...CONTENT.legalOrder.map((k) => CONTENT.practices[k as keyof typeof CONTENT.practices].name),
    ...CONTENT.consultingOrder
      .filter((k) => !(CONTENT.legalOrder as readonly string[]).includes(k))
      .map((k) => CONTENT.practices[k as keyof typeof CONTENT.practices].name),
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error(t.required);
      return;
    }
    toast.success(t.sent);
    setForm({ name: "", email: "", dial: "+1", phone: "", interest: "", overview: "" });
  };

  return (
    <section id="contact" className="bg-[#e6edf7] py-20 lg:py-28 scroll-mt-[72px]">
      <div className="container grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
        {/* Left column */}
        <div>
          <h2 className="font-display font-bold text-[32px] lg:text-[36px] leading-tight text-[#183760]">
            {title}
          </h2>
          <p className="mt-5 text-[15px] font-light text-[#183760] leading-relaxed">{sub}</p>

          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-[#2f5c99] mt-0.5" strokeWidth={1.5} />
              <p className="text-[14px] font-light text-[#183760] leading-relaxed">
                9737 Doral Blvd
                <br />
                Doral, FL 33178
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-[#2f5c99]" strokeWidth={1.5} />
              <a
                href="tel:+13054072420"
                className="text-[14px] font-light text-[#183760] hover:text-[#2f5c99] transition-colors"
              >
                305-407-2420
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-[#2f5c99]" strokeWidth={1.5} />
              <p className="text-[12px] font-light text-[#183760]/80 uppercase tracking-wide">
                Secure &amp; Confidential
              </p>
            </div>
          </div>
        </div>

        {/* Right column — form */}
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-5 self-start">
          <div className="sm:col-span-1">
            <label className="block text-[12px] font-bold text-[#183760] mb-1.5">{t.fullName}</label>
            <input
              className={inputCls}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-[12px] font-bold text-[#183760] mb-1.5">{t.email}</label>
            <input
              type="email"
              className={inputCls}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-[12px] font-bold text-[#183760] mb-1.5">{t.phone}</label>
            <div className="flex gap-2">
              <select
                className="bg-[#f5f5f5] border border-[#2f5c99] rounded-sm px-2 py-3 text-[13px] font-light text-[#183760] focus:outline-none focus:ring-2 focus:ring-[#2f5c99]/40"
                value={form.dial}
                onChange={(e) => setForm({ ...form, dial: e.target.value })}
              >
                {DIAL_CODES.map((d) => (
                  <option key={d.code} value={d.code}>
                    {d.label}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                className={inputCls}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="sm:col-span-1">
            <label className="block text-[12px] font-bold text-[#183760] mb-1.5">{t.interest}</label>
            <select
              className="w-full bg-[#f5f5f5] border border-[#2f5c99] rounded-sm px-4 py-3 text-[14px] font-light text-[#183760] focus:outline-none focus:ring-2 focus:ring-[#2f5c99]/40"
              value={form.interest}
              onChange={(e) => setForm({ ...form, interest: e.target.value })}
            >
              <option value="">{t.select}</option>
              {practiceNames.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[12px] font-bold text-[#183760] mb-1.5">{t.overview}</label>
            <textarea
              rows={5}
              className={inputCls}
              value={form.overview}
              onChange={(e) => setForm({ ...form, overview: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#2f5c99] text-[#f5f5f5] text-[14px] font-bold px-8 py-3.5 rounded-sm hover:bg-[#183760] active:scale-[0.97] transition-all duration-200"
            >
              {t.submit}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
