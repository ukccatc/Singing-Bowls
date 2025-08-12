'use client';

import React, { useState } from 'react';
import { Play, Pause, Volume2, ExternalLink, Download, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { MediaFile, mediaUtils } from '@/lib/media-manager';

interface MediaGalleryProps {
  media: MediaFile[];
  onDelete?: (media: MediaFile) => void;
  onEdit?: (media: MediaFile) => void;
  className?: string;
}

export function MediaGallery({ media, onDelete, onEdit, className }: MediaGalleryProps) {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<Record<string, HTMLAudioElement>>({});

  const handleAudioPlay = (mediaId: string, url: string) => {
    // Stop currently playing audio
    if (playingAudio && audioElements[playingAudio]) {
      audioElements[playingAudio].pause();
    }

    // Create or get audio element
    let audio = audioElements[mediaId];
    if (!audio) {
      audio = new Audio(url);
      audio.preload = 'metadata';
      setAudioElements(prev => ({ ...prev, [mediaId]: audio }));
    }

    // Play audio
    audio.play().then(() => {
      setPlayingAudio(mediaId);
    }).catch(error => {
      console.error('Audio play error:', error);
      toast.error('Failed to play audio');
    });

    // Handle audio end
    audio.onended = () => {
      setPlayingAudio(null);
    };
  };

  const handleAudioPause = (mediaId: string) => {
    const audio = audioElements[mediaId];
    if (audio) {
      audio.pause();
      setPlayingAudio(null);
    }
  };

  const handleDelete = async (media: MediaFile) => {
    if (!onDelete) return;

    try {
      const response = await fetch('/api/media/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: media.id,
          platform: media.platform,
        }),
      });

      if (response.ok) {
        onDelete(media);
        toast.success('Media deleted successfully');
      } else {
        throw new Error('Failed to delete media');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete media');
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return '🎥';
      case 'soundcloud':
        return '🎵';
      case 'cdn':
        return '🖼️';
      default:
        return '📁';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return 'bg-red-100 text-red-800';
      case 'soundcloud':
        return 'bg-orange-100 text-orange-800';
      case 'cdn':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderMediaContent = (media: MediaFile) => {
    switch (media.type) {
      case 'image':
        return (
          <div className="relative group">
            <img
              src={media.url}
              alt={media.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => window.open(media.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View
              </Button>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="relative group">
            <img
              src={media.thumbnail || '/placeholder-video.jpg'}
              alt={media.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => window.open(media.url, '_blank')}
              >
                <Play className="h-4 w-4 mr-1" />
                Watch
              </Button>
            </div>
          </div>
        );

      case 'audio':
        return (
          <div className="relative group">
            <div className="w-full h-48 bg-gradient-to-br from-gold/20 to-cream/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Volume2 className="h-12 w-12 mx-auto mb-2 text-gold" />
                <p className="text-sm text-gray-600">{media.title}</p>
                {media.duration && (
                  <p className="text-xs text-gray-500 mt-1">
                    {mediaUtils.formatDuration(media.duration)}
                  </p>
                )}
              </div>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => {
                  if (playingAudio === media.id) {
                    handleAudioPause(media.id);
                  } else {
                    handleAudioPlay(media.id, media.url);
                  }
                }}
              >
                {playingAudio === media.id ? (
                  <Pause className="h-4 w-4 mr-1" />
                ) : (
                  <Play className="h-4 w-4 mr-1" />
                )}
                {playingAudio === media.id ? 'Pause' : 'Play'}
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Unsupported media type</p>
          </div>
        );
    }
  };

  if (media.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-400 mb-4">
          <Volume2 className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
        <p className="text-gray-500">Upload some media to get started</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {media.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-sm font-medium truncate">
                  {item.title}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className={`text-xs ${getPlatformColor(item.platform)}`}>
                    {getPlatformIcon(item.platform)} {item.platform}
                  </Badge>
                  {item.size && (
                    <span className="text-xs text-gray-500">
                      {mediaUtils.formatFileSize(item.size)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(item)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item)}
                    className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {renderMediaContent(item)}
            {item.description && (
              <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                {item.description}
              </p>
            )}
            {item.metadata?.tags && item.metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {item.metadata.tags.slice(0, 3).map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {item.metadata.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{item.metadata.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
