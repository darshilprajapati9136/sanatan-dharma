import {getTranslations} from 'next-intl/server';
import {Badge} from '@/components/ui/badge';
import type {ContentStatus, DifficultyLevel} from '@/content/learn/types';

/**
 * Shared difficulty / reading-time / review-status badges for topic cards
 * and the topic detail page.
 */
export async function TopicMeta({
  difficulty,
  readingTimeMinutes,
  status
}: {
  difficulty: DifficultyLevel;
  readingTimeMinutes: number;
  status: ContentStatus;
}) {
  const t = await getTranslations('learn');

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>{t(`difficulty.${difficulty}`)}</Badge>
      <Badge>{t('readingTime', {minutes: readingTimeMinutes})}</Badge>
      <Badge variant={status === 'draft' ? 'neutral' : 'accent'}>{t(`status.${status}`)}</Badge>
    </div>
  );
}
