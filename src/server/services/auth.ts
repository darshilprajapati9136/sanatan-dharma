import {eq} from 'drizzle-orm';
import {getDb, isDatabaseConfigured} from '@/db';
import {profiles} from '@/db/schema';
import {createClient} from '@/lib/supabase/server';

export async function getSession() {
  const supabase = await createClient();

  if (!supabase) {
    return {user: null, error: 'SUPABASE_NOT_CONFIGURED' as const};
  }

  const {
    data: {user},
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {user: null, error: (error?.message ?? 'UNAUTHENTICATED') as string};
  }

  return {user, error: null};
}

export async function getCurrentUser() {
  const {user, error} = await getSession();
  return {user, error};
}

export async function getCurrentProfile(user?: {id: string}) {
  const resolvedUser = user ?? (await getSession()).user;

  if (!resolvedUser || !isDatabaseConfigured()) {
    return null;
  }

  try {
    const rows = await getDb().select().from(profiles).where(eq(profiles.id, resolvedUser.id)).limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * Validates a `?next=` redirect target to prevent open redirects.
 * Only allows in-app localized paths such as `/en/profile`.
 * Falls back to the locale's profile page.
 */
export function getSafeNextPath(next: string | undefined, locale: string, fallback = `/${locale}/profile`) {
  if (!next || !next.startsWith('/')) {
    return fallback;
  }

  const [path] = next.split('?');
  const segments = path.split('/').filter(Boolean);

  if (
    segments.length === 0 ||
    segments.some((segment) => segment === '.' || segment === '..')
  ) {
    return fallback;
  }

  const [first] = segments;

  if (first !== 'en' && first !== 'hi') {
    return fallback;
  }

  return next.startsWith(`/${first}/`) || next === `/${first}` ? next : fallback;
}