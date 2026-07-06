import ArticleCard from '@/components/content/ArticleCard';
import { getArticles } from '@/lib/supabase/content';
import { getArticleCategoryTranslationKey, t } from '@/lib/translations';
import { ArticleCategory, Locale } from '@/lib/types';
import { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 300;

// Generate metadata for the blog page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: t('blog.title', locale),
    description: t('blog.subtitle', locale),
    openGraph: {
      title: t('blog.title', locale),
      description: t('blog.subtitle', locale),
    },
  };
}

function isArticleCategory(value: string | undefined): value is ArticleCategory {
  return Boolean(value && Object.values(ArticleCategory).includes(value as ArticleCategory));
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category: categoryParam } = await searchParams;
  const activeCategory = isArticleCategory(categoryParam) ? categoryParam : undefined;
  const allArticles = await getArticles();
  const articles = activeCategory
    ? allArticles.filter((article) => article.category === activeCategory)
    : allArticles;

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

      {/* Category filters */}
      <section className="pb-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href={`/${locale}/blog`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !activeCategory
                  ? 'bg-gold-600 text-white'
                  : 'bg-white text-charcoal-700 hover:bg-gold-50'
              }`}
            >
              {t('blog.category.all', locale)}
            </Link>
            {Object.values(ArticleCategory).map((category) => (
              <Link
                key={category}
                href={`/${locale}/blog?category=${category}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-gold-600 text-white'
                    : 'bg-white text-charcoal-700 hover:bg-gold-50'
                }`}
              >
                {t(getArticleCategoryTranslationKey(category), locale)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
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
