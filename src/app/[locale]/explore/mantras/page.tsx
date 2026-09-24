import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Reveal} from '@/components/ui/reveal';
import {MantraLibrary} from '@/components/mantras/mantra-library';
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
    title: `${navT('mantras')} · Sanatan Dharma`,
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
  const en = locale !== 'hi';
  const topic = getLearnTopic('practices', 'mantra-japa');
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16 lg:px-8">
      <Reveal>
        <header className="mantra-hero">
          <p className="eyebrow">{en ? 'Mantra library · Naam Japa' : 'मंत्र संग्रह · नाम जप'}</p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
            {navT('mantras')}
          </h1>
          {topic ? (
            <p className="body-copy max-w-2xl">
              {pickLocalizedText(locale, topic.summary.en, topic.summary.hi)}
            </p>
          ) : null}
          <div className="mantra-hero-actions">
            <Link href="/japa" className="action-button mantra-cta">
              {en ? '📿 Open Naam Japa counter →' : '📿 नाम जप काउंटर खोलें →'}
            </Link>
            <Link href="/learn/practices/mantra-japa" className="text-link">
              {en ? 'How does japa work?' : 'जप कैसे करें?'} ↗
            </Link>
          </div>
        </header>
      </Reveal>
      <MantraLibrary locale={locale} />
      <Reveal>
        <footer className="mantra-foot">
          <p>
            {en
              ? 'These mantras are given for remembrance and study. Pronunciation and method vary by family and tradition — learn the ones you practise with a trusted teacher.'
              : 'ये मंत्र स्मरण और अध्ययन हेतु दिए गए हैं। उच्चारण और विधि परिवार-परंपरा से भिन्न होती है — जप करने वाले मंत्र विश्वसनीय गुरु से सीखें।'}
          </p>
          <Link href="/learn/practices" className="text-sm font-semibold text-primary">
            {en ? 'Explore practice guides →' : 'साधना परिचय देखें →'}
          </Link>
        </footer>
      </Reveal>
    </div>
  );
}
