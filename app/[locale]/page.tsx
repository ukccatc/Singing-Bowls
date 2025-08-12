import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { sampleProducts } from '@/lib/data/products';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

// Generate metadata for the home page
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale } 
}): Promise<Metadata> {
  const locale = params.locale;
  
  return {
    title: t('home.title', locale),
    description: t('home.subtitle', locale),
    openGraph: {
      title: t('home.title', locale),
      description: t('home.subtitle', locale),
    },
  };
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;

  return (
    <div className="min-h-screen bg-metal-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-50 via-bronze-50 to-copper-50 py-16 lg:py-24 relative overflow-hidden">
        {/* Metal texture overlay */}
        <div className="absolute inset-0 bg-metal-texture opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-gold-100 to-bronze-100 text-gold-800 rounded-full text-sm font-medium border border-gold-200">
                Authentic Himalayan Instruments
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gradient-gold mb-6 font-serif">
              {t('home.title', locale)}
            </h1>
            
            <p className="text-xl text-charcoal-700 leading-relaxed max-w-2xl mx-auto mb-8">
              {t('home.subtitle', locale)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/shop`}>
                <Button className="btn-primary text-lg px-8 py-3">
                  {t('home.shopNow', locale)}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href={`/${locale}/about`}>
                <Button variant="outline" className="btn-outline text-lg px-8 py-3 border-2">
                  {t('home.learnMore', locale)}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gradient-bronze mb-4 font-serif">
              Why Choose Himalayan Sound
            </h2>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
              We're committed to bringing you the most authentic and highest quality sound healing instruments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 card-metal-gold hover-glow-gold">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🏔️</span>
              </div>
              <h3 className="text-xl font-semibold text-gold-800 mb-3">Authentic Craftsmanship</h3>
              <p className="text-charcoal-600">
                Handmade by master artisans in the Himalayas using traditional techniques.
              </p>
            </div>
            
            <div className="text-center p-8 card-metal-bronze hover-glow-bronze">
              <div className="w-20 h-20 bg-gradient-to-br from-bronze-400 to-bronze-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-bronze-800 mb-3">Worldwide Shipping</h3>
              <p className="text-charcoal-600">
                Free shipping on orders over $200. Carefully packaged for safe delivery.
              </p>
            </div>
            
            <div className="text-center p-8 card-metal-copper hover-glow-copper">
              <div className="w-20 h-20 bg-gradient-to-br from-copper-400 to-copper-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-copper-800 mb-3">30-Day Guarantee</h3>
              <p className="text-charcoal-600">
                Not satisfied? Return your purchase within 30 days for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-metal-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gradient-copper mb-4 font-serif">
              {t('home.featuredProducts', locale)}
            </h2>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
              {t('home.featuredProductsSubtitle', locale)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {sampleProducts.slice(0, 4).map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                locale={locale}
                showAudio={true}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={`/${locale}/shop`}>
              <Button className="btn-secondary text-lg px-8 py-3">
                {t('home.viewAllProducts', locale)}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
