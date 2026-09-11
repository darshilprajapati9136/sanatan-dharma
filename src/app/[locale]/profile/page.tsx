import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ProfilePreferences} from '@/components/profile/profile-preferences';
import {Link} from '@/i18n/navigation';
import {getCurrentProfile, getSession} from '@/server/services/auth';
import {Button} from '@/components/ui/button';

function formatMemberSince(date: Date | string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'hi' ? 'hi-IN' : 'en-US', {
    year: 'numeric',
    month: 'long'
  }).format(typeof date === 'string' ? new Date(date) : date);
}

export default async function ProfilePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('profile');
  const {user} = await getSession();
  const profile = await getCurrentProfile(user ?? undefined);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 lg:px-8">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
        {t('title')}
      </h1>

      {!user ? (
        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-serif text-xl font-semibold text-foreground">{t('anonymousTitle')}</h2>
          <p className="text-muted">{t('anonymousDescription')}</p>
          <Link href="/login">
            <Button>{t('signIn')}</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-foreground">{profile?.displayName ?? user.email}</p>
            {profile?.createdAt ? (
              <p className="text-sm text-muted">
                {t('memberSince')} {formatMemberSince(profile.createdAt, locale)}
              </p>
            ) : null}
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 lg:p-8">
            <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">{t('settings')}</h2>
            <ProfilePreferences
              userId={user.id}
              email={user.email ?? ''}
              initialDisplayName={profile?.displayName ?? ''}
              initialLanguage={profile?.preferredLanguage ?? 'en'}
            />
          </div>
        </div>
      )}
    </section>
  );
}