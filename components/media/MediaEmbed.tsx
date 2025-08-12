'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MediaFile, mediaUtils } from '@/lib/media-manager';
import { ExternalLink, Maximize2, Minimize2, Pause, Play, Volume2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface MediaEmbedProps {
  media: MediaFile;
  width?: number;
  height?: number;
  autoplay?: boolean;
  controls?: boolean;
  className?: string;
}

export function MediaEmbed({
  media,
  width = 560,
  height = 315,
  autoplay = false,
  controls = true,
  className,
}: MediaEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (media.type === 'audio' && media.url) {
      const audio = new Audio(media.url);
      audio.preload = 'metadata';
      
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
      
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      
      setAudioElement(audio);
      
      return () => {
        audio.pause();
        audio.removeEventListener('loadedmetadata', () => {});
        audio.removeEventListener('timeupdate', () => {});
        audio.removeEventListener('ended', () => {});
      };
    }
  }, [media]);

  const handlePlayPause = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error('Audio play error:', error);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioElement) return;
    
    const newTime = parseFloat(e.target.value);
    audioElement.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioElement) return;
    
    const newVolume = parseFloat(e.target.value);
    audioElement.volume = newVolume;
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Helper function to get optimized URL
  const getOptimizedUrl = (media: MediaFile, options: { width?: number; height?: number } = {}) => {
    if (media.platform === 'google-drive' && media.type === 'image') {
      // Google Drive thumbnail optimization
      const size = options.width && options.height 
        ? `w${options.width}-h${options.height}` 
        : 'm'; // medium size
      return `https://drive.google.com/thumbnail?id=${media.metadata?.fileId}&sz=${size}`;
    }
    
    if (media.platform === 'cdn' && media.type === 'image') {
      const params = new URLSearchParams();
      if (options.width) params.append('w', options.width.toString());
      if (options.height) params.append('h', options.height.toString());
      
      return `${media.url}?${params.toString()}`;
    }
    
    return media.url;
  };

  const renderEmbedContent = () => {
    switch (media.platform) {
      case 'youtube':
        const videoId = media.metadata?.videoId || media.id;
        return (
          <iframe
            width={width}
            height={height}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}`}
            title={media.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        );

      case 'vimeo':
        return (
          <iframe
            src={`https://player.vimeo.com/video/${media.id}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}`}
            width={width}
            height={height}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        );

      case 'soundcloud':
        return (
          <iframe
            width="100%"
            height={height}
            scrolling="no"
            frameBorder="no"
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(media.url)}&amp;color=ff5500&amp;auto_play=${autoplay ? 'true' : 'false'}&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false`}
            className="rounded-lg"
          />
        );

      case 'google-drive':
        if (media.type === 'image') {
          // Use optimized Google Drive thumbnail URL
          const optimizedUrl = getOptimizedUrl(media, { width, height });
          return (
            <div className="relative w-full h-full">
              <Image
                src={optimizedUrl}
                alt={media.title}
                fill
                className="object-cover rounded-lg"
                sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`}
              />
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(media.metadata?.webViewLink || media.url, '_blank')}
                  className="bg-white/80 hover:bg-white text-gray-700"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        }
        // For other Google Drive content, fall back to custom player
        return renderCustomPlayer();
        
      case 'cdn':
        if (media.type === 'image') {
          return (
            <Image
              src={media.url}
              alt={media.title}
              width={width}
              height={height}
              className="w-full h-auto rounded-lg object-cover"
            />
          );
        }
        // For other CDN content, fall back to custom player
        return renderCustomPlayer();
        
      default:
        return renderCustomPlayer();
    }
  };

  const renderCustomPlayer = () => {
    if (media.type === 'audio') {
      return (
        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center gap-4 mb-4">
              <Button
                onClick={handlePlayPause}
                size="lg"
                className="rounded-full w-12 h-12 p-0"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-1" />
                )}
              </Button>
              <div className="flex-1">
                <h3 className="font-medium">{media.title}</h3>
                {media.description && (
                  <p className="text-sm text-gray-600">{media.description}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{mediaUtils.formatDuration(currentTime)}</span>
                <span>{mediaUtils.formatDuration(duration)}</span>
              </div>
            </div>
            
            {/* Volume Control */}
            <div className="flex items-center gap-2 mt-3">
              <Volume2 className="h-4 w-4 text-gray-500" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="1"
                onChange={handleVolumeChange}
                className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </CardContent>
        </Card>
      );
    }

    // For other media types, show a placeholder with external link
    return (
      <Card className="p-6 text-center">
        <CardContent className="p-0">
          <div className="mb-4">
            {media.type === 'video' && <Play className="h-12 w-12 mx-auto text-gray-400" />}
            {media.type === 'image' && <img src={media.url} alt={media.title} className="max-w-full h-auto rounded" />}
          </div>
          <h3 className="font-medium mb-2">{media.title}</h3>
          {media.description && (
            <p className="text-sm text-gray-600 mb-4">{media.description}</p>
          )}
          <Button
            onClick={() => window.open(media.url, '_blank')}
            className="w-full"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in {media.platform}
          </Button>
        </CardContent>
      </Card>
    );
  };

  const getPlatformBadge = () => {
    const platformColors: Record<string, string> = {
      youtube: 'bg-red-100 text-red-800',
      vimeo: 'bg-blue-100 text-blue-800',
      soundcloud: 'bg-orange-100 text-orange-800',
      'google-drive': 'bg-green-100 text-green-800',
      cdn: 'bg-purple-100 text-purple-800',
      local: 'bg-gray-100 text-gray-800',
    };

    return (
      <Badge variant="secondary" className={`text-xs ${platformColors[media.platform] || 'bg-gray-100 text-gray-800'}`}>
        {media.platform}
      </Badge>
    );
  };

  return (
    <div className={`relative ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getPlatformBadge()}
          {media.size && (
            <span className="text-xs text-gray-500">
              {mediaUtils.formatFileSize(media.size)}
            </span>
          )}
          {media.duration && (
            <span className="text-xs text-gray-500">
              {mediaUtils.formatDuration(media.duration)}
            </span>
          )}
        </div>
      </div>
      
      <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black flex items-center justify-center' : ''}`}>
        {isFullscreen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
        )}
        {renderEmbedContent()}
      </div>
    </div>
  );
}
