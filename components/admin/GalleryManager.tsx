'use client';

import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface GalleryImage {
  id: string;
  image_url: string;
  title: { en: string; ru: string; uk?: string };
  description: { en: string; ru: string; uk?: string };
  display_order: number;
  is_active: boolean;
}

interface CloudinaryImage {
  url: string;
  publicId: string;
  name: string;
}

export function GalleryManager() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [cloudinaryImages, setCloudinaryImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(null);

  useEffect(() => {
    loadGalleryImages();
    loadCloudinaryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        setGalleryImages(data.data || []);
      }
    } catch (error) {
      console.error('Failed to load gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCloudinaryImages = async () => {
    try {
      const response = await fetch('/api/cloudinary/list');
      if (response.ok) {
        const data = await response.json();
        setCloudinaryImages(data.images || []);
      }
    } catch (error) {
      console.error('Failed to load images:', error);
    }
  };

  const handleAddImage = async () => {
    if (!selectedImage) return;

    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: selectedImage.url,
          title: { en: selectedImage.name, ru: selectedImage.name, uk: selectedImage.name },
          description: { en: '', ru: '', uk: '' },
          display_order: galleryImages.length,
          is_active: true,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGalleryImages([...galleryImages, data.data]);
        setSelectedImage(null);
        setShowImagePicker(false);
        alert('Image added to gallery!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add image');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove from gallery?')) return;

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGalleryImages(galleryImages.filter((img) => img.id !== id));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !isActive }),
      });

      if (response.ok) {
        setGalleryImages(
          galleryImages.map((img) =>
            img.id === id ? { ...img, is_active: !isActive } : img
          )
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Gallery Manager</h1>

      {/* Add Image Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Images to Gallery</h2>

        {showImagePicker ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-96 overflow-y-auto">
              {cloudinaryImages.map((img) => (
                <button
                  key={img.publicId}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage?.publicId === img.publicId
                      ? 'border-blue-600 ring-2 ring-blue-400'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleAddImage}
                disabled={!selectedImage}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Selected Image
              </Button>
              <Button
                onClick={() => {
                  setShowImagePicker(false);
                  setSelectedImage(null);
                }}
                className="bg-gray-600 hover:bg-gray-700"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setShowImagePicker(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Select Image from Cloudinary
          </Button>
        )}
      </div>

      {/* Gallery Images */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Gallery Images ({galleryImages.length})
        </h2>

        {galleryImages.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No images in gallery yet</p>
        ) : (
          <div className="space-y-4">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className={`flex gap-4 p-4 rounded-lg border ${
                  img.is_active
                    ? 'border-gray-200 bg-white'
                    : 'border-gray-300 bg-gray-50 opacity-60'
                }`}
              >
                {/* Image */}
                <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={img.image_url}
                    alt={img.title.en}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{img.title.en}</h3>
                  <p className="text-sm text-gray-600">{img.title.ru}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Order: {img.display_order}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    onClick={() => handleToggleActive(img.id, img.is_active)}
                    className={img.is_active ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}
                    size="sm"
                  >
                    {img.is_active ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    onClick={() => handleDelete(img.id)}
                    className="bg-red-600 hover:bg-red-700"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
