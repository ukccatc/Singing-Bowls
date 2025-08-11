import { Metadata } from 'next';
import { Locale } from '@/lib/types';
import { t } from '@/lib/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Generate metadata for the cart page
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale } 
}): Promise<Metadata> {
  const locale = params.locale;
  
  return {
    title: t('cart.title', locale),
    description: 'Your shopping cart with authentic Himalayan sound healing instruments',
    openGraph: {
      title: t('cart.title', locale),
      description: 'Your shopping cart with authentic Himalayan sound healing instruments',
    },
  };
}

export default function CartPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Header */}
      <section className="bg-gradient-to-br from-gold-50 to-cream-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <Link href={`/${locale}/shop`} className="flex items-center space-x-2 text-gold-600 hover:text-gold-700">
                <ArrowLeft className="h-5 w-5" />
                <span>{t('common.back', locale)}</span>
              </Link>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-charcoal-900 mb-6">
              {t('cart.title', locale)}
            </h1>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingCart className="h-12 w-12 text-gold-600" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-charcoal-900 mb-4">
                    {t('cart.empty', locale)}
                  </h2>
                  
                  <p className="text-charcoal-700 mb-8 max-w-md mx-auto">
                    Start your journey with authentic Himalayan sound healing instruments.
                  </p>
                  
                  <Button asChild size="lg" className="bg-gold-600 hover:bg-gold-700">
                    <Link href={`/${locale}/shop`}>
                      {t('cart.continueShopping', locale)}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
