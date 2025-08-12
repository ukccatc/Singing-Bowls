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
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (reasonable limit for images)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB' },
        { status: 400 }
      );
    }

    // CDN configuration (using Cloudinary as example)
    const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
    const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
      return NextResponse.json(
        { error: 'CDN configuration missing' },
        { status: 500 }
      );
    }

    // Convert file to base64 for Cloudinary upload
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64File = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64File}`;

    // Upload to Cloudinary
    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: dataURI,
          public_id: `himalayan-sound/${title.toLowerCase().replace(/\s+/g, '-')}`,
          folder: 'himalayan-sound',
          tags: tags,
          context: {
            title: title,
            description: description || '',
            alt: title,
          },
          transformation: [
            { quality: 'auto', fetch_format: 'auto' },
            { width: 1200, height: 800, crop: 'limit' },
          ],
        }),
      }
    );

    if (!uploadResponse.ok) {
      const error = await uploadResponse.text();
      console.error('CDN upload error:', error);
      return NextResponse.json(
        { error: 'Failed to upload to CDN' },
        { status: 500 }
      );
    }

    const result = await uploadResponse.json();

    // Generate optimized URLs for different use cases
    const baseUrl = `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload`;
    const publicId = result.public_id;

    const optimizedUrls = {
      original: result.secure_url,
      thumbnail: `${baseUrl}/c_thumb,w_300,h_300,g_face/${publicId}`,
      medium: `${baseUrl}/c_scale,w_800,h_600/${publicId}`,
      large: `${baseUrl}/c_scale,w_1200,h_800/${publicId}`,
      webp: `${baseUrl}/f_webp/${publicId}`,
      avif: `${baseUrl}/f_avif/${publicId}`,
    };

    return NextResponse.json({
      id: result.public_id,
      title,
      description,
      url: result.secure_url,
      thumbnail: optimizedUrls.thumbnail,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes,
      tags: result.tags || tags,
      metadata: {
        publicId: result.public_id,
        assetId: result.asset_id,
        version: result.version,
        versionId: result.version_id,
        signature: result.signature,
        createdAt: result.created_at,
        uploadedAt: result.uploaded_at,
        context: result.context,
        optimizedUrls,
      },
      createdAt: new Date(result.created_at),
      updatedAt: new Date(),
    });

  } catch (error) {
    console.error('CDN upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
