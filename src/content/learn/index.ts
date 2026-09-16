import type {IconName} from '@/components/ui/icon';
import type {LearnCategory, LearnCategorySlug, LearnTopic} from './types';
import {foundationsTopics} from './topics/foundations';
import {scripturesTopics} from './topics/scriptures';
import {otherTopics} from './topics/other-categories';

export const LEARN_CATEGORY_ORDER: LearnCategorySlug[] = [
  'foundations',
  'scriptures',
  'philosophy',
  'deities',
  'practices',
  'festivals',
  'yoga-meditation',
  'temples-traditions'
];

const CATEGORY_ICONS: Record<LearnCategorySlug, IconName> = {
  foundations: 'sparkles',
  scriptures: 'book',
  philosophy: 'chat',
  deities: 'user',
  practices: 'flame',
  festivals: 'calendar',
  'yoga-meditation': 'lotus',
  'temples-traditions': 'temple'
};

const ALL_TOPICS: LearnTopic[] = [...foundationsTopics, ...scripturesTopics, ...otherTopics];

const topicsBySlug = new Map<string, LearnTopic>(ALL_TOPICS.map((topic) => [topic.slug, topic]));

const topicsByCategory = new Map<LearnCategorySlug, LearnTopic[]>();

for (const slug of LEARN_CATEGORY_ORDER) {
  topicsByCategory.set(
    slug,
    ALL_TOPICS.filter((topic) => topic.category === slug)
  );
}

export function getLearnCategories(): LearnCategory[] {
  return LEARN_CATEGORY_ORDER.map((slug) => ({
    slug,
    icon: CATEGORY_ICONS[slug],
    topics: topicsByCategory.get(slug) ?? []
  }));
}

export function getLearnCategory(slug: string): LearnCategory | null {
  if (!LEARN_CATEGORY_ORDER.includes(slug as LearnCategorySlug)) {
    return null;
  }

  const category = slug as LearnCategorySlug;

  return {
    slug: category,
    icon: CATEGORY_ICONS[category],
    topics: topicsByCategory.get(category) ?? []
  };
}

export function getLearnTopic(categorySlug: string, topicSlug: string): LearnTopic | null {
  const topic = topicsBySlug.get(topicSlug);

  if (!topic || topic.category !== categorySlug) {
    return null;
  }

  return topic;
}

/** Resolves related topics across categories; silently drops unknown slugs. */
export function getRelatedTopics(topic: LearnTopic): LearnTopic[] {
  return (topic.relatedSlugs ?? [])
    .map((slug) => topicsBySlug.get(slug))
    .filter((related): related is LearnTopic => related != null && related.slug !== topic.slug);
}

export function isLearnCategorySlug(value: string): value is LearnCategorySlug {
  return LEARN_CATEGORY_ORDER.includes(value as LearnCategorySlug);
}
