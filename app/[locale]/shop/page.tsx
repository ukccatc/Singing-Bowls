import { sampleProducts } from '@/lib/data/products';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
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

export default function ShopPage({ params }: { params: { locale: Locale } }) {
  return <ShopPageClient locale={params.locale} products={sampleProducts} />;
}
