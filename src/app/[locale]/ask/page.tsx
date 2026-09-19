import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {searchContent} from '@/server/services/search';
import {SearchResults} from '@/components/search-results';
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'daily'});
  return {title: t('ask') + ' · Sanatan Dharma'};
}

export default async function AskPage({
  params,
  searchParams
}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{q?: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('daily');
  const input = await searchParams;
  const q = typeof input.q === 'string' ? input.q.trim().slice(0, 300) : '';
  const results = q ? searchContent(q, locale).slice(0, 5) : [];
  const questions =
    locale === 'hi'
      ? ['धर्म क्या है?', 'एकादशी क्या है?', 'कर्म क्या है?', 'हनुमान कौन हैं?', 'दीपावली कब है?', 'मोक्ष क्या है?']
      : ['What is dharma?', 'What is Ekadashi?', 'What is karma?', 'Who is Hanuman?', 'When is Navratri?', 'What is moksha?'];
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
      <p className="text-xs uppercase tracking-widest text-primary">
        {t('understand')}
      </p>
      <h1 className="mt-4 font-serif text-4xl">{t('ask')}</h1>
      <p className="mt-4 text-lg text-muted">{t('askIntro')}</p>
      <aside className="my-8 rounded-xl border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold">{t('askNotice')}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {t('askNoticeBody')}
        </p>
      </aside>
      <form action={`/${locale}/ask`} className="flex flex-col gap-3">
        <label htmlFor="question" className="text-sm font-semibold">
          {t('question')}
        </label>
        <textarea
          id="question"
          name="q"
          required
          maxLength={300}
          rows={3}
          defaultValue={q}
          className="w-full resize-y rounded-xl border border-border bg-surface p-4"
        />
        <button className="self-start rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          {t('find')}
        </button>
      </form>
      <p className="mt-6 text-xs text-muted">{t('askLimit')}</p>
      {q ? (
        <section className="mt-10">
          <h2 className="mb-4 font-serif text-2xl">{t('results')}</h2>
          {results.length ? (
            <SearchResults results={results} />
          ) : (
            <p className="rounded-xl border border-border p-6 text-muted">
              {t('askEmpty')}
            </p>
          )}
        </section>
      ) : (
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-semibold">{t('suggested')}</h2>
          <div className="flex flex-wrap gap-3">
            {questions.map((question) => (
              <Link
                href={`/ask?q=${encodeURIComponent(question)}`}
                key={question}
                className="rounded-full border border-border px-4 py-2 text-sm hover:bg-surface"
              >
                {question} ↗
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
