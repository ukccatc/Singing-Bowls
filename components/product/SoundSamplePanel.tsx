'use client';

import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { Headphones, Play, Volume2 } from 'lucide-react';
import { useRef, useState } from 'react';

interface SoundSamplePanelProps {
  product: Product;
  productName: string;
  className?: string;
  compact?: boolean;
}

export function SoundSamplePanel({
  product,
  productName,
  className,
  compact = false,
}: SoundSamplePanelProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const hasAudio = Boolean(product.audioSample);
  const hasVideo = Boolean(product.videoSample);
  const hasSoundcloud = Boolean(product.soundcloudAudio?.streamUrl);
  const hasYoutube = Boolean(product.youtubeVideo?.videoId);

  if (!hasAudio && !hasVideo && !hasSoundcloud && !hasYoutube) {
    return null;
  }

  const toggleAudio = async () => {
    if (!audioRef.current || !product.audioSample) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <div
      className={cn(
        'rounded-2xl border-2 border-gold-300 bg-gradient-to-br from-gold-50 via-cream-50 to-bronze-50 shadow-md',
        compact ? 'p-4' : 'p-6',
        className
      )}
    >
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-600 text-white shadow">
          <Headphones className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-bold text-charcoal-900">Hear this bowl</p>
          <p className="text-sm text-charcoal-600">
            Listen before you buy — the sound is the product.
          </p>
        </div>
      </div>

      {hasAudio ? (
        <div className="space-y-3">
          <Button
            type="button"
            onClick={toggleAudio}
            className={cn(ui.button.primary, 'w-full rounded-xl py-6 text-base')}
          >
            {playing ? (
              <>
                <Volume2 className="mr-2 h-5 w-5 animate-pulse" />
                Playing sample…
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" />
                Play sound sample
              </>
            )}
          </Button>
          <audio
            ref={audioRef}
            src={product.audioSample}
            preload="metadata"
            className="w-full"
            controls
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
        </div>
      ) : null}

      {hasVideo ? (
        <div className={cn(hasAudio ? 'mt-5' : '', 'space-y-2')}>
          <p className="text-sm font-medium text-charcoal-700">Product video</p>
          <video
            controls
            preload="metadata"
            playsInline
            className="aspect-video w-full rounded-lg bg-black"
            src={product.videoSample}
          />
        </div>
      ) : null}

      {hasSoundcloud ? (
        <div className={cn(hasAudio || hasVideo ? 'mt-5' : '', 'space-y-2')}>
          <p className="text-sm font-medium text-charcoal-700">SoundCloud</p>
          <iframe
            title={product.soundcloudAudio?.title || `${productName} sample`}
            width="100%"
            height={compact ? 120 : 166}
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
              product.soundcloudAudio!.streamUrl
            )}&color=%9a6f1e&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
            className="rounded-lg"
          />
        </div>
      ) : null}

      {hasYoutube ? (
        <div className={cn(hasAudio || hasVideo || hasSoundcloud ? 'mt-5' : '', 'space-y-2')}>
          <p className="text-sm font-medium text-charcoal-700">YouTube</p>
          <div className="aspect-video overflow-hidden rounded-lg bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${product.youtubeVideo!.videoId}`}
              title={product.youtubeVideo?.title || productName}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
