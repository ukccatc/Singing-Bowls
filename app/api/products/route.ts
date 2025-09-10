import { supabaseServer } from '@/lib/supabase/server';
import { ProductCategory } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name?.en || !body.slug || !body.price) {
      return NextResponse.json(
        { error: 'Missing required fields: name (en), slug, price' },
        { status: 400 }
      );
    }

    // Check if product with same slug already exists
    const { data: existingProduct } = await supabaseServer
      .from('products')
      .select('id')
      .eq('slug', body.slug)
      .single();

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this slug already exists' },
        { status: 409 }
      );
    }

    // Prepare product data for Supabase
    const productData = {
      slug: body.slug,
      name: body.name,
      description: body.description || { en: '', ru: '', uk: '' },
      price: parseFloat(body.price),
      currency: body.currency || 'USD',
      images: body.images || [],
      audio_sample: body.audioSample || null,
      youtube_video: body.youtubeVideo || null,
      soundcloud_audio: body.soundcloudAudio || null,
      category: body.category || ProductCategory.SINGING_BOWLS,
      specifications: body.specifications || [],
      inventory: parseInt(body.stock) || parseInt(body.inventory) || 0,
      sku: body.sku || `SKU_${Date.now()}`,
      weight: body.weight || 0,
      dimensions: body.dimensions || { unit: 'cm' },
      materials: body.materials || [],
      origin: body.origin || '',
      craftsman: body.craftsman || null,
      is_handmade: body.isHandmade || false,
      is_featured: body.isFeatured || false,
      is_available: body.isAvailable !== false,
      tags: body.tags || [],
      seo: {
        title: body.name,
        description: body.description,
        keywords: body.tags || [],
      },
    };

    // Debug logging
    console.log('Product data being sent to Supabase:', JSON.stringify(productData, null, 2));

    // Insert product into Supabase
    const { data: newProduct, error } = await supabaseServer
      .from('products')
      .insert(productData)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create product in database' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    let query = supabaseServer
      .from('products')
      .select('*', { count: 'exact' })
      .eq('is_available', true)
      .order('created_at', { ascending: false });

    // Filter by category if provided
    if (category) {
      query = query.eq('category', category);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: products, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products from database' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: products || [],
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
