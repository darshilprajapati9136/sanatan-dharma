'use client';

import {useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {Icon} from '@/components/ui/icon';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const targetLocale = locale === 'en' ? 'hi' : 'en';
  const label = locale === 'en' ? 'हिन्दी' : 'English';

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      aria-label={`Switch language to ${label}`}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-strong hover:text-foreground"
    >
      <Icon name="globe" className="h-4 w-4" />
      {label}
    </Link>
  );
}