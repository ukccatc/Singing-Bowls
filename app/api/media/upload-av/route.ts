import { createHash } from 'crypto';
import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { APP_MEDIA_LIMITS } from '@/lib/media/storage';
import { NextRequest, NextResponse } from 'next/server';

type MediaKind = 'audio' | 'video';

function detectKind(file: File, hint?: string): MediaKind | null {
  if (hint === 'audio' || hint === 'video') return hint;
  if (file.type.startsWith('audio/')) return 'audio';
  if (file.type.startsWith('video/')) return 'video';
  const name = file.name.toLowerCase();
  if (/\.(mp3|wav|ogg|m4a|aac)$/.test(name)) return 'audio';
  if (/\.(mp4|mov|m4v)$/.test(name)) return 'video';
  if (/\.webm$/.test(name)) return 'video';
  return null;
}

export async function POST(request: NextRequest) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const kindHint = String(formData.get('kind') || '');
    const title = String(formData.get('title') || file?.name || 'media').trim();

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const kind = detectKind(file, kindHint);
    if (!kind) {
      return NextResponse.json(
        {
          error:
            'Unsupported file type. Use mp3/wav/ogg/m4a for audio or mp4/webm/mov for video.',
        },
        { status: 400 }
      );
    }

    const maxBytes =
      kind === 'audio' ? APP_MEDIA_LIMITS.maxAudioBytes : APP_MEDIA_LIMITS.maxVideoBytes;
    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          error: `File too large. Max ${kind} size is ${Math.round(maxBytes / (1024 * 1024))}MB`,
        },
        { status: 400 }
      );
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Cloudinary is not configured' }, { status: 500 });
    }

    const folder =
      kind === 'audio' ? APP_MEDIA_LIMITS.audioFolder : APP_MEDIA_LIMITS.videoFolder;
    const timestamp = Math.floor(Date.now() / 1000);
    const safeName = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60);
    const publicId = `${safeName || kind}-${timestamp}`;
    const tags = `himalayan-sound,product,${kind}`;

    // Cloudinary stores both audio and video under resource_type=video.
    const paramsToSign = `folder=${folder}&public_id=${publicId}&tags=${tags}&timestamp=${timestamp}${apiSecret}`;
    const signature = createHash('sha1').update(paramsToSign).digest('hex');

    const buffer = Buffer.from(await file.arrayBuffer());
    const signedForm = new FormData();
    signedForm.append(
      'file',
      new Blob([buffer], { type: file.type || 'application/octet-stream' }),
      file.name || `${kind}.webm`
    );
    signedForm.append('api_key', apiKey);
    signedForm.append('timestamp', String(timestamp));
    signedForm.append('signature', signature);
    signedForm.append('folder', folder);
    signedForm.append('public_id', publicId);
    signedForm.append('tags', tags);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
      { method: 'POST', body: signedForm }
    );

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('AV upload error:', errorText);
      return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 });
    }

    const result = await uploadResponse.json();
    return NextResponse.json({
      kind,
      url: result.secure_url as string,
      publicId: result.public_id as string,
      format: result.format as string,
      bytes: result.bytes as number,
      duration: result.duration as number | undefined,
      resourceType: result.resource_type as string,
    });
  } catch (error) {
    console.error('AV upload failed:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
