import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Breadcrumb} from '@/components/ui/breadcrumb';
import {EmptyState} from '@/components/ui/empty-state';
import {Icon} from '@/components/ui/icon';
import {TopicCard} from '@/components/learn/topic-card';
import {getLearnCategories, getLearnCategory, isLearnCategorySlug} from '@/content/learn';

export function generateStaticParams() {
  return getLearnCategories().map((category) => ({category: category.slug}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; category: string}>;
}): Promise<Metadata> {
  const {locale, category} = await params;

  // Guard before touching localized keys so unknown slugs 404 cleanly.
  if (!isLearnCategorySlug(category)) {
    return {};
  }

  const t = await getTranslations({locale, namespace: 'learn'});

  return {
    title: t(`categories.${category}.title`),
    description: t(`categories.${category}.description`)
  };
}

export default async function LearnCategoryPage({
  params
}: {
  params: Promise<{locale: string; category: string}>;
}) {
  const {locale, category: categorySlug} = await params;
  setRequestLocale(locale);

  const category = getLearnCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const t = await getTranslations('learn');
  const title = t(`categories.${category.slug}.title`);
  const description = t(`categories.${category.slug}.description`);
  const siblings = getLearnCategories().filter((entry) => entry.slug !== category.slug);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16 lg:px-8">
      <Breadcrumb
        className="mb-6"
        items={[{label: t('title'), href: '/learn'}, {label: title}]}
      />

      <header className="flex flex-col gap-3 border-b border-border pb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-primary">
          {t('topicsCount', {count: category.topics.length})}
        </p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="text-lg leading-relaxed text-muted">{description}</p>
      </header>

      {category.topics.length > 0 ? (
        <ul className="mt-2 flex flex-col">
          {category.topics.map((topic) => (
            <TopicCard
              key={topic.slug}
              topic={topic}
              locale={locale}
              href={`/learn/${category.slug}/${topic.slug}`}
            />
          ))}
        </ul>
      ) : (
        <div className="mt-8">
          <EmptyState
            icon="book"
            title={t('emptyTopicsTitle')}
            description={t('emptyTopicsDescription')}
            action={
              <Link
                href="/learn"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {t('allCategories')}
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            }
          />
        </div>
      )}

      <nav aria-label={t('moreCategories')} className="mt-12 border-t border-border pt-6">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">
          {t('moreCategories')}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {siblings.map((sibling) => (
            <li key={sibling.slug}>
              <Link
                href={`/learn/${sibling.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {t(`categories.${sibling.slug}.title`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
