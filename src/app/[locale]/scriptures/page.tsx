import {EditorialBanner} from '@/components/ui/editorial-banner';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Reveal} from '@/components/ui/reveal';
import {EmptyState} from '@/components/ui/empty-state';
import {listPublishedScriptures} from '@/server/services/content';
import {getLearnCategory} from '@/content/learn';
import {pickLocalizedText} from '@/lib/localized';
export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'nav'});
  return {title: t('scriptures')};
}

export const dynamic = 'force-dynamic';

export default async function ScripturesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const visual = await getTranslations('visual');

  const t = await getTranslations('scriptures');
  const navT = await getTranslations({locale, namespace: 'nav'});
  const daily = await getTranslations('daily');
  const scriptures = await listPublishedScriptures();
  const introductions = getLearnCategory('scriptures')?.topics ?? [];

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 lg:px-8">
      <Reveal>
        <EditorialBanner title={visual('scriptureTitle')} description={visual('scriptureBody')} image="quiet-study" eyebrow={navT('scriptures')}/>
      </Reveal>

      <Reveal>
        <aside className="mb-8 rounded-xl border border-border bg-surface p-5">
          <p className="text-sm leading-relaxed text-muted">
            {daily('traditionNote')}
          </p>
          <Link
            href="/learn/scriptures"
            className="mt-3 inline-block text-sm font-semibold text-primary"
          >
            {daily('scripture')} →
          </Link>
        </aside>
      </Reveal>
      <Reveal>
        <Link
          href="/scriptures/gita"
          className="gita-feature-card mb-8"
        >
          <div>
            <p className="eyebrow">{locale === 'hi' ? 'अभी पढ़ें' : 'Read now'}</p>
            <h2>{locale === 'hi' ? 'भगवद् गीता' : 'Bhagavad Gita'}</h2>
            <p>
              {locale === 'hi'
                ? 'अध्याय 1 · अर्जुन विषाद योग — सभी 47 श्लोक, सरल हिंदी-अंग्रेज़ी भावार्थ सहित।'
                : 'Chapter 1 · Arjuna Vishada Yoga — all 47 verses with simple English–Hindi meanings.'}
            </p>
            <span>{locale === 'hi' ? 'गीता खोलें →' : 'Open the Gita →'}</span>
          </div>
          <span className="gita-feature-om" aria-hidden="true">
            ॐ
          </span>
        </Link>
      </Reveal>
      {scriptures.length === 0 ? (
        <Reveal>
          <>
            <div className="flex flex-col gap-4 stagger">
              {introductions.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/learn/scriptures/${topic.slug}`}
                  className="block rounded-2xl border border-border bg-surface p-6 shadow-sm transition-colors hover:border-primary lg:p-8"
                >
                  <h2 className="font-serif text-2xl font-semibold text-foreground">
                    {pickLocalizedText(locale, topic.title.en, topic.title.hi)}
                  </h2>
                  <p className="mt-2 text-muted">
                    {pickLocalizedText(locale, topic.summary.en, topic.summary.hi)}
                  </p>
                  <p className="mt-3 text-sm font-medium text-primary">
                    {daily('related')} →
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <EmptyState
                icon="book"
                title={t('emptyTitle')}
                description={t('emptyDescription')}
              />
            </div>
          </>
        </Reveal>
      ) : (
        <Reveal>
          <div className="flex flex-col gap-4 stagger">
            {scriptures.map((scripture) => {
              const title = pickLocalizedText(
                locale,
                scripture.titleEn,
                scripture.titleHi
              );
              const description = pickLocalizedText(
                locale,
                scripture.descriptionEn,
                scripture.descriptionHi
              );

              return (
                <Link
                  key={scripture.id}
                  href={`/scriptures/${scripture.slug}`}
                  className="block rounded-2xl border border-border bg-surface p-6 shadow-sm transition-colors hover:border-primary lg:p-8"
                >
                  <h2 className="font-serif text-2xl font-semibold text-foreground">
                    {title || scripture.slug}
                  </h2>
                  {description ? (
                    <p className="mt-2 text-muted">{description}</p>
                  ) : null}
                  {scripture.tradition ? (
                    <p className="mt-3 text-sm text-muted">
                      {scripture.tradition}
                    </p>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </Reveal>
      )}
    </section>
  );
}
