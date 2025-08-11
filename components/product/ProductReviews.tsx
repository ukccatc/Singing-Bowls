'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Star, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { t, getLocaleFromPathname } from '@/lib/translations';

interface Review {
  id: string;
  productId: string;
  author: {
    name: string;
    avatar?: string;
    location?: string;
  };
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  images?: string[];
}

interface ProductReviewsProps {
  productId: string;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    productId: 'himalayan-bronze-bowl-large',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      location: 'New York, USA',
    },
    rating: 5,
    title: 'Absolutely Beautiful Sound',
    content: 'This singing bowl produces the most incredible, resonant sound I\'ve ever heard. The craftsmanship is exceptional and the tone is perfect for my meditation practice. I can feel the vibrations throughout my entire body when I play it. The included striker and cushion are also high quality. Highly recommend!',
    date: '2024-12-10',
    verified: true,
    helpful: 12,
    notHelpful: 0,
    images: [
      'https://images.pexels.com/photos/3997132/pexels-photo-3997132.jpeg',
    ],
  },
  {
    id: '2',
    productId: 'himalayan-bronze-bowl-large',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'Toronto, Canada',
    },
    rating: 5,
    title: 'Authentic Himalayan Quality',
    content: 'I\'ve been collecting singing bowls for years and this one is truly exceptional. The seven-metal alloy creates a rich, complex tone that\'s perfect for sound healing sessions. The hand-etched patterns are beautiful and the bowl feels substantial and well-made. Shipping was fast and the packaging was excellent.',
    date: '2024-12-08',
    verified: true,
    helpful: 8,
    notHelpful: 1,
  },
  {
    id: '3',
    productId: 'himalayan-bronze-bowl-large',
    author: {
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: 'Madrid, Spain',
    },
    rating: 4,
    title: 'Great for Sound Therapy',
    content: 'I use this bowl in my sound therapy practice and my clients love it. The C# note is perfect for root chakra work and the sound is very grounding. The only minor issue is that it\'s quite heavy, but that\'s expected for a bowl of this size and quality.',
    date: '2024-12-05',
    verified: true,
    helpful: 5,
    notHelpful: 0,
  },
];

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'helpful'>('date');
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const reviews = mockReviews.filter(review => review.productId === productId);
  
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  const filteredReviews = reviews.filter(review => 
    selectedRating === null || review.rating === selectedRating
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      case 'date':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ru' ? 'ru-RU' : locale === 'uk' ? 'uk-UA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Reviews Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-charcoal-900 mb-2">
            {t('product.reviews', locale)} ({reviews.length})
          </h2>
          
          {/* Average Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(Math.round(averageRating))}
              </div>
              <span className="text-lg font-semibold text-charcoal-900">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-charcoal-600">
              {t('product.reviews', locale)} • {reviews.length} {t('product.reviews', locale).toLowerCase()}
            </span>
          </div>
        </div>

        <Button variant="outline" className="w-fit">
          <MessageCircle className="h-4 w-4 mr-2" />
          {t('product.writeReview', locale)}
        </Button>
      </div>

      {/* Rating Breakdown */}
      <div className="bg-cream-50 rounded-lg p-6">
        <h3 className="font-semibold text-charcoal-900 mb-4">
          {t('product.ratingBreakdown', locale)}
        </h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center gap-3">
              <button
                onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                className={`flex items-center gap-2 px-2 py-1 rounded transition-colors ${
                  selectedRating === rating ? 'bg-gold-100 text-gold-700' : 'hover:bg-cream-100'
                }`}
              >
                <span className="text-sm font-medium">{rating}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </button>
              <div className="flex-1 bg-cream-200 rounded-full h-2">
                <div
                  className="bg-gold-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${reviews.length > 0 ? (ratingCounts[rating as keyof typeof ratingCounts] / reviews.length) * 100 : 0}%`
                  }}
                />
              </div>
              <span className="text-sm text-charcoal-600 min-w-[3rem]">
                {ratingCounts[rating as keyof typeof ratingCounts]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-charcoal-600">
            {t('product.sortBy', locale)}:
          </span>
          <div className="flex gap-2">
            {[
              { key: 'date', label: t('product.sortByDate', locale) },
              { key: 'rating', label: t('product.sortByRating', locale) },
              { key: 'helpful', label: t('product.sortByHelpful', locale) },
            ].map(option => (
              <button
                key={option.key}
                onClick={() => setSortBy(option.key as typeof sortBy)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  sortBy === option.key
                    ? 'bg-gold-500 text-white'
                    : 'bg-cream-100 text-charcoal-600 hover:bg-cream-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {selectedRating && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedRating(null)}
            className="text-charcoal-600"
          >
            {t('product.clearFilter', locale)}
          </Button>
        )}
      </div>

      <Separator />

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.length > 0 ? (
          sortedReviews.map(review => (
            <div key={review.id} className="border border-cream-200 rounded-lg p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.author.avatar} alt={review.author.name} />
                    <AvatarFallback>
                      {review.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-charcoal-900">
                        {review.author.name}
                      </span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          {t('product.verified', locale)}
                        </Badge>
                      )}
                    </div>
                    {review.author.location && (
                      <span className="text-sm text-charcoal-600">
                        {review.author.location}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex mb-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-charcoal-600">
                    {formatDate(review.date)}
                  </span>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <h4 className="font-semibold text-charcoal-900 mb-2">
                  {review.title}
                </h4>
                <p className="text-charcoal-700 leading-relaxed">
                  {review.content}
                </p>
              </div>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((image, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 rounded-lg overflow-hidden border border-cream-200"
                    >
                      <img
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center gap-4 text-sm">
                <button className="flex items-center gap-1 text-charcoal-600 hover:text-gold-600 transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{t('product.helpful', locale)} ({review.helpful})</span>
                </button>
                <button className="flex items-center gap-1 text-charcoal-600 hover:text-red-600 transition-colors">
                  <ThumbsDown className="h-4 w-4" />
                  <span>{t('product.notHelpful', locale)} ({review.notHelpful})</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-charcoal-600">
              {selectedRating 
                ? t('product.noReviewsForRating', locale)
                : t('product.noReviews', locale)
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;