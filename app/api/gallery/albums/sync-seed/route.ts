import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { syncGalleryAlbumSeeds } from '@/lib/admin/gallery-albums-sync';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authError = requireAdminSession(request);
  if (authError) return authError;

  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'SUPABASE_SERVICE_ROLE_KEY is not configured' },
        { status: 503 }
      );
    }

    const result = await syncGalleryAlbumSeeds(getSupabaseServer());

    return NextResponse.json(
      {
        success: result.failed === 0,
        ...result,
      },
      { status: result.failed === 0 ? 200 : 207 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to sync albums';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
