'use client';

import { ProductImagePicker } from '@/components/admin/ProductImagePicker';
import type { AdminProductImageFormData } from '@/lib/admin/product-form-schema';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { Star, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProductImagesFieldProps {
  images: AdminProductImageFormData[];
  onChange: (images: AdminProductImageFormData[]) => void;
  error?: string;
}

export function ProductImagesField({ images, onChange, error }: ProductImagesFieldProps) {
  const [showPicker, setShowPicker] = useState(false);

  const selectedUrls = images.map((image) => image.url);

  const addImage = (url: string) => {
    if (images.some((image) => image.url === url)) return;

    const next: AdminProductImageFormData[] = [
      ...images,
      {
        id: `img-${Date.now()}-${images.length}`,
        url,
        isPrimary: images.length === 0,
      },
    ];
    onChange(next);
  };

  const removeImage = (url: string) => {
    const remaining = images.filter((image) => image.url !== url);
    if (remaining.length === 0) {
      onChange([]);
      return;
    }

    if (!remaining.some((image) => image.isPrimary)) {
      remaining[0] = { ...remaining[0], isPrimary: true };
    }
    onChange(remaining);
  };

  const setPrimary = (url: string) => {
    onChange(
      images.map((image) => ({
        ...image,
        isPrimary: image.url === url,
      }))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-charcoal-900">Product Images</h2>
          <p className={`mt-1 text-sm ${ui.page.subtitle}`}>
            Add several photos for the product gallery. Mark one as primary — it appears in
            listings and as the default detail image.
          </p>
        </div>
        <span className={cn('shrink-0 rounded-full px-3 py-1 text-sm font-medium', ui.badge.muted)}>
          {images.length} {images.length === 1 ? 'image' : 'images'}
        </span>
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id || image.url}
              className={cn(
                'relative overflow-hidden rounded-xl border-2 bg-cream-100',
                image.isPrimary ? ui.selection.selected : 'border-cream-200'
              )}
            >
              <div className="relative aspect-square">
                <Image src={image.url} alt="Product" fill className="object-cover" />
              </div>

              {image.isPrimary && (
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-gold-600 px-2 py-0.5 text-xs font-semibold text-white">
                  <Star className="h-3 w-3 fill-current" />
                  Primary
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 flex gap-1 bg-gradient-to-t from-black/70 to-transparent p-2 pt-8">
                {!image.isPrimary && (
                  <button
                    type="button"
                    onClick={() => setPrimary(image.url)}
                    className="flex-1 rounded-md bg-white/95 px-2 py-1.5 text-xs font-medium text-charcoal-900 hover:bg-white"
                  >
                    Set primary
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(image.url)}
                  className={cn(ui.button.danger, 'rounded-md p-1.5')}
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-cream-300 bg-cream-50">
          <div className="text-center">
            <Upload className="mx-auto mb-2 h-10 w-10 text-charcoal-400" />
            <p className="text-charcoal-600">No images yet</p>
            <p className="mt-1 text-sm text-charcoal-500">Select from the media library</p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowPicker((open) => !open)}
        className={cn(ui.button.primary, 'w-full rounded-lg px-4 py-2.5 font-medium')}
      >
        {showPicker ? 'Hide media library' : 'Add images from media library'}
      </button>

      {showPicker && (
        <ProductImagePicker
          onSelect={addImage}
          selectedUrls={selectedUrls}
          title="Click images to add them to this product"
        />
      )}

      {error && <p className="text-sm text-copper-700">{error}</p>}
    </div>
  );
}
