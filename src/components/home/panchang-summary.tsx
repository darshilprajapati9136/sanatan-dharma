import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {type PanchangData} from '@/content/panchang';
import {defaultPanchangContext, getDayPanchang} from '@/server/services/panchang-live';
export async function PanchangSummary({
  locale,
  full = false,
  data
}: {
  locale: string;
  full?: boolean;
  data?: PanchangData;
}) {
  const t = await getTranslations('daily');
  const day = data ?? (await getDayPanchang(defaultPanchangContext()));
  const live = day.status === 'live';
  const hi = locale === 'hi';
  return (
    <section
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
      aria-label={t('panchang')}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-2xl font-semibold">{t('panchang')}</h2>
        <span className="rounded-full bg-surface-strong px-3 py-1 text-xs font-medium text-secondary">
          {live ? (hi ? 'लाइव' : 'Live') : t('preview')}
        </span>
      </div>
      {live && day.context.date ? (
        <p className="mt-2 text-sm text-muted">
          {day.context.location} · {day.context.date} · IST
        </p>
      ) : (
        <p className="mt-2 text-sm text-muted">{t('context')}</p>
      )}
      {!live && (
        <div className="my-5 border-l-2 border-accent bg-surface-strong px-4 py-3">
          <p className="text-sm font-semibold">{t('sample')}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {t('sampleNote')}
          </p>
        </div>
      )}
      <dl className="grid grid-cols-2 gap-x-5 sm:grid-cols-3">
        {Object.entries(day.values)
          .filter(([key]) => full || !['muhurat', 'observance'].includes(key))
          .map(([key, value]) => (
            <div key={key} className="border-b border-border py-4">
              <dt className="text-xs text-muted">{t(key)}</dt>
              <dd className="mt-2 text-base font-medium">
                {value
                  ? value[hi ? 'hi' : 'en']
                  : t('unavailable')}
              </dd>
            </div>
          ))}
      </dl>
      {live ? (
        <p className="mt-4 text-xs text-muted">
          {hi ? 'स्रोत: प्रॉकेरला' : 'Source: Prokerala'}
          {day.provenance.convention ? ` · ${day.provenance.convention}` : ''}
        </p>
      ) : null}
      {!full && (
        <Link
          href="/panchang"
          className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-primary"
        >
          {t('detail')} <span aria-hidden="true">→</span>
        </Link>
      )}
    </section>
  );
}
