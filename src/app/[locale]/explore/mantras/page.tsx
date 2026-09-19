import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {TopicCard} from '@/components/learn/topic-card';
import {getLearnTopic} from '@/content/learn';
import {pickLocalizedText} from '@/lib/localized';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const navT = await getTranslations({locale, namespace: 'nav'});
  const topic = getLearnTopic('practices', 'mantra-japa');
  return {
    title: navT('mantras'),
    description: topic
      ? pickLocalizedText(locale, topic.summary.en, topic.summary.hi)
      : undefined
  };
}

export default async function ExploreMantrasPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const navT = await getTranslations({locale, namespace: 'nav'});
  const daily = await getTranslations('daily');
  const topic = getLearnTopic('practices', 'mantra-japa');
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16 lg:px-8">
      <header className="flex flex-col gap-3 border-b border-border pb-8">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
          {navT('mantras')}
        </h1>
        {topic ? (
          <p className="text-lg leading-relaxed text-muted">
            {pickLocalizedText(locale, topic.summary.en, topic.summary.hi)}
          </p>
        ) : null}
      </header>
      {topic ? (
        <ul className="mt-2 flex flex-col">
          <TopicCard
            topic={topic}
            locale={locale}
            href={`/learn/${topic.category}/${topic.slug}`}
          />
        </ul>
      ) : null}
      <Link
        href="/learn/practices"
        className="mt-8 inline-block text-sm font-semibold text-primary"
      >
        {daily('related')} →
      </Link>
    </div>
  );
}
