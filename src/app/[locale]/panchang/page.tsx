import {getTranslations, setRequestLocale} from 'next-intl/server';
import {PanchangSummary} from '@/components/home/panchang-summary';
import {defaultPanchangContext, getDayPanchang} from '@/server/services/panchang-live';
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
  const data = await getDayPanchang(defaultPanchangContext());
  const moonriseMoonset = [data.details.moonrise, data.details.moonset]
    .filter(Boolean)
    .join(' · ');
  const pairs: Array<[string, string | undefined]> =
    locale === 'hi'
      ? [
          ['तिथि परिवर्तन', data.details.tithiTransitions],
          ['नक्षत्र परिवर्तन', data.details.nakshatraTransitions],
          ['योग', data.details.yoga],
          ['करण', data.details.karana],
          ['चंद्रोदय / चंद्रास्त', moonriseMoonset || undefined],
          ['चौघड़िया', data.details.choghadiya],
          ['होरा', data.details.hora],
          ['यमगंड', data.details.yamaganda],
          ['गुलिक', data.details.gulika],
          ['अभिजीत मुहूर्त', data.details.abhijit],
          ['हिंदू मास', data.details.month],
          ['संवत', data.details.samvat]
        ]
      : [
          ['Tithi transitions', data.details.tithiTransitions],
          ['Nakshatra transitions', data.details.nakshatraTransitions],
          ['Yoga', data.details.yoga],
          ['Karana', data.details.karana],
          ['Moonrise / Moonset', moonriseMoonset || undefined],
          ['Choghadiya', data.details.choghadiya],
          ['Hora', data.details.hora],
          ['Yamaganda', data.details.yamaganda],
          ['Gulika', data.details.gulika],
          ['Abhijit Muhurat', data.details.abhijit],
          ['Hindu month', data.details.month],
          ['Samvat', data.details.samvat]
        ];
  const rows = pairs.map(([label, value]) => ({
    label,
    value: value ?? t('unavailable')
  }));
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <p className="text-xs uppercase tracking-widest text-primary">
        {t('todayNav')} / {t('understand')}
      </p>
      <h1 className="mb-8 mt-3 font-serif text-4xl">{t('panchangNav')}</h1>
      <PanchangSummary locale={locale} full data={data} />
      <details className="my-6 rounded-xl border border-border bg-surface p-6">
        <summary className="cursor-pointer font-semibold">
          {t('detailed')}
        </summary>
        <p className="mt-4 text-sm text-muted">{t('detailsNote')}</p>
        <dl className="mt-4 grid gap-x-8 sm:grid-cols-2">
          {rows.map((row) => (
            <div
              className="flex justify-between gap-4 border-b border-border py-3 text-sm"
              key={row.label}
            >
              <dt>{row.label}</dt>
              <dd className="text-muted">{row.value}</dd>
            </div>
          ))}
        </dl>
      </details>
      <section id="glossary" className="scroll-mt-24 py-8">
        <h2 className="font-serif text-2xl">{t('glossary')}</h2>
        {['tithi', 'nakshatra', 'paksha', 'rahu', 'karana', 'yogaTerm', 'muhuratTerm'].map((key) => (
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
        {data.status === 'live' ? (
          <p className="mt-2">
            {locale === 'hi' ? 'स्रोत: प्रॉकेरला' : 'Source: Prokerala'}
            {data.provenance.convention ? ` · ${data.provenance.convention}` : ''}
            {data.provenance.calculatedAt
              ? ` · ${data.provenance.calculatedAt.slice(0, 10)}`
              : ''}
          </p>
        ) : (
          <p className="mt-2">{t('providerNote')}</p>
        )}
      </aside>
    </div>
  );
}
