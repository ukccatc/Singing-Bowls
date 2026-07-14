'use client';

import { GalleryCategory } from '@/lib/supabase/gallery';
import { Button } from '@/components/ui/button';
import { Edit2, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface GalleryImage {
  id: string;
  image_url: string;
  title: { en: string; ru: string; uk?: string };
  description: { en: string; ru: string; uk?: string };
  display_order: number;
  is_active: boolean;
  category?: GalleryCategory | null;
}

const GALLERY_CATEGORIES: GalleryCategory[] = [
  'meditation',
  'workshop',
  'retreat',
  'ceremony',
];

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
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [editForm, setEditForm] = useState({
    title: { en: '', ru: '', uk: '' },
    description: { en: '', ru: '', uk: '' },
    display_order: 0,
    category: 'meditation' as GalleryCategory,
  });
  const [newCategory, setNewCategory] = useState<GalleryCategory>('meditation');

  useEffect(() => {
    loadGalleryImages();
    loadCloudinaryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      const response = await fetch('/api/gallery?all=true');
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
          category: newCategory,
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

  const openEdit = (img: GalleryImage) => {
    setEditingImage(img);
    setEditForm({
      title: {
        en: img.title.en || '',
        ru: img.title.ru || '',
        uk: img.title.uk || '',
      },
      description: {
        en: img.description.en || '',
        ru: img.description.ru || '',
        uk: img.description.uk || '',
      },
      display_order: img.display_order,
      category: img.category || 'meditation',
    });
  };

  const handleSaveEdit = async () => {
    if (!editingImage) return;

    try {
      const response = await fetch(`/api/gallery/${editingImage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const data = await response.json();
        setGalleryImages(
          galleryImages
            .map((img) => (img.id === editingImage.id ? data.data : img))
            .sort((a, b) => a.display_order - b.display_order)
        );
        setEditingImage(null);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update gallery item');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
        Photos appear on the public gallery. Group them into event albums on the{' '}
        <strong>Albums</strong> tab.
      </div>

      {/* Add Image Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as GalleryCategory)}
                className="w-full max-w-xs rounded-lg border px-3 py-2"
              >
                {GALLERY_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={() => setShowImagePicker(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
            <Plus className="w-4 h-4 mr-2" />
            Select Image from Cloudinary
          </Button>
          </div>
        )}
      </div>

      {/* Edit dialog */}
      {editingImage && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Edit Gallery Item</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {(['en', 'ru', 'uk'] as const).map((lang) => (
              <div key={lang}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title ({lang.toUpperCase()})
                </label>
                <input
                  value={editForm.title[lang] || ''}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      title: { ...prev.title, [lang]: e.target.value },
                    }))
                  }
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {(['en', 'ru', 'uk'] as const).map((lang) => (
              <div key={lang}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description ({lang.toUpperCase()})
                </label>
                <textarea
                  value={editForm.description[lang] || ''}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      description: { ...prev.description, [lang]: e.target.value },
                    }))
                  }
                  rows={3}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>
            ))}
          </div>
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={editForm.category}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  category: e.target.value as GalleryCategory,
                }))
              }
              className="w-full rounded-lg border px-3 py-2"
            >
              {GALLERY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">Display order</label>
            <input
              type="number"
              value={editForm.display_order}
              onChange={(e) =>
                setEditForm((prev) => ({ ...prev, display_order: Number(e.target.value) }))
              }
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSaveEdit} className="bg-green-600 hover:bg-green-700">
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => setEditingImage(null)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Gallery Images */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
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
                    {img.category ? ` · ${img.category}` : ''}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    onClick={() => openEdit(img)}
                    className="bg-gray-600 hover:bg-gray-700"
                    size="sm"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
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
