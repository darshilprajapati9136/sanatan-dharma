'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {useLocale} from 'next-intl';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {FormField} from '@/components/ui/form-field';
import {createClient} from '@/lib/supabase/client';

export function LoginForm({hasError, redirectTo}: {hasError?: boolean; redirectTo?: string}) {
  const t = useTranslations('auth');
  const locale = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(hasError ? t('callbackFailed') : null);
  const [loading, setLoading] = useState<'email' | 'google' | null>(null);

  const supabase = createClient();

  if (!supabase) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6 text-center">
        <p className="text-sm text-muted">{t('errors.unconfigured')}</p>
      </div>
    );
  }

  const client = supabase;

  async function handleEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email.includes('@')) {
      setError(t('errors.invalidEmail'));
      return;
    }

    if (password.length < 8) {
      setError(t('errors.passwordTooShort'));
      return;
    }

    setLoading('email');

    const {error: signInError} = await client.auth.signInWithPassword({email, password});

    if (signInError) {
      const message = signInError.message.toLowerCase();

      if (message.includes('invalid login credentials') || message.includes('invalid email or password')) {
        setError(t('errors.invalidCredentials'));
      } else if (message.includes('email not confirmed')) {
        setError(t('checkEmail'));
      } else {
        setError(t('errors.generic'));
      }

      setLoading(null);
      return;
    }

    router.push(redirectTo ?? `/${locale}/profile`);
    router.refresh();
  }

  async function handleGoogleSignIn() {
    setError(null);
    setLoading('google');

    // API routes are not locale-prefixed (/en/api/... 404s); keep the locale in `next`.
    const next = redirectTo ?? `/${locale}/profile`;
    const redirectToUrl = `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}`;

    const {error: oauthError} = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {redirectTo: redirectToUrl}
    });

    if (oauthError) {
      setError(t('errors.generic'));
      setLoading(null);
    }
  }

  return (
    <form onSubmit={handleEmailSubmit} className="flex flex-col gap-5">
      <FormField label={t('email')}>
        <Input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading !== null}
        />
      </FormField>

      <FormField label={t('password')}>
        <Input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={loading !== null}
        />
      </FormField>

      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <Button type="submit" size="lg" disabled={loading !== null}>
        {loading === 'email' ? t('signingIn') : t('signIn')}
      </Button>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs uppercase tracking-wide text-muted">{t('divider')}</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button type="button" variant="outline" size="lg" onClick={handleGoogleSignIn} disabled={loading !== null}>
        {loading === 'google' ? t('errors.redirecting') : t('google')}
      </Button>
    </form>
  );
}