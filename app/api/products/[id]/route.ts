import { supabaseServer } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { id } = params;

    // Validate required fields
    if (!body.name?.en || !body.slug || body.price === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: name (en), slug, price' },
        { status: 400 }
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
      category: body.category,
      specifications: body.specifications || [],
      inventory: parseInt(body.inventory) || 0,
      sku: body.sku,
      weight: body.weight || 0,
      dimensions: body.dimensions || { unit: 'cm' },
      materials: body.materials || [],
      origin: body.origin || '',
      craftsman: body.craftsman || null,
      is_handmade: body.isHandmade || false,
      is_featured: body.isFeatured || false,
      is_available: body.isAvailable !== false,
      tags: body.tags || [],
      seo: body.seo || {},
    };

    // Update product in Supabase
    const { data: updatedProduct, error } = await supabaseServer
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update product in database' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Delete product from Supabase
    const { error } = await supabaseServer
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to delete product from database' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
