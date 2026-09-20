/** Production origin. Empty env values fall back to localhost so a blank
 *  dashboard variable can never crash the build (`new URL('')` throws). */
export function siteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? '').trim();
  const base = raw || 'http://localhost:3000';
  return base.endsWith('/') ? base.slice(0, -1) : base;
}
