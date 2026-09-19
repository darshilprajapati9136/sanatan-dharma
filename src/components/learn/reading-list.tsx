'use client';
import {useSyncExternalStore} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {readingListSnapshot, subscribeReadingList} from '@/lib/reading-list';
import {BookmarkButton} from './bookmark-button';
export function ReadingList({
  topics
}: {
  topics: {id: string; title: string; summary: string}[];
}) {
  const t = useTranslations('daily');
  const snapshot = useSyncExternalStore(
    subscribeReadingList,
    readingListSnapshot,
    () => '[]'
  );
  let ids: string[] = [];
  try {
    const parsed: unknown = JSON.parse(snapshot);
    if (Array.isArray(parsed))
      ids = parsed.filter((v): v is string => typeof v === 'string');
  } catch {}
  const saved = topics.filter((topic) => ids.includes(topic.id));
  return saved.length ? (
    <ul className="divide-y divide-border">
      {saved.map((topic) => (
        <li key={topic.id} className="flex justify-between gap-6 py-6">
          <div>
            <Link
              href={`/learn/${topic.id}`}
              className="font-serif text-2xl hover:text-primary"
            >
              {topic.title}
            </Link>
            <p className="mt-2 text-sm text-muted">{topic.summary}</p>
          </div>
          <BookmarkButton contentId={topic.id} />
        </li>
      ))}
    </ul>
  ) : (
    <div className="rounded-xl border border-border bg-surface p-8">
      <p className="leading-relaxed text-muted">{t('libraryEmpty')}</p>
      <Link href="/learn" className="mt-4 inline-block text-primary">
        {t('learnNav')} →
      </Link>
    </div>
  );
}
