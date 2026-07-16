import { requireAdminSession } from '@/lib/auth/require-admin-session';
import {
  getChannelOverview,
  getConfiguredYoutubeChannelHint,
  isYouTubeConfigured,
} from '@/lib/youtube/channel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  if (!isYouTubeConfigured()) {
    return NextResponse.json(
      {
        error:
          'YouTube API is not configured. Set YOUTUBE_API_KEY and optionally YOUTUBE_CHANNEL_ID.',
        configured: false,
        hint: getConfiguredYoutubeChannelHint(),
      },
      { status: 503 }
    );
  }

  try {
    const data = await getChannelOverview();
    return NextResponse.json({ configured: true, data });
  } catch (error) {
    console.error('YouTube channel overview error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to load channel',
        configured: true,
      },
      { status: 500 }
    );
  }
}
