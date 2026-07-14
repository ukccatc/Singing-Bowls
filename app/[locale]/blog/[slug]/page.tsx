import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArticleCategory, Locale } from '@/lib/types';
import { getArticleBySlug, getArticles } from '@/lib/supabase/content';
import { renderArticleContentHtml } from '@/lib/markdown/render-article-content';
import { getArticleCategoryTranslationKey, t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Heart,
  MessageCircle,
  BookOpen,
  Tag
} from 'lucide-react';
import Link from 'next/link';

export const revalidate = 300;

interface ArticlePageProps {
  params: Promise<{
    slug: string;
    locale: Locale;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: t('article.notFound', locale),
    };
  }

  return {
    title: `${article.title[locale]} | ${t('site.name', locale)}`,
    description: article.excerpt[locale],
    openGraph: {
      title: article.title[locale],
      description: article.excerpt[locale],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author?.name || 'Sound Healing Expert'],
      tags: article.tags || [],
    },
  };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  const params: { locale: Locale; slug: string }[] = [];
  
  ['en', 'ru', 'uk'].forEach((locale) => {
    articles.forEach((article) => {
      params.push({
        locale: locale as Locale,
        slug: article.slug[locale as Locale] || article.slug.en,
      });
    });
  });
  
  return params;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, locale } = await params;
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(slug),
    getArticles(),
  ]);
  
  if (!article) {
    notFound();
  }

  const articleContent = article.content[locale];
  const hasInlineImage = /!\[[^\]]*\]\([^)]+\)/.test(articleContent);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(
      locale === 'en' ? 'en-US' : locale === 'ru' ? 'ru-RU' : 'uk-UA',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ).format(date);
  };

  const readingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href={`/${locale}`} className="hover:text-amber-600">
                {t('nav.home', locale)}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${locale}/blog`} className="hover:text-amber-600">
                {t('nav.blog', locale)}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">
              {article.title[locale]}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <Link href={`/${locale}/blog`}>
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t('common.back', locale)}
                  </Button>
                </Link>
                <Badge variant="secondary">
                  {t(getArticleCategoryTranslationKey(article.category), locale)}
                </Badge>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {article.title[locale]}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {article.excerpt[locale]}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{article.author?.name || 'Sound Healing Expert'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime(article.content[locale])} {t('article.minRead', locale)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{article.readingTime || 0} {t('article.readingTime', locale)}</span>
                </div>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center space-x-2 mb-8">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured Image (skip when inline image is in article body) */}
              {article.image && !hasInlineImage && (
                <div className="mb-8">
                  <img
                    src={article.image.url}
                    alt={article.image.alt[locale]}
                    className="w-full h-64 lg:h-96 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              )}
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
                <div 
                  className="article-content"
                  dangerouslySetInnerHTML={{
                    __html: renderArticleContentHtml(articleContent),
                  }}
                />
              </div>
            </article>

            {/* Article Actions */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  {t('article.like', locale)}
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t('article.comment', locale)}
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                {t('article.share', locale)}
              </Button>
            </div>

            {/* Author Bio */}
            {article.author && (
              <Card className="mb-12">
                <CardHeader>
                  <CardTitle>{t('article.aboutAuthor', locale)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    {article.author.avatar && (
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {article.author.name}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {article.author.bio?.[locale] || article.author.bio?.en}
                      </p>
                      {article.author.social && (
                        <div className="flex space-x-2">
                          {article.author.social.website && (
                            <a
                              href={article.author.social.website}
                              className="text-amber-600 hover:text-amber-700"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Website
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Articles */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('article.relatedArticles', locale)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allArticles
                  .filter(a => a.category === article.category && a.id !== article.id)
                  .slice(0, 3)
                  .map((relatedArticle) => (
                    <Card key={relatedArticle.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        {relatedArticle.image && (
                          <img
                            src={relatedArticle.image.url}
                            alt={relatedArticle.image.alt[locale]}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        )}
                        <Badge variant="secondary" className="mb-2">
                          {t(getArticleCategoryTranslationKey(relatedArticle.category), locale)}
                        </Badge>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                          {relatedArticle.title[locale]}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {relatedArticle.excerpt[locale]}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{formatDate(relatedArticle.publishedAt)}</span>
                          <span>{readingTime(relatedArticle.content[locale])} {t('article.minRead', locale)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Table of Contents */}
            <Card>
              <CardHeader>
                <CardTitle>{t('article.tableOfContents', locale)}</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  {article.content[locale]
                    .split('\n')
                    .filter(line => line.startsWith('##'))
                    .map((heading, index) => {
                      const text = heading.replace(/^##\s*/, '');
                      return (
                        <a
                          key={index}
                          href={`#${text.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block text-sm text-gray-600 hover:text-amber-600 py-1"
                        >
                          {text}
                        </a>
                      );
                    })}
                </nav>
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card>
              <CardHeader>
                <CardTitle>{t('article.popularArticles', locale)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allArticles
                    .sort((a, b) => (b.readingTime || 0) - (a.readingTime || 0))
                    .slice(0, 5)
                    .map((popularArticle) => (
                      <div key={popularArticle.id} className="flex space-x-3">
                        {popularArticle.image && (
                          <img
                            src={popularArticle.image.url}
                            alt={popularArticle.image.alt[locale]}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2">
                            <Link 
                              href={`/${locale}/blog/${popularArticle.slug[locale] || popularArticle.slug.en}`}
                              className="hover:text-amber-600"
                            >
                              {popularArticle.title[locale]}
                            </Link>
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(popularArticle.publishedAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>{t('article.categories', locale)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.values(ArticleCategory).map((category) => (
                    <Link
                      key={category}
                      href={`/${locale}/blog?category=${category}`}
                      className="block text-sm text-gray-600 hover:text-amber-600 py-1"
                    >
                      {t(getArticleCategoryTranslationKey(category), locale)}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
