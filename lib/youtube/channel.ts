export interface YouTubeChannelVideo {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  url: string;
  channelTitle: string;
}

export interface YouTubeChannelVideosPage {
  channelId: string;
  channelTitle: string;
  videos: YouTubeChannelVideo[];
  nextPageToken?: string;
}

function getApiKey(): string | undefined {
  return process.env.YOUTUBE_API_KEY || undefined;
}

/** Extract @handle or channel id hint from public YouTube URL. */
export function parseYoutubeChannelHint(raw?: string): {
  handle?: string;
  channelId?: string;
} {
  const value = (raw || '').trim();
  if (!value) return {};

  if (/^UC[\w-]{20,}$/.test(value)) {
    return { channelId: value };
  }

  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    const path = url.pathname.replace(/\/+$/, '');

    const channelMatch = path.match(/\/channel\/(UC[\w-]{20,})/);
    if (channelMatch) return { channelId: channelMatch[1] };

    const handleMatch = path.match(/\/@([\w.-]+)/);
    if (handleMatch) return { handle: handleMatch[1] };

    const userMatch = path.match(/\/(?:c|user)\/([\w.-]+)/);
    if (userMatch) return { handle: userMatch[1] };
  } catch {
    if (value.startsWith('@')) return { handle: value.slice(1) };
  }

  if (value.startsWith('@')) return { handle: value.slice(1) };
  return { handle: value.replace(/^@/, '') };
}

export function getConfiguredYoutubeChannelHint(): {
  handle?: string;
  channelId?: string;
} {
  if (process.env.YOUTUBE_CHANNEL_ID) {
    return { channelId: process.env.YOUTUBE_CHANNEL_ID };
  }
  if (process.env.YOUTUBE_CHANNEL_HANDLE) {
    return { handle: process.env.YOUTUBE_CHANNEL_HANDLE.replace(/^@/, '') };
  }
  return parseYoutubeChannelHint(
    process.env.NEXT_PUBLIC_YOUTUBE_URL ||
      'https://www.youtube.com/@SingingBowlsNepal'
  );
}

async function youtubeGet<T>(
  path: string,
  params: Record<string, string>
): Promise<T> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('YOUTUBE_API_KEY is not configured');
  }

  const url = new URL(`https://www.googleapis.com/youtube/v3/${path}`);
  Object.entries({ ...params, key: apiKey }).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), { next: { revalidate: 300 } });
  const json = await response.json();

  if (!response.ok) {
    const message =
      json?.error?.message || `YouTube API error (${response.status})`;
    throw new Error(message);
  }

  return json as T;
}

interface ChannelsResponse {
  items?: Array<{
    id: string;
    snippet?: { title?: string };
    contentDetails?: {
      relatedPlaylists?: { uploads?: string };
    };
  }>;
}

interface PlaylistItemsResponse {
  nextPageToken?: string;
  items?: Array<{
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      channelTitle?: string;
      thumbnails?: {
        medium?: { url?: string };
        high?: { url?: string };
        default?: { url?: string };
      };
      resourceId?: { videoId?: string };
    };
    contentDetails?: { videoId?: string };
  }>;
}

async function resolveChannel(hint: {
  handle?: string;
  channelId?: string;
}): Promise<{ channelId: string; channelTitle: string; uploadsPlaylistId: string }> {
  let data: ChannelsResponse;

  if (hint.channelId) {
    data = await youtubeGet<ChannelsResponse>('channels', {
      part: 'snippet,contentDetails',
      id: hint.channelId,
    });
  } else if (hint.handle) {
    data = await youtubeGet<ChannelsResponse>('channels', {
      part: 'snippet,contentDetails',
      forHandle: hint.handle,
    });

    // Fallback for older API behavior / custom URLs
    if (!data.items?.length) {
      const search = await youtubeGet<{
        items?: Array<{ id?: { channelId?: string } }>;
      }>('search', {
        part: 'snippet',
        type: 'channel',
        q: hint.handle,
        maxResults: '1',
      });
      const foundId = search.items?.[0]?.id?.channelId;
      if (!foundId) {
        throw new Error(`YouTube channel not found for @${hint.handle}`);
      }
      data = await youtubeGet<ChannelsResponse>('channels', {
        part: 'snippet,contentDetails',
        id: foundId,
      });
    }
  } else {
    throw new Error('Configure YOUTUBE_CHANNEL_ID or NEXT_PUBLIC_YOUTUBE_URL');
  }

  const channel = data.items?.[0];
  const uploadsPlaylistId = channel?.contentDetails?.relatedPlaylists?.uploads;
  if (!channel?.id || !uploadsPlaylistId) {
    throw new Error('Could not resolve YouTube channel uploads playlist');
  }

  return {
    channelId: channel.id,
    channelTitle: channel.snippet?.title || 'YouTube channel',
    uploadsPlaylistId,
  };
}

