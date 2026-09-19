import {Suspense} from 'react';
import {getTranslations} from 'next-intl/server';
import {NavigationLink as Link} from './navigation-link';
import {BrandMark} from './brand-mark';
import {Icon} from '@/components/ui/icon';
import {LanguageSwitcher} from '@/components/layout/language-switcher';
import {Avatar} from '@/components/ui/avatar';
import {getSession} from '@/server/services/auth';

const navItems = [
  {href: '/', key: 'today'},
  {href: '/panchang', key: 'panchang'},
  {href: '/practise', key: 'practise'},
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
  const authT = await getTranslations('auth');
  const {user} = await getSession();
  const displayName =
    (user?.user_metadata?.name as string | undefined) ?? user?.email ?? '';

  return (
    <header className="site-header sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-2 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight text-foreground"
          >
            <BrandMark className="h-10 w-10 shrink-0 text-secondary" />
            <span className="brand-wordmark">Sanatan Dharma</span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 xl:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-lg px-2 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-strong hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-strong hover:text-foreground [&::-webkit-details-marker]:hidden">
                {t('explore')}
                <Icon
                  name="chevronDown"
                  className="h-4 w-4 transition-transform group-open:rotate-180"
                />
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
              className="rounded-lg px-2 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-strong hover:text-foreground"
            >
              {t('askDharma')}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label={t('search')}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-strong hover:text-foreground xl:inline-flex"
          >
            <Icon name="search" className="h-5 w-5" />
          </Link>
          <Link
            href="/library"
            aria-label={t('library')}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-strong hover:text-foreground xl:inline-flex"
          >
            <Icon name="bookmark" className="h-5 w-5" />
          </Link>
          <Suspense fallback={<span className="w-20" />}>
            <LanguageSwitcher />
          </Suspense>
          {user ? (
            <Link
              href="/profile"
              aria-label={t('profile')}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-surface-strong"
            >
              <Avatar name={displayName} size="sm" />
            </Link>
          ) : (
            <Link
              href="/login"
              aria-label={authT('signIn')}
              className="header-signin"
            >
              <Icon name="user" className="h-4 w-4 sm:hidden" />
              <span className="hidden sm:inline">{authT('signIn')}</span>
            </Link>
          )}

          <details className="group xl:hidden">
            <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-strong hover:text-foreground [&::-webkit-details-marker]:hidden">
              <Icon name="menu" className="h-5 w-5" />
              <span className="sr-only">{t('openMenu')}</span>
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute left-0 right-0 top-full max-h-[75vh] overflow-y-auto border-b border-border bg-surface px-4 py-4 shadow-md"
            >
              <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-1">
                {[
                  {href: '/', key: 'today'},
                  {href: '/panchang', key: 'panchang'},
                  {href: '/practise', key: 'practise'},
                  {href: '/learn', key: 'learn'},
                  {href: '/scriptures', key: 'scriptures'},
                  ...exploreItems.map((item) => ({...item, href: item.href})),
                  {href: '/ask', key: 'askDharma'},
                  {href: '/search', key: 'search'},
                  {href: '/library', key: 'library'}
                ].map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-strong"
                  >
                    {t(item.key)}
                  </Link>
                ))}
                {user ? (
                  <Link
                    href="/profile"
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-strong"
                  >
                    {t('profile')}
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-lg px-3 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-surface-strong"
                  >
                    {authT('signIn')}
                  </Link>
                )}
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
