CREATE TYPE "public"."ai_role" AS ENUM('user', 'assistant', 'system');--> statement-breakpoint
CREATE TYPE "public"."content_type" AS ENUM('scripture', 'section', 'verse', 'concept', 'deity', 'mantra', 'festival', 'article', 'learning_path', 'tradition');--> statement-breakpoint
CREATE TYPE "public"."usage_type" AS ENUM('hero', 'thumbnail', 'gallery', 'audio', 'source_document');--> statement-breakpoint
CREATE TYPE "public"."locale" AS ENUM('en', 'hi');--> statement-breakpoint
CREATE TYPE "public"."mantra_type" AS ENUM('vedic', 'bija', 'stotra', 'shloka', 'dhyana', 'nama', 'peace', 'other');--> statement-breakpoint
CREATE TYPE "public"."media_type" AS ENUM('image', 'audio', 'pdf', 'document');--> statement-breakpoint
CREATE TYPE "public"."progress_status" AS ENUM('not_started', 'in_progress', 'completed');--> statement-breakpoint
CREATE TYPE "public"."relationship_type" AS ENUM('related_to', 'explained_by', 'mentioned_in', 'associated_with', 'commented_by', 'practiced_in', 'celebrated_as', 'part_of', 'supports', 'contrasts_with');--> statement-breakpoint
CREATE TYPE "public"."report_type" AS ENUM('incorrect_sanskrit', 'incorrect_translation', 'wrong_source', 'misleading_explanation', 'typo', 'tradition_issue', 'copyright', 'other');--> statement-breakpoint
CREATE TYPE "public"."review_status" AS ENUM('proposed', 'reviewed', 'approved', 'restricted', 'rejected', 'archived');--> statement-breakpoint
CREATE TYPE "public"."review_type" AS ENUM('editorial', 'scripture', 'sanskrit', 'translation', 'tradition', 'legal', 'source');--> statement-breakpoint
CREATE TYPE "public"."scripture_type" AS ENUM('veda', 'upanishad', 'itihasa', 'purana', 'gita', 'sutra', 'smriti', 'other');--> statement-breakpoint
CREATE TYPE "public"."section_type" AS ENUM('chapter', 'kanda', 'sarga', 'parva', 'mandala', 'sukta', 'adhyaya', 'pada', 'book', 'section');--> statement-breakpoint
CREATE TYPE "public"."source_type" AS ENUM('scripture', 'commentary', 'translation', 'book', 'journal', 'academic_paper', 'institution', 'manuscript', 'website', 'other');--> statement-breakpoint
CREATE TYPE "public"."translation_type" AS ENUM('published', 'platform', 'literal', 'interpretive');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('visitor', 'user', 'editor', 'reviewer', 'admin');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('draft', 'source_check', 'under_review', 'verified', 'published', 'needs_review', 'archived');--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"display_name" text,
	"avatar_url" text,
	"preferred_language" "locale" DEFAULT 'en' NOT NULL,
	"preferred_theme" text DEFAULT 'light' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" "user_role" NOT NULL,
	"description" text,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "roles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" uuid NOT NULL,
	"role_id" uuid NOT NULL,
	"assigned_at" timestamp with time zone DEFAULT now() NOT NULL,
	"assigned_by" uuid,
	CONSTRAINT "user_roles_user_id_role_id_pk" PRIMARY KEY("user_id","role_id")
);
--> statement-breakpoint
ALTER TABLE "user_roles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "content_relationships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_content_type" "content_type" NOT NULL,
	"from_content_id" uuid NOT NULL,
	"relationship_type" "relationship_type" NOT NULL,
	"to_content_type" "content_type" NOT NULL,
	"to_content_id" uuid NOT NULL,
	"created_by" uuid,
	"verification_status" "review_status" DEFAULT 'proposed' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "content_relationships" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "content_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_type" "content_type" NOT NULL,
	"content_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "content_tags" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "licenses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"short_name" text,
	"url" text,
	"allows_redistribution" boolean DEFAULT false NOT NULL,
	"allows_modification" boolean DEFAULT false NOT NULL,
	"allows_commercial_use" boolean DEFAULT false NOT NULL,
	"notes" text
);
--> statement-breakpoint
ALTER TABLE "licenses" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "source_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_id" uuid NOT NULL,
	"reviewer_id" uuid,
	"status" "review_status" DEFAULT 'proposed' NOT NULL,
	"review_notes" text,
	"reviewed_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "source_reviews" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"source_type" "source_type" NOT NULL,
	"author" text,
	"editor" text,
	"translator" text,
	"publisher" text,
	"edition" text,
	"publication_year" text,
	"language" text,
	"isbn" text,
	"url" text,
	"archive_url" text,
	"license_id" uuid,
	"copyright_status" text,
	"tradition_id" uuid,
	"verification_status" "review_status" DEFAULT 'proposed' NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sources" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"tag_type" text,
	CONSTRAINT "tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "tags" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "concept_localizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"concept_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"title" text NOT NULL,
	"short_definition" text,
	"simple_explanation" text,
	"deep_explanation" text,
	"seo_title" text,
	"seo_description" text
);
--> statement-breakpoint
ALTER TABLE "concept_localizations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "concepts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"canonical_name" text NOT NULL,
	"sanskrit_name" text,
	"difficulty_level" text DEFAULT 'beginner' NOT NULL,
	"verification_status" "verification_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone,
	CONSTRAINT "concepts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "concepts" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "deities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"canonical_name" text NOT NULL,
	"sanskrit_name" text,
	"parent_deity_id" uuid,
	"verification_status" "verification_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone,
	CONSTRAINT "deities_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "deities" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "deity_localizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"deity_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"name" text NOT NULL,
	"short_description" text,
	"overview" text,
	"philosophical_significance" text,
	"iconography" text,
	"seo_title" text,
	"seo_description" text
);
--> statement-breakpoint
ALTER TABLE "deity_localizations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "festival_dates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"festival_id" uuid NOT NULL,
	"year" integer NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"timezone" text,
	"region" text,
	"calendar_basis" text,
	"calculation_source" text,
	"verification_status" "verification_status" DEFAULT 'draft' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "festival_dates" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "festival_localizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"festival_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"name" text NOT NULL,
	"short_description" text,
	"meaning" text,
	"history" text,
	"practices" text,
	"spiritual_significance" text,
	"regional_variations" text,
	"seo_title" text,
	"seo_description" text
);
--> statement-breakpoint
ALTER TABLE "festival_localizations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "festivals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"canonical_name" text NOT NULL,
	"sanskrit_name" text,
	"date_type" text,
	"verification_status" "verification_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone,
	CONSTRAINT "festivals_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "festivals" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "mantra_localizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mantra_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"title" text NOT NULL,
	"transliteration" text,
	"meaning" text,
	"context" text,
	"traditional_usage" text,
	"pronunciation_notes" text
);
--> statement-breakpoint
ALTER TABLE "mantra_localizations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "mantras" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"canonical_name" text NOT NULL,
	"sanskrit_text" text NOT NULL,
	"mantra_type" "mantra_type" DEFAULT 'other' NOT NULL,
	"primary_deity_id" uuid,
	"source_id" uuid,
	"license_id" uuid,
	"verification_status" "verification_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone,
	CONSTRAINT "mantras_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "mantras" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "tradition_localizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tradition_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "tradition_localizations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "traditions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"sanskrit_name" text,
	"parent_tradition_id" uuid,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "traditions_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "traditions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "commentaries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"verse_id" uuid NOT NULL,
	"commentator_id" uuid,
	"locale" "locale" NOT NULL,
	"commentary_text" text NOT NULL,
	"summary" text,
	"source_id" uuid,
	"copyright_status" text,
	"license_id" uuid,
	"verification_status" "verification_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "commentaries" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "commentators" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"sanskrit_name" text,
	"tradition_id" uuid,
	"biography" text,
	"historical_period" text,
	"notes" text
);
--> statement-breakpoint
ALTER TABLE "commentators" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "editorial_explanations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_type" "content_type" NOT NULL,
	"content_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"simple_explanation" text,
	"deep_explanation" text,
	"author_id" uuid,
	"reviewer_id" uuid,
	"verification_status" "verification_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "editorial_explanations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "scripture_localizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scripture_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"summary" text,
	"seo_title" text,
	"seo_description" text
);
--> statement-breakpoint
ALTER TABLE "scripture_localizations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "scripture_section_localizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"section_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"title" text NOT NULL,
	"summary" text,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "scripture_section_localizations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "scripture_sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scripture_id" uuid NOT NULL,
	"parent_section_id" uuid,
	"section_type" "section_type" DEFAULT 'chapter' NOT NULL,
	"section_number" text,
	"sort_order" text,
	"canonical_title" text,
	"sanskrit_title" text,
	"slug" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "scripture_sections" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "scriptures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"canonical_name" text NOT NULL,
	"sanskrit_name" text,
	"short_description" text,
	"scripture_type" "scripture_type" NOT NULL,
	"primary_language" "locale" DEFAULT 'en' NOT NULL,
	"structure_type" text,
	"verification_status" "verification_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone,
	CONSTRAINT "scriptures_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "scriptures" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "translations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"verse_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"translator_id" uuid,
	"translation_text" text NOT NULL,
	"source_id" uuid,
	"translation_type" "translation_type" DEFAULT 'published' NOT NULL,
	"copyright_status" text,
	"license_id" uuid,
	"verification_status" "verification_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "translations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "translators" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"biography" text,
	"tradition_id" uuid,
	"website" text,
	"notes" text
);
--> statement-breakpoint
ALTER TABLE "translators" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "transliterations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"verse_id" uuid NOT NULL,
	"system" text DEFAULT 'IAST' NOT NULL,
	"text" text NOT NULL,
	"source_id" uuid,
	"verification_status" "verification_status" DEFAULT 'draft' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transliterations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "verse_variants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"verse_id" uuid NOT NULL,
	"variant_text" text NOT NULL,
	"source_id" uuid,
	"variant_type" text,
	"notes" text,
	"verification_status" "verification_status" DEFAULT 'draft' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "verse_variants" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "verses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scripture_id" uuid NOT NULL,
	"section_id" uuid NOT NULL,
	"verse_number" text NOT NULL,
	"canonical_reference" text NOT NULL,
	"sanskrit_text" text NOT NULL,
	"normalized_sanskrit" text,
	"sort_order" text,
	"source_edition_id" uuid,
	"verification_status" "verification_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "verses" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "learning_modules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"learning_path_id" uuid NOT NULL,
	"content_type" "content_type" NOT NULL,
	"content_id" uuid NOT NULL,
	"position" integer NOT NULL,
	"is_required" text DEFAULT 'true' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "learning_modules" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "learning_path_localizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"learning_path_id" uuid NOT NULL,
	"locale" "locale" NOT NULL,
	"title" text NOT NULL,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "learning_path_localizations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "learning_paths" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"difficulty_level" text DEFAULT 'beginner' NOT NULL,
	"estimated_duration" text,
	"verification_status" "verification_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone,
	CONSTRAINT "learning_paths_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "learning_paths" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "user_learning_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"learning_path_id" uuid,
	"module_id" uuid NOT NULL,
	"status" "progress_status" DEFAULT 'not_started' NOT NULL,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"last_accessed_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "user_learning_progress" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "bookmarks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"content_type" "content_type" NOT NULL,
	"content_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookmarks" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "reading_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"content_type" "content_type" NOT NULL,
	"content_id" uuid NOT NULL,
	"first_viewed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_viewed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"view_count" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reading_history" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "user_preferences" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"daily_shloka_enabled" boolean DEFAULT true NOT NULL,
	"festival_notifications_enabled" boolean DEFAULT false NOT NULL,
	"learning_reminders_enabled" boolean DEFAULT false NOT NULL,
	"default_translation_id" uuid,
	"default_commentary_id" uuid,
	"preferred_reading_mode" text DEFAULT 'simple' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_preferences" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "ai_conversations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text,
	"locale" "locale" DEFAULT 'en' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "ai_conversations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "ai_message_citations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message_id" uuid NOT NULL,
	"source_id" uuid,
	"content_type" "content_type",
	"content_id" uuid,
	"chunk_id" uuid,
	"citation_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_message_citations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "ai_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conversation_id" uuid NOT NULL,
	"role" "ai_role" NOT NULL,
	"message_text" text NOT NULL,
	"model" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_messages" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "ai_usage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"session_id" text,
	"request_type" text,
	"model" text,
	"input_tokens" integer,
	"output_tokens" integer,
	"estimated_cost" numeric,
	"success" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_usage" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "knowledge_chunks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_type" "content_type" NOT NULL,
	"content_id" uuid NOT NULL,
	"source_id" uuid,
	"locale" "locale" DEFAULT 'en' NOT NULL,
	"chunk_text" text NOT NULL,
	"chunk_index" integer DEFAULT 0 NOT NULL,
	"verification_status" "verification_status" DEFAULT 'draft' NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "knowledge_chunks" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "app_settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text,
	"description" text,
	"updated_by" uuid,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "app_settings" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"action" text NOT NULL,
	"entity_type" text,
	"entity_id" text,
	"old_values" jsonb,
	"new_values" jsonb,
	"ip_address" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_type" "content_type" NOT NULL,
	"content_id" uuid NOT NULL,
	"media_id" uuid NOT NULL,
	"usage_type" "usage_type" DEFAULT 'hero' NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "content_media" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "content_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"content_type" "content_type" NOT NULL,
	"content_id" uuid NOT NULL,
	"report_type" "report_type" NOT NULL,
	"description" text,
	"status" text DEFAULT 'open' NOT NULL,
	"assigned_to" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"resolved_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "content_reports" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "content_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_type" "content_type" NOT NULL,
	"content_id" uuid NOT NULL,
	"reviewer_id" uuid,
	"review_type" "review_type" DEFAULT 'editorial' NOT NULL,
	"status" "review_status" DEFAULT 'proposed' NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "content_reviews" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "content_revisions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_type" "content_type" NOT NULL,
	"content_id" uuid NOT NULL,
	"revision_number" integer NOT NULL,
	"changed_by" uuid,
	"change_summary" text,
	"snapshot" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"storage_path" text NOT NULL,
	"media_type" "media_type" NOT NULL,
	"title" text,
	"alt_text" text,
	"copyright_status" text,
	"license_id" uuid,
	"source_id" uuid,
	"uploaded_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "media_assets" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_profiles_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_tags" ADD CONSTRAINT "content_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_reviews" ADD CONSTRAINT "source_reviews_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sources" ADD CONSTRAINT "sources_license_id_licenses_id_fk" FOREIGN KEY ("license_id") REFERENCES "public"."licenses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "concept_localizations" ADD CONSTRAINT "concept_localizations_concept_id_concepts_id_fk" FOREIGN KEY ("concept_id") REFERENCES "public"."concepts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deities" ADD CONSTRAINT "deities_parent_fkey" FOREIGN KEY ("parent_deity_id") REFERENCES "public"."deities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deity_localizations" ADD CONSTRAINT "deity_localizations_deity_id_deities_id_fk" FOREIGN KEY ("deity_id") REFERENCES "public"."deities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "festival_dates" ADD CONSTRAINT "festival_dates_festival_id_festivals_id_fk" FOREIGN KEY ("festival_id") REFERENCES "public"."festivals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "festival_localizations" ADD CONSTRAINT "festival_localizations_festival_id_festivals_id_fk" FOREIGN KEY ("festival_id") REFERENCES "public"."festivals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mantra_localizations" ADD CONSTRAINT "mantra_localizations_mantra_id_mantras_id_fk" FOREIGN KEY ("mantra_id") REFERENCES "public"."mantras"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mantras" ADD CONSTRAINT "mantras_primary_deity_id_deities_id_fk" FOREIGN KEY ("primary_deity_id") REFERENCES "public"."deities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mantras" ADD CONSTRAINT "mantras_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mantras" ADD CONSTRAINT "mantras_license_id_licenses_id_fk" FOREIGN KEY ("license_id") REFERENCES "public"."licenses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tradition_localizations" ADD CONSTRAINT "tradition_localizations_tradition_id_traditions_id_fk" FOREIGN KEY ("tradition_id") REFERENCES "public"."traditions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "traditions" ADD CONSTRAINT "traditions_parent_fkey" FOREIGN KEY ("parent_tradition_id") REFERENCES "public"."traditions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commentaries" ADD CONSTRAINT "commentaries_verse_id_verses_id_fk" FOREIGN KEY ("verse_id") REFERENCES "public"."verses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commentaries" ADD CONSTRAINT "commentaries_commentator_id_commentators_id_fk" FOREIGN KEY ("commentator_id") REFERENCES "public"."commentators"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commentaries" ADD CONSTRAINT "commentaries_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commentaries" ADD CONSTRAINT "commentaries_license_id_licenses_id_fk" FOREIGN KEY ("license_id") REFERENCES "public"."licenses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commentators" ADD CONSTRAINT "commentators_tradition_id_traditions_id_fk" FOREIGN KEY ("tradition_id") REFERENCES "public"."traditions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scripture_localizations" ADD CONSTRAINT "scripture_localizations_scripture_id_scriptures_id_fk" FOREIGN KEY ("scripture_id") REFERENCES "public"."scriptures"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scripture_section_localizations" ADD CONSTRAINT "scripture_section_localizations_section_id_scripture_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."scripture_sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scripture_sections" ADD CONSTRAINT "scripture_sections_scripture_id_scriptures_id_fk" FOREIGN KEY ("scripture_id") REFERENCES "public"."scriptures"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scripture_sections" ADD CONSTRAINT "scripture_sections_parent_fkey" FOREIGN KEY ("parent_section_id") REFERENCES "public"."scripture_sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "translations" ADD CONSTRAINT "translations_verse_id_verses_id_fk" FOREIGN KEY ("verse_id") REFERENCES "public"."verses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "translations" ADD CONSTRAINT "translations_translator_id_translators_id_fk" FOREIGN KEY ("translator_id") REFERENCES "public"."translators"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "translations" ADD CONSTRAINT "translations_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "translations" ADD CONSTRAINT "translations_license_id_licenses_id_fk" FOREIGN KEY ("license_id") REFERENCES "public"."licenses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "translators" ADD CONSTRAINT "translators_tradition_id_traditions_id_fk" FOREIGN KEY ("tradition_id") REFERENCES "public"."traditions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transliterations" ADD CONSTRAINT "transliterations_verse_id_verses_id_fk" FOREIGN KEY ("verse_id") REFERENCES "public"."verses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transliterations" ADD CONSTRAINT "transliterations_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verse_variants" ADD CONSTRAINT "verse_variants_verse_id_verses_id_fk" FOREIGN KEY ("verse_id") REFERENCES "public"."verses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verse_variants" ADD CONSTRAINT "verse_variants_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verses" ADD CONSTRAINT "verses_scripture_id_scriptures_id_fk" FOREIGN KEY ("scripture_id") REFERENCES "public"."scriptures"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verses" ADD CONSTRAINT "verses_section_id_scripture_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."scripture_sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verses" ADD CONSTRAINT "verses_source_edition_id_sources_id_fk" FOREIGN KEY ("source_edition_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_modules" ADD CONSTRAINT "learning_modules_learning_path_id_learning_paths_id_fk" FOREIGN KEY ("learning_path_id") REFERENCES "public"."learning_paths"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_path_localizations" ADD CONSTRAINT "learning_path_localizations_learning_path_id_learning_paths_id_fk" FOREIGN KEY ("learning_path_id") REFERENCES "public"."learning_paths"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_learning_progress" ADD CONSTRAINT "user_learning_progress_learning_path_id_learning_paths_id_fk" FOREIGN KEY ("learning_path_id") REFERENCES "public"."learning_paths"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_learning_progress" ADD CONSTRAINT "user_learning_progress_module_id_learning_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."learning_modules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_message_citations" ADD CONSTRAINT "ai_message_citations_message_id_ai_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."ai_messages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_message_citations" ADD CONSTRAINT "ai_message_citations_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_messages" ADD CONSTRAINT "ai_messages_conversation_id_ai_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."ai_conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "knowledge_chunks" ADD CONSTRAINT "knowledge_chunks_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_media" ADD CONSTRAINT "content_media_media_id_media_assets_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media_assets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_license_id_licenses_id_fk" FOREIGN KEY ("license_id") REFERENCES "public"."licenses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "content_relationships_from_idx" ON "content_relationships" USING btree ("from_content_type","from_content_id");--> statement-breakpoint
