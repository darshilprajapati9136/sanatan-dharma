import Image from 'next/image';
import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Reveal} from '@/components/ui/reveal';
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
  const visual = await getTranslations('visual');
  const local = (v: {en: string; hi?: string}) =>
    pickLocalizedText(locale, v.en, v.hi);
  const dateFmt = new Intl.DateTimeFormat(locale === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata'
  });
  const formatRange = (d: {date: string; endDate?: string}) => {
    const start = dateFmt.format(new Date(`${d.date}T00:00:00`));
    if (!d.endDate) return start;
    const end = dateFmt.format(new Date(`${d.endDate}T00:00:00`));
    return `${start} – ${end}`;
  };
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
      <Reveal>
        <Link href="/explore/festivals" className="text-sm text-primary">
          ← {t('back')}
        </Link>
        <p className="mt-8 text-xs uppercase tracking-widest text-primary">
          {t(g.kind)}
        </p>
        <h1 className="mt-3 font-serif text-5xl">{local(g.title)}</h1>
      </Reveal>
      {slug === 'diwali' && <figure className="festival-detail-art"><Image src="/images/diya-evening.webp" alt="" fill sizes="(max-width: 768px) 100vw, 768px"/><figcaption>{visual('art')}</figcaption></figure>}
      <Reveal>
        <p className="mt-5 text-sm text-muted">{t('editorial')}</p>
        <p className="my-6 rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed text-muted">
          {t('dateNote')}
        </p>
      </Reveal>
      {g.dates && g.dates.length > 0 && (
        <Reveal>
          <section aria-label={t('observedDates')} className="my-6 rounded-lg border border-border bg-surface p-4">
            <h2 className="font-serif text-2xl">{t('observedDates')}</h2>
            <dl className="mt-3 divide-y divide-border">
              {g.dates.map((d) => (
                <div key={d.year} className="flex flex-wrap justify-between gap-2 py-2 text-sm">
                  <dt className="font-semibold">{d.year}</dt>
                  <dd className="text-muted">
                    {formatRange(d)} · {d.basis}
                    {d.note ? ` — ${local(d.note)}` : ''}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-xs text-muted">{t('dateBasis')}</p>
          </section>
        </Reveal>
      )}
      {[
        ['what', g.summary],
        ['whyFestival', g.why],
        ['how', g.practice]
      ].map(([key, value]) => (
        <Reveal key={key as string}>
          <section className="border-b border-border py-7">
            <h2 className="font-serif text-2xl">{t(key as string)}</h2>
            <p className="mt-4 leading-relaxed text-muted">
              {local(value as {en: string; hi?: string})}
            </p>
          </section>
        </Reveal>
      ))}
      <Reveal>
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
      </Reveal>
      <Link
        href={g.related}
        className="inline-block rounded-lg bg-secondary px-5 py-3 text-sm text-secondary-foreground"
      >
        {t('related')} →
      </Link>
    </article>
  );
}
