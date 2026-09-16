/**
 * Picks the text for the active locale, falling back to the other language
 * when the preferred one is missing. Never returns null.
 */
export function pickLocalizedText(
  locale: string,
  en: string | null | undefined,
  hi: string | null | undefined
): string {
  if (locale === 'hi') {
    return hi ?? en ?? '';
  }

  return en ?? hi ?? '';
}
