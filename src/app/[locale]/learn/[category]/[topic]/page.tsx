import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Breadcrumb} from '@/components/ui/breadcrumb';
import {Icon} from '@/components/ui/icon';
import {Reveal} from '@/components/ui/reveal';
import {TopicArticle} from '@/components/learn/topic-article';
import {pickLocalizedText} from '@/lib/localized';
import {getLearnCategories, getLearnCategory, getLearnTopic} from '@/content/learn';

export function generateStaticParams() {
  return getLearnCategories().flatMap((category) =>
    category.topics.map((topic) => ({category: category.slug, topic: topic.slug}))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; category: string; topic: string}>;
}): Promise<Metadata> {
  const {locale, category, topic} = await params;
  const entry = getLearnTopic(category, topic);

  if (!entry) {
    return {};
  }

  return {
    title: pickLocalizedText(locale, entry.title.en, entry.title.hi),
    description: pickLocalizedText(locale, entry.summary.en, entry.summary.hi)
  };
}

export default async function LearnTopicPage({
  params
}: {
  params: Promise<{locale: string; category: string; topic: string}>;
}) {
  const {locale, category: categorySlug, topic: topicSlug} = await params;
  setRequestLocale(locale);

  const category = getLearnCategory(categorySlug);
  const topic = getLearnTopic(categorySlug, topicSlug);

  if (!category || !topic) {
    notFound();
  }

  const t = await getTranslations('learn');
  const categoryTitle = t(`categories.${category.slug}.title`);
  const topicTitle = pickLocalizedText(locale, topic.title.en, topic.title.hi);

  // Sequential reading order within the category.
  const position = category.topics.findIndex((entry) => entry.slug === topic.slug);
  const previous = position > 0 ? category.topics[position - 1] : null;
  const next = position >= 0 && position < category.topics.length - 1 ? category.topics[position + 1] : null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16 lg:px-8">
      <Breadcrumb
        className="mb-8"
        items={[
          {label: t('title'), href: '/learn'},
          {label: categoryTitle, href: `/learn/${category.slug}`},
          {label: topicTitle}
        ]}
      />

      <Reveal>
        <TopicArticle topic={topic} locale={locale} />
      </Reveal>

      <nav
        aria-label={categoryTitle}
        className="mt-12 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={`/learn/${category.slug}/${previous.slug}`}
            className="group flex flex-col gap-1 rounded-xl border border-border bg-surface px-5 py-4 transition-colors hover:border-primary"
          >
            <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted">
              <Icon name="arrowRight" className="h-3.5 w-3.5 rotate-180" />
              {t('previousTopic')}
            </span>
            <span className="font-serif font-semibold text-foreground group-hover:text-primary">
              {pickLocalizedText(locale, previous.title.en, previous.title.hi)}
            </span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <Link
            href={`/learn/${category.slug}/${next.slug}`}
            className="group flex flex-col gap-1 rounded-xl border border-border bg-surface px-5 py-4 text-right transition-colors hover:border-primary"
          >
            <span className="inline-flex items-center justify-end gap-1 text-xs font-medium uppercase tracking-wide text-muted">
              {t('nextTopic')}
              <Icon name="arrowRight" className="h-3.5 w-3.5" />
            </span>
            <span className="font-serif font-semibold text-foreground group-hover:text-primary">
              {pickLocalizedText(locale, next.title.en, next.title.hi)}
            </span>
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
