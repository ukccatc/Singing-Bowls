'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { t, getLocaleFromPathname } from '@/lib/translations';
import { usePathname } from 'next/navigation';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  className?: string;
  compact?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  title,
  className,
  compact = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false));
    audio.addEventListener('loadstart', () => setIsLoading(true));
    audio.addEventListener('canplay', () => setIsLoading(false));

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
      audio.removeEventListener('loadstart', () => setIsLoading(true));
      audio.removeEventListener('canplay', () => setIsLoading(false));
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = value[0] / 100;
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (compact) {
    return (
      <div className={cn('flex items-center space-x-3', className)}>
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
        
        <Button
          variant="outline"
          size="sm"
          onClick={togglePlayPause}
          disabled={isLoading}
          className="flex items-center space-x-2 border-gold-500 text-gold-700 hover:bg-gold-500 hover:text-white"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          <span>{isPlaying ? t('product.pauseAudio', locale) : t('product.playAudio', locale)}</span>
        </Button>
        
        {duration > 0 && (
          <span className="text-sm text-charcoal-600">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      'bg-gradient-to-r from-cream-50 to-cream-100 rounded-lg p-6 space-y-4',
      'border border-cream-200 shadow-sm',
      className
    )}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-charcoal-900">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownload}
          className="text-charcoal-600 hover:text-gold-600"
          aria-label="Download audio"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={togglePlayPause}
          disabled={isLoading}
          className="w-12 h-12 rounded-full border-gold-500 text-gold-700 hover:bg-gold-500 hover:text-white"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>

        <div className="flex-1 space-y-2">
          {/* Progress Bar */}
          <Slider
            value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
            onValueChange={handleSeek}
            max={100}
            step={1}
            className="w-full"
          />
          
          {/* Time Display */}
          <div className="flex justify-between text-sm text-charcoal-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3">
        <Volume2 className="h-4 w-4 text-charcoal-600 flex-shrink-0" />
        <Slider
          value={[volume * 100]}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="w-24"
        />
        <span className="text-sm text-charcoal-600 w-10">
          {Math.round(volume * 100)}%
        </span>
      </div>

      {/* Waveform Visualization (placeholder) */}
      <div className="h-16 bg-gradient-to-r from-gold-100 to-cream-100 rounded-md flex items-end justify-center space-x-1 px-4">
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={i}
            className={cn(
              'w-1 bg-gold-400 rounded-full transition-all duration-75',
              isPlaying ? 'animate-pulse' : 'opacity-60'
            )}
            style={{
              height: `${Math.random() * 40 + 10}%`,
              animationDelay: `${i * 50}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioPlayer;