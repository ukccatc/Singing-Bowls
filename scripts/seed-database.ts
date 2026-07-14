import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { galleryImages } from '../lib/data/gallery';
import { sampleArticles } from '../lib/data/articles';
import { sampleProducts } from '../lib/data/products';

function loadEnvFile(filename: string) {
  const path = resolve(process.cwd(), filename);
  const content = readFileSync(path, 'utf8');

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

loadEnvFile('.env.local');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedProducts() {
  console.log('Seeding products...');

  for (const product of sampleProducts) {
    const { error } = await supabase.from('products').upsert(
      {
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
      },
      { onConflict: 'slug' }
    );

    if (error) {
      console.error(`  products/${product.slug}:`, error.message);
    } else {
      console.log(`  products/${product.slug}: ok`);
    }
  }
}

async function seedGallery() {
  console.log('Seeding gallery...');

  const { error: deleteError } = await supabase
    .from('gallery')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (deleteError) {
    console.warn('  gallery clear warning:', deleteError.message);
  }

  for (const [index, image] of galleryImages.entries()) {
    const { error } = await supabase.from('gallery').insert({
      image_url: image.imageUrl,
      title: image.title,
      description: image.description,
      display_order: index + 1,
      is_active: true,
      category: image.category,
    });

    if (error) {
      console.error(`  gallery/${image.id}:`, error.message);
    } else {
      console.log(`  gallery/${image.id}: ok`);
    }
  }
}

async function seedArticles() {
  console.log('Seeding articles...');

  const { error: deleteError } = await supabase
    .from('articles')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (deleteError) {
    console.warn('  articles clear warning:', deleteError.message);
  }

  for (const article of sampleArticles) {
    const { error } = await supabase.from('articles').insert({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      slug: article.slug,
      author: article.author,
      category: article.category,
      tags: article.tags,
      image: article.image,
      is_published: article.isPublished,
      published_at: article.publishedAt,
      reading_time: article.readingTime,
      seo: article.seo,
      created_at: article.createdAt,
      updated_at: article.updatedAt,
    });

    if (error) {
      console.error(`  articles/${article.slug.en}:`, error.message);
    } else {
      console.log(`  articles/${article.slug.en}: ok`);
    }
  }
}

async function main() {
  await seedProducts();
  await seedGallery();
  await seedArticles();
  console.log('Done.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
