#!/bin/bash

# Supabase Migration Script
# This script helps you run the database migration

echo "🚀 Himalayan Sound - Database Migration"
echo "========================================"
echo ""
echo "To complete the setup, you need to run the SQL migration in Supabase."
echo ""
echo "Follow these steps:"
echo ""
echo "1. Go to: https://app.supabase.com"
echo "2. Select your project"
echo "3. Click 'SQL Editor' in the left sidebar"
echo "4. Click 'New Query'"
echo "5. Copy and paste the SQL below:"
echo ""
echo "========================================"
echo ""

cat << 'EOF'
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name JSONB NOT NULL,
  description JSONB NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image_url TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON products FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON products FOR DELETE USING (auth.role() = 'authenticated');
EOF

echo ""
echo "========================================"
echo ""
echo "6. Click 'Run' button"
echo "7. Wait for success message"
echo "8. Done! Your database is ready"
echo ""
echo "✅ Admin email configured: ukccatc@gmail.com"
echo ""
