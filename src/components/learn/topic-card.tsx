import {Link} from '@/i18n/navigation';
import {pickLocalizedText} from '@/lib/localized';
import type {LearnTopic} from '@/content/learn/types';
import {BookmarkButton} from './bookmark-button';
import {TopicMeta} from './topic-meta';

/**
 * List row for a single topic. The title links to the topic page; the
 * bookmark button sits outside the link to avoid nested interactives.
 * Rows (not cards) keep long Hindi summaries readable on mobile.
 */
export function TopicCard({
  topic,
  locale,
  href
}: {
  topic: LearnTopic;
  locale: string;
  href: string;
}) {
  const title = pickLocalizedText(locale, topic.title.en, topic.title.hi);
  const summary = pickLocalizedText(locale, topic.summary.en, topic.summary.hi);

  return (
    <li className="flex items-start justify-between gap-4 border-b border-border py-5 last:border-b-0 last:pb-0 first:pt-0">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Link
          href={href}
          className="font-serif text-lg font-semibold tracking-tight text-foreground hover:text-primary"
        >
          {title}
        </Link>
        {summary ? <p className="text-sm leading-relaxed text-muted">{summary}</p> : null}
        <TopicMeta
          difficulty={topic.difficulty}
          readingTimeMinutes={topic.readingTimeMinutes}
          status={topic.status}
        />
      </div>
      <BookmarkButton contentId={`${topic.category}/${topic.slug}`} />
    </li>
  );
}
