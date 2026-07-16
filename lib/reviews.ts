import { getSupabaseServer } from '@/lib/supabase/server';

export interface ProductReview {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  title: string | null;
  body: string;
  isVerified: boolean;
  createdAt: string;
}

export interface ReviewSummary {
  average: number;
  count: number;
  breakdown: Record<1 | 2 | 3 | 4 | 5, number>;
}

function mapReview(row: Record<string, unknown>): ProductReview {
  return {
    id: String(row.id),
    productId: String(row.product_id),
    authorName: String(row.author_name),
    rating: Number(row.rating),
    title: row.title ? String(row.title) : null,
    body: String(row.body),
    isVerified: Boolean(row.is_verified),
    createdAt: String(row.created_at),
  };
}

export function summarizeReviews(reviews: ProductReview[]): ReviewSummary {
  const breakdown: ReviewSummary['breakdown'] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (reviews.length === 0) {
    return { average: 0, count: 0, breakdown };
  }

  let sum = 0;
  for (const review of reviews) {
    const rating = Math.min(5, Math.max(1, Math.round(review.rating))) as 1 | 2 | 3 | 4 | 5;
    breakdown[rating] += 1;
    sum += review.rating;
  }

  return {
    average: Math.round((sum / reviews.length) * 10) / 10,
    count: reviews.length,
    breakdown,
  };
}

export async function getProductReviews(productId: string): Promise<{
  reviews: ProductReview[];
  summary: ReviewSummary;
}> {
  const client = getSupabaseServer();
  const { data, error } = await client
    .from('product_reviews')
    .select('*')
    .eq('product_id', productId)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load reviews:', error);
    return { reviews: [], summary: summarizeReviews([]) };
  }

  const reviews = (data || []).map((row) => mapReview(row as Record<string, unknown>));
  return { reviews, summary: summarizeReviews(reviews) };
}

export async function getProductReviewSummaries(
  productIds: string[]
): Promise<Record<string, ReviewSummary>> {
  const uniqueIds = Array.from(new Set(productIds.filter(Boolean)));
  const result: Record<string, ReviewSummary> = {};
  uniqueIds.forEach((id) => {
    result[id] = summarizeReviews([]);
  });
  if (uniqueIds.length === 0) return result;

  const client = getSupabaseServer();
  const { data, error } = await client
    .from('product_reviews')
    .select('product_id, rating')
    .in('product_id', uniqueIds)
    .eq('is_published', true);

  if (error || !data) {
    return result;
  }

  const grouped: Record<string, ProductReview[]> = {};
  data.forEach((row) => {
    const productId = String(row.product_id);
    if (!grouped[productId]) grouped[productId] = [];
    grouped[productId].push({
      id: '',
      productId,
      authorName: '',
      rating: Number(row.rating),
      title: null,
      body: '',
      isVerified: false,
      createdAt: '',
    });
  });

  Object.keys(grouped).forEach((productId) => {
    result[productId] = summarizeReviews(grouped[productId]);
  });

  return result;
}

export async function createProductReview(input: {
  productId: string;
  authorName: string;
  authorEmail?: string;
  rating: number;
  title?: string;
  body: string;
}): Promise<ProductReview> {
  const client = getSupabaseServer();
  const rating = Math.min(5, Math.max(1, Math.round(input.rating)));

  let isVerified = false;
  if (input.authorEmail) {
    const { data: orders } = await client
      .from('orders')
      .select('id')
      .eq('email', input.authorEmail.toLowerCase())
      .limit(20);

    if (orders && orders.length > 0) {
      const orderIds = orders.map((order) => order.id);
      const { data: items } = await client
        .from('order_items')
        .select('id')
        .eq('product_id', input.productId)
        .in('order_id', orderIds)
        .limit(1);
      isVerified = Boolean(items && items.length > 0);
    }
  }

  const { data, error } = await client
    .from('product_reviews')
    .insert({
      product_id: input.productId,
      author_name: input.authorName.trim(),
      author_email: input.authorEmail?.trim().toLowerCase() || null,
      rating,
      title: input.title?.trim() || null,
      body: input.body.trim(),
      is_verified: isVerified,
      is_published: true,
    })
    .select('*')
    .single();

  if (error || !data) {
    throw error || new Error('Failed to create review');
  }

  return mapReview(data as Record<string, unknown>);
}
