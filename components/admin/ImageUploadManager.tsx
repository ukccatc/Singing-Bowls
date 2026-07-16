'use client';

import { MediaStorageStatus } from '@/components/admin/MediaStorageStatus';
import { Button } from '@/components/ui/button';
import { APP_MEDIA_LIMITS, formatBytes } from '@/lib/media/storage';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import {
  Check,
  Copy,
  ExternalLink,
  ImageIcon,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface LibraryImage {
  url: string;
  publicId: string;
  name: string;
  uploadedAt: string;
  bytes: number;
  format: string;
  width: number;
  height: number;
  folder: string;
}

type SortKey = 'newest' | 'oldest' | 'name' | 'size';

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat('en', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function ImageUploadManager() {
  const [images, setImages] = useState<LibraryImage[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [folder, setFolder] = useState<string>('all');
  const [sort, setSort] = useState<SortKey>('newest');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [preview, setPreview] = useState<LibraryImage | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const loadImages = useCallback(async (opts?: { silent?: boolean }) => {
    if (opts?.silent) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await fetch('/api/cloudinary/list');
      if (!response.ok) throw new Error('Failed to load images');
      const data = await response.json();
      setImages(data.images || []);
      setFolders(data.folders || []);
      setSelected(new Set());
    } catch (error) {
      console.error('Failed to load images:', error);
      setStatus('Could not load media library.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const handleUploadSuccess = () => {
    setStatus('Upload complete. Refreshing library…');
    void loadImages({ silent: true }).then(() => {
      setStatus('Library updated.');
      setTimeout(() => setStatus(null), 2500);
    });
  };

  const deleteIds = async (publicIds: string[]) => {
    if (publicIds.length === 0) return;
    const label =
      publicIds.length === 1
        ? 'Delete this image from Cloudinary?'
        : `Delete ${publicIds.length} images from Cloudinary?`;
    if (!confirm(label)) return;

    setDeleting(true);
    try {
      const results = await Promise.all(
        publicIds.map(async (publicId) => {
          const response = await fetch('/api/cloudinary/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicId }),
          });
          return response.ok;
        })
      );

      const ok = results.filter(Boolean).length;
      await loadImages({ silent: true });
      setStatus(
        ok === publicIds.length
          ? `Deleted ${ok} image${ok === 1 ? '' : 's'}.`
          : `Deleted ${ok} of ${publicIds.length} images.`
      );
      setPreview(null);
    } catch (error) {
      console.error('Delete failed:', error);
      setStatus('Delete failed.');
    } finally {
      setDeleting(false);
    }
  };

  const copyText = async (value: string, id: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setStatus('Could not copy to clipboard.');
    }
  };

  const toggleSelected = (publicId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(publicId)) next.delete(publicId);
      else next.add(publicId);
      return next;
    });
  };

  const visibleImages = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = images.filter((image) => {
      if (folder !== 'all' && image.folder !== folder) return false;
      if (!q) return true;
      return (
        image.name.toLowerCase().includes(q) ||
        image.publicId.toLowerCase().includes(q) ||
        image.folder.toLowerCase().includes(q)
      );
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          return (b.bytes || 0) - (a.bytes || 0);
        case 'newest':
        default:
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      }
    });

    return list;
  }, [images, query, folder, sort]);

  const allVisibleSelected =
    visibleImages.length > 0 && visibleImages.every((img) => selected.has(img.publicId));

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-900">Media Library</h1>
          <p className="mt-1 text-charcoal-600">
            Upload and manage images on {APP_MEDIA_LIMITS.provider}. Use them for products,
            gallery, and articles.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => loadImages({ silent: true })}
            disabled={refreshing || loading}
            className={ui.button.outlineNeutral}
          >
            <RefreshCw className={cn('mr-2 h-4 w-4', refreshing && 'animate-spin')} />
            Refresh
          </Button>
          <Button variant="outline" asChild>
            <a
              href={APP_MEDIA_LIMITS.providerUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Cloudinary
            </a>
          </Button>
        </div>
      </div>

      <MediaStorageStatus />

      {status ? <div className={ui.banner.info}>{status}</div> : null}

      <div className={cn(ui.card, 'space-y-4')}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-charcoal-900">Upload images</h2>
            <p className="mt-1 text-sm text-charcoal-600">
              Formats: {APP_MEDIA_LIMITS.allowedFormats.join(', ').toUpperCase()} · Max{' '}
              {formatBytes(APP_MEDIA_LIMITS.maxUploadBytes)} per file · Folder{' '}
              <code className="rounded bg-cream-100 px-1">{APP_MEDIA_LIMITS.productsFolder}</code>
            </p>
          </div>
        </div>

        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={handleUploadSuccess}
          options={{
            multiple: true,
            maxFiles: 20,
            resourceType: 'image',
            clientAllowedFormats: [...APP_MEDIA_LIMITS.allowedFormats],
            maxFileSize: APP_MEDIA_LIMITS.maxUploadBytes,
            folder: APP_MEDIA_LIMITS.productsFolder,
            sources: ['local', 'url', 'camera'],
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open?.()}
              className={cn(
                ui.button.primaryGradient,
                'flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold shadow-md'
              )}
            >
              <Upload className="h-5 w-5" />
              Upload images
            </button>
          )}
        </CldUploadWidget>
      </div>

      <div className={cn(ui.card, 'space-y-4')}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-lg border border-cream-200 bg-cream-50 px-3 py-2 text-sm text-charcoal-700">
              <span className="font-semibold text-charcoal-900">{images.length}</span> in library
              {visibleImages.length !== images.length ? (
                <>
                  {' '}
                  · <span className="font-semibold text-charcoal-900">{visibleImages.length}</span>{' '}
                  shown
                </>
              ) : null}
            </div>
            {selected.size > 0 ? (
              <Button
                size="sm"
                className={ui.button.danger}
                disabled={deleting}
                onClick={() => deleteIds(Array.from(selected))}
              >
                {deleting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                Delete selected ({selected.size})
              </Button>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="relative block min-w-[220px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, folder, id…"
                className={cn(
                  'w-full rounded-lg border border-cream-300 bg-white py-2 pl-9 pr-3 text-sm',
                  ui.focus
                )}
              />
            </label>
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className={cn('rounded-lg border border-cream-300 bg-white px-3 py-2 text-sm', ui.focus)}
            >
              <option value="all">All folders</option>
              {folders.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className={cn('rounded-lg border border-cream-300 bg-white px-3 py-2 text-sm', ui.focus)}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Name A–Z</option>
              <option value="size">Largest first</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-cream-100" />
            ))}
          </div>
        ) : visibleImages.length === 0 ? (
          <div className="rounded-xl border border-dashed border-cream-300 bg-cream-50 px-6 py-14 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-100">
              <ImageIcon className="h-7 w-7 text-gold-700" />
            </div>
            <p className="font-medium text-charcoal-800">No images found</p>
            <p className="mt-1 text-sm text-charcoal-500">
              {images.length === 0
                ? 'Upload your first image to get started.'
                : 'Try another search or folder filter.'}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm text-charcoal-600">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={() => {
                    if (allVisibleSelected) {
                      setSelected(new Set());
                    } else {
                      setSelected(new Set(visibleImages.map((img) => img.publicId)));
                    }
                  }}
                  className="rounded border-cream-300 text-gold-600 focus:ring-gold-500"
                />
                Select all shown
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleImages.map((image) => {
                const isSelected = selected.has(image.publicId);
                return (
                  <div
                    key={image.publicId}
                    className={cn(
                      'overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md',
                      isSelected ? ui.selection.selected : 'border-cream-200'
                    )}
                  >
                    <div className="relative aspect-[4/3] bg-cream-100">
                      <button
                        type="button"
                        className="absolute inset-0"
                        onClick={() => setPreview(image)}
                        aria-label={`Preview ${image.name}`}
                      >
                        <Image
                          src={image.url}
                          alt={image.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </button>
                      <label
                        className="absolute left-2 top-2 z-10 inline-flex items-center rounded-md bg-white/95 px-2 py-1 shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelected(image.publicId)}
                          className="rounded border-cream-300 text-gold-600 focus:ring-gold-500"
                        />
                      </label>
                      {image.format ? (
                        <span className="absolute right-2 top-2 rounded bg-charcoal-800/80 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                          {image.format}
                        </span>
                      ) : null}
                    </div>

                    <div className="space-y-3 p-3">
                      <div>
                        <p className="truncate text-sm font-semibold text-charcoal-900" title={image.name}>
                          {image.name}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-charcoal-500" title={image.folder}>
                          {image.folder}
                        </p>
                        <p className="mt-1 text-xs text-charcoal-500">
                          {image.width && image.height
                            ? `${image.width}×${image.height} · `
                            : null}
                          {formatBytes(image.bytes)} · {formatDate(image.uploadedAt)}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => copyText(image.url, `url-${image.publicId}`)}
                          className={cn(
                            ui.button.outlineNeutral,
                            'inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium'
                          )}
                        >
                          {copiedId === `url-${image.publicId}` ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                          URL
                        </button>
                        <button
                          type="button"
                          onClick={() => copyText(image.publicId, `id-${image.publicId}`)}
                          className={cn(
                            ui.button.outlineNeutral,
                            'inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium'
                          )}
                        >
                          {copiedId === `id-${image.publicId}` ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                          ID
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreview(image)}
                          className={cn(
                            ui.button.secondary,
                            'inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium'
                          )}
                        >
                          Preview
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteIds([image.publicId])}
                          disabled={deleting}
                          className={cn(
                            ui.button.dangerOutline,
                            'inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium disabled:opacity-50'
                          )}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {preview ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/70 p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-cream-200 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-charcoal-900">{preview.name}</p>
                <p className="truncate text-xs text-charcoal-500">{preview.publicId}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="rounded-lg p-2 text-charcoal-600 hover:bg-cream-100"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative aspect-[16/10] bg-cream-100">
              <Image
                src={preview.url}
                alt={preview.name}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cream-200 px-4 py-3">
              <p className="text-sm text-charcoal-600">
                {preview.width && preview.height
                  ? `${preview.width}×${preview.height} · `
                  : null}
                {formatBytes(preview.bytes)} · {formatDate(preview.uploadedAt)}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className={ui.button.outlineNeutral}
                  onClick={() => copyText(preview.url, `preview-url-${preview.publicId}`)}
                >
                  Copy URL
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href={preview.url} target="_blank" rel="noreferrer">
                    Open original
                  </a>
                </Button>
                <Button
                  size="sm"
                  className={ui.button.danger}
                  disabled={deleting}
                  onClick={() => deleteIds([preview.publicId])}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
