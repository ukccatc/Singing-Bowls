import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tags = JSON.parse(formData.get('tags') as string || '[]');
    const isPublic = formData.get('public') === 'true';

    if (!file || !title) {
      return NextResponse.json(
        { error: 'File and title are required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('audio/')) {
      return NextResponse.json(
        { error: 'File must be an audio file' },
        { status: 400 }
      );
    }

    // Validate file size (SoundCloud limit is 5GB, but we'll set a reasonable limit)
    const maxSize = 500 * 1024 * 1024; // 500MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 500MB' },
        { status: 400 }
      );
    }

    // SoundCloud API configuration
    const soundcloudClientId = process.env.SOUNDCLOUD_CLIENT_ID;
    const soundcloudClientSecret = process.env.SOUNDCLOUD_CLIENT_SECRET;
    const soundcloudAccessToken = process.env.SOUNDCLOUD_ACCESS_TOKEN;

    if (!soundcloudClientId || !soundcloudClientSecret || !soundcloudAccessToken) {
      return NextResponse.json(
        { error: 'SoundCloud API configuration missing' },
        { status: 500 }
      );
    }

    // Convert file to buffer for upload
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to SoundCloud using SoundCloud API
    const uploadResponse = await fetch('https://api.soundcloud.com/tracks', {
      method: 'POST',
      headers: {
        'Authorization': `OAuth ${soundcloudAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        track: {
          title,
          description: description || '',
          tags: tags.join(' '),
          sharing: isPublic ? 'public' : 'private',
          downloadable: false,
          genre: 'Meditation',
          license: 'all-rights-reserved',
          track_type: 'original',
        },
      }),
    });

    if (!uploadResponse.ok) {
      const error = await uploadResponse.text();
      console.error('SoundCloud upload error:', error);
      return NextResponse.json(
        { error: 'Failed to upload to SoundCloud' },
        { status: 500 }
      );
    }

    const trackData = await uploadResponse.json();

    // Upload the actual audio file
    const audioUploadResponse = await fetch(trackData.upload_url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: buffer,
    });

    if (!audioUploadResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to upload audio file to SoundCloud' },
        { status: 500 }
      );
    }

    // Get final track details
    const finalTrackResponse = await fetch(
      `https://api.soundcloud.com/tracks/${trackData.id}?client_id=${soundcloudClientId}`
    );

    if (!finalTrackResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to get track details' },
        { status: 500 }
      );
    }

    const finalTrack = await finalTrackResponse.json();

    return NextResponse.json({
      trackId: finalTrack.id,
      title: finalTrack.title,
      description: finalTrack.description,
      streamUrl: finalTrack.stream_url,
      downloadUrl: finalTrack.download_url,
      artworkUrl: finalTrack.artwork_url,
      duration: Math.round(finalTrack.duration / 1000), // Convert to seconds
      genre: finalTrack.genre,
      tags: finalTrack.tag_list ? finalTrack.tag_list.split(' ') : [],
      sharing: finalTrack.sharing,
      downloadable: finalTrack.downloadable,
      playCount: finalTrack.playback_count,
      likeCount: finalTrack.likes_count,
      commentCount: finalTrack.comment_count,
      createdAt: finalTrack.created_at,
      permalinkUrl: finalTrack.permalink_url,
    });

  } catch (error) {
    console.error('SoundCloud upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
