import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
export async function GuidedPath() {
  const t = await getTranslations('daily');
  return (
    <section className="my-8 rounded-xl border border-border bg-surface p-6">
      <h2 className="font-serif text-2xl">{t('path')}</h2>
      <p className="mt-2 text-sm text-muted">{t('pathIntro')}</p>
      <ol className="mt-4 divide-y divide-border">
        {[
          '/learn/foundations/dharma',
          '/learn/foundations/karma',
          '/learn/scriptures/bhagavad-gita'
        ].map((href, i) => (
          <li key={href}>
            <Link
              href={href}
              className="flex gap-4 py-4 text-sm font-medium hover:text-primary"
            >
              <span className="text-primary">0{i + 1}</span>
              {t(`step${i + 1}`)} →
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
