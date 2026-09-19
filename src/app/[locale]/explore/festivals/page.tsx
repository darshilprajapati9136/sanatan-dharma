import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {festivalGuides} from '@/content/festivals';
import {pickLocalizedText} from '@/lib/localized';
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'daily'});
  return {title: t('festivals') + ' · Sanatan Dharma'};
}

export default async function FestivalsPage({
  params,
  searchParams
}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{kind?: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('daily');
  const {kind} = await searchParams;
  const filter = kind === 'festival' || kind === 'vrat' ? kind : 'all';
  const guides = festivalGuides.filter(
    (g) => filter === 'all' || g.kind === filter
  );
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 lg:px-8">
      <p className="text-xs uppercase tracking-widest text-primary">
        {t('understand')} / {t('practiceLabel')}
      </p>
      <h1 className="mt-4 font-serif text-4xl">{t('festivals')}</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">
        {t('festivalIntro')}
      </p>
      <nav aria-label={t('festivals')} className="my-8 flex flex-wrap gap-2">
        {['all', 'festival', 'vrat'].map((k) => (
          <Link
            key={k}
            href={
              k === 'all'
                ? '/explore/festivals'
                : `/explore/festivals?kind=${k}`
            }
            aria-current={k === filter ? 'page' : undefined}
            className={`rounded-full border px-5 py-2 text-sm ${k === filter ? 'border-secondary bg-secondary text-secondary-foreground' : 'border-border bg-surface hover:border-primary'}`}
          >
            {t(k)}
          </Link>
        ))}
      </nav>
      <p className="mb-6 text-sm text-muted">{t('dateNote')}</p>
      <div className="divide-y divide-border border-y border-border">
        {guides.map((g, i) => (
          <Link
            key={g.slug}
            href={`/explore/festivals/${g.slug}`}
            className="group grid gap-4 py-8 sm:grid-cols-[50px_1fr_24px]"
          >
            <span className="font-serif text-2xl text-primary">0{i + 1}</span>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">
                {t(g.kind)}
              </p>
              <h2 className="mt-2 font-serif text-2xl group-hover:text-primary">
                {pickLocalizedText(locale, g.title.en, g.title.hi)}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                {pickLocalizedText(locale, g.summary.en, g.summary.hi)}
              </p>
            </div>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-xs leading-relaxed text-muted">{t('regional')}</p>
    </section>
  );
}
