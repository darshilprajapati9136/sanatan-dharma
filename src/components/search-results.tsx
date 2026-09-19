import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import type {SearchEntry} from '@/server/services/search';
export async function SearchResults({results}: {results: SearchEntry[]}) {
  const t = await getTranslations('daily');
  return (
    <ul className="divide-y divide-border border-t border-border">
      {results.map((r) => (
        <li key={r.id} className="py-6">
          <p className="text-xs text-muted">
            {t(r.kind)}
            {r.draft ? ` · ${t('editorial')}` : ''}
          </p>
          <Link
            href={r.href}
            className="mt-2 inline-block font-serif text-xl font-semibold hover:text-primary"
          >
            {r.title} →
          </Link>
          <p className="mt-2 text-sm leading-relaxed text-muted">{r.summary}</p>
        </li>
      ))}
    </ul>
  );
}
