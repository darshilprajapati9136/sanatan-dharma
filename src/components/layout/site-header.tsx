import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Icon} from '@/components/ui/icon';
import {LanguageSwitcher} from '@/components/layout/language-switcher';
import {Badge} from '@/components/ui/badge';

const navItems = [
  {href: '/learn', key: 'learn'},
  {href: '/scriptures', key: 'scriptures'}
] as const;

const exploreItems = [
  {href: '/explore/deities', key: 'deities'},
  {href: '/explore/mantras', key: 'mantras'},
  {href: '/explore/festivals', key: 'festivals'},
  {href: '/explore/traditions', key: 'traditions'},
  {href: '/explore/philosophy', key: 'philosophy'}
] as const;

export async function SiteHeader() {
  const t = await getTranslations('nav');

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight text-foreground"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Icon name="sparkles" className="h-5 w-5" />
            </span>
            <span>Sanatan Dharma</span>
            <Badge className="hidden sm:inline-flex">{t('beta')}</Badge>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-strong hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-strong hover:text-foreground [&::-webkit-details-marker]:hidden">
                {t('explore')}
                <Icon name="chevronDown" className="h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute left-0 top-full mt-2 w-48 rounded-xl border border-border bg-surface p-1.5 shadow-lg">
                {exploreItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-surface-strong"
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            </details>
            <Link
              href="/ask"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-strong hover:text-foreground"
            >
              {t('askDharma')}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label={t('search')}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-strong hover:text-foreground lg:inline-flex"
          >
            <Icon name="search" className="h-5 w-5" />
          </Link>
          <Link
            href="/library"
            aria-label={t('library')}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-strong hover:text-foreground lg:inline-flex"
          >
            <Icon name="bookmark" className="h-5 w-5" />
          </Link>
          <LanguageSwitcher />
          <Link
            href="/profile"
            aria-label={t('profile')}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-strong hover:text-foreground lg:inline-flex"
          >
            <Icon name="user" className="h-5 w-5" />
          </Link>

          <details className="group lg:hidden">
            <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-strong hover:text-foreground [&::-webkit-details-marker]:hidden">
              <Icon name="menu" className="h-5 w-5" />
              <span className="sr-only">{t('openMenu')}</span>
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute left-0 right-0 top-full border-b border-border bg-surface px-4 py-4 shadow-md"
            >
              <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-1">
                {[
                  {href: '/', key: 'home'},
                  {href: '/learn', key: 'learn'},
                  {href: '/scriptures', key: 'scriptures'},
                  ...exploreItems.map((item) => ({...item, href: item.href})),
                  {href: '/ask', key: 'askDharma'},
                  {href: '/search', key: 'search'},
                  {href: '/library', key: 'library'},
                  {href: '/profile', key: 'profile'}
                ].map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-strong"
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}