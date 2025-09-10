# Media Integration Guide

## Overview

This guide explains how to use the new media integration features for products in the Himalayan Sound e-commerce platform. The system now supports YouTube videos, SoundCloud audio, and image uploads for products.

## Features

### 1. YouTube Video Integration
- Upload video files directly to YouTube
- Automatic embedding in product pages
- Support for video metadata (title, description, tags)
- Privacy settings (public, unlisted, private)

### 2. SoundCloud Audio Integration
- Upload audio files to SoundCloud
- Audio player integration in product pages
- Support for audio metadata and tags
- Streaming playback

### 3. Image Management
- Multiple image uploads per product
- Primary image designation
- Image gallery with thumbnails
- Responsive image display

## Setup Requirements

### Environment Variables

Ensure these environment variables are configured in your `.env.local` file:

```bash
# YouTube API Configuration
YOUTUBE_API_KEY=your-youtube-api-key
YOUTUBE_CHANNEL_ID=your-youtube-channel-id

# SoundCloud API Configuration
SOUNDCLOUD_CLIENT_ID=your-soundcloud-client-id
SOUNDCLOUD_CLIENT_SECRET=your-soundcloud-client-secret
SOUNDCLOUD_ACCESS_TOKEN=your-soundcloud-access-token

# Google Drive API (for images)
GOOGLE_DRIVE_CLIENT_ID=your-google-drive-client-id
GOOGLE_DRIVE_CLIENT_SECRET=your-google-drive-client-secret
GOOGLE_DRIVE_API_KEY=your-google-drive-api-key
GOOGLE_DRIVE_FOLDER_ID=your-google-drive-folder-id
```

### API Setup

#### YouTube API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Set up OAuth 2.0 for video uploads
6. Configure channel ID for uploads

#### SoundCloud API Setup
1. Go to [SoundCloud for Developers](https://developers.soundcloud.com/)
2. Create a new application
3. Get Client ID and Client Secret
4. Generate access token for uploads
5. Configure upload permissions

#### Google Drive API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google Drive API
3. Create OAuth 2.0 credentials
4. Configure folder permissions for uploads

## Usage

### Adding Media to Products

#### 1. Create New Product
1. Navigate to `/admin/products/new`
2. Fill in basic product information
3. Scroll to "Product Media" section
4. Upload YouTube video, SoundCloud audio, and images
5. Save product

#### 2. Edit Existing Product
1. Navigate to `/admin/products`
2. Click "Edit" on desired product
3. Scroll to "Product Media" section
4. Add or remove media files
5. Save changes

### Media Upload Process

#### YouTube Video Upload
1. Click "Upload Media" in YouTube section
2. Select video file (max 100MB)
3. Enter title and description
4. Choose privacy settings
5. Upload completes automatically

#### SoundCloud Audio Upload
1. Click "Upload Media" in SoundCloud section
2. Select audio file (max 500MB)
3. Enter title and description
4. Add tags if desired
5. Upload completes automatically

#### Image Upload
1. Click "Upload Media" in Images section
2. Select image files (max 10MB each)
3. Images are uploaded to Google Drive
4. First image becomes primary automatically

### Media Display

#### Product Pages
- YouTube videos display as embedded players
- SoundCloud audio shows as embedded player
- Images display in gallery with navigation
- Legacy audio samples still supported

#### Admin Panel
- Media preview in forms
- Easy removal and replacement
- Upload progress indicators
- Error handling and validation

## API Endpoints

### Product Management
- `POST /api/products` - Create new product with media
- `GET /api/products` - Get products with media data
- `PUT /api/products/[id]` - Update product with media

### Media Upload
- `POST /api/media/upload-youtube` - Upload video to YouTube
- `POST /api/media/upload-soundcloud` - Upload audio to SoundCloud
- `POST /api/media/upload-google-drive` - Upload images to Google Drive

### Media Management
- `DELETE /api/media/delete` - Delete media from platforms

## Components

### MediaUploader
- Handles file uploads to different platforms
- Progress tracking and error handling
- File type validation
- Platform-specific configuration

### MediaEmbed
- Displays embedded media players
- Supports YouTube, SoundCloud, and other platforms
- Responsive design
- Custom controls and styling

## Data Structure

### Product Types
```typescript
interface Product {
  // ... existing fields
  youtubeVideo?: ProductVideo;
  soundcloudAudio?: ProductAudio;
  images: ProductImage[];
}

interface ProductVideo {
  id: string;
  videoId: string;
  title: string;
  description?: string;
  thumbnail?: string;
  duration?: string;
  url: string;
  platform: 'youtube';
  isEmbeddable: boolean;
  privacyStatus: 'public' | 'unlisted' | 'private';
  createdAt: string;
}

interface ProductAudio {
  id: string;
  trackId: string;
  title: string;
  description?: string;
  streamUrl: string;
  artworkUrl?: string;
  duration: number;
  genre?: string;
  tags: string[];
  platform: 'soundcloud';
  isPublic: boolean;
  downloadable: boolean;
  createdAt: string;
}
```

## Best Practices

### File Management
- Use appropriate file sizes and formats
- Optimize images before upload
- Compress audio/video when possible
- Use descriptive titles and descriptions

### Privacy Settings
- Set YouTube videos to "unlisted" for product demos
- Use public SoundCloud tracks for audio samples
- Ensure proper permissions on Google Drive folders

### Performance
- Lazy load media content
- Use appropriate thumbnail sizes
- Implement proper error handling
- Cache media metadata

## Troubleshooting

### Common Issues

#### YouTube Upload Fails
- Check API key configuration
- Verify OAuth 2.0 setup
- Ensure channel ID is correct
- Check file size limits

#### SoundCloud Upload Fails
- Verify client credentials
- Check access token validity
- Ensure proper permissions
- Validate file format

#### Image Upload Issues
- Check Google Drive API setup
- Verify folder permissions
- Ensure proper OAuth flow
- Check file size limits

### Error Messages
- "API configuration missing" - Check environment variables
- "File too large" - Reduce file size
- "Invalid file type" - Use supported formats
- "Upload failed" - Check network connection and API status

## Future Enhancements

### Planned Features
- Video thumbnail generation
- Audio waveform visualization
- Media analytics and tracking
- Bulk media upload
- Media library management
- Advanced media editing tools

### Integration Opportunities
- Vimeo video support
- Spotify audio integration
- Cloudinary image optimization
- CDN integration for faster delivery
- Media backup and sync

## Support

For technical support or questions about media integration:
- Check the troubleshooting section above
- Review API documentation for each platform
- Contact development team for assistance
- Report bugs through the issue tracker
