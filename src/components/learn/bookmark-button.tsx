import {getTranslations} from 'next-intl/server';
import {Icon} from '@/components/ui/icon';

/**
 * Bookmark affordance for Learn topics, structurally ready but not yet wired.
 *
 * The existing `bookmarks` table only supports verse references, so topic
 * bookmarking needs a follow-up schema migration first. Until then this
 * renders a disabled button carrying `data-content-type` / `data-content-id`
 * attributes that the future bookmark system can bind to.
 */
export async function BookmarkButton({contentId}: {contentId: string}) {
  const t = await getTranslations('learn');

  return (
    <button
      type="button"
      disabled
      title={t('bookmarksComingSoon')}
      aria-label={t('bookmarksComingSoon')}
      data-content-type="learn_topic"
      data-content-id={contentId}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-strong hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Icon name="bookmark" className="h-5 w-5" />
    </button>
  );
}