CREATE INDEX "content_relationships_to_idx" ON "content_relationships" USING btree ("to_content_type","to_content_id");--> statement-breakpoint
CREATE UNIQUE INDEX "content_tags_unique" ON "content_tags" USING btree ("content_type","content_id","tag_id");--> statement-breakpoint
CREATE INDEX "content_tags_tag_idx" ON "content_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE UNIQUE INDEX "licenses_name_unique" ON "licenses" USING btree ("name");--> statement-breakpoint
CREATE INDEX "source_reviews_source_idx" ON "source_reviews" USING btree ("source_id");--> statement-breakpoint
CREATE INDEX "sources_title_idx" ON "sources" USING btree ("title");--> statement-breakpoint
CREATE INDEX "sources_license_idx" ON "sources" USING btree ("license_id");--> statement-breakpoint
CREATE UNIQUE INDEX "concept_localizations_concept_locale_unique" ON "concept_localizations" USING btree ("concept_id","locale");--> statement-breakpoint
CREATE INDEX "deities_parent_idx" ON "deities" USING btree ("parent_deity_id");--> statement-breakpoint
CREATE UNIQUE INDEX "deity_localizations_deity_locale_unique" ON "deity_localizations" USING btree ("deity_id","locale");--> statement-breakpoint
CREATE INDEX "festival_dates_festival_year_idx" ON "festival_dates" USING btree ("festival_id","year");--> statement-breakpoint
CREATE UNIQUE INDEX "festival_localizations_festival_locale_unique" ON "festival_localizations" USING btree ("festival_id","locale");--> statement-breakpoint
CREATE UNIQUE INDEX "mantra_localizations_mantra_locale_unique" ON "mantra_localizations" USING btree ("mantra_id","locale");--> statement-breakpoint
CREATE INDEX "mantras_deity_idx" ON "mantras" USING btree ("primary_deity_id");--> statement-breakpoint
CREATE INDEX "mantras_source_idx" ON "mantras" USING btree ("source_id");--> statement-breakpoint
CREATE UNIQUE INDEX "tradition_localizations_tradition_locale_unique" ON "tradition_localizations" USING btree ("tradition_id","locale");--> statement-breakpoint
CREATE INDEX "traditions_parent_idx" ON "traditions" USING btree ("parent_tradition_id");--> statement-breakpoint
CREATE INDEX "commentaries_verse_idx" ON "commentaries" USING btree ("verse_id");--> statement-breakpoint
CREATE INDEX "commentaries_source_idx" ON "commentaries" USING btree ("source_id");--> statement-breakpoint
CREATE INDEX "commentators_name_idx" ON "commentators" USING btree ("name");--> statement-breakpoint
CREATE INDEX "editorial_explanations_content_idx" ON "editorial_explanations" USING btree ("content_type","content_id");--> statement-breakpoint
CREATE UNIQUE INDEX "scripture_localizations_scripture_locale_unique" ON "scripture_localizations" USING btree ("scripture_id","locale");--> statement-breakpoint
CREATE INDEX "scripture_localizations_scripture_idx" ON "scripture_localizations" USING btree ("scripture_id");--> statement-breakpoint
CREATE UNIQUE INDEX "scripture_section_localizations_section_locale_unique" ON "scripture_section_localizations" USING btree ("section_id","locale");--> statement-breakpoint
CREATE UNIQUE INDEX "scripture_sections_scripture_slug_unique" ON "scripture_sections" USING btree ("scripture_id","slug");--> statement-breakpoint
CREATE INDEX "scripture_sections_scripture_idx" ON "scripture_sections" USING btree ("scripture_id");--> statement-breakpoint
CREATE INDEX "scripture_sections_parent_idx" ON "scripture_sections" USING btree ("parent_section_id");--> statement-breakpoint
CREATE INDEX "translations_verse_idx" ON "translations" USING btree ("verse_id");--> statement-breakpoint
CREATE INDEX "translations_source_idx" ON "translations" USING btree ("source_id");--> statement-breakpoint
CREATE INDEX "translators_name_idx" ON "translators" USING btree ("name");--> statement-breakpoint
CREATE INDEX "transliterations_verse_idx" ON "transliterations" USING btree ("verse_id");--> statement-breakpoint
CREATE INDEX "verse_variants_verse_idx" ON "verse_variants" USING btree ("verse_id");--> statement-breakpoint
CREATE UNIQUE INDEX "verses_section_verse_number_unique" ON "verses" USING btree ("section_id","verse_number");--> statement-breakpoint
CREATE INDEX "verses_scripture_idx" ON "verses" USING btree ("scripture_id");--> statement-breakpoint
CREATE INDEX "verses_section_idx" ON "verses" USING btree ("section_id");--> statement-breakpoint
CREATE UNIQUE INDEX "learning_modules_path_position_unique" ON "learning_modules" USING btree ("learning_path_id","position");--> statement-breakpoint
CREATE INDEX "learning_modules_content_idx" ON "learning_modules" USING btree ("content_type","content_id");--> statement-breakpoint
CREATE UNIQUE INDEX "learning_path_localizations_path_locale_unique" ON "learning_path_localizations" USING btree ("learning_path_id","locale");--> statement-breakpoint
CREATE UNIQUE INDEX "user_learning_progress_unique" ON "user_learning_progress" USING btree ("user_id","learning_path_id","module_id");--> statement-breakpoint
CREATE INDEX "user_learning_progress_user_idx" ON "user_learning_progress" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "bookmarks_user_content_unique" ON "bookmarks" USING btree ("user_id","content_type","content_id");--> statement-breakpoint
CREATE INDEX "bookmarks_user_idx" ON "bookmarks" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "reading_history_user_content_unique" ON "reading_history" USING btree ("user_id","content_type","content_id");--> statement-breakpoint
CREATE INDEX "reading_history_user_idx" ON "reading_history" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "ai_conversations_user_idx" ON "ai_conversations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "ai_message_citations_message_idx" ON "ai_message_citations" USING btree ("message_id");--> statement-breakpoint
CREATE INDEX "ai_messages_conversation_idx" ON "ai_messages" USING btree ("conversation_id");--> statement-breakpoint
CREATE INDEX "ai_usage_user_idx" ON "ai_usage" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "knowledge_chunks_content_idx" ON "knowledge_chunks" USING btree ("content_type","content_id");--> statement-breakpoint
CREATE INDEX "knowledge_chunks_source_idx" ON "knowledge_chunks" USING btree ("source_id");--> statement-breakpoint
CREATE INDEX "content_media_content_idx" ON "content_media" USING btree ("content_type","content_id");--> statement-breakpoint
CREATE INDEX "content_reports_content_idx" ON "content_reports" USING btree ("content_type","content_id");--> statement-breakpoint
CREATE INDEX "content_reviews_content_idx" ON "content_reviews" USING btree ("content_type","content_id");--> statement-breakpoint
CREATE INDEX "content_revisions_content_idx" ON "content_revisions" USING btree ("content_type","content_id");--> statement-breakpoint
CREATE INDEX "media_assets_source_idx" ON "media_assets" USING btree ("source_id");--> statement-breakpoint
CREATE POLICY "profiles_select_own" ON "profiles" AS PERMISSIVE FOR SELECT TO "authenticated" USING (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "profiles_insert_own" ON "profiles" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "profiles_update_own" ON "profiles" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "roles_select_public" ON "roles" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "user_roles_select_own" ON "user_roles" AS PERMISSIVE FOR SELECT TO "authenticated" USING (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "content_relationships_select_published" ON "content_relationships" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status in ('approved', 'reviewed'));--> statement-breakpoint
CREATE POLICY "content_tags_select_public" ON "content_tags" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "licenses_select_public" ON "licenses" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "source_reviews_select_public" ON "source_reviews" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (exists(select 1 from "sources" s where s.id = "source_reviews"."source_id" and s.verification_status in ('approved', 'reviewed')));--> statement-breakpoint
CREATE POLICY "sources_select_approved" ON "sources" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status in ('approved', 'reviewed'));--> statement-breakpoint
CREATE POLICY "tags_select_public" ON "tags" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "concept_localizations_select_published" ON "concept_localizations" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (exists(select 1 from "concepts" c where c.id = "concept_localizations"."concept_id" and c.verification_status = 'published'));--> statement-breakpoint
CREATE POLICY "concepts_select_published" ON "concepts" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status = 'published');--> statement-breakpoint
CREATE POLICY "deities_select_published" ON "deities" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status = 'published');--> statement-breakpoint
CREATE POLICY "deity_localizations_select_published" ON "deity_localizations" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (exists(select 1 from "deities" d where d.id = "deity_localizations"."deity_id" and d.verification_status = 'published'));--> statement-breakpoint
CREATE POLICY "festival_dates_select_published" ON "festival_dates" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status = 'published');--> statement-breakpoint
CREATE POLICY "festival_localizations_select_published" ON "festival_localizations" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (exists(select 1 from "festivals" f where f.id = "festival_localizations"."festival_id" and f.verification_status = 'published'));--> statement-breakpoint
CREATE POLICY "festivals_select_published" ON "festivals" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status = 'published');--> statement-breakpoint
CREATE POLICY "mantra_localizations_select_published" ON "mantra_localizations" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (exists(select 1 from "mantras" m where m.id = "mantra_localizations"."mantra_id" and m.verification_status = 'published'));--> statement-breakpoint
CREATE POLICY "mantras_select_published" ON "mantras" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status = 'published');--> statement-breakpoint
CREATE POLICY "tradition_localizations_select_public" ON "tradition_localizations" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (exists(select 1 from "traditions" t where t.id = "tradition_localizations"."tradition_id"));--> statement-breakpoint
CREATE POLICY "traditions_select_public" ON "traditions" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "commentaries_select_published" ON "commentaries" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status = 'published');--> statement-breakpoint
CREATE POLICY "commentators_select_published" ON "commentators" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (name is not null);--> statement-breakpoint
CREATE POLICY "editorial_explanations_select_published" ON "editorial_explanations" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status = 'published');--> statement-breakpoint
CREATE POLICY "scripture_localizations_select_published" ON "scripture_localizations" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (exists(select 1 from "scriptures" s where s.id = "scripture_localizations"."scripture_id" and s.verification_status = 'published'));--> statement-breakpoint
CREATE POLICY "scripture_section_localizations_select_published" ON "scripture_section_localizations" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (exists(select 1 from "scripture_sections" sc join "scriptures" s on s.id = sc.scripture_id where sc.id = "scripture_section_localizations"."section_id" and s.verification_status = 'published'));--> statement-breakpoint
CREATE POLICY "scripture_sections_select_published" ON "scripture_sections" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (exists(select 1 from "scriptures" s where s.id = "scripture_sections"."scripture_id" and s.verification_status = 'published'));--> statement-breakpoint
CREATE POLICY "scriptures_select_published" ON "scriptures" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status = 'published');--> statement-breakpoint
CREATE POLICY "translations_select_published" ON "translations" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status = 'published');--> statement-breakpoint
CREATE POLICY "translators_select_published" ON "translators" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (name is not null);--> statement-breakpoint
CREATE POLICY "transliterations_select_published" ON "transliterations" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status = 'published');--> statement-breakpoint
CREATE POLICY "verse_variants_select_published" ON "verse_variants" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status = 'published');--> statement-breakpoint
CREATE POLICY "verses_select_published" ON "verses" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status = 'published');--> statement-breakpoint
CREATE POLICY "learning_modules_select_published" ON "learning_modules" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (exists(select 1 from "learning_paths" l where l.id = "learning_modules"."learning_path_id" and l.verification_status = 'published'));--> statement-breakpoint
CREATE POLICY "learning_path_localizations_select_published" ON "learning_path_localizations" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (exists(select 1 from "learning_paths" l where l.id = "learning_path_localizations"."learning_path_id" and l.verification_status = 'published'));--> statement-breakpoint
CREATE POLICY "learning_paths_select_published" ON "learning_paths" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status = 'published');--> statement-breakpoint
CREATE POLICY "progress_select_own" ON "user_learning_progress" AS PERMISSIVE FOR SELECT TO "authenticated" USING (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "progress_insert_own" ON "user_learning_progress" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "progress_update_own" ON "user_learning_progress" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "bookmarks_select_own" ON "bookmarks" AS PERMISSIVE FOR SELECT TO "authenticated" USING (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "bookmarks_insert_own" ON "bookmarks" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "bookmarks_delete_own" ON "bookmarks" AS PERMISSIVE FOR DELETE TO "authenticated" USING (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "history_select_own" ON "reading_history" AS PERMISSIVE FOR SELECT TO "authenticated" USING (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "history_insert_own" ON "reading_history" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "history_update_own" ON "reading_history" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "preferences_select_own" ON "user_preferences" AS PERMISSIVE FOR SELECT TO "authenticated" USING (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "preferences_insert_own" ON "user_preferences" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "preferences_update_own" ON "user_preferences" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "ai_conversations_select_own" ON "ai_conversations" AS PERMISSIVE FOR SELECT TO "authenticated" USING (user_id = auth.uid() and deleted_at is null);--> statement-breakpoint
CREATE POLICY "ai_conversations_insert_own" ON "ai_conversations" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "ai_conversations_update_own" ON "ai_conversations" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "ai_message_citations_select_own" ON "ai_message_citations" AS PERMISSIVE FOR SELECT TO "authenticated" USING (exists(select 1 from "ai_messages" m join "ai_conversations" c on c.id = m.conversation_id where m.id = "ai_message_citations"."message_id" and c.user_id = auth.uid() and c.deleted_at is null));--> statement-breakpoint
CREATE POLICY "ai_messages_select_own" ON "ai_messages" AS PERMISSIVE FOR SELECT TO "authenticated" USING (exists(select 1 from "ai_conversations" c where c.id = "ai_messages"."conversation_id" and c.user_id = auth.uid() and c.deleted_at is null));--> statement-breakpoint
CREATE POLICY "ai_messages_insert_own" ON "ai_messages" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (exists(select 1 from "ai_conversations" c where c.id = "ai_messages"."conversation_id" and c.user_id = auth.uid()));--> statement-breakpoint
CREATE POLICY "ai_usage_select_own" ON "ai_usage" AS PERMISSIVE FOR SELECT TO "authenticated" USING (user_id = auth.uid());--> statement-breakpoint
CREATE POLICY "knowledge_chunks_select_approved" ON "knowledge_chunks" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (verification_status in ('verified', 'published'));--> statement-breakpoint
CREATE POLICY "app_settings_select_public" ON "app_settings" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (key in ('maintenance_mode', 'default_locale'));--> statement-breakpoint
CREATE POLICY "content_media_select_public" ON "content_media" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (exists(select 1 from "media_assets" m where m.id = "content_media"."media_id"));--> statement-breakpoint
CREATE POLICY "content_reports_insert_any" ON "content_reports" AS PERMISSIVE FOR INSERT TO "anon", "authenticated" WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "content_reviews_select_public" ON "content_reviews" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "media_assets_select_public" ON "media_assets" AS PERMISSIVE FOR SELECT TO "anon", "authenticated" USING (true);--> statement-breakpoint
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;--> statement-breakpoint
CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$begin
	insert into public.profiles (user_id, display_name, preferred_language)
	values (new.id, coalesce(new.raw_user_meta_data ->> 'name', ''), 'en');
	return new;
end;$$;--> statement-breakpoint
DROP TRIGGER IF EXISTS on_auth_user_created ON "auth"."users";--> statement-breakpoint
CREATE TRIGGER on_auth_user_created AFTER INSERT ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_user"();--> statement-breakpoint
GRANT USAGE ON SCHEMA public TO anon, authenticated;--> statement-breakpoint
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;--> statement-breakpoint
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;--> statement-breakpoint
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO anon, authenticated;