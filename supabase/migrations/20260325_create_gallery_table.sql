-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  title JSONB, -- { en: string, ru: string, uk: string }
  description JSONB, -- { en: string, ru: string, uk: string }
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for ordering
CREATE INDEX idx_gallery_display_order ON gallery(display_order ASC);
CREATE INDEX idx_gallery_is_active ON gallery(is_active);

-- Enable RLS
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON gallery
  FOR SELECT
  USING (is_active = true);

-- Allow authenticated users to manage
CREATE POLICY "Allow authenticated insert" ON gallery
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON gallery
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON gallery
  FOR DELETE
  USING (auth.role() = 'authenticated');
