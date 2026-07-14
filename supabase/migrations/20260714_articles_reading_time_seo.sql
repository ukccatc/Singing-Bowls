-- Add optional article columns used by admin and import scripts (idempotent)
ALTER TABLE articles ADD COLUMN IF NOT EXISTS reading_time INTEGER DEFAULT 5;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT '{}'::jsonb;
