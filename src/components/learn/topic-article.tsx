import {getTranslations} from 'next-intl/server';
import {pickLocalizedText} from '@/lib/localized';
import type {LearnTopic, SourceKind} from '@/content/learn/types';
import {getRelatedTopics} from '@/content/learn';
import {TopicCard} from './topic-card';
import {TopicMeta} from './topic-meta';
import {BookmarkButton} from './bookmark-button';

const SOURCE_KIND_ORDER: SourceKind[] = ['scripture', 'commentary', 'traditional', 'academic', 'editorial'];

/** Stable anchor ids derived from the English heading so links survive locale switches. */
export function sectionAnchor(index: number, headingEn: string): string {
  const slug =
    headingEn
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section';
  return `section-${index + 1}-${slug}`;
}

/**
 * Reusable topic detail renderer. Every Learn topic — regardless of category —
 * goes through this single layout: header, contents, sections, sources
 * grouped by kind, and related topics. No per-topic layouts.
 */
export async function TopicArticle({topic, locale}: {topic: LearnTopic; locale: string}) {
  const t = await getTranslations('learn');
  const daily = await getTranslations('daily');
  const title = pickLocalizedText(locale, topic.title.en, topic.title.hi);
  const summary = pickLocalizedText(locale, topic.summary.en, topic.summary.hi);
  const related = getRelatedTopics(topic);

  const sourcesByKind = SOURCE_KIND_ORDER.map((kind) => ({
    kind,
    items: topic.sources.filter((source) => source.kind === kind)
  })).filter((group) => group.items.length > 0);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">{title}</h1>
          <BookmarkButton contentId={`${topic.category}/${topic.slug}`} />
        </div>
        {summary ? <p className="text-lg leading-relaxed text-muted">{summary}</p> : null}
        <TopicMeta
          difficulty={topic.difficulty}
          readingTimeMinutes={topic.readingTimeMinutes}
          status={topic.status}
        />
        <p className="text-xs text-muted">
          {t('lastUpdated')}:{' '}
          <time dateTime={topic.updatedAt}>{topic.updatedAt}</time>
        </p>
        {topic.status === 'draft' ? (
          <p className="rounded-lg border border-border bg-surface-strong p-3 text-sm leading-relaxed text-muted">
            {t('draftNote')}
          </p>
        ) : null}
      </div>

      {topic.sections.length > 1 ? (
        <nav aria-label={t('onThisPage')} className="rounded-xl border border-border bg-surface px-5 py-4">
          <h2 className="mb-2 text-sm font-medium uppercase tracking-wide text-muted">
            {t('onThisPage')}
          </h2>
          <ol className="flex list-decimal flex-col gap-1.5 pl-5">
            {topic.sections.map((section, index) => (
              <li key={sectionAnchor(index, section.heading.en)} className="text-sm">
                <a
                  href={`#${sectionAnchor(index, section.heading.en)}`}
                  className="text-foreground/90 underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                >
                  {pickLocalizedText(locale, section.heading.en, section.heading.hi)}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      {locale === 'hi' && topic.sections.some(section => !section.body.hi) && <p className="text-sm text-muted">{daily('translationPending')}</p>}
      <div className="flex flex-col gap-8">
        {topic.sections.map((section, index) => (
          <section key={sectionAnchor(index, section.heading.en)} id={sectionAnchor(index, section.heading.en)} className="scroll-mt-24">
            <h2 className="mb-2 font-serif text-2xl font-semibold tracking-tight text-foreground">
              {pickLocalizedText(locale, section.heading.en, section.heading.hi)}
            </h2>
            <p className="leading-relaxed text-foreground/90">
              {pickLocalizedText(locale, section.body.en, section.body.hi)}
            </p>
          </section>
        ))}
      </div>

      {sourcesByKind.length > 0 ? (
        <section aria-label={t('sources')} className="border-t border-border pt-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold tracking-tight text-foreground">{t('sources')}</h2>
          <div className="flex flex-col gap-4">
            {sourcesByKind.map((group) => (
              <div key={group.kind}>
                <h3 className="mb-1 text-sm font-medium uppercase tracking-wide text-muted">
                  {t(`sourceKinds.${group.kind}`)}
                </h3>
                <ul className="flex flex-col gap-1">
                  {group.items.map((source, index) => (
                    <li key={`${group.kind}-${index}`} className="text-sm leading-relaxed text-foreground/90">
                      {pickLocalizedText(locale, source.label.en, source.label.hi)}
                      {source.detail ? (
                        <span className="text-muted">
                          {' — '}
                          {pickLocalizedText(locale, source.detail.en, source.detail.hi)}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section aria-label={t('related')} className="border-t border-border pt-8">
          <h2 className="mb-2 font-serif text-2xl font-semibold tracking-tight text-foreground">{t('related')}</h2>
          <ul className="flex flex-col">
            {related.map((relatedTopic) => (
              <TopicCard
                key={relatedTopic.slug}
                topic={relatedTopic}
                locale={locale}
                href={`/learn/${relatedTopic.category}/${relatedTopic.slug}`}
              />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
