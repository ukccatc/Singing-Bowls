import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { getSupabaseServer } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const albumSelect = `
  *,
  gallery_album_images (
    display_order,
    gallery:gallery_id (*)
  )
`;

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { id } = await params;
    const supabase = getSupabaseServer();

    const update: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (body.slug !== undefined) update.slug = body.slug;
    if (body.title !== undefined) update.title = body.title;
    if (body.description !== undefined) update.description = body.description;
    if (body.event_date !== undefined) update.event_date = body.event_date;
    if (body.category !== undefined) update.category = body.category;
    if (body.location !== undefined) update.location = body.location;
    if (body.cover_image_url !== undefined) update.cover_image_url = body.cover_image_url;
    if (body.display_order !== undefined) update.display_order = body.display_order;
    if (body.is_active !== undefined) update.is_active = body.is_active;

    const { error } = await supabase.from('gallery_albums').update(update).eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (Array.isArray(body.gallery_ids)) {
      await supabase.from('gallery_album_images').delete().eq('album_id', id);

      if (body.gallery_ids.length > 0) {
        const links = body.gallery_ids.map((galleryId: string, index: number) => ({
          album_id: id,
          gallery_id: galleryId,
          display_order: index + 1,
        }));

        const { error: linkError } = await supabase.from('gallery_album_images').insert(links);

        if (linkError) {
          return NextResponse.json({ error: linkError.message }, { status: 400 });
        }
      }
    }

    const { data, error: fetchError } = await supabase
      .from('gallery_albums')
      .select(albumSelect)
      .eq('id', id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to update album' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    const { error } = await getSupabaseServer().from('gallery_albums').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Album deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to delete album' }, { status: 500 });
  }
}
