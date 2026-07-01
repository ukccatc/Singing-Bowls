import { sampleProducts } from '@/lib/data/products';
import { transformSupabaseProduct } from '@/lib/supabase/transforms';
import { t } from '@/lib/translations';
import { Locale, Product } from '@/lib/types';
import ShopPageClient from './ShopPageClient';

// Generate metadata for the shop page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}) {
  const { locale } = await params;
  
  return {
    title: t('shop.title', locale),
    description: t('shop.subtitle', locale),
    openGraph: {
      title: t('shop.title', locale),
      description: t('shop.subtitle', locale),
    },
  };
}

// Fetch products from API
async function getProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        return result.data.map((product: Record<string, unknown>) =>
          transformSupabaseProduct(product)
        );
      }
    }
  } catch (error) {
    console.error('Error fetching products from API:', error);
  }

  return sampleProducts;
}

export default async function ShopPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const products = await getProducts();
  
  return <ShopPageClient locale={locale} products={products} />;
}
