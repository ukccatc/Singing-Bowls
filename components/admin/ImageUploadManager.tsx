'use client';

import { createClient } from '@supabase/supabase-js';
import { Check, Copy, Trash2 } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface UploadedImage {
  url: string;
  publicId: string;
  name: string;
  uploadedAt: string;
}

export function ImageUploadManager() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'recent'>('all');

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const response = await fetch('/api/cloudinary/list');
      if (response.ok) {
        const data = await response.json();
        setImages(data.images || []);
      }
    } catch (error) {
      console.error('Failed to load images:', error);
    }
  };

  const handleUploadSuccess = (result: any) => {
    const newImage: UploadedImage = {
      url: result.info.secure_url,
      publicId: result.info.public_id,
      name: result.info.original_filename || 'Untitled',
      uploadedAt: new Date().toISOString(),
    };
    setImages([newImage, ...images]);
  };

  const handleDelete = async (publicId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    setLoading(true);
    try {
      const response = await fetch('/api/cloudinary/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
      });

      if (response.ok) {
        setImages(images.filter((img) => img.publicId !== publicId));
      } else {
        alert('Failed to delete image');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Error deleting image');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredImages = filter === 'recent' ? images.slice(0, 10) : images;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Media Library</h1>
          <p className="text-gray-600">Manage your product images and media files</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Upload Images</h2>
              <p className="text-gray-600 text-sm mt-1">
                Drag and drop or click to upload product images
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
              clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
              folder: 'himalayan-sound/products',
            }}
          >
            {({ open }) => (
              <button
                onClick={() => open()}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                + Upload Images
              </button>
            )}
          </CldUploadWidget>

          <p className="text-gray-500 text-xs mt-4">
            Supported formats: JPG, PNG, WebP, GIF • Max 100MB per file
          </p>
        </div>

        {/* Stats & Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                Total Images: <span className="font-semibold text-gray-900">{images.length}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('recent')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'recent'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              Recent
            </button>
          </div>
        </div>

        {/* Images Grid */}
        {filteredImages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">No images yet</p>
            <p className="text-gray-500 text-sm mt-1">
              Upload your first image to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.publicId}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Image Container */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Name */}
                  <p className="text-sm font-medium text-gray-900 truncate mb-3 hover:text-blue-600">
                    {image.name}
                  </p>

                  {/* URL Display */}
                  <div className="mb-4 p-2 bg-gray-50 rounded text-xs text-gray-600 break-all font-mono line-clamp-2">
                    {image.url}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(image.url, image.publicId)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      {copiedId === image.publicId ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(image.publicId)}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
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
