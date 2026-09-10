import {getTranslations} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {ButtonLink} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {HeroSearch} from '@/components/home/hero-search';

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tNav = await getTranslations('nav');
  const tCommon = await getTranslations('common');

  const concepts = t.raw('coreConcepts') as Array<{key: string; en: string; hi: string}>;
  const displayName = (concept: {en: string; hi: string}) =>
    locale === 'hi' ? concept.hi : concept.en;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
      <section className="flex flex-col items-start gap-6 py-16 lg:py-24">
        <Badge variant="accent">{t('heroEyebrow')}</Badge>
        <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          {t('heroTitle')}
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted">{t('heroSubtitle')}</p>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/learn" size="lg">
            {t('startLearning')}
          </ButtonLink>
          <ButtonLink href="/ask" variant="secondary" size="lg">
            {t('askDharma')}
          </ButtonLink>
        </div>
        <div className="mt-4">
          <HeroSearch />
        </div>
      </section>

      <section className="py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">{t('yourJourney')}</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {href: '/learn', icon: 'sparkles', title: t('journeyBeginnerTitle'), description: t('journeyBeginnerDescription')},
            {href: '/scriptures/bhagavad-gita', icon: 'book', title: t('journeyGitaTitle'), description: t('journeyGitaDescription')},
            {href: '/scriptures', icon: 'bookmark', title: t('journeyScripturesTitle'), description: t('journeyScripturesDescription')},
            {href: '/ask', icon: 'chat', title: t('journeyAskTitle'), description: t('journeyAskDescription')}
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary/50"
            >
              <span className="text-sm font-medium text-primary">{tCommon('learnMore')}</span>
              <h3 className="font-serif text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="text-sm text-muted">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="mb-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground">{t('coreConceptsTitle')}</h2>
          <p className="mt-1 text-muted">{t('coreConceptsIntro')}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {concepts.map((concept) => (
            <Link
              key={concept.key}
              href="/learn"
              className="group flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-6 transition-colors hover:border-primary/50"
            >
              <span className="font-serif text-base font-semibold text-foreground">
                {displayName(concept)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="rounded-2xl bg-[#e7d5bb] p-8 lg:p-12">
          <div className="mb-4 flex flex-col gap-2">
            <Badge variant="accent">{t('bhagavadGitaTitle')}</Badge>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-secondary">
              श्रीमद्भगवद्गीता
            </h2>
            <p className="text-secondary/80">{t('bhagavadGitaIntro')}</p>
          </div>
          <p className="mb-6 text-sm font-medium text-secondary/70">{t('comingWithContent')}</p>
          <ButtonLink href="/scriptures/bhagavad-gita" variant="secondary">
            {tCommon('exploreMore')}
          </ButtonLink>
        </div>
      </section>

      <section className="py-12">
        <div className="mb-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground">{t('dailyShlokaTitle')}</h2>
        </div>
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <p className="text-sm text-muted">{t('dailyShlokaComingSoon')}</p>
          <Badge>{tCommon('comingSoon')}</Badge>
        </div>
      </section>

      <section className="py-12">
        <div className="mb-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground">{t('exploreTitle')}</h2>
          <p className="mt-1 text-muted">{t('exploreIntro')}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {href: '/explore/deities', key: 'deities'},
            {href: '/explore/mantras', key: 'mantras'},
            {href: '/explore/festivals', key: 'festivals'}
          ].map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="flex items-center justify-between rounded-xl border border-border bg-surface px-6 py-5 transition-colors hover:border-primary/50"
            >
              <span className="font-serif text-lg font-semibold text-foreground">{tNav(item.key)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="mb-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground">{t('trustTitle')}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {label: t('trustScripture')},
            {label: t('trustCommentary')},
            {label: t('trustExplanation')},
            {label: t('trustAi')}
          ].map((item, index) => (
            <div key={index} className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
              {item.label}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}