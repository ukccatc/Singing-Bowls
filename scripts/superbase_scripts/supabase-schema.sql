-- Create products table with media support
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name JSONB NOT NULL, -- Multilingual names: {"en": "Product Name", "ru": "Название", "uk": "Назва"}
  description JSONB NOT NULL, -- Multilingual descriptions
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  inventory INTEGER DEFAULT 0,
  category VARCHAR(50) NOT NULL,
  images JSONB DEFAULT '[]'::jsonb, -- Array of ProductImage objects
  specifications JSONB DEFAULT '[]'::jsonb, -- Array of ProductSpecification objects
  tags TEXT[] DEFAULT '{}', -- Array of tags
  audio_sample TEXT, -- Legacy audio sample URL
  youtube_video JSONB, -- ProductVideo object
  soundcloud_audio JSONB, -- ProductAudio object
  sku VARCHAR(100) UNIQUE NOT NULL,
  weight INTEGER DEFAULT 0, -- in grams
  dimensions JSONB DEFAULT '{"unit": "cm"}'::jsonb, -- Dimensions object
  materials TEXT[] DEFAULT '{}', -- Array of materials
  origin VARCHAR(100) DEFAULT '',
  craftsman VARCHAR(100),
  is_handmade BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  seo JSONB DEFAULT '{}'::jsonb, -- SEO data object
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_available ON products(is_available);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample products with media data
INSERT INTO products (
  slug, name, description, price, currency, inventory, category, 
  images, specifications, tags, sku, weight, dimensions, materials, 
  origin, is_handmade, is_featured, is_available, seo
) VALUES 
(
  'tibetan-singing-bowl-large',
  '{"en": "Tibetan Singing Bowl - Large", "ru": "Тибетская поющая чаша - Большая", "uk": "Тибетська співаюча чаша - Велика"}',
  '{"en": "Authentic Tibetan singing bowl made by skilled craftsmen in Nepal. Perfect for meditation and sound healing.", "ru": "Аутентичная тибетская поющая чаша, изготовленная опытными мастерами в Непале. Идеальна для медитации и звукотерапии.", "uk": "Автентична тибетська співаюча чаша, виготовлена досвідченими майстрами в Непалі. Ідеальна для медитації та звукотерапії."}',
  89.99,
  'USD',
  15,
  'singing_bowls',
  '[{"id": "img1", "url": "/images/bowl-large-1.jpg", "alt": {"en": "Large singing bowl front view", "ru": "Большая поющая чаша вид спереди", "uk": "Велика співаюча чаша вид спереду"}, "width": 800, "height": 600, "isPrimary": true, "is360": false}]'::jsonb,
  '[{"name": {"en": "Diameter", "ru": "Диаметр", "uk": "Діаметр"}, "value": {"en": "20 cm", "ru": "20 см", "uk": "20 см"}, "unit": "cm"}, {"name": {"en": "Height", "ru": "Высота", "uk": "Висота"}, "value": {"en": "8 cm", "ru": "8 см", "uk": "8 см"}, "unit": "cm"}, {"name": {"en": "Weight", "ru": "Вес", "uk": "Вага"}, "value": {"en": "1.2 kg", "ru": "1.2 кг", "uk": "1.2 кг"}, "unit": "kg"}]'::jsonb,
  ARRAY['meditation', 'sound-healing', 'tibetan', 'handmade'],
  'SKU-TSB-L-001',
  1200,
  '{"diameter": 20, "height": 8, "unit": "cm"}'::jsonb,
  ARRAY['Bronze', 'Copper', 'Tin'],
  'Nepal',
  true,
  true,
  true,
  '{"title": {"en": "Tibetan Singing Bowl - Large | Himalayan Sound", "ru": "Тибетская поющая чаша - Большая | Himalayan Sound", "uk": "Тибетська співаюча чаша - Велика | Himalayan Sound"}, "description": {"en": "Authentic Tibetan singing bowl for meditation and sound healing", "ru": "Аутентичная тибетская поющая чаша для медитации и звукотерапии", "uk": "Автентична тибетська співаюча чаша для медитації та звукотерапії"}, "keywords": ["singing bowl", "meditation", "sound healing", "tibetan"]}'::jsonb
),
(
  'crystal-singing-bowl-set',
  '{"en": "Crystal Singing Bowl Set", "ru": "Набор кристальных поющих чаш", "uk": "Набір кристальних співаючих чаш"}',
  '{"en": "Beautiful set of crystal singing bowls in different sizes. Perfect for chakra healing and meditation.", "ru": "Красивый набор кристальных поющих чаш разных размеров. Идеален для чакра-терапии и медитации.", "uk": "Красивий набір кристальних співаючих чаш різних розмірів. Ідеальний для чакра-терапії та медитації."}',
  199.99,
  'USD',
  8,
  'singing_bowls',
  '[{"id": "img2", "url": "/images/crystal-set-1.jpg", "alt": {"en": "Crystal singing bowl set", "ru": "Набор кристальных поющих чаш", "uk": "Набір кристальних співаючих чаш"}, "width": 800, "height": 600, "isPrimary": true, "is360": false}]'::jsonb,
  '[{"name": {"en": "Set includes", "ru": "В набор входит", "uk": "В набір входить"}, "value": {"en": "3 bowls (small, medium, large)", "ru": "3 чаши (малая, средняя, большая)", "uk": "3 чаші (мала, середня, велика)"}, "unit": ""}, {"name": {"en": "Material", "ru": "Материал", "uk": "Матеріал"}, "value": {"en": "Quartz Crystal", "ru": "Кварцевый кристалл", "uk": "Кварцовий кристал"}, "unit": ""}]'::jsonb,
  ARRAY['crystal', 'chakra', 'healing', 'set'],
  'SKU-CSB-SET-001',
  2500,
  '{"length": 30, "width": 20, "height": 15, "unit": "cm"}'::jsonb,
  ARRAY['Quartz Crystal'],
  'Brazil',
  false,
  true,
  true,
  '{"title": {"en": "Crystal Singing Bowl Set | Himalayan Sound", "ru": "Набор кристальных поющих чаш | Himalayan Sound", "uk": "Набір кристальних співаючих чаш | Himalayan Sound"}, "description": {"en": "Beautiful crystal singing bowl set for chakra healing", "ru": "Красивый набор кристальных поющих чаш для чакра-терапии", "uk": "Красивий набір кристальних співаючих чаш для чакра-терапії"}, "keywords": ["crystal", "singing bowl", "chakra", "healing"]}'::jsonb
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID,
  email VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  billing_address JSONB NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  addresses JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title JSONB NOT NULL,
  excerpt JSONB NOT NULL,
  content JSONB NOT NULL,
  slug JSONB NOT NULL,
  author JSONB NOT NULL,
  category VARCHAR(50) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image JSONB,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create triggers for updated_at
CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at 
    BEFORE UPDATE ON customers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at 
    BEFORE UPDATE ON articles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();