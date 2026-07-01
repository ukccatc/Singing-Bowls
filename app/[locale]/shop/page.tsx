import { getProducts } from '@/lib/supabase/products';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { Suspense } from 'react';
import ShopPageClient from './ShopPageClient';

export const revalidate = 300;

// Generate metadata for the shop page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
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

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const products = await getProducts();

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12 text-center text-charcoal-600">
          {t('shop.title', locale)}
        </div>
      }
    >
      <ShopPageClient locale={locale} products={products} />
    </Suspense>
  );
}
