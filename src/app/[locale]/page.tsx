import Image from 'next/image';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {ButtonLink} from '@/components/ui/button';
import {Icon, type IconName} from '@/components/ui/icon';
import {PanchangSummary} from '@/components/home/panchang-summary';
import {PracticeList} from '@/components/home/practice-list';
import {Reveal} from '@/components/ui/reveal';
import {festivalGuides} from '@/content/festivals';
import {pickLocalizedText} from '@/lib/localized';
export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata'});
  return {title: t('title'), description: t('description')};
}
export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('daily');
  const v = await getTranslations('visual');
  const date = new Intl.DateTimeFormat(locale === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Asia/Kolkata'
  }).format(new Date());
  const pillars = [
    ['/panchang', 'todayNav', 'pillarToday', 'calendar'],
    ['/ask', 'understand', 'pillarUnderstand', 'chat'],
    ['/practise', 'practiceLabel', 'pillarPractise', 'lotus'],
    ['/learn', 'learnNav', 'pillarLearn', 'book']
  ];
  const festivals = festivalGuides.filter((g) =>
    ['diwali', 'holi', 'navratri'].includes(g.slug)
  );
  return (
    <div className="home-editorial">
      <section className="opening-hero">
        <div className="hero-copy">
          <p className="eyebrow hero-enter">{v('eyebrow')}</p>
          <h1 className="hero-enter">
            {v('heroFirst')}
            <br />
            <em>{v('heroSecond')}</em>
          </h1>
          <p className="hero-description hero-enter">{v('intro')}</p>
          <div className="hero-actions hero-enter">
            <ButtonLink href="/panchang" variant="secondary" size="lg">
              {v('begin')}
              <Icon name="arrowRight" />
            </ButtonLink>
            <Link href="/learn" className="text-link">
              {v('explore')} <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="ornament-dot" />
            {v('trust')}
          </div>
        </div>
        <figure className="hero-art">
          <Image
            src="/images/temple-dawn.webp"
            alt={
              locale === 'hi'
                ? 'भोर में नदी किनारे मंदिर का कल्पनात्मक चित्रण'
                : 'Imagined riverside temple architecture at dawn'
            }
            fill
            preload
            sizes="(max-width: 900px) 100vw, 55vw"
          />
          <div className="hero-image-label">
            <span>
              {locale === 'hi'
                ? 'ठहरें। जुड़ें। आगे बढ़ें।'
                : 'Pause. Connect. Begin again.'}
            </span>
            <p>{v('caption')}</p>
          </div>
        </figure>
      </section>
      <nav className="pillar-nav" aria-label={t('explore')}>
        {pillars.map(([href, label, subtitle, icon], i) => (
          <Link href={href} key={href} className="pillar-link">
            <span className="pillar-icon">
              <Icon name={icon as IconName} />
            </span>
            <div>
              <span className="pillar-title">{t(label)}</span>
              <span className="pillar-subtitle">{v(subtitle)}</span>
            </div>
            <span className="pillar-number">0{i + 1}</span>
          </Link>
        ))}
      </nav>
      <div className="editorial-container">
        <Reveal>
          <section className="today-grid" id="today">
            <div className="today-intro">
              <p className="eyebrow">{v('todayLabel')}</p>
              <p className="date-line">
                <Icon name="calendar" />
                {date} · IST
              </p>
              <h2>{v('dailyTitle')}</h2>
              <p className="body-copy">{v('dailyBody')}</p>
              <Link href="/panchang#glossary" className="text-link">
                {t('glossary')} <span aria-hidden="true">↗</span>
              </Link>
              <div className="today-motif" aria-hidden="true">
                <svg viewBox="0 0 280 120" fill="none">
                  <path
                    d="M20 100h240M50 100a90 90 0 0 1 180 0M75 100a65 65 0 0 1 130 0M140 0v15M37 25l13 13m193-13-13 13"
                    stroke="currentColor"
                  />
                  <circle cx="140" cy="85" r="30" stroke="currentColor" />
                </svg>
              </div>
            </div>
            <PanchangSummary locale={locale} />
          </section>
        </Reveal>
        <Reveal>
          <section className="practice-grid">
            <div>
              <p className="eyebrow">{v('practiceLabel')}</p>
              <h2 className="section-title">{t('practice')}</h2>
              <p className="body-copy">{t('practiceIntro')}</p>
              <PracticeList />
            </div>
            <Link href="/learn/foundations/dharma" className="reading-feature">
              <div className="reading-feature-image">
                <Image
                  src="/images/quiet-study.webp"
                  alt=""
                  fill
                  sizes="(max-width: 800px) 100vw, 45vw"
                />
              </div>
              <div className="reading-feature-copy">
                <p className="eyebrow">{t('five')}</p>
                <h2>{t('fiveTitle')}</h2>
                <p>{t('fiveBody')}</p>
                <span className="feature-link">
                  {t('read')} <Icon name="arrowRight" />
                </span>
                <small>{v('art')}</small>
              </div>
            </Link>
          </section>
        </Reveal>
        <Reveal>
          <section className="festival-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{v('festivalLabel')}</p>
                <h2 className="section-title">{v('festivalTitle')}</h2>
              </div>
              <Link href="/explore/festivals" className="text-link">
                {v('viewAll')} ↗
              </Link>
            </div>
            <div className="festival-feature-grid">
              <Link
                href="/explore/festivals/diwali"
                className="festival-art-link"
              >
                <Image
                  src="/images/diya-evening.webp"
                  alt={
                    locale === 'hi'
                      ? 'दीपों और गेंदे के फूलों का एआई चित्रण'
                      : 'AI illustration of clay lamps and marigolds'
                  }
                  fill
                  sizes="(max-width: 800px) 100vw, 50vw"
                />
                <div>
                  <span>{v('art')}</span>
                  <h3>
                    {locale === 'hi'
                      ? 'प्रकाश, अपनापन और नई शुरुआत।'
                      : 'Light, belonging, and new beginnings.'}
                  </h3>
                  <p>{v('readGuide')} →</p>
                </div>
              </Link>
              <div className="festival-editorial-list">
                {festivals.map((g, i) => (
                  <Link key={g.slug} href={`/explore/festivals/${g.slug}`}>
                    <span className="list-number">0{i + 1}</span>
                    <div>
                      <p className="eyebrow">{t(g.kind)}</p>
                      <h3>
                        {pickLocalizedText(locale, g.title.en, g.title.hi)}
                      </h3>
                      <p>
                        {pickLocalizedText(locale, g.summary.en, g.summary.hi)}
                      </p>
                    </div>
                    <Icon name="arrowRight" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
        <Reveal>
          <section className="explore-section">
            <p className="eyebrow">{v('exploreLabel')}</p>
            <h2 className="section-title">{t('explore')}</h2>
            <div className="discovery-grid">
              {[
                ['/learn/foundations', 'foundation', 'lotus'],
                ['/scriptures', 'scriptures', 'book'],
                ['/explore/festivals', 'festivals', 'flame'],
                ['/learn/yoga-meditation', 'yoga', 'temple']
              ].map(([href, key, icon], i) => (
                <Link href={href} key={key} className="discovery-item">
                  <span className="discovery-index">0{i + 1}</span>
                  <Icon name={icon as IconName} className="h-8 w-8" />
                  <h3>{t(key)}</h3>
                  <span className="discovery-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>
        <Reveal>
          <section className="ask-band">
            <div className="ask-mark" aria-hidden="true">
              ?
            </div>
            <div>
              <p className="eyebrow">{v('askLabel')}</p>
              <h2>{t('askTitle')}</h2>
              <p>{t('askBody')}</p>
            </div>
            <ButtonLink href="/ask" variant="secondary" size="lg">
              {t('ask')} <Icon name="arrowRight" />
            </ButtonLink>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
