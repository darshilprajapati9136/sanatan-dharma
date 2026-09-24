import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Reveal} from '@/components/ui/reveal';
import {JapaCounter} from '@/components/japa/japa-counter';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const en = locale !== 'hi';
  return {
    title: en
      ? 'Naam Japa Counter · Sanatan Dharma'
      : 'नाम जप काउंटर · सनातन धर्म',
    description: en
      ? 'Count your naam japa with a mala-inspired counter. Choose a mantra, set a sankalpa, and optionally focus on your own deity image.'
      : 'माला-प्रेरित काउंटर से नाम जप गिनें। मंत्र चुनें, संकल्प लें और चाहें तो अपनी इष्टदेव छवि पर ध्यान करें।'
  };
}

export default async function JapaPage({
  params,
  searchParams
}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{mantra?: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const en = locale !== 'hi';
  void getTranslations;
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16 lg:px-8">
      <Reveal>
        <header className="japa-hero">
          <p className="eyebrow">{en ? 'Practise · Naam Japa' : 'अभ्यास · नाम जप'}</p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight">
            {en ? 'Naam Japa Counter' : 'नाम जप काउंटर'}
          </h1>
          <p className="body-copy max-w-2xl">
            {en
              ? 'Select a naam or mantra, set your sankalpa (11, 108, 1008…), then tap the large button — or press Space — for each repetition. You can keep your Ishta-devata or guru photo in focus.'
              : 'नाम या मंत्र चुनें, संकल्प लें (11, 108, 1008…), फिर प्रत्येक आवृत्ति पर बड़ा बटन दबाएँ — या स्पेस दबाएँ। इष्टदेव या गुरु की फोटो सामने रख सकते हैं।'}
          </p>
          <nav className="japa-crumbs">
            <Link href="/practise">← {en ? 'Practise' : 'अभ्यास'}</Link>
            <span aria-hidden="true"> · </span>
            <Link href="/explore/mantras">{en ? 'Mantra library' : 'मंत्र संग्रह'}</Link>
          </nav>
        </header>
      </Reveal>
      <JapaCounter locale={locale} initialMantra={sp.mantra ?? 'sita-ram'} />
    </div>
  );
}
