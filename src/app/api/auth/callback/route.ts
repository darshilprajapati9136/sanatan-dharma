import {NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';

export async function GET(request: Request) {
  const {searchParams, origin} = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();

    if (supabase) {
      const {error} = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        const forwardedHost = request.headers.get('x-forwarded-host');
        const isLocalEnv = process.env.NODE_ENV === 'development';
        const redirectTo = isLocalEnv
          ? `${origin}${next}`
          : forwardedHost
            ? `https://${forwardedHost}${next}`
            : `${origin}${next}`;

        return NextResponse.redirect(redirectTo);
      }
    }
  }

  const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en';

  return NextResponse.redirect(`${origin}/${defaultLocale}/login?error=callback_failed`);
}