import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {festivalGuides} from '@/content/festivals';
import {pickLocalizedText} from '@/lib/localized';
export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  const t = await getTranslations({locale, namespace: 'daily'});
  const guide = festivalGuides.find((x) => x.slug === slug);
  if (!guide) return {title: t('festivals')};
  return {
    title: pickLocalizedText(locale, guide.title.en, guide.title.hi),
    description: pickLocalizedText(locale, guide.summary.en, guide.summary.hi)
  };
}
export default async function FestivalPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const g = festivalGuides.find((x) => x.slug === slug);
  if (!g) notFound();
  const t = await getTranslations('daily');
  const local = (v: {en: string; hi?: string}) =>
    pickLocalizedText(locale, v.en, v.hi);
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
      <Link href="/explore/festivals" className="text-sm text-primary">
        ← {t('back')}
      </Link>
      <p className="mt-8 text-xs uppercase tracking-widest text-primary">
        {t(g.kind)}
      </p>
      <h1 className="mt-3 font-serif text-5xl">{local(g.title)}</h1>
      <p className="mt-5 text-sm text-muted">{t('editorial')}</p>
      <p className="my-6 rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed text-muted">
        {t('dateNote')}
      </p>
      {[
        ['what', g.summary],
        ['whyFestival', g.why],
        ['how', g.practice]
      ].map(([key, value]) => (
        <section key={key as string} className="border-b border-border py-7">
          <h2 className="font-serif text-2xl">{t(key as string)}</h2>
          <p className="mt-4 leading-relaxed text-muted">
            {local(value as {en: string; hi?: string})}
          </p>
        </section>
      ))}
      <section className="py-7">
        <h2 className="font-serif text-2xl">{t('sources')}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {t('regional')}
        </p>
        {g.source.href.startsWith('/') ? (
          <Link
            className="mt-4 inline-block text-primary underline"
            href={g.source.href}
          >
            {local(g.title)} · {t('editorial')}
          </Link>
        ) : (
          <a
            className="mt-4 inline-block text-primary underline"
            href={g.source.href}
          >
            {locale === 'hi'
              ? 'दृक पंचांग · पर्व-सूची और परंपराओं का संदर्भ'
              : g.source.label}{' '}
            ↗
          </a>
        )}
      </section>
      <Link
        href={g.related}
        className="inline-block rounded-lg bg-secondary px-5 py-3 text-sm text-secondary-foreground"
      >
        {t('related')} →
      </Link>
    </article>
  );
}
