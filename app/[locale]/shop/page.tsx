import { t } from '@/lib/translations';
import { Locale, Product } from '@/lib/types';
import ShopPageClient from './ShopPageClient';

// Generate metadata for the shop page
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale } 
}) {
  const locale = params.locale;
  
  return {
    title: t('shop.title', locale),
    description: t('shop.subtitle', locale),
    openGraph: {
      title: t('shop.title', locale),
      description: t('shop.subtitle', locale),
    },
  };
}

// Transform Supabase data to match our Product interface
function transformSupabaseProduct(supabaseProduct: any): Product {
  return {
    id: supabaseProduct.id,
    slug: supabaseProduct.slug,
    name: supabaseProduct.name,
    description: supabaseProduct.description,
    price: supabaseProduct.price,
    currency: supabaseProduct.currency,
    images: supabaseProduct.images || [],
    audioSample: supabaseProduct.audio_sample,
    youtubeVideo: supabaseProduct.youtube_video,
    soundcloudAudio: supabaseProduct.soundcloud_audio,
    category: supabaseProduct.category,
    specifications: supabaseProduct.specifications || [],
    inventory: supabaseProduct.inventory,
    sku: supabaseProduct.sku,
    weight: supabaseProduct.weight,
    dimensions: supabaseProduct.dimensions || { unit: 'cm' },
    materials: supabaseProduct.materials || [],
    origin: supabaseProduct.origin,
    craftsman: supabaseProduct.craftsman,
    isHandmade: supabaseProduct.is_handmade,
    isFeatured: supabaseProduct.is_featured,
    isAvailable: supabaseProduct.is_available,
    tags: supabaseProduct.tags || [],
    createdAt: supabaseProduct.created_at,
    updatedAt: supabaseProduct.updated_at,
    seo: supabaseProduct.seo || {},
  };
}

// Fetch products from API
async function getProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store', // Always fetch fresh data
    });
    
    if (!response.ok) {
      console.error('Failed to fetch products:', response.statusText);
      return [];
    }
    
    const result = await response.json();
    if (result.success && result.data) {
      return result.data.map((product: any) => transformSupabaseProduct(product));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ShopPage({ params }: { params: { locale: Locale } }) {
  const products = await getProducts();
  
  return <ShopPageClient locale={params.locale} products={products} />;
}
