import { requireAdminSession } from '@/lib/auth/require-admin-session';
import { APP_MEDIA_LIMITS } from '@/lib/media/storage';
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

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || null;

  try {
    const usage = await cloudinary.api.usage();

    const storageUsage = Number(usage.storage?.usage ?? 0);
    const bandwidthUsage = Number(usage.bandwidth?.usage ?? 0);
    const creditsUsage = Number(usage.credits?.usage ?? 0);
    const creditsLimit = Number(usage.credits?.limit ?? 0);
    const creditsPercent = Number(usage.credits?.used_percent ?? 0);
    const resources = Number(usage.resources ?? usage.objects?.usage ?? 0);
    const imageMaxBytes = Number(
      usage.media_limits?.image_max_size_bytes ?? APP_MEDIA_LIMITS.maxUploadBytes
    );

    return NextResponse.json({
      success: true,
      data: {
        provider: APP_MEDIA_LIMITS.provider,
        providerUrl: APP_MEDIA_LIMITS.providerUrl,
        cloudName,
        plan: usage.plan || 'Unknown',
        lastUpdated: usage.last_updated || null,
        credits: {
          usage: creditsUsage,
          limit: creditsLimit,
          usedPercent: creditsPercent,
          unit: 'credits',
        },
        storage: {
          usageBytes: storageUsage,
          // Free/credits plans often omit a hard storage.limit; credits.limit is the plan cap.
          limitBytes: creditsLimit > 0 ? creditsLimit * 1024 ** 3 : null,
          usedPercent:
            creditsLimit > 0
              ? Math.min(100, (storageUsage / (creditsLimit * 1024 ** 3)) * 100)
              : null,
        },
        bandwidth: {
          usageBytes: bandwidthUsage,
          limitBytes: creditsLimit > 0 ? creditsLimit * 1024 ** 3 : null,
        },
        resources,
        limits: {
          appMaxUploadBytes: APP_MEDIA_LIMITS.maxUploadBytes,
          cloudinaryImageMaxBytes: imageMaxBytes,
          folder: APP_MEDIA_LIMITS.galleryFolder,
        },
      },
    });
  } catch (error) {
    console.error('Cloudinary usage error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load Cloudinary usage',
        data: {
          provider: APP_MEDIA_LIMITS.provider,
          providerUrl: APP_MEDIA_LIMITS.providerUrl,
          cloudName,
          plan: null,
          lastUpdated: null,
          credits: null,
          storage: null,
          bandwidth: null,
          resources: null,
          limits: {
            appMaxUploadBytes: APP_MEDIA_LIMITS.maxUploadBytes,
            cloudinaryImageMaxBytes: APP_MEDIA_LIMITS.maxUploadBytes,
            folder: APP_MEDIA_LIMITS.galleryFolder,
          },
        },
      },
      { status: 200 }
    );
  }
}
