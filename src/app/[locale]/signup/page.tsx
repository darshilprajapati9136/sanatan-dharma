import {getTranslations, setRequestLocale} from 'next-intl/server';
import {SignupForm} from '@/components/auth/signup-form';
import {Link} from '@/i18n/navigation';

export default async function SignupPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('auth');

  return (
    <section className="mx-auto w-full max-w-md px-4 py-16 lg:px-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
          {t('signupTitle')}
        </h1>
        <p className="text-muted">{t('signupSubtitle')}</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm lg:p-8">
        <SignupForm />

        <p className="mt-6 text-center text-sm text-muted">
          {t('haveAccount')}{' '}
          <Link href="/login" className="font-medium text-primary hover:text-primary-hover">
            {t('goToLogin')}
          </Link>
        </p>
      </div>
    </section>
  );
}