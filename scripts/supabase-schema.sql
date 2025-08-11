-- Supabase Database Schema for Bowls E-commerce
-- Выполните этот скрипт в SQL Editor вашего проекта Supabase

-- =====================================================
-- Создание таблиц
-- =====================================================

-- Таблица продуктов
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name JSONB NOT NULL, -- {en: string, ru: string, uk: string}
  description JSONB NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  inventory INTEGER DEFAULT 0,
  category TEXT NOT NULL,
  images JSONB DEFAULT '[]',
  specifications JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '[]',
  audio_sample TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица клиентов
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  addresses JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица заказов
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id),
  email TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  billing_address JSONB NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица элементов заказа
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица статей
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title JSONB NOT NULL,
  excerpt JSONB NOT NULL,
  content JSONB NOT NULL,
  slug JSONB NOT NULL,
  author JSONB NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '[]',
  image JSONB,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- Создание индексов для производительности
-- =====================================================

-- Индексы для продуктов
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_available ON products(is_available);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Индексы для заказов
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Индексы для элементов заказа
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- Индексы для статей
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_is_published ON articles(is_published);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at);

-- =====================================================
-- Включение Row Level Security (RLS)
-- =====================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- Создание политик безопасности
-- =====================================================

-- Политики для продуктов (публичное чтение, админ - полный доступ)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Products are insertable by admin" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Products are updatable by admin" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Products are deletable by admin" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- Политики для заказов
CREATE POLICY "Orders are viewable by owner or admin" ON orders
  FOR SELECT USING (
    auth.uid()::text = customer_id::text OR 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Orders are insertable by anyone" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Orders are updatable by admin" ON orders
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Политики для элементов заказа
CREATE POLICY "Order items are viewable by order owner or admin" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND (orders.customer_id::text = auth.uid()::text OR auth.role() = 'authenticated')
    )
  );

CREATE POLICY "Order items are insertable by anyone" ON order_items
  FOR INSERT WITH CHECK (true);

-- Политики для статей (публичное чтение, админ - полный доступ)
CREATE POLICY "Articles are viewable by everyone" ON articles
  FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Articles are insertable by admin" ON articles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Articles are updatable by admin" ON articles
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Articles are deletable by admin" ON articles
  FOR DELETE USING (auth.role() = 'authenticated');

-- =====================================================
-- Создание функций для автоматического обновления updated_at
-- =====================================================

-- Функция для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггеры для автоматического обновления updated_at
CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at 
  BEFORE UPDATE ON customers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at 
  BEFORE UPDATE ON articles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Создание enum типов для статусов
-- =====================================================

-- Enum для статусов заказов
CREATE TYPE order_status AS ENUM (
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
);

-- Обновляем колонку status в таблице orders
ALTER TABLE orders ALTER COLUMN status TYPE order_status USING status::order_status;

-- =====================================================
-- Комментарии к таблицам
-- =====================================================

COMMENT ON TABLE products IS 'Таблица продуктов магазина';
COMMENT ON TABLE customers IS 'Таблица клиентов';
COMMENT ON TABLE orders IS 'Таблица заказов';
COMMENT ON TABLE order_items IS 'Таблица элементов заказа';
COMMENT ON TABLE articles IS 'Таблица статей блога';

-- =====================================================
-- Готово!
-- =====================================================

-- После выполнения этого скрипта:
-- 1. Все таблицы созданы
-- 2. Индексы для производительности добавлены
-- 3. RLS включен для безопасности
-- 4. Политики безопасности настроены
-- 5. Триггеры для автоматического обновления updated_at созданы
