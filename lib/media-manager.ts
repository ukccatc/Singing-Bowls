// Media Manager for Himalayan Sound Platform
// Handles different media types and their optimal storage platforms

export interface MediaFile {
  id: string;
  type: 'image' | 'video' | 'audio';
  title: string;
  description?: string;
  url: string;
  platform: 'local' | 'youtube' | 'vimeo' | 'soundcloud' | 'cdn' | 'google-drive';
  thumbnail?: string;
  duration?: number; // for audio/video
  size?: number; // file size in bytes
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaUploadOptions {
  type: 'image' | 'video' | 'audio';
  file: File;
  title: string;
  description?: string;
  tags?: string[];
  isPublic?: boolean;
}

export interface PlatformConfig {
  youtube: {
    apiKey: string;
    channelId: string;
    defaultPrivacy: 'public' | 'unlisted' | 'private';
  };
  vimeo: {
    accessToken: string;
    userId: string;
    defaultPrivacy: 'anybody' | 'contacts' | 'disable' | 'nobody' | 'password' | 'unlisted';
  };
  soundcloud: {
    clientId: string;
    clientSecret: string;
    accessToken: string;
  };
  cdn: {
    baseUrl: string;
    apiKey: string;
    bucket: string;
  };
  googleDrive: {
    clientId: string;
    clientSecret: string;
    folderId?: string;
    redirectUri: string;
  };
}

export class MediaManager {
  private config: PlatformConfig;

  constructor(config: PlatformConfig) {
    this.config = config;
  }

  // Upload media to appropriate platform based on type
  async uploadMedia(options: MediaUploadOptions): Promise<MediaFile> {
    const { type, file, title, description, tags, isPublic = true } = options;

    switch (type) {
      case 'image':
        return this.uploadImage(file, title, description, tags, isPublic);
      case 'video':
        return this.uploadVideo(file, title, description, tags, isPublic);
      case 'audio':
        return this.uploadAudio(file, title, description, tags, isPublic);
      default:
        throw new Error(`Unsupported media type: ${type}`);
    }
  }

  // Upload images to Google Drive for storage
  private async uploadImage(
    file: File,
    title: string,
    description?: string,
    tags?: string[],
    isPublic: boolean = true
  ): Promise<MediaFile> {
    // Upload to Google Drive
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    if (description) formData.append('description', description);
    if (tags) formData.append('tags', JSON.stringify(tags));
    formData.append('public', isPublic.toString());
    if (this.config.googleDrive.folderId) {
      formData.append('folderId', this.config.googleDrive.folderId);
    }

    const response = await fetch('/api/media/upload-google-drive', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image to Google Drive');
    }

    const result = await response.json();

    return {
      id: result.id,
      type: 'image',
      title,
      description,
      url: result.webContentLink || result.webViewLink,
      platform: 'google-drive',
      thumbnail: result.thumbnailLink,
      size: file.size,
      metadata: {
        fileId: result.id,
        webViewLink: result.webViewLink,
        webContentLink: result.webContentLink,
        thumbnailLink: result.thumbnailLink,
        parents: result.parents,
        tags,
      },
      createdAt: new Date(result.createdTime),
      updatedAt: new Date(result.modifiedTime),
    };
  }

