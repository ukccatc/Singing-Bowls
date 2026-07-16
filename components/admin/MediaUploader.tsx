'use client';

import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';

interface UploadedImage {
  url: string;
  publicId: string;
  name: string;
}

export function MediaUploader() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUploadSuccess = (result: any) => {
    const newImage: UploadedImage = {
      url: result.info.secure_url,
      publicId: result.info.public_id,
      name: result.info.original_filename,
    };
    setImages([...images, newImage]);
  };

  const handleDelete = async (publicId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/cloudinary/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });

      if (response.ok) {
        setImages(images.filter((img) => img.publicId !== publicId));
      }
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Image URL copied to clipboard!');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className={`mb-6 ${ui.page.title}`}>Media Manager</h1>

      {/* Upload Widget */}
      <div className="mb-8 p-6 bg-cream-50 rounded-lg border-2 border-dashed border-cream-300">
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={handleUploadSuccess}
        >
          {({ open }) => (
            <button
              onClick={() => open()}
              className={cn(ui.button.primary, 'rounded-lg px-6 py-3 font-semibold transition-colors')}
            >
              Upload Image
            </button>
          )}
        </CldUploadWidget>
        <p className={`mt-2 text-sm ${ui.page.subtitle}`}>
          Supported formats: JPG, PNG, WebP, GIF (Max 100MB)
        </p>
      </div>

      {/* Images Grid */}
      <div>
        <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">
          Uploaded Images ({images.length})
        </h2>

        {images.length === 0 ? (
          <p className={`text-center py-8 ${ui.page.subtitle}`}>
            No images uploaded yet. Start by uploading your first image.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.publicId}
                className={cn(ui.card, 'overflow-hidden p-0 hover:shadow-md transition-shadow')}
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-cream-100">
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-sm font-medium text-charcoal-900 truncate mb-3">
                    {image.name}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(image.url)}
                      className={cn(ui.button.outlineNeutral, 'flex-1 rounded px-3 py-2 text-sm transition-colors')}
                    >
                      Copy URL
                    </button>
                    <button
                      onClick={() => handleDelete(image.publicId)}
                      disabled={loading}
                      className={cn(ui.button.danger, 'flex-1 rounded px-3 py-2 text-sm transition-colors disabled:opacity-50')}
                    >
                      Delete
                    </button>
                  </div>

                  {/* URL Display */}
                  <div className="mt-3 p-2 bg-cream-50 rounded text-xs text-charcoal-600 break-all">
                    {image.url}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
