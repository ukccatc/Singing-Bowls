'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import {
  Check,
  Copy,
  ExternalLink,
  Eye,
  Link2,
  Loader2,
  Package,
  RefreshCw,
  Search,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface ChannelVideo {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  url: string;
  channelTitle: string;
}

interface ChannelOverview {
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
}

interface ProductUsage {
  productId: string;
  slug: string;
  name: string;
  videoId: string;
}

function formatCount(value?: number): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(value);
}

function formatDate(value: string): string {
  if (!value) return '';
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return value;
  }
}

export function YouTubeManager() {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configured, setConfigured] = useState(true);
  const [channel, setChannel] = useState<ChannelOverview | null>(null);
  const [videos, setVideos] = useState<ChannelVideo[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [usageByVideo, setUsageByVideo] = useState<Record<string, ProductUsage[]>>(
    {}
  );
  const [totalLinked, setTotalLinked] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [filterLinked, setFilterLinked] = useState<'all' | 'linked' | 'unlinked'>(
    'all'
  );

  const loadUsage = useCallback(async () => {
    const response = await fetch('/api/youtube/usage');
    if (!response.ok) return;
    const json = await response.json();
    setUsageByVideo(json.data?.byVideoId || {});
    setTotalLinked(json.data?.totalLinked || 0);
  }, []);

  const loadChannel = useCallback(async () => {
    const response = await fetch('/api/youtube/channel');
    const json = await response.json();
    if (response.status === 503) {
      setConfigured(false);
      setError(json.error || 'YouTube API is not configured');
      setChannel(null);
      return false;
    }
    if (!response.ok) {
      throw new Error(json.error || 'Failed to load channel');
    }
    setConfigured(true);
    setChannel(json.data);
    return true;
  }, []);

  const loadVideos = useCallback(async (pageToken?: string, append = false) => {
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
      throw new Error(json.error || 'Failed to load videos');
    }

    setConfigured(true);
    setVideos((prev) =>
      append ? [...prev, ...(json.data?.videos || [])] : json.data?.videos || []
    );
    setNextPageToken(json.data?.nextPageToken);
    if (!append && json.data?.videos?.[0]?.videoId) {
      setSelectedId((current) => current || json.data.videos[0].videoId);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const ok = await loadChannel();
      if (ok) {
        await Promise.all([loadVideos(), loadUsage()]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load YouTube data');
    } finally {
      setLoading(false);
    }
  }, [loadChannel, loadVideos, loadUsage]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const selected = useMemo(
    () => videos.find((video) => video.videoId === selectedId) || null,
    [videos, selectedId]
  );

  const filteredVideos = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videos.filter((video) => {
      const linked = (usageByVideo[video.videoId] || []).length > 0;
      if (filterLinked === 'linked' && !linked) return false;
      if (filterLinked === 'unlinked' && linked) return false;
      if (!q) return true;
      return (
        video.title.toLowerCase().includes(q) ||
        video.description.toLowerCase().includes(q)
      );
    });
  }, [videos, query, filterLinked, usageByVideo]);

  const copyText = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setError('Could not copy to clipboard');
    }
  };

  const handleLoadMore = async () => {
    if (!nextPageToken) return;
    setLoadingMore(true);
    setError(null);
    try {
      await loadVideos(nextPageToken, true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more videos');
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className={ui.page.title}>YouTube</h1>
          <p className={cn('mt-1', ui.page.subtitle)}>
            Browse channel videos, preview them, copy links, and see which products use them.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => void refreshAll()}
            disabled={loading}
          >
            <RefreshCw className={cn('mr-2 h-4 w-4', loading && 'animate-spin')} />
            Refresh
          </Button>
          {channel ? (
            <>
              <Button type="button" variant="outline" asChild>
                <a href={channel.channelUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open channel
                </a>
              </Button>
              <Button type="button" className={ui.button.primary} asChild>
                <a href={channel.studioUrl} target="_blank" rel="noreferrer">
                  <Youtube className="mr-2 h-4 w-4" />
                  YouTube Studio
                </a>
              </Button>
            </>
          ) : null}
        </div>
      </div>

      {error ? (
        <div className={ui.banner.warning}>
          <p>{error}</p>
          {!configured ? (
            <p className="mt-2 text-xs">
              Set <code className="rounded bg-white/70 px-1">YOUTUBE_API_KEY</code> and{' '}
              <code className="rounded bg-white/70 px-1">YOUTUBE_CHANNEL_ID</code> (or{' '}
              <code className="rounded bg-white/70 px-1">NEXT_PUBLIC_YOUTUBE_URL</code>) in{' '}
              <code className="rounded bg-white/70 px-1">.env.local</code>, then restart the
              server.
            </p>
          ) : null}
        </div>
      ) : null}

      {loading && !channel ? (
        <div className="flex items-center gap-2 py-16 text-charcoal-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading channel…
        </div>
      ) : null}

      {channel ? (
        <div className={cn(ui.card, 'flex flex-wrap items-center gap-5')}>
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-cream-100">
            {channel.thumbnailUrl ? (
              <Image
                src={channel.thumbnailUrl}
                alt={channel.channelTitle}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized
              />
            ) : (
              <div className="flex h-full items-center justify-center text-copper-700">
                <Youtube className="h-7 w-7" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold text-charcoal-900">
              {channel.channelTitle}
            </p>
            <p className="text-sm text-charcoal-600">
              {channel.customUrl ? `@${channel.customUrl}` : channel.channelId}
            </p>
            {channel.description ? (
              <p className="mt-1 line-clamp-2 text-sm text-charcoal-500">
                {channel.description}
              </p>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Videos" value={formatCount(channel.videoCount)} />
            <Stat label="Subscribers" value={formatCount(channel.subscriberCount)} />
            <Stat label="Views" value={formatCount(channel.viewCount)} />
            <Stat label="Linked in shop" value={String(totalLinked)} />
          </div>
        </div>
      ) : null}

      {configured && channel ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <div className={cn(ui.card, 'space-y-3')}>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[220px] flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search loaded videos…"
                    className="pl-9"
                  />
                </div>
                <div className="flex flex-wrap gap-1 rounded-lg border border-cream-200 bg-cream-50 p-1">
                  {(
                    [
                      ['all', 'All'],
                      ['linked', 'Linked'],
                      ['unlinked', 'Not linked'],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFilterLinked(value)}
                      className={cn(
                        'rounded-md px-3 py-1.5 text-xs font-medium transition',
                        filterLinked === value ? ui.tab.active : ui.tab.inactive
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-charcoal-500">
                Showing {filteredVideos.length} of {videos.length} loaded videos.
                Upload or edit videos in YouTube Studio; this page manages linking and preview.
              </p>
            </div>

            {filteredVideos.length === 0 && !loading ? (
              <div className={cn(ui.card, 'py-12 text-center text-charcoal-600')}>
                No videos match this filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredVideos.map((video) => {
                  const linked = usageByVideo[video.videoId] || [];
                  const active = selectedId === video.videoId;
                  return (
                    <button
                      key={video.videoId}
                      type="button"
                      onClick={() => setSelectedId(video.videoId)}
                      className={cn(
                        'overflow-hidden rounded-xl border-2 bg-white text-left shadow-sm transition',
                        active ? ui.selection.selected : ui.selection.idle
                      )}
                    >
                      <div className="relative aspect-video bg-cream-100">
                        <Image
                          src={video.thumbnailUrl}
                          alt={video.title}
                          fill
                          className="object-cover"
                          sizes="280px"
                          unoptimized
                        />
                        {linked.length > 0 ? (
                          <span
                            className={cn(
                              'absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold',
                              ui.badge.primary
                            )}
                          >
                            {linked.length} product{linked.length === 1 ? '' : 's'}
                          </span>
                        ) : null}
                      </div>
                      <div className="space-y-1 p-3">
                        <p className="line-clamp-2 text-sm font-semibold text-charcoal-900">
                          {video.title}
                        </p>
                        <p className="text-xs text-charcoal-500">
                          {formatDate(video.publishedAt)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {nextPageToken ? (
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  disabled={loadingMore}
                  onClick={() => void handleLoadMore()}
                >
                  {loadingMore ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Load more videos
                </Button>
              </div>
            ) : null}
          </div>

          <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
            {selected ? (
              <div className={cn(ui.card, 'space-y-4')}>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-charcoal-500">
                    Preview
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-charcoal-900">
                    {selected.title}
                  </h2>
                  <p className="mt-1 text-xs text-charcoal-500">
                    {formatDate(selected.publishedAt)}
                  </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-cream-200 bg-black">
                  <iframe
                    key={selected.videoId}
                    src={`https://www.youtube-nocookie.com/embed/${selected.videoId}`}
                    title={selected.title}
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {selected.description ? (
                  <p className="line-clamp-4 text-sm text-charcoal-600">
                    {selected.description}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void copyText('url', selected.url)}
                  >
                    {copied === 'url' ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    Copy link
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      void copyText(
                        'embed',
                        `https://www.youtube.com/embed/${selected.videoId}`
                      )
                    }
                  >
                    {copied === 'embed' ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Link2 className="mr-2 h-4 w-4" />
                    )}
                    Copy embed
                  </Button>
                  <Button type="button" variant="outline" size="sm" asChild>
                    <a href={selected.url} target="_blank" rel="noreferrer">
                      <Eye className="mr-2 h-4 w-4" />
                      Watch
                    </a>
                  </Button>
                  <Button type="button" variant="outline" size="sm" asChild>
                    <a
                      href={`https://studio.youtube.com/video/${selected.videoId}/edit`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Edit in Studio
                    </a>
                  </Button>
                </div>

                <div className="rounded-lg border border-cream-200 bg-cream-50/70 p-3">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-charcoal-800">
                    <Package className="h-4 w-4 text-gold-700" />
                    Used on products
                  </div>
                  {(usageByVideo[selected.videoId] || []).length === 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm text-charcoal-600">
                        Not linked to any product yet.
                      </p>
                      <Button type="button" size="sm" className={ui.button.primary} asChild>
                        <Link href="/admin/products">
                          Assign from Products → Sound & Video
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {(usageByVideo[selected.videoId] || []).map((product) => (
                        <li key={product.productId}>
                          <Link
                            href={`/admin/products/edit/${product.productId}`}
                            className={cn(ui.link, 'text-sm font-medium')}
                          >
                            {product.name}
                          </Link>
                          {product.slug ? (
                            <p className="text-xs text-charcoal-500">/{product.slug}</p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className={cn(ui.card, 'py-10 text-center text-sm text-charcoal-600')}>
                Select a video to preview and manage links.
              </div>
            )}

            <div className={cn(ui.banner.info)}>
              <p className="font-medium">Tip</p>
              <p className="mt-1">
                To attach a video to a bowl, open a product and use{' '}
                <strong>Sound & Video → Browse channel videos</strong>, or paste the copied
                link.
              </p>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-cream-200 bg-cream-50 px-3 py-2 text-center">
      <p className="text-lg font-semibold text-charcoal-900">{value}</p>
      <p className="text-[11px] uppercase tracking-wide text-charcoal-500">{label}</p>
    </div>
  );
}
