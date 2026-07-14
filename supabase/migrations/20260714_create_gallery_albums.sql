-- Gallery albums: group images by event date and activity
CREATE TABLE IF NOT EXISTS gallery_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title JSONB NOT NULL,
  description JSONB DEFAULT '{}'::jsonb,
  event_date DATE,
  category TEXT CHECK (category IS NULL OR category IN ('meditation', 'workshop', 'retreat', 'ceremony')),
  location JSONB,
  cover_image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_albums_display_order ON gallery_albums(display_order ASC);
CREATE INDEX IF NOT EXISTS idx_gallery_albums_event_date ON gallery_albums(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_albums_is_active ON gallery_albums(is_active);
CREATE INDEX IF NOT EXISTS idx_gallery_albums_slug ON gallery_albums(slug);

CREATE TABLE IF NOT EXISTS gallery_album_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID NOT NULL REFERENCES gallery_albums(id) ON DELETE CASCADE,
  gallery_id UUID NOT NULL REFERENCES gallery(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (album_id, gallery_id)
);

CREATE INDEX IF NOT EXISTS idx_gallery_album_images_album_id ON gallery_album_images(album_id);
CREATE INDEX IF NOT EXISTS idx_gallery_album_images_gallery_id ON gallery_album_images(gallery_id);
CREATE INDEX IF NOT EXISTS idx_gallery_album_images_display_order ON gallery_album_images(display_order ASC);

ALTER TABLE gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_album_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read albums" ON gallery_albums
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Allow authenticated insert albums" ON gallery_albums
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update albums" ON gallery_albums
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete albums" ON gallery_albums
  FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read album images" ON gallery_album_images
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM gallery_albums a
      WHERE a.id = gallery_album_images.album_id AND a.is_active = true
    )
  );

CREATE POLICY "Allow authenticated insert album images" ON gallery_album_images
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update album images" ON gallery_album_images
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete album images" ON gallery_album_images
  FOR DELETE
  USING (auth.role() = 'authenticated');
