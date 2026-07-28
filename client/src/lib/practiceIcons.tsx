/**
 * Minimalist line icons (stroke #2f5c99 per spec) for each practice area.
 * lucide-react — Iconos: Línea minimalista en #2f5c99.
 */
import {
  Briefcase,
  Globe2,
  Plane,
  Scale,
  ScrollText,
  Landmark,
  Map,
  Trophy,
  ShieldAlert,
  Vote,
  SearchCheck,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export const PRACTICE_ICONS: Record<string, LucideIcon> = {
  business: Briefcase,
  immigration: Globe2,
  aviation: Plane,
  civil: Scale,
  estate: ScrollText,
  govrel: Landmark,
  latam: Map,
  sports: Trophy,
  natsec: ShieldAlert,
  election: Vote,
  investigations: SearchCheck,
  kre: ShieldCheck,
};
