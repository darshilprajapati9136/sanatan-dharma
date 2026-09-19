import type {MetadataRoute} from 'next';
import {festivalGuides} from '@/content/festivals';
import {getLearnCategories} from '@/content/learn';
import {routing} from '@/i18n/routing';

function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

/** Public, indexable routes. Auth/library/profile pages stay out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const staticPaths = [
    '',
    '/panchang',
    '/practise',
    '/learn',
    '/scriptures',
    '/explore',
    '/explore/festivals',
    '/explore/deities',
    '/explore/mantras',
    '/explore/philosophy',
    '/explore/traditions',
    '/ask',
    '/search',
    '/about',
    '/privacy',
    '/terms'
  ];
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'daily' : 'weekly',
        priority: path === '' ? 1 : 0.7
      });
    }
    for (const guide of festivalGuides) {
      entries.push({
        url: `${base}/${locale}/explore/festivals/${guide.slug}`,
        changeFrequency: 'monthly',
        priority: 0.8
      });
    }
    for (const category of getLearnCategories()) {
      entries.push({
        url: `${base}/${locale}/learn/${category.slug}`,
        changeFrequency: 'monthly',
        priority: 0.8
      });
      for (const topic of category.topics) {
        entries.push({
          url: `${base}/${locale}/learn/${category.slug}/${topic.slug}`,
          changeFrequency: 'monthly',
          priority: 0.8
        });
      }
    }
  }
  return entries;
}
