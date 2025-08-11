import { Metadata } from 'next';
import { Locale } from '@/lib/types';
import { t } from '@/lib/translations';
import { sampleProducts } from '@/lib/data/products';
import ProductCard from '@/components/product/ProductCard';

// Generate metadata for the shop page
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale } 
}): Promise<Metadata> {
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
  const locale = params.locale;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-50 to-cream-100 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-charcoal-900 mb-6">
              {t('shop.title', locale)}
            </h1>
            <p className="text-xl text-charcoal-700 leading-relaxed max-w-2xl mx-auto">
              {t('shop.subtitle', locale)}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {sampleProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
