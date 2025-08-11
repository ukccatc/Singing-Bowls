'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Article, ArticleCategory } from '@/lib/types';
import { t, getArticleCategoryTranslationKey } from '@/lib/translations';
import { Locale } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
  locale: Locale;
  featured?: boolean;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  locale,
  featured = false,
  className,
}) => {

  const articleTitle = article.title[locale] || article.title.en;
  const articleExcerpt = article.excerpt[locale] || article.excerpt.en;
  const articleSlug = article.slug[locale] || article.slug.en;
  const authorBio = article.author.bio[locale] || article.author.bio.en;

  const getCategoryColor = (category: ArticleCategory) => {
    switch (category) {
      case ArticleCategory.SOUND_HEALING:
        return 'bg-gold-100 text-gold-700 border-gold-200';
      case ArticleCategory.MEDITATION:
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case ArticleCategory.WELLNESS:
        return 'bg-green-100 text-green-700 border-green-200';
      case ArticleCategory.CULTURE:
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case ArticleCategory.TUTORIALS:
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-cream-100 text-charcoal-700 border-cream-200';
    }
  };

  const getCategoryName = (category: ArticleCategory) => {
    return t(getArticleCategoryTranslationKey(category), locale);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale === 'ru' ? 'ru-RU' : locale === 'uk' ? 'uk-UA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (featured) {
    return (
      <Card className={cn('overflow-hidden group hover:shadow-lg transition-shadow duration-300', className)}>
        <div className="md:flex">
          {/* Image */}
          <div className="relative md:w-1/2 h-64 md:h-auto">
            <Image
              src={article.image.url}
              alt={article.image.alt[locale] || article.image.alt.en}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <Badge className={cn('text-xs font-medium', getCategoryColor(article.category))}>
                {getCategoryName(article.category)}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-charcoal-600">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readingTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{article.author.name}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-charcoal-900 group-hover:text-gold-700 transition-colors">
                {articleTitle}
              </h2>

              <p className="text-charcoal-600 leading-relaxed line-clamp-3">
                {articleExcerpt}
              </p>

              <div className="text-sm text-charcoal-500">
                {formatDate(article.publishedAt)}
              </div>
            </div>

            <div className="mt-4">
              <Button asChild variant="outline" className="group/btn">
                <Link href={`/${locale}/blog/${articleSlug}`}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  {t('blog.readArticle', locale)}
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('overflow-hidden group hover:shadow-lg transition-shadow duration-300', className)}>
      <div className="relative aspect-video">
        <Image
          src={article.image.url}
          alt={article.image.alt[locale] || article.image.alt.en}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={cn('text-xs font-medium', getCategoryColor(article.category))}>
            {getCategoryName(article.category)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-sm text-charcoal-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{article.readingTime} {t('blog.minRead', locale)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{article.author.name}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-charcoal-900 group-hover:text-gold-700 transition-colors line-clamp-2">
            {articleTitle}
          </h3>

          {/* Excerpt */}
          <p className="text-charcoal-600 leading-relaxed line-clamp-3">
            {articleExcerpt}
          </p>

          {/* Date */}
          <div className="text-sm text-charcoal-500">
            {formatDate(article.publishedAt)}
          </div>

          {/* Read More Link */}
          <Button asChild variant="ghost" className="p-0 h-auto group/btn">
            <Link href={`/${locale}/blog/${articleSlug}`} className="flex items-center space-x-2">
              <span>{t('blog.readMore', locale)}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;