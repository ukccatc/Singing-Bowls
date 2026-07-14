import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { galleryAlbumSeeds } from '@/lib/data/gallery-albums';

export interface AlbumSyncResult {
  ok: number;
  failed: number;
  details: string[];
}

export async function syncGalleryAlbumSeeds(
  supabase: SupabaseClient
): Promise<AlbumSyncResult> {
  const details: string[] = [];
  let ok = 0;
  let failed = 0;

  const { data: galleryRows, error: galleryError } = await supabase
    .from('gallery')
    .select('id, display_order, image_url')
    .order('display_order', { ascending: true });

  if (galleryError) {
    throw new Error(galleryError.message);
  }

  const galleryByOrder = new Map(
    (galleryRows ?? []).map((row) => [row.display_order, row] as const)
  );

  for (const [index, seed] of galleryAlbumSeeds.entries()) {
    const coverOrder = seed.coverImageDisplayOrder ?? seed.imageDisplayOrders[0];
    const coverRow = coverOrder ? galleryByOrder.get(coverOrder) : undefined;

    const { data: existing, error: existingError } = await supabase
      .from('gallery_albums')
      .select('id')
      .eq('slug', seed.slug)
      .maybeSingle();

    if (existingError) {
      throw new Error(existingError.message);
    }

    const albumPayload = {
      slug: seed.slug,
      title: seed.title,
      description: seed.description,
      event_date: seed.eventDate,
      category: seed.category,
      location: seed.location,
      cover_image_url: coverRow?.image_url ?? null,
      display_order: index + 1,
      is_active: true,
      updated_at: new Date().toISOString(),
    };

    let albumId = existing?.id;

    if (albumId) {
      const { error: updateError } = await supabase
        .from('gallery_albums')
        .update(albumPayload)
        .eq('id', albumId);

      if (updateError) {
        details.push(`${seed.slug}: update failed — ${updateError.message}`);
        failed += 1;
        continue;
      }
    } else {
      const { data: inserted, error: insertError } = await supabase
        .from('gallery_albums')
        .insert(albumPayload)
        .select('id')
        .single();

      if (insertError || !inserted) {
        details.push(`${seed.slug}: insert failed — ${insertError?.message}`);
        failed += 1;
        continue;
      }

      albumId = inserted.id;
    }

    await supabase.from('gallery_album_images').delete().eq('album_id', albumId);

    const links = seed.imageDisplayOrders
      .map((displayOrder, linkIndex) => {
        const galleryRow = galleryByOrder.get(displayOrder);
        if (!galleryRow) return null;
        return {
          album_id: albumId,
          gallery_id: galleryRow.id,
          display_order: linkIndex + 1,
        };
      })
      .filter((link): link is NonNullable<typeof link> => link !== null);

    if (links.length > 0) {
      const { error: linkError } = await supabase.from('gallery_album_images').insert(links);

      if (linkError) {
        details.push(`${seed.slug}: link failed — ${linkError.message}`);
        failed += 1;
        continue;
      }
    }

    details.push(`${seed.slug}: synced (${links.length} images)`);
    ok += 1;
  }

  return { ok, failed, details };
}

export function isMissingAlbumsTable(message: string): boolean {
  return message.includes('gallery_albums') || message.includes('schema cache');
}
