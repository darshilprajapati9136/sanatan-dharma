import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Reveal} from '@/components/ui/reveal';
import {getLearnTopic} from '@/content/learn';
import {pickLocalizedText} from '@/lib/localized';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'nav'});
  return {title: t('explore')};
}

const DESTINATIONS = [
  {href: '/explore/deities', key: 'deities', descKey: 'deities'},
  {href: '/explore/mantras', key: 'mantras', descKey: null},
  {href: '/explore/festivals', key: 'festivals', descKey: null},
  {href: '/explore/traditions', key: 'traditions', descKey: 'temples-traditions'},
  {href: '/explore/philosophy', key: 'philosophy', descKey: 'philosophy'}
] as const;

export default async function ExplorePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const navT = await getTranslations({locale, namespace: 'nav'});
  const learnT = await getTranslations('learn');
  const daily = await getTranslations('daily');
  const mantraSummary = (() => {
    const topic = getLearnTopic('practices', 'mantra-japa');
    return topic
      ? pickLocalizedText(locale, topic.summary.en, topic.summary.hi)
      : '';
  })();
  const descriptionFor = (descKey: string | null) => {
    if (descKey === null) return null;
    return learnT(`categories.${descKey}.description`);
  };
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16 lg:px-8">
      <Reveal>
        <header className="flex flex-col gap-3 border-b border-border pb-8">
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
            {navT('explore')}
          </h1>
        </header>
      </Reveal>
      <Reveal>
        <div className="divide-y divide-border stagger">
        {DESTINATIONS.map((dest) => {
          const description =
            dest.key === 'mantras'
              ? mantraSummary
              : dest.key === 'festivals'
                ? daily('festivalIntro')
                : descriptionFor(dest.descKey);
          return (
            <Link
              key={dest.key}
              href={dest.href}
              className="group grid gap-1 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4"
            >
              <div>
                <h2 className="font-serif text-2xl group-hover:text-primary">
                  {navT(dest.key)}
                </h2>
                {description ? (
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    {description}
                  </p>
                ) : null}
              </div>
              <span aria-hidden="true" className="text-muted">
                →
              </span>
            </Link>
          );
        })}
        </div>
      </Reveal>
    </div>
  );
}
