import createMiddleware from 'next-intl/middleware';
import {NextResponse, type NextRequest} from 'next/server';
import {routing} from './i18n/routing';
import {updateSession} from './lib/supabase/middleware';

const handleI18n = createMiddleware(routing);

// First path segment after the locale that requires authentication.
// Add future authenticated-only sections here (e.g. 'dashboard' already
// covered); each entry matches `/en/<segment>` and anything below it.
const PROTECTED_SEGMENTS = ['profile', 'bookmarks', 'dashboard'];

// Next.js 16 convention: `proxy.ts` replaces `middleware.ts`.
// Runs locale routing first, then refreshes the Supabase session so auth
// cookies stay in sync on every localized route (e.g. /en/profile).
// Unauthenticated visits to protected routes are redirected to the localized
// login page with `?next=` preserving the intended destination.
export default async function proxy(request: NextRequest) {
  const intlResponse = handleI18n(request);
  const {response, user} = await updateSession(request, intlResponse);

  const segments = request.nextUrl.pathname.split('/').filter(Boolean);
  const locale = segments[0];
  const section = segments[1];

  if (
    !user &&
    (routing.locales as readonly string[]).includes(locale) &&
    section &&
    PROTECTED_SEGMENTS.includes(section)
  ) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${locale}/login`;
    loginUrl.searchParams.set('next', `${request.nextUrl.pathname}${request.nextUrl.search}`);
    const redirectResponse = NextResponse.redirect(loginUrl);
    // Keep any refreshed auth cookies on the redirect response.
    for (const cookie of response.cookies.getAll()) {
      redirectResponse.cookies.set(cookie.name, cookie.value);
    }
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
