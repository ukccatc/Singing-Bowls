import { createClient } from '@supabase/supabase-js';
import { sampleProducts } from '../lib/data/products';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('🚀 Starting database setup...\n');

    // Create products table
    console.log('📋 Creating products table...');
    const { error: tableError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS products (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          slug TEXT UNIQUE NOT NULL,
          name JSONB NOT NULL,
          description JSONB NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          currency TEXT DEFAULT 'USD',
          images JSONB DEFAULT '[]'::jsonb,
          audio_sample TEXT,
          youtube_video JSONB,
          soundcloud_audio JSONB,
          category TEXT NOT NULL,
          specifications JSONB DEFAULT '[]'::jsonb,
          inventory INTEGER DEFAULT 0,
          sku TEXT UNIQUE,
          weight INTEGER DEFAULT 0,
          dimensions JSONB,
          materials TEXT[] DEFAULT ARRAY[]::TEXT[],
          origin TEXT,
          craftsman TEXT,
          is_handmade BOOLEAN DEFAULT false,
          is_featured BOOLEAN DEFAULT false,
          is_available BOOLEAN DEFAULT true,
          tags TEXT[] DEFAULT ARRAY[]::TEXT[],
          seo JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
        CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
        CREATE INDEX IF NOT EXISTS idx_products_is_available ON products(is_available);
      `
    });

    if (tableError) {
      console.error('❌ Error creating table:', tableError);
      return;
    }

    console.log('✅ Products table created\n');

    // Seed products
    console.log('🌱 Seeding products...');
    
    for (const product of sampleProducts) {
      const { error: insertError } = await supabase
        .from('products')
        .insert({
          id: product.id,
          slug: product.slug,
          name: product.name,
          description: product.description,
          price: product.price,
          currency: product.currency,
          images: product.images,
          audio_sample: product.audioSample,
          youtube_video: product.youtubeVideo,
          soundcloud_audio: product.soundcloudAudio,
          category: product.category,
          specifications: product.specifications,
          inventory: product.inventory,
          sku: product.sku,
          weight: product.weight,
          dimensions: product.dimensions,
          materials: product.materials,
          origin: product.origin,
          craftsman: product.craftsman,
          is_handmade: product.isHandmade,
          is_featured: product.isFeatured,
          is_available: product.isAvailable,
          tags: product.tags,
          seo: product.seo,
        });

      if (insertError) {
        console.error(`❌ Error inserting product ${product.slug}:`, insertError);
      } else {
        console.log(`✅ Inserted: ${product.name.en}`);
      }
    }

    console.log('\n✨ Database setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
