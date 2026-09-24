import {getTranslations, setRequestLocale} from 'next-intl/server';
import {getLearnCategories} from '@/content/learn';
import {pickLocalizedText} from '@/lib/localized';
import {Reveal} from '@/components/ui/reveal';
import {ReadingList} from '@/components/learn/reading-list';
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'daily'});
  return {title: t('library') + ' · Sanatan Dharma'};
}

export default async function LibraryPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('daily');
  const topics = getLearnCategories()
    .flatMap((c) => c.topics)
    .map((topic) => ({
      id: `${topic.category}/${topic.slug}`,
      title: pickLocalizedText(locale, topic.title.en, topic.title.hi),
      summary: pickLocalizedText(locale, topic.summary.en, topic.summary.hi)
    }));
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
      <Reveal>
        <h1 className="font-serif text-4xl">{t('library')}</h1>
        <p className="my-6 text-sm leading-relaxed text-muted">
          {t('libraryIntro')}
        </p>
      </Reveal>
      <Reveal>
        <ReadingList topics={topics} />
      </Reveal>
    </section>
  );
}
