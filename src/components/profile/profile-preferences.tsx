'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {useLocale} from 'next-intl';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {FormField} from '@/components/ui/form-field';
import {createClient} from '@/lib/supabase/client';

import {CALENDARS, LOCATIONS, TRADITIONS} from '@/schemas/account';

export function ProfilePreferences({
  userId,
  email,
  initialDisplayName,
  initialLanguage,
  initialLocation,
  initialTradition,
  initialCalendar
}: {
  userId: string;
  email: string;
  initialDisplayName: string;
  initialLanguage: 'en' | 'hi';
  initialLocation: string;
  initialTradition: string | null;
  initialCalendar: string;
}) {
  const t = useTranslations('profile');
  const locale = useLocale();
  const router = useRouter();
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [language, setLanguage] = useState<'en' | 'hi'>(initialLanguage);
  const [location, setLocation] = useState(initialLocation);
  const [tradition, setTradition] = useState(initialTradition ?? '');
  const [calendar, setCalendar] = useState(initialCalendar);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [syncNote, setSyncNote] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const supabase = createClient();

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(false);
    setSaveError(null);

    if (!supabase) {
      return;
    }

    setSaving(true);

    // Upsert (not update): the profile row is normally created by the
    // `on_auth_user_created` trigger, but accounts that predate it would
    // otherwise silently "save" zero rows. Requires the
    // `profiles_insert_own` RLS policy (id = auth.uid()).
    const {error} = await supabase.from('profiles').upsert(
      {
        id: userId,
        display_name: displayName.trim(),
        preferred_language: language,
        updated_at: new Date().toISOString()
      },
      {onConflict: 'id'}
    );

    setSaving(false);

    if (error) {
      setSaveError(t('saveError'));
      return;
    }

    // Account preferences (location/tradition/calendar) save best-effort:
    // when migration 0002 is unapplied the API answers 503 and the profile
    // save above still stands. Never blocks the main save.
    setSyncNote(null);
    try {
      const res = await fetch('/api/preferences', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          location,
          tradition: tradition === '' ? null : tradition,
          calendar
        })
      });
      if (!res.ok) setSyncNote(t('syncUnavailable'));
    } catch {
      setSyncNote(t('syncUnavailable'));
    }

    setSaved(true);

    // If the preferred language changed, move to that locale so the UI
    // language matches the saved preference.
    if (language !== locale) {
      router.replace(`/${language}/profile`);
    }

    router.refresh();
  }

  async function handleSignOut() {
    if (!supabase) {
      return;
    }

    setSigningOut(true);
    setSignOutError(null);

    const {error} = await supabase.auth.signOut();

    if (error) {
      setSigningOut(false);
      setSignOutError(t('signOutError'));
      return;
    }

    router.replace(`/${locale}`);
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

      <FormField label={t('location')} hint={t('locationHint')}>
        <select
          value={LOCATIONS.includes(location as (typeof LOCATIONS)[number]) ? location : 'Other'}
          onChange={(event) => setLocation(event.target.value)}
          disabled={!supabase}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
        >
          {LOCATIONS.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label={t('tradition')} hint={t('traditionHint')}>
        <select
          value={tradition}
          onChange={(event) => setTradition(event.target.value)}
          disabled={!supabase}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
        >
          <option value="">{t('traditionUnspecified')}</option>
          {TRADITIONS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label={t('calendar')} hint={t('calendarHint')}>
        <select
          value={CALENDARS.includes(calendar as (typeof CALENDARS)[number]) ? calendar : 'purnimanta'}
          onChange={(event) => setCalendar(event.target.value)}
          disabled={!supabase}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
        >
          {CALENDARS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </FormField>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          {saved ? <p className="text-sm font-medium text-primary">{t('saved')}</p> : <span />}
          {syncNote ? <p className="text-xs text-muted">{syncNote}</p> : null}
          {saveError ? (
            <p role="alert" className="text-sm text-danger">
              {saveError}
            </p>
          ) : null}
          {signOutError ? (
            <p role="alert" className="text-sm text-danger">
              {signOutError}
            </p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleSignOut} disabled={signingOut || !supabase}>
            {signingOut ? t('signingOut') : t('signOut')}
          </Button>
          <Button type="submit" disabled={saving || signingOut || !supabase}>
            {saving ? t('saving') : t('save')}
          </Button>
        </div>
      </div>
    </form>
  );
}