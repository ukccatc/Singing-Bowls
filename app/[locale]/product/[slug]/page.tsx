import { sampleProducts } from '@/lib/data/products';
import { Locale, Product } from '@/lib/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

// Generate metadata for the product page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: Locale; slug: string }> 
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct(slug);
  const productName = product.name[locale] || product.name.en;
  const productDescription = product.description[locale] || product.description.en;
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

  return {
    title: productName,
    description: productDescription,
    openGraph: {
      title: productName,
      description: productDescription,
      images: primaryImage ? [{ url: primaryImage.url }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: productName,
      description: productDescription,
      images: primaryImage ? [primaryImage.url] : [],
    },
  };
}

// Fetch product by slug
async function getProduct(slug: string): Promise<Product | null> {
  try {
    // First try to fetch from API (Supabase)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
    });
    
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        const product = result.data.find((p: Product) => p.slug === slug);
        if (product) return product;
      }
    }
  } catch (error) {
    console.error('Error fetching product from API:', error);
  }

  // Fallback to sample products
  return sampleProducts.find(p => p.slug === slug) || null;
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    // Try to fetch from API first
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products`);
    
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        return result.data.map((product: Product) => ({
          slug: product.slug,
        }));
      }
    }
  } catch (error) {
    console.error('Error generating static params from API:', error);
  }

  // Fallback to sample products
  return sampleProducts.map(product => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ locale: Locale; slug: string }> 
}) {
  const { locale, slug } = await params;
  const product = await getProduct(slug);
  
  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} locale={locale} />;
}
