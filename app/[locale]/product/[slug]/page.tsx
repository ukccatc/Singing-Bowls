import { Locale, Product } from '@/lib/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

// Generate metadata for the product page
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale; slug: string } 
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const locale = params.locale;
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
      type: 'product',
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
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return null;
    }
    
    const result = await response.json();
    if (result.success && result.data) {
      const product = result.data.find((p: Product) => p.slug === slug);
      return product || null;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products`);
    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data.map((product: Product) => ({
        slug: product.slug,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ProductPage({ 
  params 
}: { 
  params: { locale: Locale; slug: string } 
}) {
  const product = await getProduct(params.slug);
  
  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} locale={params.locale} />;
}
