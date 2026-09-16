import {createBrowserClient} from '@supabase/ssr';
import {getSupabasePublishableKey} from '@/schemas/env';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = getSupabasePublishableKey();

  if (!url || !key) {
    return null;
  }

  return createBrowserClient(url, key);
}