'use client';

import { StarRating } from '@/components/product/StarRating';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductReview, ReviewSummary } from '@/lib/reviews';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ProductReviewsProps {
  productId: string;
  locale: Locale;
  initialReviews?: ProductReview[];
  initialSummary?: ReviewSummary;
}

const emptySummary: ReviewSummary = {
  average: 0,
  count: 0,
  breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
};

export function ProductReviews({
  productId,
  locale,
  initialReviews = [],
  initialSummary = emptySummary,
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [summary, setSummary] = useState(initialSummary);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`/api/products/${productId}/reviews`);
        if (!response.ok) return;
        const json = await response.json();
        setReviews(json.data?.reviews || []);
        setSummary(json.data?.summary || emptySummary);
      } catch {
        // keep initial
      }
    };
    void load();
  }, [productId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorName, authorEmail, title, body, rating }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || 'Failed to submit review');
      }
      toast.success(t('product.reviewSubmitted', locale));
      setAuthorName('');
      setAuthorEmail('');
      setTitle('');
      setBody('');
      setRating(5);
      const refresh = await fetch(`/api/products/${productId}/reviews`);
      if (refresh.ok) {
        const data = await refresh.json();
        setReviews(data.data?.reviews || []);
        setSummary(data.data?.summary || emptySummary);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-charcoal-900">
            {t('product.reviews', locale)}
          </h3>
          <div className="mt-2">
            <StarRating
              value={summary.average}
              showValue
              count={summary.count}
              size="lg"
            />
          </div>
        </div>
      </div>

      {summary.count === 0 ? (
        <p className="text-charcoal-600">{t('product.noReviews', locale)}</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="border-cream-200 shadow-sm">
              <CardContent className="space-y-2 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-charcoal-900">{review.authorName}</p>
                    {review.isVerified ? (
                      <p className="text-xs text-gold-700">{t('product.verified', locale)}</p>
                    ) : null}
                  </div>
                  <StarRating value={review.rating} size="sm" />
                </div>
                {review.title ? (
                  <p className="font-medium text-charcoal-800">{review.title}</p>
                ) : null}
                <p className="text-sm leading-relaxed text-charcoal-700">{review.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="border-cream-200 shadow-sm">
        <CardContent className="p-6">
          <h4 className="mb-4 text-lg font-semibold text-charcoal-900">
            {t('product.writeReview', locale)}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={ui.labelSm}>{t('product.yourRating', locale)}</label>
              <StarRating value={rating} interactive onChange={setRating} size="lg" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={ui.labelSm}>{t('product.reviewName', locale)}</label>
                <input
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className={cn(ui.field, ui.focus)}
                />
              </div>
              <div>
                <label className={ui.labelSm}>{t('product.reviewEmail', locale)}</label>
                <input
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  className={cn(ui.field, ui.focus)}
                  placeholder="optional"
                />
              </div>
            </div>
            <div>
              <label className={ui.labelSm}>{t('product.reviewTitle', locale)}</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={cn(ui.field, ui.focus)}
              />
            </div>
            <div>
              <label className={ui.labelSm}>{t('product.reviewBody', locale)}</label>
              <textarea
                required
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className={cn(ui.field, ui.focus)}
              />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? '...' : t('product.submitReview', locale)}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
