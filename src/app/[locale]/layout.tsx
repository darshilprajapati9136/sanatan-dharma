import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Inter, Lora, Noto_Sans_Devanagari} from 'next/font/google';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {SiteHeader} from '@/components/layout/site-header';
import {SiteFooter} from '@/components/layout/site-footer';
import {MobileNav} from '@/components/layout/mobile-nav';
import '../globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap'
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: '--font-noto-devanagari',
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata'});
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const base = raw.endsWith('/') ? raw.slice(0, -1) : raw;
  const title = t('title');
  const description = t('description');

  return {
    metadataBase: new URL(base),
    title: {default: title, template: '%s · Sanatan Dharma'},
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {en: '/en', hi: '/hi'}
    },
    openGraph: {
      type: 'website',
      locale: locale === 'hi' ? 'hi_IN' : 'en_IN',
      url: `/${locale}`,
      siteName: 'Sanatan Dharma',
      title,
      description
    },
    twitter: {card: 'summary', title, description}
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const daily = await getTranslations("daily");
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const base = raw.endsWith('/') ? raw.slice(0, -1) : raw;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Sanatan Dharma',
        url: `${base}/${locale}`,
        inLanguage: [locale]
      },
      {
        '@type': 'Organization',
        name: 'Sanatan Dharma',
        url: `${base}/${locale}`
      }
    ]
  };

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${lora.variable} ${notoDevanagari.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
        <NextIntlClientProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:p-4">{daily("skip")}</a>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <div className="pb-16 md:pb-0"><SiteFooter /></div>
          <MobileNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}