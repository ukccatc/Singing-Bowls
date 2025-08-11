import { Metadata } from 'next';
import { Locale } from '@/lib/types';
import { t } from '@/lib/translations';
import { sampleArticles } from '@/lib/data/articles';
import ArticleCard from '@/components/content/ArticleCard';

// Generate metadata for the blog page
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale } 
}): Promise<Metadata> {
  const locale = params.locale;
  
  return {
    title: t('blog.title', locale),
    description: t('blog.subtitle', locale),
    openGraph: {
      title: t('blog.title', locale),
      description: t('blog.subtitle', locale),
    },
  };
}

export default function BlogPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-50 to-cream-100 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-charcoal-900 mb-6">
              {t('blog.title', locale)}
            </h1>
            <p className="text-xl text-charcoal-700 leading-relaxed max-w-3xl mx-auto">
              {t('blog.subtitle', locale)}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleArticles.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
