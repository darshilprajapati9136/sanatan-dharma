import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
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
