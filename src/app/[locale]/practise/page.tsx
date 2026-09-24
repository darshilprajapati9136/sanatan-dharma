import {getTranslations, setRequestLocale} from 'next-intl/server';
import {PracticeList} from '@/components/home/practice-list';
import {Reveal} from '@/components/ui/reveal';
import {Link} from '@/i18n/navigation';
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'daily'});
  return {title: t('practiceLabel') + ' · Sanatan Dharma'};
}

export default async function PractisePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('daily');
  const en = locale !== 'hi';
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <Reveal>
        <p className="text-xs uppercase tracking-widest text-primary">
          {t('practiceLabel')}
        </p>
        <h1 className="mt-4 font-serif text-4xl">{t('practice')}</h1>
        <p className="my-5 text-muted">{t('practiceIntro')}</p>
      </Reveal>
      <Reveal>
        <div className="japa-banner">
          <div>
            <p className="eyebrow">{en ? 'Naam Japa' : 'नाम जप'}</p>
            <h2>{en ? 'Count your japa with focus' : 'ध्यान सहित जप गिनें'}</h2>
            <p>
              {en
                ? 'Mala-inspired counter with mantra library, sankalpa targets and your own deity photo.'
                : 'मंत्र संग्रह, संकल्प लक्ष्य और अपनी इष्टदेव फोटो के साथ माला-प्रेरित काउंटर।'}
            </p>
          </div>
          <Link href="/japa" className="action-button mantra-cta">
            {en ? '📿 Open Japa Counter →' : '📿 जप काउंटर खोलें →'}
          </Link>
        </div>
      </Reveal>
      <Reveal>
        <PracticeList />
        <div className="mantra-hero-actions" style={{marginTop: 24}}>
          <Link href="/explore/mantras" className="text-link">
            {en ? 'Browse mantra library' : 'मंत्र संग्रह देखें'} ↗
          </Link>
        </div>
      </Reveal>
      <Reveal>
        <p className="my-8 text-sm leading-relaxed text-muted">
          {t('practiceEnd')}
        </p>
        <Link className="text-primary underline" href="/learn/practices">
          {t('related')} →
        </Link>
      </Reveal>
    </section>
  );
}
