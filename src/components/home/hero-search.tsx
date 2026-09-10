'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {useRouter} from '@/i18n/navigation';
import {Button} from '@/components/ui/button';
import {Icon} from '@/components/ui/icon';

export function HeroSearch() {
  const t = useTranslations('nav');
  const router = useRouter();
  const [query, setQuery] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form
      role="search"
      aria-label={t('search')}
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="hero-search" className="sr-only">
        {t('searchPlaceholder')}
      </label>
      <input
        id="hero-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('searchPlaceholder')}
        className="h-12 w-full rounded-lg border border-border bg-surface px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
        autoComplete="off"
      />
      <Button type="submit" size="md" className="shrink-0">
        <Icon name="search" className="h-4 w-4" />
        {t('search')}
      </Button>
    </form>
  );
}