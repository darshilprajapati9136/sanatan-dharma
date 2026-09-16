import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Breadcrumb} from '@/components/ui/breadcrumb';
import {EmptyState} from '@/components/ui/empty-state';
import {Link} from '@/i18n/navigation';
import {getScriptureSection, getScriptureStructure, getSectionVerses} from '@/server/services/content';
import {pickLocalizedText} from '@/lib/localized';

export const dynamic = 'force-dynamic';

export default async function ScriptureSectionPage({
  params
}: {
  params: Promise<{locale: string; slug: string; section: string}>;
}) {
  const {locale, slug, section: sectionSlug} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('scriptures');
  const navT = await getTranslations({locale, namespace: 'nav'});
  const scripture = await getScriptureStructure(slug);

  if (!scripture) {
    notFound();
  }

  const section = await getScriptureSection(scripture.id, sectionSlug);

  if (!section) {
    notFound();
  }

  const verses = await getSectionVerses(section.id, locale as 'en' | 'hi');
  const scriptureTitle = pickLocalizedText(locale, scripture.titleEn, scripture.titleHi);
  const sectionTitle = pickLocalizedText(locale, section.titleEn, section.titleHi);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 lg:px-8">
      <Breadcrumb
        items={[
          {label: navT('scriptures'), href: '/scriptures'},
          {label: scriptureTitle || scripture.slug, href: `/scriptures/${scripture.slug}`},
          {label: sectionTitle || section.slug}
        ]}
      />

      <div className="mb-8 mt-4 flex flex-col gap-2">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
          {sectionTitle || section.slug}
        </h1>
      </div>

      {verses.length === 0 ? (
        <EmptyState icon="book" title={t('emptyTitle')} description={t('emptyDescription')} />
      ) : (
        <div className="flex flex-col gap-6">
          {verses.map((verse) => (
            <article
              key={verse.id}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm lg:p-8"
            >
              <p className="text-sm font-medium uppercase tracking-wide text-muted">
                {t('verses')} {verse.verseNumber}
              </p>

              {verse.textDevanagari ? (
                <p lang="sa" className="mt-3 font-serif text-2xl leading-relaxed text-foreground">
                  {verse.textDevanagari}
                </p>
              ) : null}

              {verse.transliteration ? (
                <p className="mt-3 text-sm italic text-muted">
                  {t('transliteration')}: {verse.transliteration}
                </p>
              ) : null}

              {verse.translation ? (
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-sm font-medium uppercase tracking-wide text-muted">
                    {t('translation')}
                  </p>
                  <p className="mt-2 leading-relaxed text-foreground">{verse.translation}</p>
                  {verse.isFallback ? (
                    <p className="mt-2 text-xs text-muted">{t('shownInEnglish')}</p>
                  ) : null}
                  {verse.translator ?? verse.sourceTitle ? (
                    <p className="mt-3 text-sm text-muted">
                      {t('source')}:{' '}
                      {[verse.translator, verse.sourceTitle].filter(Boolean).join(' · ')}
                      {verse.sourceAuthor ? ` (${verse.sourceAuthor})` : null}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}

      <p className="mt-8">
        <Link
          href={`/scriptures/${scripture.slug}`}
          className="text-sm font-medium text-primary hover:text-primary-hover"
        >
          {t('backToScripture')}
        </Link>
      </p>
    </section>
  );
}
