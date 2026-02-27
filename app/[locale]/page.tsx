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
      <section className="bg-gradient-to-br from-gold-50 via-bronze-50 to-copper-50 py-20 lg:py-32 relative overflow-hidden">
        {/* Metal texture overlay */}
        <div className="absolute inset-0 bg-metal-texture opacity-10"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-bronze-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-fade-in-down">
              <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-gold-100 to-bronze-100 text-gold-800 rounded-full text-sm font-semibold border border-gold-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                ✨ Authentic Himalayan Instruments
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gradient-gold mb-8 font-serif animate-fade-in-up leading-tight">
              {t('home.title', locale)}
            </h1>
            
            <p className="text-xl lg:text-2xl text-charcoal-700 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
              {t('home.subtitle', locale)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link href={`/${locale}/shop`}>
                <Button className="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl group">
                  {t('home.shopNow', locale)}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={`/${locale}/about`}>
                <Button variant="outline" className="btn-outline text-lg px-10 py-4 border-2 hover:bg-gold-50">
                  {t('home.learnMore', locale)}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gradient-bronze mb-6 font-serif">
              Why Choose Himalayan Sound
            </h2>
            <p className="text-lg lg:text-xl text-charcoal-600 max-w-2xl mx-auto">
              We're committed to bringing you the most authentic and highest quality sound healing instruments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <div className="text-center p-8 card-metal-gold hover-glow-gold hover-lift group animate-fade-in-up animation-delay-200">
              <div className="w-24 h-24 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <span className="text-4xl">🏔️</span>
              </div>
              <h3 className="text-2xl font-semibold text-gold-800 mb-4">Authentic Craftsmanship</h3>
              <p className="text-charcoal-600 leading-relaxed">
                Handmade by master artisans in the Himalayas using traditional techniques passed down through generations.
              </p>
            </div>
            
            <div className="text-center p-8 card-metal-bronze hover-glow-bronze hover-lift group animate-fade-in-up animation-delay-400">
              <div className="w-24 h-24 bg-gradient-to-br from-bronze-400 to-bronze-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <span className="text-4xl">🌍</span>
              </div>
              <h3 className="text-2xl font-semibold text-bronze-800 mb-4">Worldwide Shipping</h3>
              <p className="text-charcoal-600 leading-relaxed">
                Free shipping on orders over $200. Carefully packaged for safe delivery to your doorstep.
              </p>
            </div>
            
            <div className="text-center p-8 card-metal-copper hover-glow-copper hover-lift group animate-fade-in-up animation-delay-600">
              <div className="w-24 h-24 bg-gradient-to-br from-copper-400 to-copper-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-2xl font-semibold text-copper-800 mb-4">30-Day Guarantee</h3>
              <p className="text-charcoal-600 leading-relaxed">
                Not satisfied? Return your purchase within 30 days for a full refund, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-metal-light relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-bronze-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gradient-copper mb-6 font-serif">
              {t('home.featuredProducts', locale)}
            </h2>
            <p className="text-lg lg:text-xl text-charcoal-600 max-w-2xl mx-auto">
              {t('home.featuredProductsSubtitle', locale)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {sampleProducts.slice(0, 4).map((product, index) => (
              <div 
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <ProductCard 
                  product={product} 
                  locale={locale}
                  showAudio={true}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-16 animate-fade-in-up animation-delay-800">
            <Link href={`/${locale}/shop`}>
              <Button className="btn-secondary text-lg px-10 py-4 shadow-lg hover:shadow-xl group">
                {t('home.viewAllProducts', locale)}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
