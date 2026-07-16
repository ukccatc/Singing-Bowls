'use client';

import { Button } from '@/components/ui/button';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { Check, Loader2, RefreshCw, Youtube } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';

interface ChannelVideo {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  url: string;
  channelTitle: string;
}

interface YouTubeChannelPickerProps {
  selectedUrl: string;
  onSelect: (url: string) => void;
}

export function YouTubeChannelPicker({
  selectedUrl,
  onSelect,
}: YouTubeChannelPickerProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [channelTitle, setChannelTitle] = useState<string | null>(null);
  const [videos, setVideos] = useState<ChannelVideo[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [configured, setConfigured] = useState(true);

  const selectedId = (() => {
    const match = selectedUrl.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    );
    return match?.[1] || '';
  })();

  const loadVideos = useCallback(async (pageToken?: string, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ maxResults: '24' });
      if (pageToken) params.set('pageToken', pageToken);

      const response = await fetch(`/api/youtube/channel-videos?${params}`);
      const json = await response.json();

      if (response.status === 503) {
        setConfigured(false);
        setError(json.error || 'YouTube API is not configured');
        return;
      }

      if (!response.ok) {
        throw new Error(json.error || 'Failed to load channel videos');
      }

      setConfigured(true);
      setChannelTitle(json.data?.channelTitle || null);
      setVideos((prev) =>
        append ? [...prev, ...(json.data?.videos || [])] : json.data?.videos || []
      );
      setNextPageToken(json.data?.nextPageToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load videos');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleOpen = async () => {
    const next = !open;
    setOpen(next);
    if (next && videos.length === 0) {
      await loadVideos();
    }
  };

  return (
    <div className="space-y-3 rounded-xl border border-cream-200 bg-cream-50/50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-semibold text-charcoal-900">YouTube channel</p>
          <p className="text-xs text-charcoal-600">
            Pick a video from your channel, or paste a link below as an alternative.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => void handleOpen()}>
          <Youtube className="mr-2 h-4 w-4 text-copper-700" />
          {open ? 'Hide channel videos' : 'Browse channel videos'}
        </Button>
      </div>

      {open ? (
        <div className="space-y-3">
          {channelTitle ? (
            <p className="text-sm text-charcoal-700">
              Channel: <span className="font-medium">{channelTitle}</span>
            </p>
          ) : null}

          {error ? (
            <div className={ui.banner.warning}>
              <p>{error}</p>
              {!configured ? (
                <p className="mt-2 text-xs">
                  Set <code className="rounded bg-white/70 px-1">YOUTUBE_API_KEY</code> and
                  optionally <code className="rounded bg-white/70 px-1">YOUTUBE_CHANNEL_ID</code>{' '}
                  (or keep <code className="rounded bg-white/70 px-1">NEXT_PUBLIC_YOUTUBE_URL</code>{' '}
                  as <code className="rounded bg-white/70 px-1">@handle</code>).
                </p>
              ) : null}
            </div>
          ) : null}

          {loading && videos.length === 0 ? (
            <div className="flex items-center gap-2 py-6 text-sm text-charcoal-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading channel videos…
            </div>
          ) : null}

          {videos.length > 0 ? (
            <div className="grid max-h-80 grid-cols-2 gap-3 overflow-y-auto md:grid-cols-3">
              {videos.map((video) => {
                const selected = selectedId === video.videoId;
                return (
                  <button
                    key={video.videoId}
                    type="button"
                    onClick={() => onSelect(video.url)}
                    className={cn(
                      'overflow-hidden rounded-lg border-2 bg-white text-left transition',
                      selected ? ui.selection.selected : ui.selection.idle
                    )}
                  >
                    <div className="relative aspect-video bg-cream-100">
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover"
                        sizes="200px"
                        unoptimized
                      />
                      {selected ? (
                        <span className="absolute right-1 top-1 rounded-full bg-gold-600 p-1 text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      ) : null}
                    </div>
                    <div className="p-2">
                      <p className="line-clamp-2 text-xs font-medium text-charcoal-900">
                        {video.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={loading}
              onClick={() => void loadVideos(undefined, false)}
            >
              <RefreshCw className={cn('mr-2 h-4 w-4', loading && 'animate-spin')} />
              Refresh
            </Button>
            {nextPageToken ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={loading}
                onClick={() => void loadVideos(nextPageToken, true)}
              >
                Load more
              </Button>
            ) : null}
            {selectedUrl ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onSelect('')}
              >
                Clear selection
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
