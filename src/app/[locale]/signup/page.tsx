import {redirect} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {SignupForm} from '@/components/auth/signup-form';
import {Link} from '@/i18n/navigation';
import {getSession, getSafeNextPath} from '@/server/services/auth';
export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'auth'});
  return {title: t('signupTitle')};
}

export default async function SignupPage({
  params,
  searchParams
}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{next?: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('auth');
  const {next} = await searchParams;

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
          {t('signupTitle')}
        </h1>
        <p className="text-muted">{t('signupSubtitle')}</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm lg:p-8">
        <SignupForm redirectTo={redirectTo} />

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