-- Add category to gallery items for public filtering
ALTER TABLE gallery
  ADD COLUMN IF NOT EXISTS category TEXT
  CHECK (category IS NULL OR category IN ('meditation', 'workshop', 'retreat', 'ceremony'));

-- Backfill existing rows by English title
UPDATE gallery SET category = 'meditation'
WHERE category IS NULL AND (
  title->>'en' ILIKE '%Morning Meditation%'
  OR title->>'en' ILIKE '%Group Meditation%'
  OR title->>'en' ILIKE '%Outdoor Meditation%'
);

UPDATE gallery SET category = 'workshop'
WHERE category IS NULL AND (
  title->>'en' ILIKE '%Workshop%'
  OR title->>'en' ILIKE '%Healing Session%'
);

UPDATE gallery SET category = 'ceremony'
WHERE category IS NULL AND title->>'en' ILIKE '%Ceremony%';

UPDATE gallery SET category = 'retreat'
WHERE category IS NULL AND title->>'en' ILIKE '%Retreat%';

UPDATE gallery SET category = 'meditation'
WHERE category IS NULL;
