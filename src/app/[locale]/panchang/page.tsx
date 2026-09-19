import {getTranslations, setRequestLocale} from 'next-intl/server';
import {PanchangSummary} from '@/components/home/panchang-summary';
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'daily'});
  return {title: t('panchangNav') + ' · Sanatan Dharma'};
}

export default async function PanchangPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('daily');
  const details =
    locale === 'hi'
      ? [
          'तिथि परिवर्तन',
          'नक्षत्र परिवर्तन',
          'योग',
          'करण',
          'चंद्रोदय / चंद्रास्त',
          'चौघड़िया',
          'होरा',
          'यमगंड',
          'गुलिक',
          'अभिजीत मुहूर्त',
          'हिंदू मास',
          'संवत'
        ]
      : [
          'Tithi transitions',
          'Nakshatra transitions',
          'Yoga',
          'Karana',
          'Moonrise / Moonset',
          'Choghadiya',
          'Hora',
          'Yamaganda',
          'Gulika',
          'Abhijit Muhurat',
          'Hindu month',
          'Samvat'
        ];
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <p className="text-xs uppercase tracking-widest text-primary">
        {t('todayNav')} / {t('understand')}
      </p>
      <h1 className="mb-8 mt-3 font-serif text-4xl">{t('panchangNav')}</h1>
      <PanchangSummary locale={locale} full />
      <details className="my-6 rounded-xl border border-border bg-surface p-6">
        <summary className="cursor-pointer font-semibold">
          {t('detailed')}
        </summary>
        <p className="mt-4 text-sm text-muted">{t('detailsNote')}</p>
        <dl className="mt-4 grid gap-x-8 sm:grid-cols-2">
          {details.map((label) => (
            <div
              className="flex justify-between gap-4 border-b border-border py-3 text-sm"
              key={label}
            >
              <dt>{label}</dt>
              <dd className="text-muted">{t('unavailable')}</dd>
            </div>
          ))}
        </dl>
      </details>
      <section id="glossary" className="scroll-mt-24 py-8">
        <h2 className="font-serif text-2xl">{t('glossary')}</h2>
        {['tithi', 'nakshatra', 'paksha', 'rahu'].map((key) => (
          <details id={key} className="border-b border-border py-5" key={key}>
            <summary className="cursor-pointer font-medium">{t(key)}</summary>
            <p className="mt-3 leading-relaxed text-muted">
              {t(`${key}Meaning`)}
            </p>
          </details>
        ))}
        <a
          href="https://www.drikpanchang.com/"
          className="mt-5 inline-block text-sm text-primary underline"
        >
          {t('glossarySource')} ↗
        </a>
      </section>
      <aside className="border-t border-border pt-6 text-xs leading-relaxed text-muted">
        <h2 className="font-semibold">{t('provider')}</h2>
        <p className="mt-2">{t('providerNote')}</p>
      </aside>
    </div>
  );
}
