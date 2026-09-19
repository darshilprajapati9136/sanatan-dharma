import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
export default async function Page({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('daily');
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <h1 className="font-serif text-4xl">{t('privacyTitle')}</h1>
      <p className="mt-8 leading-relaxed text-muted">{t('privacyBody')}</p>
      <p className="mt-6 leading-relaxed text-muted">{t('privacyMore')}</p>
      <Link href="/learn" className="mt-8 inline-block text-primary">
        {t('learnNav')} →
      </Link>
    </article>
  );
}
