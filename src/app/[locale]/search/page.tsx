import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Reveal} from '@/components/ui/reveal';
import {searchContent, getSearchEntries} from '@/server/services/search';
import {SearchResults} from '@/components/search-results';
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'daily'});
  return {title: t('searchTitle') + ' · Sanatan Dharma'};
}

export default async function SearchPage({
  params,
  searchParams
}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{q?: string; kind?: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('daily');
  const input = await searchParams;
  const q = typeof input.q === 'string' ? input.q.trim().slice(0, 300) : '';
  const kind = ['learn', 'festival', 'vrat', 'scripture', 'calendar'].includes(
    input.kind ?? ''
  )
    ? input.kind!
    : 'all';
  const results = q ? searchContent(q, locale, kind) : [];
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
      <Reveal>
        <h1 className="font-serif text-4xl">{t('searchTitle')}</h1>
        <p className="mt-4 leading-relaxed text-muted">{t('searchIntro')}</p>
      </Reveal>
      <Reveal>
        <form
          role="search"
          action={`/${locale}/search`}
          className="my-8 flex flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="q" className="sr-only">
            {t('searchTitle')}
          </label>
          <input
            id="q"
            name="q"
            type="search"
            maxLength={300}
            defaultValue={q}
            placeholder={t('searchPlaceholder')}
            className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-4 py-3"
          />
          <button className="rounded-lg bg-primary px-5 py-3 text-primary-foreground">
            {t('searchButton')}
          </button>
        </form>
      </Reveal>
      {q ? (
        <Reveal>
          <>
            <nav className="mb-6 flex flex-wrap gap-2" aria-label={t('results')}>
              {['all', 'learn', 'festival', 'vrat', 'scripture', 'calendar'].map(
                (k) => (
                  <Link
                    key={k}
                    href={`/search?q=${encodeURIComponent(q)}&kind=${k}`}
                    aria-current={k === kind ? 'page' : undefined}
                    className={`rounded-full border px-3 py-2 text-xs ${k === kind ? 'bg-secondary text-secondary-foreground' : 'bg-surface'}`}
                  >
                    {t(k)}
                  </Link>
                )
              )}
            </nav>
            <h2 className="mb-4 text-sm text-muted">
              {t('results')} ({results.length}) · “{q}”
            </h2>
            {results.length ? (
              <SearchResults results={results} />
            ) : (
              <div className="rounded-xl border border-border p-8">
                <h2 className="font-serif text-2xl">{t('noResults')}</h2>
                <p className="mt-3 text-muted">{t('noResultsBody')}</p>
              </div>
            )}
          </>
        </Reveal>
      ) : (
        <Reveal>
          <>
            <h2 className="mb-4 font-serif text-2xl">{t('browse')}</h2>
            <SearchResults
              results={getSearchEntries(locale).filter((e) =>
                [
                  'learn:dharma',
                  'learn:bhagavad-gita',
                  'festival:ekadashi',
                  'calendar:tithi'
                ].includes(e.id)
              )}
            />
          </>
        </Reveal>
      )}
    </section>
  );
}
