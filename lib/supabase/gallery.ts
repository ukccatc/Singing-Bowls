import { supabaseServerClient } from '@/lib/supabase/server';

export type GalleryCategory = 'meditation' | 'workshop' | 'retreat' | 'ceremony';

export interface GalleryItem {
  id: string;
  image_url: string;
  title: { en: string; ru: string; uk?: string };
  description: { en: string; ru: string; uk?: string };
  display_order: number;
  is_active: boolean;
  category?: GalleryCategory | null;
  created_at?: string;
  updated_at?: string;
}

export async function getGalleryImages(activeOnly = true): Promise<GalleryItem[]> {
  try {
    let query = supabaseServerClient
      .from('gallery')
      .select('*')
      .order('display_order', { ascending: true });

    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error || !data?.length) {
      return [];
    }

    return data as GalleryItem[];
  } catch (error) {
    console.error('Error fetching gallery from Supabase:', error);
    return [];
  }
}
