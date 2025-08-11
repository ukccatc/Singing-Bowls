import { Metadata } from 'next';
import { Locale } from '@/lib/types';
import { t } from '@/lib/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Generate metadata for the about page
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale } 
}): Promise<Metadata> {
  const locale = params.locale;
  
  return {
    title: t('nav.about', locale),
    description: t('about.hero.subtitle', locale),
    openGraph: {
      title: t('nav.about', locale),
      description: t('about.hero.subtitle', locale),
    },
  };
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-50 to-cream-100 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-gold-100 text-gold-800 border-gold-200">
              {t('about.hero.badge', locale)}
            </Badge>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-charcoal-900 mb-6">
              {t('about.hero.title', locale)}
            </h1>
            
            <p className="text-xl text-charcoal-700 leading-relaxed max-w-3xl mx-auto">
              {t('about.hero.subtitle', locale)}
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Mission */}
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-charcoal-900 mb-6">
                {t('about.mission.title', locale)}
              </h2>
              <p className="text-xl text-charcoal-700 leading-relaxed">
                {t('about.hero.subtitle', locale)}
              </p>
            </div>

            {/* Values */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-charcoal-900 mb-6 text-center">
                {t('about.values.title', locale)}
              </h2>
              <p className="text-xl text-charcoal-700 leading-relaxed text-center mb-12">
                {t('about.values.subtitle', locale)}
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-semibold text-charcoal-900 mb-4">
                      {t('home.features.authenticity.title', locale)}
                    </h3>
                    <p className="text-charcoal-700 leading-relaxed">
                      {t('home.features.authenticity.description', locale)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-semibold text-charcoal-900 mb-4">
                      {t('home.features.shipping.title', locale)}
                    </h3>
                    <p className="text-charcoal-700 leading-relaxed">
                      {t('home.features.shipping.description', locale)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
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

            {/* Team */}
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-charcoal-900 mb-6">
                {t('about.team.title', locale)}
              </h2>
              <p className="text-xl text-charcoal-700 leading-relaxed max-w-2xl mx-auto">
                {t('about.team.subtitle', locale)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
