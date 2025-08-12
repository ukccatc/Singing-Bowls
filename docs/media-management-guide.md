# Media Management System Guide

## Overview

The Himalayan Sound platform includes a comprehensive media management system that automatically routes different types of media to their optimal platforms for delivery and performance.

## Platform Recommendations

### 🖼️ Images → Google Drive
- **Why**: Free storage, easy management, direct integration with Google services
- **Benefits**: 15GB free storage, automatic backup, easy sharing and collaboration
- **Use Cases**: Product photos, blog images, thumbnails, internal media storage

### 🎥 Videos → YouTube
- **Why**: Global CDN, SEO benefits, analytics, monetization potential
- **Benefits**: Automatic transcoding, mobile optimization, embedding
- **Use Cases**: Product demonstrations, tutorials, meditation guides

### 🎵 Audio → SoundCloud
- **Why**: Streaming optimization, social features, playlist support
- **Benefits**: High-quality streaming, embeddable players, analytics
- **Use Cases**: Singing bowl samples, meditation sounds, guided sessions

## Setup Instructions

### 1. Environment Configuration

Copy `env.example` to `.env.local` and configure your API keys:

```bash
# Google Drive API
GOOGLE_DRIVE_CLIENT_ID=your_google_drive_client_id_here
GOOGLE_DRIVE_CLIENT_SECRET=your_google_drive_client_secret_here
GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id_here

# YouTube API
YOUTUBE_API_KEY=your_youtube_api_key_here
YOUTUBE_CHANNEL_ID=your_youtube_channel_id_here

# SoundCloud API
SOUNDCLOUD_CLIENT_ID=your_soundcloud_client_id_here
SOUNDCLOUD_CLIENT_SECRET=your_soundcloud_client_secret_here
SOUNDCLOUD_ACCESS_TOKEN=your_soundcloud_access_token_here
```

### 2. API Setup

#### Google Drive API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Drive API
4. Create OAuth 2.0 credentials
5. Set up authorized redirect URIs
6. Get Client ID and Client Secret
7. Create a folder in Google Drive and get its ID

#### YouTube API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Get your Channel ID from YouTube Studio