export async function listChannelVideos(options?: {
  pageToken?: string;
  maxResults?: number;
}): Promise<YouTubeChannelVideosPage> {
  const hint = getConfiguredYoutubeChannelHint();
  const channel = await resolveChannel(hint);
  const maxResults = String(
    Math.min(50, Math.max(1, options?.maxResults ?? 24))
  );

  const params: Record<string, string> = {
    part: 'snippet,contentDetails',
    playlistId: channel.uploadsPlaylistId,
    maxResults,
  };
  if (options?.pageToken) {
    params.pageToken = options.pageToken;
  }

  const playlist = await youtubeGet<PlaylistItemsResponse>('playlistItems', params);

  const videos: YouTubeChannelVideo[] = (playlist.items || [])
    .map((item) => {
      const videoId =
        item.contentDetails?.videoId || item.snippet?.resourceId?.videoId || '';
      if (!videoId) return null;
      const thumb =
        item.snippet?.thumbnails?.medium?.url ||
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.default?.url ||
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      return {
        videoId,
        title: item.snippet?.title || 'Untitled',
        description: item.snippet?.description || '',
        publishedAt: item.snippet?.publishedAt || '',
        thumbnailUrl: thumb,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        channelTitle: item.snippet?.channelTitle || channel.channelTitle,
      } satisfies YouTubeChannelVideo;
    })
    .filter((video): video is YouTubeChannelVideo => Boolean(video));

  return {
    channelId: channel.channelId,
    channelTitle: channel.channelTitle,
    videos,
    nextPageToken: playlist.nextPageToken,
  };
}

export interface YouTubeChannelOverview {
  channelId: string;
  channelTitle: string;
  customUrl?: string;
  description: string;
  thumbnailUrl: string;
  channelUrl: string;
  studioUrl: string;
  subscriberCount?: number;
  videoCount?: number;
  viewCount?: number;
  uploadsPlaylistId: string;
}

export async function getChannelOverview(): Promise<YouTubeChannelOverview> {
  const hint = getConfiguredYoutubeChannelHint();
  const channel = await resolveChannel(hint);

  const data = await youtubeGet<{
    items?: Array<{
      id: string;
      snippet?: {
        title?: string;
        description?: string;
        customUrl?: string;
        thumbnails?: {
          medium?: { url?: string };
          high?: { url?: string };
          default?: { url?: string };
        };
      };
      statistics?: {
        subscriberCount?: string;
        videoCount?: string;
        viewCount?: string;
      };
    }>;
  }>('channels', {
    part: 'snippet,statistics',
    id: channel.channelId,
  });

  const item = data.items?.[0];
  const customUrl = item?.snippet?.customUrl?.replace(/^@/, '');
  const channelUrl = customUrl
    ? `https://www.youtube.com/@${customUrl}`
    : `https://www.youtube.com/channel/${channel.channelId}`;
  const thumb =
    item?.snippet?.thumbnails?.medium?.url ||
    item?.snippet?.thumbnails?.high?.url ||
    item?.snippet?.thumbnails?.default?.url ||
    '';

  return {
    channelId: channel.channelId,
    channelTitle: item?.snippet?.title || channel.channelTitle,
    customUrl: customUrl || undefined,
    description: item?.snippet?.description || '',
    thumbnailUrl: thumb,
    channelUrl,
    studioUrl: `https://studio.youtube.com/channel/${channel.channelId}/videos`,
    subscriberCount: item?.statistics?.subscriberCount
      ? Number(item.statistics.subscriberCount)
      : undefined,
    videoCount: item?.statistics?.videoCount
      ? Number(item.statistics.videoCount)
      : undefined,
    viewCount: item?.statistics?.viewCount
      ? Number(item.statistics.viewCount)
      : undefined,
    uploadsPlaylistId: channel.uploadsPlaylistId,
  };
}

export function extractYouTubeVideoId(urlOrId: string): string | null {
  const value = (urlOrId || '').trim();
  if (!value) return null;
  if (/^[\w-]{11}$/.test(value)) return value;

  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    }
    const v = url.searchParams.get('v');
    if (v && /^[\w-]{11}$/.test(v)) return v;
    const embed = url.pathname.match(/\/(?:embed|shorts)\/([\w-]{11})/);
    if (embed) return embed[1];
  } catch {
    return null;
  }
  return null;
}

export function isYouTubeConfigured(): boolean {
  return Boolean(getApiKey());
}
