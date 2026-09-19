import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {TopicCard} from '@/components/learn/topic-card';
import {getLearnTopic} from '@/content/learn';

const TOPICS = [
  ['deities', 'vishnu'],
  ['deities', 'shiva'],
  ['deities', 'devi'],
  ['deities', 'krishna'],
  ['deities', 'rama'],
  ['deities', 'hanuman'],
  ['deities', 'ganesha']
] as const;

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'learn'});
  return {
    title: t('categories.deities.title'),
    description: t('categories.deities.description')
  };
}

export default async function ExploreDeitiesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('learn');
  const daily = await getTranslations('daily');
  const topics = TOPICS.map(([category, slug]) =>
    getLearnTopic(category, slug)
  ).filter((topic) => topic != null);
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16 lg:px-8">
      <header className="flex flex-col gap-3 border-b border-border pb-8">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
          {t('categories.deities.title')}
        </h1>
        <p className="text-lg leading-relaxed text-muted">
          {t('categories.deities.description')}
        </p>
      </header>
      <ul className="mt-2 flex flex-col">
        {topics.map((topic) => (
          <TopicCard
            key={topic.slug}
            topic={topic}
            locale={locale}
            href={`/learn/${topic.category}/${topic.slug}`}
          />
        ))}
      </ul>
      <Link
        href="/learn/deities"
        className="mt-8 inline-block text-sm font-semibold text-primary"
      >
        {daily('related')} →
      </Link>
    </div>
  );
}
