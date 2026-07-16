import { requireAdminSession } from '@/lib/auth/require-admin-session';
import {
  getConfiguredYoutubeChannelHint,
  isYouTubeConfigured,
  listChannelVideos,
} from '@/lib/youtube/channel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  if (!isYouTubeConfigured()) {
    return NextResponse.json(
      {
        error:
          'YouTube API is not configured. Set YOUTUBE_API_KEY and optionally YOUTUBE_CHANNEL_ID (or use NEXT_PUBLIC_YOUTUBE_URL @handle).',
        configured: false,
        hint: getConfiguredYoutubeChannelHint(),
      },
      { status: 503 }
    );
  }

  try {
    const pageToken = request.nextUrl.searchParams.get('pageToken') || undefined;
    const maxResults = Number(request.nextUrl.searchParams.get('maxResults') || 24);

    const data = await listChannelVideos({ pageToken, maxResults });
    return NextResponse.json({
      configured: true,
      data,
    });
  } catch (error) {
    console.error('YouTube channel videos error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch channel videos',
        configured: true,
      },
      { status: 500 }
    );
  }
}
