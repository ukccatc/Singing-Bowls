import { createProductReview, getProductReviews } from '@/lib/reviews';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await getProductReviews(id);
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('Reviews GET error:', error);
    return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const authorName = String(body.authorName || '').trim();
    const reviewBody = String(body.body || '').trim();
    const rating = Number(body.rating);

    if (!authorName || authorName.length < 2) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!reviewBody || reviewBody.length < 10) {
      return NextResponse.json(
        { error: 'Review must be at least 10 characters' },
        { status: 400 }
      );
    }
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be 1–5' }, { status: 400 });
    }

    const review = await createProductReview({
      productId: id,
      authorName,
      authorEmail: body.authorEmail ? String(body.authorEmail) : undefined,
      rating,
      title: body.title ? String(body.title) : undefined,
      body: reviewBody,
    });

    return NextResponse.json({ data: review }, { status: 201 });
  } catch (error) {
    console.error('Reviews POST error:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
