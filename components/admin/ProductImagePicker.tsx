'use client';

import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProductImagePickerProps {
  onSelect: (url: string) => void;
  selectedUrls?: string[];
  title?: string;
}

export function ProductImagePicker({
  onSelect,
  selectedUrls = [],
  title = 'Select from Media Library',
}: ProductImagePickerProps) {
  const [images, setImages] = useState<Array<{ url: string; publicId: string; name: string }>>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch('/api/cloudinary/list');
        if (response.ok) {
          const data = await response.json();
          setImages(data.images || []);
        }
      } catch (error) {
        console.error('Failed to load images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const selected = new Set(selectedUrls);

  return (
    <div className="mt-4 rounded-lg border border-cream-200 bg-cream-50 p-4">
      <h3 className="mb-3 font-semibold text-charcoal-900">{title}</h3>

      {loading ? (
        <p className={ui.page.subtitle}>Loading images...</p>
      ) : images.length === 0 ? (
        <p className={ui.page.subtitle}>No images in media library. Upload some first.</p>
      ) : (
        <div className="grid max-h-72 grid-cols-3 gap-3 overflow-y-auto md:grid-cols-4">
          {images.map((image) => {
            const isSelected = selected.has(image.url);
            return (
              <button
                key={image.publicId}
                type="button"
                onClick={() => onSelect(image.url)}
                disabled={isSelected}
                className={cn(
                  'relative h-20 overflow-hidden rounded-lg border-2 transition-colors',
                  isSelected
                    ? cn(ui.selection.selected, 'cursor-default opacity-70')
                    : ui.selection.idle
                )}
              >
                <Image src={image.url} alt={image.name} fill className="object-cover" />
                {isSelected && (
                  <span className="absolute inset-x-0 bottom-0 bg-gold-600/90 py-0.5 text-center text-[10px] font-semibold text-white">
                    Added
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
