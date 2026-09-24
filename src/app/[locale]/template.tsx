/**
 * Remount on every navigation (Next.js file convention) so the page-level
 * entrance animation replays on client-side route changes. Server component —
 * the animation itself is pure CSS in globals.css.
 */
export default function LocaleTemplate({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="page-entrance">{children}</div>;
}