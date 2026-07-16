import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { extractYouTubeVideoId } from '@/lib/youtube/channel';
import { getSupabaseServer } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export interface YouTubeProductUsage {
  productId: string;
  slug: string;
  name: string;
  videoId: string;
  videoUrl: string;
}

function productName(row: Record<string, unknown>): string {
  const name = row.name;
  if (name && typeof name === 'object') {
    const localized = name as Record<string, unknown>;
    return String(localized.en || localized.ru || localized.uk || 'Untitled');
  }
  return String(name || 'Untitled');
}

export async function GET(request: NextRequest) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    const client = getSupabaseServer();
    const { data, error } = await client
      .from('products')
      .select('id, slug, name, youtube_video')
      .not('youtube_video', 'is', null);

    if (error) {
      throw new Error(error.message);
    }

    const usage: YouTubeProductUsage[] = [];
    for (const row of data || []) {
      const yt = row.youtube_video as Record<string, unknown> | null;
      if (!yt) continue;

      const raw =
        String(yt.videoId || yt.id || yt.url || yt.embedUrl || '').trim();
      const videoId = extractYouTubeVideoId(raw) || (raw.match(/^[\w-]{11}$/) ? raw : null);
      if (!videoId) continue;

      usage.push({
        productId: String(row.id),
        slug: String(row.slug || ''),
        name: productName(row as Record<string, unknown>),
        videoId,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }

    const byVideoId: Record<string, YouTubeProductUsage[]> = {};
    for (const item of usage) {
      if (!byVideoId[item.videoId]) byVideoId[item.videoId] = [];
      byVideoId[item.videoId].push(item);
    }

    return NextResponse.json({
      success: true,
      data: {
        items: usage,
        byVideoId,
        totalLinked: usage.length,
      },
    });
  } catch (error) {
    console.error('YouTube usage error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to load usage',
      },
      { status: 500 }
    );
  }
}
