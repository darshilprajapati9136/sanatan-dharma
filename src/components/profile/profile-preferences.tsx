'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {useLocale} from 'next-intl';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {FormField} from '@/components/ui/form-field';
import {createClient} from '@/lib/supabase/client';

export function ProfilePreferences({
  userId,
  email,
  initialDisplayName,
  initialLanguage
}: {
  userId: string;
  email: string;
  initialDisplayName: string;
  initialLanguage: 'en' | 'hi';
}) {
  const t = useTranslations('profile');
  const locale = useLocale();
  const router = useRouter();
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [language, setLanguage] = useState<'en' | 'hi'>(initialLanguage);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const supabase = createClient();

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(false);

    if (!supabase) {
      return;
    }

    setSaving(true);

    const {error} = await supabase
      .from('profiles')
      .update({display_name: displayName.trim(), preferred_language: language})
      .eq('user_id', userId);

    setSaving(false);

    if (error) {
      return;
    }

    setSaved(true);
    router.refresh();
  }

  async function handleSignOut() {
    if (!supabase) {
      return;
    }

    setSigningOut(true);
    await supabase.auth.signOut();
    router.push(`/${locale}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-5">
      <FormField label={t('emailLabel')}>
        <Input type="email" value={email} disabled />
      </FormField>

      <FormField label={t('displayName')}>
        <Input
          type="text"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          disabled={!supabase}
        />
      </FormField>

      <FormField label={t('language')} hint={t('languageHint')}>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`flex-1 rounded-lg border px-4 py-2.5 text-sm transition-colors ${
              language === 'en'
                ? 'border-primary bg-primary/10 font-medium text-primary'
                : 'border-border bg-surface text-foreground hover:bg-surface-strong'
            }`}
          >
            {t('english')}
          </button>
          <button
            type="button"
            onClick={() => setLanguage('hi')}
            className={`flex-1 rounded-lg border px-4 py-2.5 text-sm transition-colors ${
              language === 'hi'
                ? 'border-primary bg-primary/10 font-medium text-primary'
                : 'border-border bg-surface text-foreground hover:bg-surface-strong'
            }`}
          >
            {t('hindi')}
          </button>
        </div>
      </FormField>

      <div className="flex items-center justify-between gap-4">
        {saved ? <p className="text-sm font-medium text-primary">{t('saved')}</p> : <span />}
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleSignOut} disabled={signingOut || !supabase}>
            {t('signOut')}
          </Button>
          <Button type="submit" disabled={saving || !supabase}>
            {t('save')}
          </Button>
        </div>
      </div>
    </form>
  );
}