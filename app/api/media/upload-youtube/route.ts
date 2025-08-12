import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tags = JSON.parse(formData.get('tags') as string || '[]');
    const privacy = formData.get('privacy') as string;

    if (!file || !title) {
      return NextResponse.json(
        { error: 'File and title are required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('video/')) {
      return NextResponse.json(
        { error: 'File must be a video' },
        { status: 400 }
      );
    }

    // Validate file size (YouTube limit is 128GB, but we'll set a reasonable limit)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 100MB' },
        { status: 400 }
      );
    }

    // YouTube API configuration
    const youtubeApiKey = process.env.YOUTUBE_API_KEY;
    const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!youtubeApiKey || !youtubeChannelId) {
      return NextResponse.json(
        { error: 'YouTube API configuration missing' },
        { status: 500 }
      );
    }

    // Convert file to buffer for upload
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to YouTube using YouTube Data API v3
    const uploadResponse = await fetch(
      `https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status&key=${youtubeApiKey}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${youtubeApiKey}`,
          'Content-Type': 'multipart/related',
        },
        body: JSON.stringify({
          snippet: {
            title,
            description: description || '',
            tags,
            categoryId: '22', // People & Blogs category
            defaultLanguage: 'en',
            defaultAudioLanguage: 'en',
          },
          status: {
            privacyStatus: privacy || 'unlisted',
            embeddable: true,
            license: 'youtube',
          },
        }),
      }
    );

    if (!uploadResponse.ok) {
      const error = await uploadResponse.text();
      console.error('YouTube upload error:', error);
      return NextResponse.json(
        { error: 'Failed to upload to YouTube' },
        { status: 500 }
      );
    }

    const result = await uploadResponse.json();

    // Get video details
    const videoId = result.id;
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${youtubeApiKey}`
    );

    if (!videoResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to get video details' },
        { status: 500 }
      );
    }

    const videoDetails = await videoResponse.json();
    const video = videoDetails.items[0];

    return NextResponse.json({
      videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.medium?.url,
      duration: video.contentDetails.duration, // ISO 8601 duration format
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      privacyStatus: video.status.privacyStatus,
      embeddable: video.status.embeddable,
      uploadDate: video.snippet.publishedAt,
    });

  } catch (error) {
    console.error('YouTube upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
