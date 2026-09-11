import {pgEnum, timestamp} from 'drizzle-orm/pg-core';

export const locale = pgEnum('locale', ['en', 'hi']);

export const verificationStatus = pgEnum('verification_status', [
  'draft',
  'source_check',
  'under_review',
  'verified',
  'published',
  'needs_review',
  'archived'
]);

export const contentType = pgEnum('content_type', [
  'scripture',
  'section',
  'verse',
  'concept',
  'deity',
  'mantra',
  'festival',
  'article',
  'learning_path',
  'tradition'
]);

export const scriptureType = pgEnum('scripture_type', [
  'veda',
  'upanishad',
  'itihasa',
  'purana',
  'gita',
  'sutra',
  'smriti',
  'other'
]);

export const sectionType = pgEnum('section_type', [
  'chapter',
  'kanda',
  'sarga',
  'parva',
  'mandala',
  'sukta',
  'adhyaya',
  'pada',
  'book',
  'section'
]);

export const relationshipType = pgEnum('relationship_type', [
  'related_to',
  'explained_by',
  'mentioned_in',
  'associated_with',
  'commented_by',
  'practiced_in',
  'celebrated_as',
  'part_of',
  'supports',
  'contrasts_with'
]);

export const sourceType = pgEnum('source_type', [
  'scripture',
  'commentary',
  'translation',
  'book',
  'journal',
  'academic_paper',
  'institution',
  'manuscript',
  'website',
  'other'
]);

export const mantraType = pgEnum('mantra_type', [
  'vedic',
  'bija',
  'stotra',
  'shloka',
  'dhyana',
  'nama',
  'peace',
  'other'
]);

export const translationType = pgEnum('translation_type', [
  'published',
  'platform',
  'literal',
  'interpretive'
]);

export const reviewStatus = pgEnum('review_status', [
  'proposed',
  'reviewed',
  'approved',
  'restricted',
  'rejected',
  'archived'
]);

export const reviewType = pgEnum('review_type', [
  'editorial',
  'scripture',
  'sanskrit',
  'translation',
  'tradition',
  'legal',
  'source'
]);

export const progressStatus = pgEnum('progress_status', ['not_started', 'in_progress', 'completed']);

export const aiRole = pgEnum('ai_role', ['user', 'assistant', 'system']);

export const userRoleName = pgEnum('user_role', ['visitor', 'user', 'editor', 'reviewer', 'admin']);

export const reportCategory = pgEnum('report_type', [
  'incorrect_sanskrit',
  'incorrect_translation',
  'wrong_source',
  'misleading_explanation',
  'typo',
  'tradition_issue',
  'copyright',
  'other'
]);

export const mediaCategory = pgEnum('media_type', ['image', 'audio', 'pdf', 'document']);

export const contentUsage = pgEnum('usage_type', ['hero', 'thumbnail', 'gallery', 'audio', 'source_document']);

export const timestamps = {
  createdAt: timestamp('created_at', {withTimezone: true}).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', {withTimezone: true}).notNull().defaultNow()
};