import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale } from '@/lib/types';
import { t } from '@/lib/translations';
import { sampleArticles } from '@/lib/data/articles';
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

interface ArticlePageProps {
  params: {
    slug: string;
    locale: Locale;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = sampleArticles.find(a => a.id === params.slug);
  
  if (!article) {
    return {
      title: t('article.notFound', params.locale),
    };
  }

  return {
    title: `${article.title[params.locale]} | ${t('site.name', params.locale)}`,
    description: article.excerpt[params.locale],
    openGraph: {
      title: article.title[params.locale],
      description: article.excerpt[params.locale],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author?.name || 'Sound Healing Expert'],
      tags: article.tags || [],
    },
  };
}

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  
  ['en', 'ru', 'uk'].forEach((locale) => {
    sampleArticles.forEach((article) => {
      params.push({
        locale: locale as Locale,
        slug: article.id,
      });
    });
  });
  
  return params;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = sampleArticles.find(a => a.id === params.slug);
  
  if (!article) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(
      params.locale === 'en' ? 'en-US' : params.locale === 'ru' ? 'ru-RU' : 'uk-UA',
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
              <Link href={`/${params.locale}`} className="hover:text-amber-600">
                {t('nav.home', params.locale)}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${params.locale}/blog`} className="hover:text-amber-600">
                {t('nav.blog', params.locale)}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">
              {article.title[params.locale]}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <Link href={`/${params.locale}/blog`}>
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t('common.back', params.locale)}
                  </Button>
                </Link>
                <Badge variant="secondary">
                  {t(`article.categories.${article.category}`, params.locale)}
                </Badge>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {article.title[params.locale]}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {article.excerpt[params.locale]}
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
                  <span>{readingTime(article.content[params.locale])} {t('article.minRead', params.locale)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{article.readingTime || 0} {t('article.readingTime', params.locale)}</span>
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

              {/* Featured Image */}
              {article.image && (
                <div className="mb-8">
                  <img
                    src={article.image.url}
                    alt={article.image.alt[params.locale]}
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
                    __html: article.content[params.locale]
                      .split('\n\n')
                      .map(paragraph => {
                        if (paragraph.startsWith('#')) {
                          // Handle headers
                          const match = paragraph.match(/^#+/);
                          const level = match ? match[0].length : 1;
                          const text = paragraph.replace(/^#+\s*/, '');
                          return `<h${level} class="text-${level === 1 ? '3xl' : level === 2 ? '2xl' : 'xl'} font-bold text-gray-900 mb-4 mt-8">${text}</h${level}>`;
                        } else if (paragraph.startsWith('- ')) {
                          // Handle lists
                          const items = paragraph.split('\n').filter(item => item.startsWith('- '));
                          const listItems = items.map(item => `<li class="mb-2">${item.replace('- ', '')}</li>`).join('');
                          return `<ul class="list-disc list-inside mb-4 space-y-2">${listItems}</ul>`;
                        } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                          // Handle bold text
                          const text = paragraph.replace(/\*\*/g, '');
                          return `<p class="font-bold text-lg text-gray-900 mb-4">${text}</p>`;
                        } else {
                          // Regular paragraph
                          return `<p class="text-gray-700 leading-relaxed mb-6">${paragraph}</p>`;
                        }
                      })
                      .join('')
                  }}
                />
              </div>
            </article>

            {/* Article Actions */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  {t('article.like', params.locale)}
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t('article.comment', params.locale)}
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                {t('article.share', params.locale)}
              </Button>
            </div>

            {/* Author Bio */}
            {article.author && (
              <Card className="mb-12">
                <CardHeader>
                  <CardTitle>{t('article.aboutAuthor', params.locale)}</CardTitle>
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
                        {article.author.bio?.[params.locale] || article.author.bio?.en}
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
                {t('article.relatedArticles', params.locale)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleArticles
                  .filter(a => a.category === article.category && a.id !== article.id)
                  .slice(0, 3)
                  .map((relatedArticle) => (
                    <Card key={relatedArticle.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        {relatedArticle.image && (
                          <img
                            src={relatedArticle.image.url}
                            alt={relatedArticle.image.alt[params.locale]}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        )}
                        <Badge variant="secondary" className="mb-2">
                          {t(`article.categories.${relatedArticle.category}`, params.locale)}
                        </Badge>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                          {relatedArticle.title[params.locale]}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {relatedArticle.excerpt[params.locale]}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{formatDate(relatedArticle.publishedAt)}</span>
                          <span>{readingTime(relatedArticle.content[params.locale])} {t('article.minRead', params.locale)}</span>
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
                <CardTitle>{t('article.tableOfContents', params.locale)}</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  {article.content[params.locale]
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
                <CardTitle>{t('article.popularArticles', params.locale)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleArticles
                    .sort((a, b) => (b.readingTime || 0) - (a.readingTime || 0))
                    .slice(0, 5)
                    .map((popularArticle) => (
                      <div key={popularArticle.id} className="flex space-x-3">
                        {popularArticle.image && (
                          <img
                            src={popularArticle.image.url}
                            alt={popularArticle.image.alt[params.locale]}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2">
                            <Link 
                              href={`/${params.locale}/blog/${popularArticle.id}`}
                              className="hover:text-amber-600"
                            >
                              {popularArticle.title[params.locale]}
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
                <CardTitle>{t('article.categories', params.locale)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.values(article.category).map((category) => (
                    <Link
                      key={category}
                      href={`/${params.locale}/blog?category=${category}`}
                      className="block text-sm text-gray-600 hover:text-amber-600 py-1"
                    >
                      {t(`article.categories.${category}`, params.locale)}
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
