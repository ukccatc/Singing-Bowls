import { Metadata } from 'next';
import { Locale } from '@/lib/types';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Award, Truck, Shield } from 'lucide-react';
import Link from 'next/link';

// Generate metadata for the home page
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale } 
}): Promise<Metadata> {
  const locale = params.locale;
  
  return {
    title: t('home.hero.title', locale),
    description: t('home.hero.subtitle', locale),
    openGraph: {
      title: t('home.hero.title', locale),
      description: t('home.hero.subtitle', locale),
    },
  };
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gold-50 to-cream-100 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-gold-100 text-gold-800 border-gold-200">
              {t('home.hero.badge', locale)}
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-charcoal-900 mb-6 leading-tight">
              {t('home.hero.title', locale)}
            </h1>
            
            <p className="text-xl lg:text-2xl text-charcoal-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              {t('home.hero.subtitle', locale)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-3 text-lg">
                <Link href={`/${locale}/shop`}>
                  {t('home.hero.exploreCollection', locale)}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-gold-600 text-gold-600 hover:bg-gold-50 px-8 py-3 text-lg">
                <Link href={`/${locale}/about`}>
                  {t('home.hero.learnMore', locale)}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal-900 mb-6">
              {t('home.features.title', locale)}
            </h2>
            <p className="text-xl text-charcoal-700 leading-relaxed">
              {t('home.features.subtitle', locale)}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Authenticity */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-gold-600" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal-900 mb-4">
                  {t('home.features.authenticity.title', locale)}
                </h3>
                <p className="text-charcoal-700 leading-relaxed">
                  {t('home.features.authenticity.description', locale)}
                </p>
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-8 w-8 text-gold-600" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal-900 mb-4">
                  {t('home.features.shipping.title', locale)}
                </h3>
                <p className="text-charcoal-700 leading-relaxed">
                  {t('home.features.shipping.description', locale)}
                </p>
              </CardContent>
            </Card>

            {/* Guarantee */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-gold-600" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal-900 mb-4">
                  {t('home.features.guarantee.title', locale)}
                </h3>
                <p className="text-charcoal-700 leading-relaxed">
                  {t('home.features.guarantee.description', locale)}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-600 to-gold-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {t('home.hero.title', locale)}
          </h2>
          <p className="text-xl text-gold-100 mb-8 max-w-2xl mx-auto">
            {t('home.hero.subtitle', locale)}
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-gold-600 hover:bg-gold-50 px-8 py-3 text-lg">
            <Link href={`/${locale}/shop`}>
              {t('home.hero.exploreCollection', locale)}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
