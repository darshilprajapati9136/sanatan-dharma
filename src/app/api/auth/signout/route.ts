import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {createClient} from '@/lib/supabase/server';

export async function GET() {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en';
  const cookieStore = await cookies();
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as 'en' | 'hi' | undefined) ?? defaultLocale;
  const supabase = await createClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(`${origin}/${locale}`);
}