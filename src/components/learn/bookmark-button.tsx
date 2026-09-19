'use client';
import {useState, useSyncExternalStore} from 'react';
import {useTranslations} from 'next-intl';
import {Icon} from '@/components/ui/icon';
import {
  readingListSnapshot,
  subscribeReadingList,
  toggleSavedTopic
} from '@/lib/reading-list';
export function BookmarkButton({contentId}: {contentId: string}) {
  const t = useTranslations('daily');
  const snapshot = useSyncExternalStore(
    subscribeReadingList,
    readingListSnapshot,
    () => '[]'
  );
  const [error, setError] = useState(false);
  let saved = false;
  try {
    const ids: unknown = JSON.parse(snapshot);
    saved = Array.isArray(ids) && ids.includes(contentId);
  } catch {}
  return (
    <div className="max-w-40 shrink-0">
      <button
        type="button"
        aria-pressed={saved}
        aria-label={saved ? t('remove') : t('save')}
        title={saved ? t('remove') : t('save')}
        onClick={() => {
          try {
            toggleSavedTopic(contentId);
            setError(false);
          } catch {
            setError(true);
          }
        }}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border ${saved ? 'bg-primary text-primary-foreground' : 'bg-surface text-muted'}`}
      >
        <Icon name="bookmark" className="h-5 w-5" />
      </button>
      {error && (
        <p role="alert" className="mt-2 text-xs text-danger">
          {t('storageError')}
        </p>
      )}
    </div>
  );
}
