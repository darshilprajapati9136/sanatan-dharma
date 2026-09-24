import {EditorialBanner} from '@/components/ui/editorial-banner';
import {GuidedPath} from '@/components/learn/guided-path';
import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Icon} from '@/components/ui/icon';
import {Reveal} from '@/components/ui/reveal';
import {CategoryCard} from '@/components/learn/category-card';
import {getLearnCategories} from '@/content/learn';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'learn'});

  return {
    title: t('title'),
    description: t('subtitle')
  };
}

export default async function LearnPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const visual = await getTranslations('visual');

  const t = await getTranslations('learn');
  const categories = getLearnCategories();
  const totalTopics = categories.reduce(
    (sum, category) => sum + category.topics.length,
    0
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16 lg:px-8">
      <Reveal>
        <EditorialBanner title={visual('learnTitle')} description={visual('learnBody')} image="quiet-study" eyebrow={t('topicsCount', {count: totalTopics})}/>
      </Reveal>

      <Reveal>
        <GuidedPath />
      </Reveal>
      <nav aria-label={t('allCategories')} className="mt-8">
        <ol className="grid gap-4 md:grid-cols-2">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.slug}
              href={`/learn/${category.slug}`}
              icon={category.icon}
              index={index}
              title={t(`categories.${category.slug}.title`)}
              description={t(`categories.${category.slug}.description`)}
              topicsLabel={t('topicsCount', {count: category.topics.length})}
            />
          ))}
        </ol>
      </nav>

      <Reveal>
        <aside className="mt-10 flex items-start gap-3 rounded-xl bg-surface-strong p-5">
          <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div className="flex flex-col gap-1">
            <p className="font-medium text-foreground">{t('startWith')}</p>
            <p className="text-sm leading-relaxed text-muted">
              {t('startWithDescription')}
            </p>
            <Link
              href="/learn/foundations"
              className="mt-1 inline-flex w-fit items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              {t('categories.foundations.title')}
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </Reveal>
    </div>
  );
}
