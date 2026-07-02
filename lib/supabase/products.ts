import { sampleProducts } from '@/lib/data/products';
import { supabaseServerClient } from '@/lib/supabase/server';
import { transformSupabaseProduct } from '@/lib/supabase/transforms';
import { Product } from '@/lib/types';

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabaseServerClient
      .from('products')
      .select('*')
      .eq('is_available', true)
      .order('created_at', { ascending: false });

    if (!error && data?.length) {
      return data.map((row) =>
        transformSupabaseProduct(row as Record<string, unknown>)
      );
    }
  } catch (error) {
    console.error('Error fetching products from Supabase:', error);
  }

  return sampleProducts;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const products = await getProducts();
  const featured = products.filter((product) => product.isFeatured);
  return (featured.length > 0 ? featured : products).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabaseServerClient
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_available', true)
      .maybeSingle();

    if (!error && data) {
      return transformSupabaseProduct(data as Record<string, unknown>);
    }
  } catch (error) {
    console.error('Error fetching product from Supabase:', error);
  }

  return sampleProducts.find((product) => product.slug === slug) || null;
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((product) => product.slug);
}

export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  const products = await getProducts();
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
