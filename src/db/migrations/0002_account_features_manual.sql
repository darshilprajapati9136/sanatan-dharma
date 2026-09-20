-- 0002_account_features_manual.sql
--
-- MANUAL migration (deliberately NOT tracked in meta/_journal.json so that
-- `npm run db:migrate` can never apply it by accident).
--
-- Apply ONLY to a staging database with psql, never to production, and only
-- after reconciling the pre-existing schema drift documented in
-- docs/markdown/Auth Verification & RAG Activation Plan.md §5.
--
--   psql "$STAGING_DATABASE_URL" -f src/db/migrations/0002_account_features_manual.sql

-- 1. Preference columns -------------------------------------------------------
ALTER TABLE "user_preferences" ADD COLUMN IF NOT EXISTS "location" text DEFAULT 'New Delhi' NOT NULL;--> statement-breakpoint
ALTER TABLE "user_preferences" ADD COLUMN IF NOT EXISTS "tradition" text;--> statement-breakpoint
ALTER TABLE "user_preferences" ADD COLUMN IF NOT EXISTS "calendar" text DEFAULT 'purnimanta' NOT NULL;--> statement-breakpoint

-- 2. Learn bookmarks (browser-saved articles synced to the account) -----------
CREATE TABLE IF NOT EXISTS "learn_bookmarks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"category" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "learn_bookmarks" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'learn_bookmarks_user_content_unique') THEN
    CREATE UNIQUE INDEX "learn_bookmarks_user_content_unique" ON "learn_bookmarks" USING btree ("user_id","category","slug");
  END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'learn_bookmarks_user_idx') THEN
    CREATE INDEX "learn_bookmarks_user_idx" ON "learn_bookmarks" USING btree ("user_id");
  END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'learn_bookmarks' AND policyname = 'learn_bookmarks_select_own') THEN
    CREATE POLICY "learn_bookmarks_select_own" ON "learn_bookmarks" AS PERMISSIVE FOR SELECT TO "authenticated" USING (user_id = auth.uid());
  END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'learn_bookmarks' AND policyname = 'learn_bookmarks_insert_own') THEN
    CREATE POLICY "learn_bookmarks_insert_own" ON "learn_bookmarks" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (user_id = auth.uid());
  END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'learn_bookmarks' AND policyname = 'learn_bookmarks_delete_own') THEN
    CREATE POLICY "learn_bookmarks_delete_own" ON "learn_bookmarks" AS PERMISSIVE FOR DELETE TO "authenticated" USING (user_id = auth.uid());
  END IF;
END $$;--> statement-breakpoint

-- 3. Reading progress ---------------------------------------------------------
-- Plain uuid columns (no FK constraints), following the bookmarks.userId
-- precedent: application code validates ids, so progress writes never block
-- on content-row existence. Idempotent: safe to re-run.
CREATE TABLE IF NOT EXISTS "reading_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"scripture_id" uuid NOT NULL,
	"last_section_id" uuid,
	"last_verse_id" uuid,
	"progress_percentage" numeric,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "reading_progress" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'reading_progress_user_scripture_unique') THEN
    CREATE UNIQUE INDEX "reading_progress_user_scripture_unique" ON "reading_progress" USING btree ("user_id","scripture_id");
  END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'reading_progress_user_idx') THEN
    CREATE INDEX "reading_progress_user_idx" ON "reading_progress" USING btree ("user_id");
  END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'reading_progress' AND policyname = 'reading_progress_select_own') THEN
    CREATE POLICY "reading_progress_select_own" ON "reading_progress" AS PERMISSIVE FOR SELECT TO "authenticated" USING (user_id = auth.uid());
  END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'reading_progress' AND policyname = 'reading_progress_insert_own') THEN
    CREATE POLICY "reading_progress_insert_own" ON "reading_progress" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (user_id = auth.uid());
  END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'reading_progress' AND policyname = 'reading_progress_update_own') THEN
    CREATE POLICY "reading_progress_update_own" ON "reading_progress" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
  END IF;
END $$;--> statement-breakpoint
