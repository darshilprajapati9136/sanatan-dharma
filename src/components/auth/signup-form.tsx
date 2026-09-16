'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {useLocale} from 'next-intl';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {FormField} from '@/components/ui/form-field';
import {createClient} from '@/lib/supabase/client';

export function SignupForm({redirectTo}: {redirectTo?: string}) {
  const t = useTranslations('auth');
  const locale = useLocale();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
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

    const next = redirectTo ?? `/${locale}/profile`;

    // The callback is an API route, which is NOT locale-prefixed.
    // /<locale>/api/... does not exist (404); keep the locale in `next` instead.
    const redirectToUrl = `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}`;

    const {error: signUpError} = await client.auth.signUp({
      email,
      password,
      options: {
        data: {name: name.trim()},
        emailRedirectTo: redirectToUrl
      }
    });

    if (signUpError) {
      if (process.env.NODE_ENV === 'development') {
        // Safe: logs only the machine-readable code/status, never PII or secrets.
        console.warn('[signup] signUp failed', {code: signUpError.code, status: signUpError.status});
      }

      const code = (signUpError.code ?? '').toLowerCase();
      const message = signUpError.message.toLowerCase();

      if (message.includes('already registered') || message.includes('already exists')) {
        setError(t('errors.emailExists'));
      } else if (
        code.includes('over_email_send_rate_limit') ||
        signUpError.status === 429 ||
        message.includes('rate limit')
      ) {
        setError(t('errors.rateLimited'));
      } else if (
        message.includes('signup') && message.includes('disabled')
      ) {
        setError(t('errors.signupDisabled'));
      } else if (message.includes('password')) {
        setError(t('errors.weakPassword'));
      } else if (message.includes('email') && message.includes('invalid')) {
        setError(t('errors.invalidEmail'));
      } else {
        setError(t('errors.generic'));
      }

      setLoading(null);
      return;
    }

    const {data} = await client.auth.getSession();

    if (data.session) {
      router.push(redirectTo ?? `/${locale}/profile`);
      router.refresh();
      return;
    }

    router.push(`/${locale}/login?notice=check_email`);
    router.refresh();
  }

  async function handleGoogleSignIn() {
    setError(null);
    setLoading('google');

    const next = redirectTo ?? `/${locale}/profile`;

    // Same as email signup: API routes are not locale-prefixed.
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
      <FormField label={t('name')}>
        <Input
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={loading !== null}
        />
      </FormField>

      <FormField label={t('email')}>
        <Input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading !== null}
        />
      </FormField>

      <FormField label={t('password')} hint={t('passwordHint')}>
        <Input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={loading !== null}
        />
      </FormField>

      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <Button type="submit" size="lg" disabled={loading !== null}>
        {loading === 'email' ? t('creatingAccount') : t('signUp')}
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