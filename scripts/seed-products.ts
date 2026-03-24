import { createClient } from '@supabase/supabase-js';
import { sampleProducts } from '../lib/data/products';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedProducts() {
  try {
    console.log('🌱 Starting product seeding...\n');

    // Clear existing products
    console.log('🗑️  Clearing existing products...');
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      console.warn('⚠️  Warning clearing products:', deleteError.message);
    }

    // Insert sample products
    console.log('📝 Inserting sample products...\n');

    for (const product of sampleProducts) {
      const { error: insertError, data } = await supabase
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
        })
        .select();

      if (insertError) {
        console.error(`❌ Error inserting ${product.slug}:`, insertError.message);
      } else {
        console.log(`✅ ${product.name.en}`);
      }
    }

    console.log('\n✨ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedProducts();
