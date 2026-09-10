import {getTranslations, setRequestLocale} from 'next-intl/server';
import {EmptyState} from '@/components/ui/empty-state';
import {ButtonLink} from '@/components/ui/button';

export default async function SearchPage({
  params,
  searchParams
}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{q?: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'nav'});
  const tSearch = await getTranslations({locale, namespace: 'search'});
  const {q} = await searchParams;

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 lg:px-8">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
        {t('search')}
      </h1>
      <p className="mt-2 max-w-xl text-muted">{tSearch('intro')}</p>
      {q ? (
        <p className="mt-6 rounded-xl border border-border bg-surface px-5 py-4 text-sm">
          <span className="font-medium text-foreground">{tSearch('queryIntro')}:</span>{' '}
          <span className="text-muted">{q}</span>
        </p>
      ) : null}
      <div className="mt-8">
        <EmptyState
          icon="search"
          title={tSearch('emptyTitle')}
          description={tSearch('emptyDescription')}
        />
      </div>
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/" variant="outline">
          {t('home')}
        </ButtonLink>
      </div>
    </section>
  );
}