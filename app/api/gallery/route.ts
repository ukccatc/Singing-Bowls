import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { getSupabaseServer, supabaseServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const includeInactive = request.nextUrl.searchParams.get('all') === 'true';

    let query = supabaseServerClient
      .from('gallery')
      .select('*')
      .order('display_order', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'SUPABASE_SERVICE_ROLE_KEY is not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();

    const { data, error } = await getSupabaseServer()
      .from('gallery')
      .insert([
        {
          image_url: body.image_url,
          title: body.title,
          description: body.description,
          display_order: body.display_order,
          is_active: body.is_active,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, data: data[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery item' },
      { status: 500 }
    );
  }
}
