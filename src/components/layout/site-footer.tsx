import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Icon} from '@/components/ui/icon';

export async function SiteFooter() {
  const t = await getTranslations('footer');
  const tExplore = await getTranslations('nav');

  const exploreLinks = [
    {href: '/explore/deities', key: 'deities'},
    {href: '/explore/mantras', key: 'mantras'},
    {href: '/explore/festivals', key: 'festivals'},
    {href: '/learn', key: 'learn'},
    {href: '/scriptures', key: 'scriptures'}
  ] as const;

  const platformLinks = [
    {href: '/ask', key: 'askDharma'},
    {href: '/search', key: 'search'},
    {href: '/library', key: 'library'}
  ] as const;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Icon name="sparkles" className="h-5 w-5" />
            </span>
            Sanatan Dharma
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted">{t('tagline')}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{t('explore')}</h3>
          <ul className="mt-3 space-y-2">
            {exploreLinks.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                  {tExplore(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{t('platform')}</h3>
          <ul className="mt-3 space-y-2">
            {platformLinks.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                  {tExplore(link.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about" className="text-sm text-muted hover:text-foreground">
                {t('about')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} Sanatan Dharma. {t('copyright')}
          </p>
          <p className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-foreground">{t('privacy')}</Link>
            <Link href="/terms" className="hover:text-foreground">{t('terms')}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}