'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {useLocale} from 'next-intl';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {FormField} from '@/components/ui/form-field';
import {createClient} from '@/lib/supabase/client';

export function SignupForm() {
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

    const redirectTo = `${window.location.origin}/${locale}/api/auth/callback?next=/${locale}/profile`;

    const {error: signUpError} = await client.auth.signUp({
      email,
      password,
      options: {
        data: {name: name.trim()},
        emailRedirectTo: redirectTo
      }
    });

    if (signUpError) {
      setError(t('errors.generic'));
      setLoading(null);
      return;
    }

    const {data} = await client.auth.getSession();

    if (data.session) {
      router.push(`/${locale}/profile`);
      router.refresh();
      return;
    }

    router.push(`/${locale}/login?notice=check_email`);
    router.refresh();
  }

  async function handleGoogleSignIn() {
    setError(null);
    setLoading('google');

    const redirectTo = `${window.location.origin}/${locale}/api/auth/callback?next=/${locale}/profile`;

    const {error: oauthError} = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {redirectTo}
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