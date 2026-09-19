import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
const tracks: Array<{
  titleKey: 'path' | 'track2Title' | 'track3Title';
  introKey: 'pathIntro' | 'track2Intro' | 'track3Intro';
  steps: Array<{href: string; labelKey: string}>;
}> = [
  {
    titleKey: 'path',
    introKey: 'pathIntro',
    steps: [
      {href: '/learn/foundations/dharma', labelKey: 'step1'},
      {href: '/learn/foundations/karma', labelKey: 'step2'},
      {href: '/learn/scriptures/bhagavad-gita', labelKey: 'step3'}
    ]
  },
  {
    titleKey: 'track2Title',
    introKey: 'track2Intro',
    steps: [
      {href: '/learn/scriptures/vedas', labelKey: 'track2step1'},
      {href: '/learn/scriptures/upanishads', labelKey: 'track2step2'},
      {href: '/learn/scriptures/bhagavad-gita', labelKey: 'track2step3'}
    ]
  },
  {
    titleKey: 'track3Title',
    introKey: 'track3Intro',
    steps: [
      {
        href: '/learn/yoga-meditation/yoga-overview',
        labelKey: 'track3step1'
      },
      {
        href: '/learn/yoga-meditation/meditation-basics',
        labelKey: 'track3step2'
      },
      {href: '/learn/practices/puja', labelKey: 'track3step3'}
    ]
  }
];
export async function GuidedPath() {
  const t = await getTranslations('daily');
  return (
    <section className="my-8 flex flex-col gap-6">
      {tracks.map((track) => (
        <div
          key={track.titleKey}
          className="rounded-xl border border-border bg-surface p-6"
        >
          <h2 className="font-serif text-2xl">{t(track.titleKey)}</h2>
          <p className="mt-2 text-sm text-muted">{t(track.introKey)}</p>
          <ol className="mt-4 divide-y divide-border">
            {track.steps.map((step, i) => (
              <li key={step.href + step.labelKey}>
                <Link
                  href={step.href}
                  className="flex gap-4 py-4 text-sm font-medium hover:text-primary"
                >
                  <span className="text-primary">0{i + 1}</span>
                  {t(step.labelKey)} →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}