  // Upload videos to YouTube for optimal delivery
  private async uploadVideo(
    file: File,
    title: string,
    description?: string,
    tags?: string[],
    isPublic: boolean = true
  ): Promise<MediaFile> {
    // Upload to YouTube using YouTube Data API
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    if (description) formData.append('description', description);
    if (tags) formData.append('tags', JSON.stringify(tags));
    formData.append('privacy', isPublic ? 'public' : 'unlisted');

    const response = await fetch('/api/media/upload-youtube', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload video to YouTube');
    }

    const result = await response.json();

    return {
      id: result.videoId,
      type: 'video',
      title,
      description,
      url: `https://www.youtube.com/watch?v=${result.videoId}`,
      platform: 'youtube',
      thumbnail: result.thumbnail,
      duration: result.duration,
      size: file.size,
      metadata: {
        videoId: result.videoId,
        channelId: this.config.youtube.channelId,
        tags,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  // Upload audio to SoundCloud for optimal delivery
  private async uploadAudio(
    file: File,
    title: string,
    description?: string,
    tags?: string[],
    isPublic: boolean = true
  ): Promise<MediaFile> {
    // Upload to SoundCloud using SoundCloud API
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    if (description) formData.append('description', description);
    if (tags) formData.append('tags', JSON.stringify(tags));
    formData.append('public', isPublic.toString());

    const response = await fetch('/api/media/upload-soundcloud', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload audio to SoundCloud');
    }

    const result = await response.json();

    return {
      id: result.trackId,
      type: 'audio',
      title,
      description,
      url: result.streamUrl,
      platform: 'soundcloud',
      thumbnail: result.artworkUrl,
      duration: result.duration,
      size: file.size,
      metadata: {
        trackId: result.trackId,
        streamUrl: result.streamUrl,
        tags,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  // Get media by ID
  async getMedia(id: string): Promise<MediaFile | null> {
    // This would typically fetch from your database
    // For now, returning null as placeholder
    return null;
  }

  // Get all media of a specific type
  async getMediaByType(type: 'image' | 'video' | 'audio'): Promise<MediaFile[]> {
    // This would typically fetch from your database
    // For now, returning empty array as placeholder
    return [];
  }

  // Delete media from platform
  async deleteMedia(id: string, platform: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/media/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, platform }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting media:', error);
      return false;
    }
  }

  // Generate embed codes for different platforms
  generateEmbedCode(media: MediaFile): string {
    switch (media.platform) {
      case 'youtube':
        return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${media.metadata?.videoId}" frameborder="0" allowfullscreen></iframe>`;
      
      case 'vimeo':
        return `<iframe src="https://player.vimeo.com/video/${media.id}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
      
      case 'soundcloud':
        return `<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=${encodeURIComponent(media.url)}&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>`;
      
      case 'google-drive':
        return `<img src="${media.url}" alt="${media.title}" class="w-full h-auto" />`;
      
      case 'cdn':
        if (media.type === 'image') {
          return `<img src="${media.url}" alt="${media.title}" class="w-full h-auto" />`;
        }
        return `<img src="${media.url}" alt="${media.title}" />`;
      
      default:
        return `<img src="${media.url}" alt="${media.title}" />`;
    }
  }

  // Get optimized URL for different use cases
  getOptimizedUrl(media: MediaFile, options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}): string {
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
      if (options.quality) params.append('q', options.quality.toString());
      if (options.format) params.append('f', options.format);
      
      return `${media.url}?${params.toString()}`;
    }
    
    return media.url;
  }
}

// Utility functions for media management
export const mediaUtils = {
  // Get file type from file
  getFileType(file: File): 'image' | 'video' | 'audio' {
    const type = file.type;
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'video';
    if (type.startsWith('audio/')) return 'audio';
    throw new Error(`Unsupported file type: ${type}`);
  },

  // Validate file size
  validateFileSize(file: File, maxSize: number): boolean {
    return file.size <= maxSize;
  },

  // Get recommended platform for file type
  getRecommendedPlatform(type: 'image' | 'video' | 'audio'): string {
    switch (type) {
      case 'image': return 'google-drive';
      case 'video': return 'youtube';
      case 'audio': return 'soundcloud';
      default: return 'local';
    }
  },

  // Format file size for display
  formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  },

  // Format duration for display
  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  },

  // Get optimized URL for media
  getOptimizedUrl(media: MediaFile, options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}): string {
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
      if (options.quality) params.append('q', options.quality.toString());
      if (options.format) params.append('f', options.format);
      
      return `${media.url}?${params.toString()}`;
    }
    
    return media.url;
  },
};
