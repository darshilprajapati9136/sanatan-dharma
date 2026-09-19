import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {samplePanchang} from '@/content/panchang';
export async function PanchangSummary({
  locale,
  full = false
}: {
  locale: string;
  full?: boolean;
}) {
  const t = await getTranslations('daily');
  return (
    <section
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
      aria-label={t('panchang')}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-2xl font-semibold">{t('panchang')}</h2>
        <span className="rounded-full bg-surface-strong px-3 py-1 text-xs font-medium text-secondary">
          {t('preview')}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted">{t('context')}</p>
      <div className="my-5 border-l-2 border-accent bg-surface-strong px-4 py-3">
        <p className="text-sm font-semibold">{t('sample')}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          {t('sampleNote')}
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-x-5 sm:grid-cols-3">
        {Object.entries(samplePanchang.values)
          .filter(([key]) => full || !['muhurat', 'observance'].includes(key))
          .map(([key, value]) => (
            <div key={key} className="border-b border-border py-4">
              <dt className="text-xs text-muted">{t(key)}</dt>
              <dd className="mt-2 text-base font-medium">
                {value
                  ? value[locale === 'hi' ? 'hi' : 'en']
                  : t('unavailable')}
              </dd>
            </div>
          ))}
      </dl>
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
