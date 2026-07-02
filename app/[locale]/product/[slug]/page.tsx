import { JsonLd } from '@/components/seo/JsonLd';
import { buildProductJsonLd } from '@/lib/seo';
import {
  getProductBySlug,
  getProductSlugs,
  getRelatedProducts,
} from '@/lib/supabase/products';
import { Locale } from '@/lib/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export const revalidate = 300;

// Generate metadata for the product page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }
  const productName = product.name[locale] || product.name.en;
  const productDescription =
    product.description[locale] || product.description.en;
  const primaryImage =
    product.images.find((img) => img.isPrimary) || product.images[0];

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

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  return (
    <>
      <JsonLd data={buildProductJsonLd(product)} />
      <ProductDetailClient
        product={product}
        locale={locale}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
