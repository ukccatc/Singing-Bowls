import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 500,
    });

    const images = result.resources.map((resource: {
      secure_url: string;
      public_id: string;
      original_filename?: string;
      created_at: string;
    }) => ({
      url: resource.secure_url,
      publicId: resource.public_id,
      name: resource.original_filename || resource.public_id.split('/').pop(),
      uploadedAt: resource.created_at,
    }));

    return NextResponse.json({ success: true, images }, { status: 200 });
  } catch (error) {
    console.error('List error:', error);
    return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
  }
}
