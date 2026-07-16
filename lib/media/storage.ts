/** App-level media storage rules (enforced in upload routes). */
export const APP_MEDIA_LIMITS = {
  provider: 'Cloudinary',
  providerUrl: 'https://cloudinary.com/console',
  maxUploadBytes: 10 * 1024 * 1024, // 10 MB — matches upload-cdn / Cloudinary free image max
  maxAudioBytes: 20 * 1024 * 1024, // 20 MB
  maxVideoBytes: 80 * 1024 * 1024, // 80 MB
  galleryFolder: 'himalayan-sound',
  productsFolder: 'himalayan-sound/products',
  audioFolder: 'himalayan-sound/audio',
  videoFolder: 'himalayan-sound/video',
  allowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'] as const,
  allowedAudioFormats: ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'webm'] as const,
  allowedVideoFormats: ['mp4', 'webm', 'mov', 'm4v'] as const,
} as const;

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '—';
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'] as const;
  const exp = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exp;
  return `${value.toFixed(value >= 10 || exp === 0 ? 0 : 1)} ${units[exp]}`;
}

export function formatPercent(value: number | undefined | null): string {
  if (value == null || !Number.isFinite(value)) return '—';
  return `${Math.max(0, value).toFixed(1)}%`;
}
