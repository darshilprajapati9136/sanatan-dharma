import {getTranslations, setRequestLocale} from 'next-intl/server';
import {PracticeList} from '@/components/home/practice-list';
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
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <p className="text-xs uppercase tracking-widest text-primary">
        {t('practiceLabel')}
      </p>
      <h1 className="mt-4 font-serif text-4xl">{t('practice')}</h1>
      <p className="my-5 text-muted">{t('practiceIntro')}</p>
      <PracticeList />
      <p className="my-8 text-sm leading-relaxed text-muted">
        {t('practiceEnd')}
      </p>
      <Link className="text-primary underline" href="/learn/practices">
        {t('related')} →
      </Link>
    </section>
  );
}
