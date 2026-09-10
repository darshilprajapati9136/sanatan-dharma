import {getTranslations, setRequestLocale} from 'next-intl/server';
import PlaceholderPage from '@/components/placeholder-page';

export default async function PrivacyPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'footer'});

  return <PlaceholderPage title={t('privacy')} />;
}