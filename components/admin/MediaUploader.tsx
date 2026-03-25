'use client';

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
      <h1 className="text-3xl font-bold mb-6">Media Manager</h1>

      {/* Upload Widget */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={handleUploadSuccess}
        >
          {({ open }) => (
            <button
              onClick={() => open()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Upload Image
            </button>
          )}
        </CldUploadWidget>
        <p className="text-gray-600 mt-2 text-sm">
          Supported formats: JPG, PNG, WebP, GIF (Max 100MB)
        </p>
      </div>

      {/* Images Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Uploaded Images ({images.length})
        </h2>

        {images.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No images uploaded yet. Start by uploading your first image.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.publicId}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-100">
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-900 truncate mb-3">
                    {image.name}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(image.url)}
                      className="flex-1 px-3 py-2 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      Copy URL
                    </button>
                    <button
                      onClick={() => handleDelete(image.publicId)}
                      disabled={loading}
                      className="flex-1 px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>

                  {/* URL Display */}
                  <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600 break-all">
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
