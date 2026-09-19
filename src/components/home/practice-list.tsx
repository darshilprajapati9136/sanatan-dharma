import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
export async function PracticeList() {
  const t = await getTranslations('daily');
  return (
    <ol className="divide-y divide-border">
      {[
        '/learn/yoga-meditation/meditation-basics',
        '/learn/foundations/karma',
        '/learn/foundations/dharma'
      ].map((href, i) => (
        <li key={href} className="practice-row flex gap-5 py-6">
          <span className="practice-number">0{i + 1}</span>
          <div>
            <Link
              href={href}
              className="font-serif text-xl font-semibold hover:text-primary"
            >
              {t(`action${i + 1}`)} <span aria-hidden="true">↗</span>
            </Link>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
              {t(`action${i + 1}Body`)}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
