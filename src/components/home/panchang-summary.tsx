import {Icon, type IconName} from '@/components/ui/icon';
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {type PanchangData} from '@/content/panchang';
import {
  defaultPanchangContext,
  getDayPanchang
} from '@/server/services/panchang-live';
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
    <section className="panchang-panel" aria-label={t('panchang')}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 font-serif text-2xl font-semibold">
          <span className="calendar-seal">
            <Icon name="calendar" />
          </span>
          {t('panchang')}
        </h2>
        <span className={`calendar-status ${live ? 'is-live' : ''}`}>
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
            <div
              key={key}
              className="panchang-value border-b border-border py-4"
            >
              <dt className="flex items-center gap-2 text-xs text-muted">
                <Icon
                  name={
                    (
                      {
                        tithi: 'moon',
                        nakshatra: 'sparkles',
                        paksha: 'moon',
                        sunrise: 'sunrise',
                        sunset: 'sunset',
                        rahu: 'clock'
                      } as Record<string, IconName>
                    )[key] ?? 'calendar'
                  }
                  className="h-4 w-4"
                />
                {t(key)}
              </dt>
              <dd className="mt-2 text-base font-medium">
                {value ? value[hi ? 'hi' : 'en'] : t('unavailable')}
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
