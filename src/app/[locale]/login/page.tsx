import {redirect} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {LoginForm} from '@/components/auth/login-form';
import {Link} from '@/i18n/navigation';
import {getSession, getSafeNextPath} from '@/server/services/auth';

export default async function LoginPage({
  params,
  searchParams
}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{error?: string; notice?: string; next?: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('auth');
  const {error, notice, next} = await searchParams;

  // Already signed in: skip the form and go to the intended destination.
  const {user} = await getSession();
  const redirectTo = getSafeNextPath(next, locale);

  if (user) {
    redirect(redirectTo);
  }

  return (
    <section className="mx-auto w-full max-w-md px-4 py-16 lg:px-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
          {t('loginTitle')}
        </h1>
        <p className="text-muted">{t('loginSubtitle')}</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm lg:p-8">
        {notice === 'check_email' ? (
          <p className="mb-5 rounded-lg border border-accent/40 bg-accent/15 p-3 text-sm text-accent-foreground">
            {t('checkEmail')}
          </p>
        ) : null}

        <LoginForm hasError={error === 'callback_failed'} redirectTo={redirectTo} />

        <p className="mt-6 text-center text-sm text-muted">
          {t('noAccount')}{' '}
          <Link href="/signup" className="font-medium text-primary hover:text-primary-hover">
            {t('goToSignup')}
          </Link>
        </p>
      </div>
    </section>
  );
}