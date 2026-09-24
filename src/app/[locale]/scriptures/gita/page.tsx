import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Breadcrumb} from '@/components/ui/breadcrumb';
import {Reveal} from '@/components/ui/reveal';
import {gitaMeta, gitaChapters} from '@/content/gita';
import {pickLocalizedText} from '@/lib/localized';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: `${pickLocalizedText(locale, gitaMeta.title.en, gitaMeta.title.hi)} · Sanatan Dharma`,
    description: pickLocalizedText(locale, gitaMeta.description.en, gitaMeta.description.hi)
  };
}

const MAX_VERSES = 78;

export default async function GitaPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const en = locale !== 'hi';

  return (
    <div className="gita-page">
      {/* ── Hero ─────────────────────────────────────────── */}
      <Reveal>
        <section className="gita-hero">
          <span aria-hidden="true" className="gita-hero-om">
            ॐ
          </span>
          <div className="gita-hero-inner mx-auto w-full max-w-5xl px-4 lg:px-8">
            <Breadcrumb
              items={[
                {label: en ? 'Scriptures' : 'ग्रंथ', href: '/scriptures'},
                {label: pickLocalizedText(locale, gitaMeta.title.en, gitaMeta.title.hi)}
              ]}
            />
            <p className="gita-eyebrow">
              <span className="gita-eyebrow-dot" aria-hidden="true" />
              {en ? 'Scriptures · Mahabharata, Bhishma Parva' : 'ग्रंथ · महाभारत, भीष्म पर्व'}
            </p>
            <h1 className="gita-hero-title">
              {pickLocalizedText(locale, gitaMeta.title.en, gitaMeta.title.hi)}
            </h1>
            <p className="gita-hero-sub">
              {pickLocalizedText(locale, gitaMeta.description.en, gitaMeta.description.hi)}
            </p>
            <div className="gita-hero-stats">
              <span className="gita-stat">
                <strong>18</strong> {en ? 'chapters' : 'अध्याय'}
              </span>
              <span className="gita-stat">
                <strong>700</strong> {en ? 'verses' : 'श्लोक'}
              </span>
              <span className="gita-stat">
                <strong>॥</strong> {en ? 'Krishna · Arjuna' : 'कृष्ण · अर्जुन'}
              </span>
            </div>
          </div>
          <div aria-hidden="true" className="gita-hero-border" />
        </section>
      </Reveal>

      {/* ── Chapters ─────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-5xl px-4 py-10 lg:px-8 lg:py-14">
        <Reveal>
          <aside className="gita-note">
            <span aria-hidden="true" className="gita-note-icon">
              ❖
            </span>
            <p>{pickLocalizedText(locale, gitaMeta.source.en, gitaMeta.source.hi)}</p>
          </aside>
        </Reveal>

        <Reveal>
          <div className="gita-section-head">
            <h2>{en ? 'Chapters' : 'अध्याय'}</h2>
            <span className="gita-section-count">
              {gitaChapters.length} {en ? 'adhyayas' : 'अध्याय'}
            </span>
          </div>
        </Reveal>

        <Reveal>
          <ol className="gita-chapter-grid stagger">
          {gitaChapters.map((ch) => {
            const width = Math.max(8, Math.round((ch.verses / MAX_VERSES) * 100));
            return (
              <li key={ch.n}>
                {ch.available ? (
                  <Link
                    href={`/scriptures/gita/${ch.slug}`}
                    className="gita-chapter-card gita-chapter-open"
                  >
                    <span aria-hidden="true" className="gita-card-om">
                      ॐ
                    </span>
                    <div className="gita-card-top">
                      <span className="gita-chapter-num">
                        {String(ch.n).padStart(2, '0')}
                      </span>
                      <span className="gita-verse-pill">
                        {ch.verses} {en ? 'verses' : 'श्लोक'}
                      </span>
                    </div>
                    <h3>{pickLocalizedText(locale, ch.title.en, ch.title.hi)}</h3>
                    <p className="gita-card-hi">
                      {en ? ch.title.hi : ch.title.en}
                    </p>
                    <p className="gita-card-summary">
                      {pickLocalizedText(locale, ch.summary.en, ch.summary.hi)}
                    </p>
                    <div
                      aria-hidden="true"
                      className="gita-card-bar"
                    >
                      <i style={{width: `${width}%`}} />
                    </div>
                    <span className="gita-card-cta">
                      {en ? 'Read chapter' : 'अध्याय पढ़ें'}
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                ) : (
                  <div className="gita-chapter-card gita-chapter-locked" aria-disabled="true">
                    <div className="gita-card-top">
                      <span className="gita-chapter-num">
                        {String(ch.n).padStart(2, '0')}
                      </span>
                      <span className="gita-verse-pill">
                        {ch.verses} {en ? 'verses' : 'श्लोक'}
                      </span>
                    </div>
                    <h3>{pickLocalizedText(locale, ch.title.en, ch.title.hi)}</h3>
                    <p className="gita-card-summary">
                      {pickLocalizedText(locale, ch.summary.en, ch.summary.hi)}
                    </p>
                    <span className="gita-card-cta gita-card-soon">
                      {en ? 'Coming soon' : 'शीघ्र आ रहा'}
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        </Reveal>
      </section>
    </div>
  );
}
