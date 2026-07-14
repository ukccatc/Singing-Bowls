import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { getSupabaseServer, supabaseServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const albumSelect = `
  *,
  gallery_album_images (
    display_order,
    gallery:gallery_id (*)
  )
`;

export async function GET(request: NextRequest) {
  try {
    const includeInactive = request.nextUrl.searchParams.get('all') === 'true';

    if (includeInactive) {
      const authError = requireAdminSession(request);
      if (authError) return authError;
    }

    let query = supabaseServerClient
      .from('gallery_albums')
      .select(albumSelect)
      .order('event_date', { ascending: false })
      .order('display_order', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch albums' }, { status: 500 });
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
    const supabase = getSupabaseServer();

    const { data: album, error } = await supabase
      .from('gallery_albums')
      .insert([
        {
          slug: body.slug,
          title: body.title,
          description: body.description || { en: '', ru: '', uk: '' },
          event_date: body.event_date || null,
          category: body.category || 'meditation',
          location: body.location || null,
          cover_image_url: body.cover_image_url || null,
          display_order: body.display_order ?? 0,
          is_active: body.is_active ?? true,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (Array.isArray(body.gallery_ids) && body.gallery_ids.length > 0) {
      const links = body.gallery_ids.map((galleryId: string, index: number) => ({
        album_id: album.id,
        gallery_id: galleryId,
        display_order: index + 1,
      }));

      const { error: linkError } = await supabase.from('gallery_album_images').insert(links);

      if (linkError) {
        return NextResponse.json({ error: linkError.message }, { status: 400 });
      }
    }

    const { data: fullAlbum, error: fetchError } = await supabase
      .from('gallery_albums')
      .select(albumSelect)
      .eq('id', album.id)
      .single();

    if (fetchError) {
      return NextResponse.json({ success: true, data: album }, { status: 201 });
    }

    return NextResponse.json({ success: true, data: fullAlbum }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to create album' }, { status: 500 });
  }
}
