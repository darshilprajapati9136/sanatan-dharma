import {createServerClient} from '@supabase/ssr';
import {NextResponse, type NextRequest} from 'next/server';
import {getSupabasePublishableKey} from '@/schemas/env';

/**
 * Refreshes the Supabase auth session on every request and writes refreshed
 * cookies onto the given (or a fresh) response.
 *
 * Pass the next-intl response in so locale redirects/rewrites keep the
 * refreshed auth cookies. When Supabase is not configured this is a no-op
 * passthrough so locale routing keeps working.
 *
 * Returns the response together with the current user (null when signed out
 * or unconfigured) so callers can make routing decisions without a second
 * auth round-trip.
 */
export async function updateSession(request: NextRequest, response?: NextResponse) {
  const supabaseResponse = response ?? NextResponse.next({request});

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = getSupabasePublishableKey();

  if (!url || !key) {
    return {response: supabaseResponse, user: null};
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const {name, value, options} of cookiesToSet) {
          request.cookies.set(name, value);
          supabaseResponse.cookies.set(name, value, options);
        }
      }
    }
  });

  // getUser() refreshes the session when the access token is expired.
  // Never use the returned user for authorization decisions here; protected
  // pages re-check the session server-side via getSession().
  const {
    data: {user}
  } = await supabase.auth.getUser();

  return {response: supabaseResponse, user};
}
