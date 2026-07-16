import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type CloudinaryResource = {
  secure_url: string;
  public_id: string;
  original_filename?: string;
  created_at: string;
  bytes?: number;
  format?: string;
  width?: number;
  height?: number;
  resource_type?: string;
  folder?: string;
};

function folderFromPublicId(publicId: string, folder?: string): string {
  if (folder) return folder;
  const parts = publicId.split('/');
  if (parts.length <= 1) return '(root)';
  return parts.slice(0, -1).join('/');
}

export async function GET(request: NextRequest) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    const resources: CloudinaryResource[] = [];
    let nextCursor: string | undefined;

    // Paginate so the library is not capped at the first 500 only when more exist.
    do {
      const result = await cloudinary.api.resources({
        type: 'upload',
        resource_type: 'image',
        max_results: 500,
        next_cursor: nextCursor,
      });

      resources.push(...((result.resources || []) as CloudinaryResource[]));
      nextCursor = result.next_cursor;
    } while (nextCursor && resources.length < 2000);

    const images = resources.map((resource) => {
      const folder = folderFromPublicId(resource.public_id, resource.folder);
      const name =
        resource.original_filename ||
        resource.public_id.split('/').pop() ||
        resource.public_id;

      return {
        url: resource.secure_url,
        publicId: resource.public_id,
        name,
        uploadedAt: resource.created_at,
        bytes: resource.bytes ?? 0,
        format: resource.format || '',
        width: resource.width ?? 0,
        height: resource.height ?? 0,
        folder,
      };
    });

    const folders = Array.from(new Set(images.map((image) => image.folder))).sort();

    return NextResponse.json(
      {
        success: true,
        images,
        folders,
        total: images.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('List error:', error);
    return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
  }
}
