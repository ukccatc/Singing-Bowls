'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProductImagePickerProps {
  onSelect: (url: string) => void;
}

export function ProductImagePicker({ onSelect }: ProductImagePickerProps) {
  const [images, setImages] = useState<Array<{ url: string; publicId: string; name: string }>>([]);
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

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-3">Select from Media Library</h3>

      {loading ? (
        <p className="text-gray-600">Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-gray-600">No images in media library. Upload some first.</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
          {images.map((image) => (
            <button
              key={image.publicId}
              type="button"
              onClick={() => onSelect(image.url)}
              className="relative h-20 rounded-lg overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-colors"
            >
              <Image src={image.url} alt={image.name} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
