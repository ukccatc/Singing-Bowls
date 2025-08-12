import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    const { id, platform } = await request.json();

    if (!id || !platform) {
      return NextResponse.json(
        { error: 'ID and platform are required' },
        { status: 400 }
      );
    }

    let success = false;

    switch (platform) {
      case 'youtube':
        success = await deleteFromYouTube(id);
        break;
      case 'soundcloud':
        success = await deleteFromSoundCloud(id);
        break;
      case 'cdn':
        success = await deleteFromCDN(id);
        break;
      default:
        return NextResponse.json(
          { error: 'Unsupported platform' },
          { status: 400 }
        );
    }

    if (success) {
      return NextResponse.json({ success: true, message: 'Media deleted successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete media' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Media deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function deleteFromYouTube(videoId: string): Promise<boolean> {
  try {
    const youtubeApiKey = process.env.YOUTUBE_API_KEY;

    if (!youtubeApiKey) {
      console.error('YouTube API key missing');
      return false;
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${youtubeApiKey}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${youtubeApiKey}`,
        },
      }
    );

    return response.ok;
  } catch (error) {
    console.error('YouTube deletion error:', error);
    return false;
  }
}

async function deleteFromSoundCloud(trackId: string): Promise<boolean> {
  try {
    const soundcloudAccessToken = process.env.SOUNDCLOUD_ACCESS_TOKEN;

    if (!soundcloudAccessToken) {
      console.error('SoundCloud access token missing');
      return false;
    }

    const response = await fetch(
      `https://api.soundcloud.com/tracks/${trackId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `OAuth ${soundcloudAccessToken}`,
        },
      }
    );

    return response.ok;
  } catch (error) {
    console.error('SoundCloud deletion error:', error);
    return false;
  }
}

async function deleteFromCDN(publicId: string): Promise<boolean> {
  try {
    const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
    const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
      console.error('Cloudinary configuration missing');
      return false;
    }

    // Create signature for deletion
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = require('crypto')
      .createHash('sha1')
      .update(`public_id=${publicId}&timestamp=${timestamp}${cloudinaryApiSecret}`)
      .digest('hex');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/destroy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_id: publicId,
          api_key: cloudinaryApiKey,
          timestamp,
          signature,
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('CDN deletion error:', error);
    return false;
  }
}
