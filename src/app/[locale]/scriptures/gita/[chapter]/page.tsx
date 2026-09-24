import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Breadcrumb} from '@/components/ui/breadcrumb';
import {Reveal} from '@/components/ui/reveal';
import {GitaVerseIndex} from '@/components/scriptures/gita-verse-index';
import {getAvailableGitaChapters, getGitaChapter, gitaChapters, gitaMeta, speakerLabel} from '@/content/gita';
import {pickLocalizedText} from '@/lib/localized';

export function generateStaticParams() {
  return getAvailableGitaChapters().map((ch) => ({chapter: ch.slug}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; chapter: string}>;
}): Promise<Metadata> {
  const {locale, chapter} = await params;
  const entry = getGitaChapter(chapter);
  if (!entry) return {};
  return {
    title: `${pickLocalizedText(locale, entry.meta.title.en, entry.meta.title.hi)} · ${pickLocalizedText(locale, gitaMeta.title.en, gitaMeta.title.hi)}`,
    description: pickLocalizedText(locale, entry.meta.summary.en, entry.meta.summary.hi)
  };
}

const SPEAKER_STYLE: Record<string, string> = {
  krishna: 'gita-speaker-krishna',
  arjuna: 'gita-speaker-arjuna',
  sanjaya: 'gita-speaker-sanjaya',
  dhritarashtra: 'gita-speaker-dhritarashtra'
};

export default async function GitaChapterPage({
  params
}: {
  params: Promise<{locale: string; chapter: string}>;
}) {
  const {locale, chapter: chapterSlug} = await params;
  setRequestLocale(locale);
  const en = locale !== 'hi';

  const entry = getGitaChapter(chapterSlug);
  if (!entry) {
    notFound();
  }

  const gitaTitle = pickLocalizedText(locale, gitaMeta.title.en, gitaMeta.title.hi);
  const chapterLabel = en ? `Chapter ${entry.meta.n}` : `अध्याय ${entry.meta.n}`;

  const position = gitaChapters.findIndex((ch) => ch.slug === chapterSlug);
  const prev = position > 0 ? gitaChapters[position - 1] : null;
  const next =
    position >= 0 && position < gitaChapters.length - 1 ? gitaChapters[position + 1] : null;

  const krishnaCount = entry.verses.filter((v) => v.speaker === 'krishna').length;

  return (
    <div className="gita-page">
      {/* ── Chapter hero ─────────────────────────────────── */}
      <Reveal>
        <section className="gita-chapter-hero">
        <span aria-hidden="true" className="gita-hero-om">
          ॐ
        </span>
        <div className="mx-auto w-full max-w-3xl px-4 lg:px-8">
          <Breadcrumb
            items={[
              {label: en ? 'Scriptures' : 'ग्रंथ', href: '/scriptures'},
              {label: gitaTitle, href: '/scriptures/gita'},
              {label: chapterLabel}
            ]}
          />
          <div className="gita-chapter-hero-inner">
            <span className="gita-adhyaya-pill">
              {en
                ? `Adhyaya ${entry.meta.n} of 18`
                : `18 में से अध्याय ${entry.meta.n}`}
            </span>
            <h1 className="gita-chapter-title">
              {pickLocalizedText(locale, entry.meta.title.en, entry.meta.title.hi)}
            </h1>
            <p className="gita-chapter-alt">
              {en ? entry.meta.title.hi : entry.meta.title.en}
            </p>
            <div aria-hidden="true" className="gita-divider">
              <span>❖</span>
            </div>
            <p className="gita-chapter-summary">
              {pickLocalizedText(locale, entry.meta.summary.en, entry.meta.summary.hi)}
            </p>
            <div className="gita-chapter-meta">
              <span>
                <strong>{entry.verses.length}</strong> {en ? 'verses' : 'श्लोक'}
              </span>
              <span aria-hidden="true" className="gita-meta-dot">
                ·
              </span>
              <span>
                <strong>{krishnaCount}</strong>{' '}
                {en ? 'by Krishna' : 'श्रीकृष्ण के'}
              </span>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="gita-hero-border" />
        </section>
      </Reveal>

      <section className="mx-auto w-full max-w-3xl px-4 py-10 lg:px-8">
        <GitaVerseIndex total={entry.verses.length} locale={locale} />

        <div className="flex flex-col gap-5">
          {entry.verses.map((v) => (
            <article
              key={v.n}
              id={`verse-${v.n}`}
              className="gita-verse-card"
            >
              <div className="gita-verse-head">
                <span className="gita-verse-no">
                  {entry.meta.n}.{v.n}
                </span>
                <span className={`gita-speaker ${SPEAKER_STYLE[v.speaker] ?? ''}`}>
                  {pickLocalizedText(locale, speakerLabel[v.speaker].en, speakerLabel[v.speaker].hi)}
                </span>
              </div>

              <p lang="sa" className="gita-verse-sa">
                {v.sa}
              </p>
              <p className="gita-verse-tr">{v.tr}</p>

              <div className="gita-verse-meaning">
                <span aria-hidden="true" className="gita-meaning-rule" />
                <p>{pickLocalizedText(locale, v.en, v.hi)}</p>
              </div>
            </article>
          ))}
        </div>

        <nav aria-label={en ? 'Chapters' : 'अध्याय'} className="gita-chapter-foot">
          {prev?.available ? (
            <Link
              href={`/scriptures/gita/${prev.slug}`}
              className="gita-foot-card"
            >
              <small>{en ? '← Previous' : '← पिछला'}</small>
              <strong>{pickLocalizedText(locale, prev.title.en, prev.title.hi)}</strong>
            </Link>
          ) : (
            <Link href="/scriptures/gita" className="gita-foot-card">
              <small>{en ? '← All chapters' : '← सभी अध्याय'}</small>
              <strong>{gitaTitle}</strong>
            </Link>
          )}
          {next ? (
            next.available ? (
              <Link
                href={`/scriptures/gita/${next.slug}`}
                className="gita-foot-card gita-foot-next"
              >
                <small>{en ? 'Next →' : 'अगला →'}</small>
                <strong>{pickLocalizedText(locale, next.title.en, next.title.hi)}</strong>
              </Link>
            ) : (
              <span className="gita-foot-card gita-foot-soon">
                <small>{en ? 'Coming soon' : 'शीघ्र आ रहा'}</small>
                <strong>{pickLocalizedText(locale, next.title.en, next.title.hi)}</strong>
              </span>
            )
          ) : null}
        </nav>
      </section>
    </div>
  );
}
