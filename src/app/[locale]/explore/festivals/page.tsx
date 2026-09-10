import {getTranslations, setRequestLocale} from 'next-intl/server';
import PlaceholderPage from '@/components/placeholder-page';

export default async function FestivalsPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'nav'});

  return <PlaceholderPage title={t('festivals')} />;
}