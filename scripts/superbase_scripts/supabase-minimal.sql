-- Minimal Supabase setup - just the essentials
-- Copy and paste this into Supabase SQL Editor

-- Create products table with basic structure
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name JSONB NOT NULL,
  description JSONB NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  inventory INTEGER DEFAULT 0,
  category VARCHAR(50) NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '[]'::jsonb,
  tags TEXT[] DEFAULT '{}',
  audio_sample TEXT,
  youtube_video JSONB,
  soundcloud_audio JSONB,
  sku VARCHAR(100) UNIQUE NOT NULL,
  weight INTEGER DEFAULT 0,
  dimensions JSONB DEFAULT '{"unit": "cm"}'::jsonb,
  materials TEXT[] DEFAULT '{}',
  origin VARCHAR(100) DEFAULT '',
  craftsman VARCHAR(100),
  is_handmade BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  seo JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create basic indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_available ON products(is_available);

-- Create function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for products
CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert one simple test product
INSERT INTO products (
  slug, name, description, price, currency, inventory, category, sku
) VALUES (
  'test-product',
  '{"en": "Test Product", "ru": "Тестовый продукт", "uk": "Тестовий продукт"}',
  '{"en": "This is a test product", "ru": "Это тестовый продукт", "uk": "Це тестовий продукт"}',
  29.99,
  'USD',
  10,
  'singing_bowls',
  'SKU-TEST-001'
);