#### SoundCloud API
1. Go to [SoundCloud for Developers](https://developers.soundcloud.com/)
2. Create a new application
3. Get Client ID and Client Secret
4. Generate Access Token

## Usage

### Uploading Media

#### Using the MediaUploader Component

```tsx
import { MediaUploader } from '@/components/media/MediaUploader';

function MyComponent() {
  const handleUploadComplete = (media: MediaFile) => {
    console.log('Uploaded:', media);
    // Handle the uploaded media
  };

  return (
    <MediaUploader
      onUploadComplete={handleUploadComplete}
      allowedTypes={['image', 'video', 'audio']}
      maxFileSize={100 * 1024 * 1024} // 100MB
    />
  );
}
```

#### Using the MediaManager Class

```tsx
import { MediaManager } from '@/lib/media-manager';

const mediaManager = new MediaManager({
  googleDrive: {
    clientId: process.env.GOOGLE_DRIVE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET!,
    folderId: process.env.GOOGLE_DRIVE_FOLDER_ID!,
    redirectUri: 'http://localhost:3000/auth/google-drive/callback',
  },
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY!,
    channelId: process.env.YOUTUBE_CHANNEL_ID!,
    defaultPrivacy: 'unlisted',
  },
  soundcloud: {
    clientId: process.env.SOUNDCLOUD_CLIENT_ID!,
    clientSecret: process.env.SOUNDCLOUD_CLIENT_SECRET!,
    accessToken: process.env.SOUNDCLOUD_ACCESS_TOKEN!,
  },
});

// Upload media
const media = await mediaManager.uploadMedia({
  type: 'image',
  file: imageFile,
  title: 'My Image',
  description: 'Description here',
  tags: ['tag1', 'tag2'],
  isPublic: true,
});
```

### Displaying Media

#### Using the MediaEmbed Component

```tsx
import { MediaEmbed } from '@/components/media/MediaEmbed';

function ProductPage({ media }) {
  return (
    <MediaEmbed
      media={media}
      width={800}
      height={450}
      autoplay={false}
      controls={true}
    />
  );
}
```

#### Using the MediaGallery Component

```tsx
import { MediaGallery } from '@/components/media/MediaGallery';

function MediaLibrary({ mediaList }) {
  const handleDelete = (media) => {
    // Handle deletion
  };

  const handleEdit = (media) => {
    // Handle editing
  };

  return (
    <MediaGallery
      media={mediaList}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
}
```

## File Type Support

### Images
- **Formats**: JPG, PNG, GIF, WebP
- **Max Size**: 10MB
- **Platform**: Google Drive
- **Features**: Free storage, automatic backup, easy sharing

### Videos
- **Formats**: MP4, AVI, MOV, WMV, FLV
- **Max Size**: 100MB
- **Platform**: YouTube
- **Features**: Automatic transcoding, mobile optimization, analytics

### Audio
- **Formats**: MP3, WAV, OGG, M4A, FLAC
- **Max Size**: 500MB
- **Platform**: SoundCloud
- **Features**: High-quality streaming, embeddable players

## API Endpoints

### Upload Endpoints

- `POST /api/media/upload-google-drive` - Upload images to Google Drive
- `POST /api/media/upload-youtube` - Upload videos to YouTube
- `POST /api/media/upload-soundcloud` - Upload audio to SoundCloud

### Management Endpoints

- `DELETE /api/media/delete` - Delete media from platform

## Google Drive Integration

### Benefits of Using Google Drive for Images

1. **Free Storage**: 15GB free storage per Google account
2. **Easy Management**: Familiar interface, drag-and-drop uploads
3. **Automatic Backup**: Files are automatically backed up
4. **Sharing**: Easy to share files with team members
5. **Integration**: Works seamlessly with other Google services
6. **Version Control**: Automatic version history
7. **Search**: Powerful search capabilities

### Google Drive Setup Steps

1. **Create Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google Drive API

2. **Configure OAuth 2.0**:
   - Go to "Credentials" in Google Cloud Console
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URIs
   - Download client configuration

3. **Create Google Drive Folder**:
   - Create a folder in Google Drive for your media
   - Get the folder ID from the URL
   - Set permissions as needed

4. **Configure Environment Variables**:
   ```bash
   GOOGLE_DRIVE_CLIENT_ID=your_client_id
   GOOGLE_DRIVE_CLIENT_SECRET=your_client_secret
   GOOGLE_DRIVE_FOLDER_ID=your_folder_id
   ```

### Google Drive File URLs

- **Direct View**: `https://drive.google.com/file/d/{fileId}/view`
- **Download**: `https://drive.google.com/uc?export=download&id={fileId}`
- **Thumbnail**: `https://drive.google.com/thumbnail?id={fileId}&sz=m`

## Best Practices

### 1. File Optimization
- Compress images before upload (use tools like TinyPNG)
- Use appropriate video codecs (H.264 for web)
- Optimize audio files (MP3 at 128-320kbps)

### 2. Metadata
- Always provide descriptive titles and descriptions
- Use relevant tags for better discoverability
- Include alt text for images

### 3. Privacy Settings
- Set videos to "unlisted" for product demos
- Use "public" for marketing content
- Consider "private" for internal use

### 4. Performance
- Use lazy loading for media galleries
- Implement proper caching strategies
- Monitor bandwidth usage

### 5. Google Drive Specific
- Organize files in folders by category
- Use descriptive file names
- Set appropriate sharing permissions
- Regular backup of important files

## Troubleshooting

### Common Issues

#### Upload Failures
- Check API key configuration
- Verify file size limits
- Ensure proper file formats
- Check Google Drive folder permissions

#### Playback Issues
- Check CORS settings for audio/video
- Verify embed permissions
- Test on different devices

#### Performance Problems
- Optimize file sizes before upload
- Use appropriate image dimensions
- Implement proper caching

### Error Messages

- `"API configuration missing"` - Check environment variables
- `"File too large"` - Reduce file size or increase limits
- `"Unsupported file type"` - Check file format support
- `"Upload failed"` - Check network connection and API status
- `"Google Drive authentication failed"` - Check OAuth configuration

## Integration Examples

### Product Pages

```tsx
function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      
      {/* Product Images from Google Drive */}
      <MediaEmbed
        media={product.images[0]}
        width={600}
        height={400}
      />
      
      {/* Product Video from YouTube */}
      {product.video && (
        <MediaEmbed
          media={product.video}
          width={800}
          height={450}
        />
      )}
      
      {/* Audio Sample from SoundCloud */}
      {product.audioSample && (
        <MediaEmbed
          media={product.audioSample}
          width={400}
          height={200}
        />
      )}
    </div>
  );
}
```

### Blog Posts

```tsx
function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      
      {/* Featured Image from Google Drive */}
      <MediaEmbed
        media={post.featuredImage}
        width={800}
        height={400}
      />
      
      {/* Content */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      
      {/* Related Media */}
      <MediaGallery media={post.relatedMedia} />
    </article>
  );
}
```

## Security Considerations

1. **API Key Protection**: Never expose API keys in client-side code
2. **File Validation**: Always validate file types and sizes
3. **Access Control**: Implement proper authentication for uploads
4. **Content Moderation**: Consider implementing content filtering
5. **Rate Limiting**: Implement upload rate limits to prevent abuse
6. **Google Drive Permissions**: Set appropriate sharing permissions

## Monitoring and Analytics

### YouTube Analytics
- View counts, engagement metrics
- Audience retention data
- Traffic sources

### SoundCloud Analytics
- Play counts, likes, comments
- Geographic distribution
- Referrer tracking

### Google Drive Analytics
- Storage usage
- File access patterns
- Sharing statistics

## Future Enhancements

1. **AI-powered tagging** for automatic metadata generation
2. **Bulk upload** functionality for multiple files
3. **Advanced editing** tools for images and audio
4. **Content scheduling** for timed releases
5. **Multi-language** support for metadata
6. **Advanced analytics** and reporting
7. **Content versioning** and rollback capabilities
8. **Google Drive integration** with Google Photos for additional storage
