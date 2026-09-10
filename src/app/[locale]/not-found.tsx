import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';

export default async function LocaleNotFound() {
  const t = await getTranslations('placeholder');

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center lg:px-8">
      <h1 className="font-serif text-5xl font-semibold tracking-tight text-foreground">404</h1>
      <p className="text-muted">{t('description')}</p>
      <Link
        href="/"
        className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        {t('backHome')}
      </Link>
    </section>
  );
}