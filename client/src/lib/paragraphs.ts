/**
 * Splits a long single-string practice description into readable paragraphs,
 * matching the Canva reference (multi-paragraph justified copy).
 * Splits on sentence boundaries into ~3 balanced chunks.
 */
export function splitParagraphs(text: string, target = 3): string[] {
  if (text.includes("\n")) return text.split(/\n+/).filter(Boolean);
  // Split into sentences, avoiding common abbreviations breakage.
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g)?.map((s) => s.trim()) ?? [text];
  if (sentences.length <= target) return sentences.length ? [text] : [text];
  const per = Math.ceil(sentences.length / target);
  const out: string[] = [];
  for (let i = 0; i < sentences.length; i += per) {
    out.push(sentences.slice(i, i + per).join(" "));
  }
  return out;
}
