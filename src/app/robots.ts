import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const base = raw.endsWith('/') ? raw.slice(0, -1) : raw;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Locale-prefixed private pages (prefix match from root).
      disallow: [
        '/api/',
        '/en/profile',
        '/hi/profile',
        '/en/library',
        '/hi/library',
        '/en/login',
        '/hi/login',
        '/en/signup',
        '/hi/signup'
      ]
    },
    sitemap: `${base}/sitemap.xml`
  };
}
