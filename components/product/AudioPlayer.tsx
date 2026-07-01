'use client';

import { Button } from '@/components/ui/button';
import { isNativeApp } from '@/lib/native';
import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  audioUrl: string;
  title?: string;
  compact?: boolean;
}

export default function AudioPlayer({ audioUrl, title, compact = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isNativeApp()) return;

    let removeListener: (() => void) | undefined;

    import('@capacitor/app').then(async ({ App }) => {
      const listener = await App.addListener('appStateChange', ({ isActive }) => {
        if (isActive && audioRef.current && isPlaying) {
          void audioRef.current.play().catch(() => undefined);
        }
      });
      removeListener = () => listener.remove();
    });

    return () => removeListener?.();
  }, [isPlaying]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div className={compact ? 'flex items-center gap-2' : 'rounded-lg border border-cream-200 bg-white p-4'}>
      {!compact && title && <p className="mb-3 text-sm font-medium text-charcoal-800">{title}</p>}
      <div className="flex items-center gap-3">
        <Button type="button" variant="outline" size="sm" onClick={togglePlayback} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          playsInline
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
        />
        {compact && title && <span className="text-sm text-charcoal-700">{title}</span>}
      </div>
    </div>
  );
}
