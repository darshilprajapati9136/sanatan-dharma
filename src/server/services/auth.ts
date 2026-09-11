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

  const rows = await getDb().select().from(profiles).where(eq(profiles.userId, resolvedUser.id)).limit(1);
  return rows[0] ?? null;
}