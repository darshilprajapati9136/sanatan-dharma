import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {ButtonLink} from '@/components/ui/button';
import {PanchangSummary} from '@/components/home/panchang-summary';
import {PracticeList} from '@/components/home/practice-list';
import {festivalGuides} from '@/content/festivals';
import {pickLocalizedText} from '@/lib/localized';
export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata'});
  return {title: t('title'), description: t('description')};
}
export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('daily');
  const date = new Intl.DateTimeFormat(locale === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata'
  }).format(new Date());
  return (
    <div className="mx-auto max-w-6xl px-4 lg:px-8">
      <div className="flex flex-wrap justify-between gap-2 border-b border-border py-5 text-xs text-muted">
        <p>{t('today')}</p>
        <p>{date} · IST</p>
      </div>
      <section className="grid items-center gap-10 py-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {t('eyebrow')}
          </p>
          <h1 className="mt-5 max-w-xl font-serif text-4xl font-medium leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            {t('intro')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/practise">{t('practiceLabel')}</ButtonLink>
            <ButtonLink href="/learn" variant="outline">
              {t('learnNav')}
            </ButtonLink>
          </div>
          <p className="mt-8 text-xs text-muted">
            {t('todayNav')} → {t('understand')} → {t('practiceLabel')} →{' '}
            {t('learnNav')}
          </p>
        </div>
        <PanchangSummary locale={locale} />
      </section>
      <section className="grid gap-8 border-y border-border py-10 md:grid-cols-[1fr_2fr]">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {t('why')}
        </p>
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl">{t('whyTitle')}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            {t('whyBody')}
          </p>
          <Link
            href="/panchang#glossary"
            className="mt-4 inline-block text-sm font-semibold text-primary"
          >
            {t('glossary')} →
          </Link>
        </div>
      </section>
      <section className="grid gap-12 py-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="font-serif text-3xl">{t('practice')}</h2>
          <p className="mt-2 text-sm text-muted">{t('practiceIntro')}</p>
          <PracticeList />
        </div>
        <aside className="flex flex-col justify-between rounded-2xl bg-secondary p-8 text-secondary-foreground sm:p-10">
          <p className="text-xs uppercase tracking-widest">{t('five')}</p>
          <div className="py-8">
            <h2 className="font-serif text-3xl leading-snug">
              {t('fiveTitle')}
            </h2>
            <p className="mt-4 leading-relaxed opacity-85">{t('fiveBody')}</p>
          </div>
          <Link
            href="/learn/foundations/dharma"
            className="border-t border-white/25 pt-5 text-sm font-semibold"
          >
            {t('read')} →
          </Link>
        </aside>
      </section>
      <section className="border-t border-border py-10">
        <h2 className="font-serif text-3xl">{t('explore')}</h2>
        <div className="mt-6 grid grid-cols-2 gap-x-8 md:grid-cols-4">
          {[
            ['/learn/foundations', 'foundation'],
            ['/scriptures', 'scriptures'],
            ['/explore/festivals', 'festivals'],
            ['/learn/yoga-meditation', 'yoga']
          ].map(([href, key]) => (
            <Link
              key={key}
              href={href}
              className="border-b border-border py-5 text-sm font-medium hover:text-primary"
            >
              {t(key)} <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="my-6 flex flex-col justify-between gap-6 rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-serif text-2xl">{t('askTitle')}</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {t('askBody')}
          </p>
        </div>
        <ButtonLink href="/ask" variant="outline">
          {t('ask')}
        </ButtonLink>
      </section>
      <section className="py-12">
        <h2 className="font-serif text-2xl">{t('upcoming')}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {t('upcomingNote')}
        </p>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {[
            ...festivalGuides
              .filter((g) => g.kind === 'festival')
              .slice(0, 3),
            ...festivalGuides.filter((g) => g.kind === 'vrat').slice(0, 2)
          ].map((g) => (
            <Link
              key={g.slug}
              href={`/explore/festivals/${g.slug}`}
              className="group grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">
                  {t(g.kind)}
                </p>
                <p className="mt-1 font-serif text-lg group-hover:text-primary">
                  {pickLocalizedText(locale, g.title.en, g.title.hi)}
                </p>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                  {pickLocalizedText(locale, g.summary.en, g.summary.hi)}
                </p>
              </div>
              <span aria-hidden="true" className="text-muted">
                →
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/explore/festivals"
          className="mt-5 inline-block text-sm font-semibold text-primary"
        >
          {t('festivals')} →
        </Link>
      </section>
    </div>
  );
}
