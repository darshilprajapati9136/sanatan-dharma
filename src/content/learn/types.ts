import type {IconName} from '@/components/ui/icon';

/**
 * Phase 2 Learn content model.
 *
 * Sample/demo content lives in structured local files (see ./topics/*).
 * Field names deliberately mirror the suggested database model
 * (slug, title, summary, category, difficulty, reading_time, status,
 * source_notes, created_at/updated_at) AND the existing Drizzle schema
 * (`concepts` + `concept_localizations`, `verification_status`,
 * `sources`, `content_relationships`) so a future move to database-backed
 * content is mechanical. No database changes are made in Phase 2: the live
 * database does not have the knowledge tables yet, and sample content does
 * not need RLS-gated rows.
 */

/** One localized string. `hi` may be absent; render via pickLocalizedText(). */
export interface LocalizedText {
  en: string;
  hi?: string;
}

export type LearnCategorySlug =
  | 'foundations'
  | 'scriptures'
  | 'philosophy'
  | 'deities'
  | 'practices'
  | 'festivals'
  | 'yoga-meditation'
  | 'temples-traditions';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

/** Internal review state. Draft content must never be presented as authoritative. */
export type ContentStatus = 'draft' | 'reviewed' | 'verified';

/**
 * Source kinds keep future citations distinguishable:
 * - scripture: primary scriptural text
 * - commentary: attributed classical commentary
 * - traditional: traditional / sampradaya interpretation
 * - academic: academic / historical source
 * - editorial: website editorial explanation (not a primary source)
 */
export type SourceKind = 'scripture' | 'commentary' | 'traditional' | 'academic' | 'editorial';

export interface LearnSourceRef {
  kind: SourceKind;
  label: LocalizedText;
  detail?: LocalizedText;
}

export interface TopicSection {
  heading: LocalizedText;
  body: LocalizedText;
}

export interface LearnTopic {
  slug: string;
  category: LearnCategorySlug;
  title: LocalizedText;
  summary: LocalizedText;
  sections: TopicSection[];
  /** Slugs of related topics (same or other categories), resolved by the registry. */
  relatedSlugs?: string[];
  difficulty: DifficultyLevel;
  readingTimeMinutes: number;
  status: ContentStatus;
  sources: LearnSourceRef[];
  /** Free-form provenance note for editors (not rendered). */
  sourceNotes?: string;
  updatedAt: string;
}

export interface LearnCategory {
  slug: LearnCategorySlug;
  icon: IconName;
  topics: LearnTopic[];
}
