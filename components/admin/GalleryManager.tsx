'use client';

import { Button } from '@/components/ui/button';
import { GalleryCategory } from '@/lib/supabase/gallery';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
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
    return <div className={cn('p-8 text-center', ui.page.subtitle)}>Loading...</div>;
  }

  const fieldClass = cn(ui.field, ui.focus, 'px-3');

  return (
    <div className="space-y-6">
      <div className={ui.banner.info}>
        Photos appear on the public gallery. Group them into event albums on the{' '}
        <strong>Albums</strong> tab.
      </div>

      {/* Add Image Section */}
      <div className={ui.card}>
        <h2 className="mb-4 text-xl font-semibold text-charcoal-900">Add Images to Gallery</h2>

        {showImagePicker ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-96 overflow-y-auto">
              {cloudinaryImages.map((img) => (
                <button
                  key={img.publicId}
                  onClick={() => setSelectedImage(img)}
                  className={cn(
                    'relative h-24 overflow-hidden rounded-lg border-2 transition-all',
                    selectedImage?.publicId === img.publicId
                      ? ui.selection.selected
                      : ui.selection.idle
                  )}
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
                className={cn(ui.button.primary, 'disabled:opacity-50')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Selected Image
              </Button>
              <Button
                onClick={() => {
                  setShowImagePicker(false);
                  setSelectedImage(null);
                }}
                variant="outline"
                className={ui.button.outlineNeutral}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className={ui.labelSm}>Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as GalleryCategory)}
                className={cn(fieldClass, 'max-w-xs')}
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
              className={ui.button.primary}
            >
            <Plus className="w-4 h-4 mr-2" />
            Select Image from Cloudinary
          </Button>
          </div>
        )}
      </div>

      {/* Edit dialog */}
      {editingImage && (
        <div className={cn(ui.card, 'space-y-4')}>
          <h2 className="text-xl font-semibold text-charcoal-900">Edit Gallery Item</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {(['en', 'ru', 'uk'] as const).map((lang) => (
              <div key={lang}>
                <label className={ui.labelSm}>
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
                  className={fieldClass}
                />
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {(['en', 'ru', 'uk'] as const).map((lang) => (
              <div key={lang}>
                <label className={ui.labelSm}>
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
                  className={fieldClass}
                />
              </div>
            ))}
          </div>
          <div className="w-48">
            <label className={ui.labelSm}>Category</label>
            <select
              value={editForm.category}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  category: e.target.value as GalleryCategory,
                }))
              }
              className={fieldClass}
            >
              {GALLERY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="w-32">
            <label className={ui.labelSm}>Display order</label>
            <input
              type="number"
              value={editForm.display_order}
              onChange={(e) =>
                setEditForm((prev) => ({ ...prev, display_order: Number(e.target.value) }))
              }
              className={fieldClass}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSaveEdit} className={ui.button.primary}>
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => setEditingImage(null)}
              className={ui.button.outlineNeutral}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Gallery Images */}
      <div className={ui.card}>
        <h2 className="mb-4 text-xl font-semibold text-charcoal-900">
          Gallery Images ({galleryImages.length})
        </h2>

        {galleryImages.length === 0 ? (
          <p className={cn('py-8 text-center', ui.page.subtitle)}>No images in gallery yet</p>
        ) : (
          <div className="space-y-4">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className={cn(
                  'flex gap-4 rounded-lg border p-4',
                  img.is_active
                    ? 'border-cream-200 bg-white'
                    : 'border-cream-300 bg-cream-50 opacity-60'
                )}
              >
                {/* Image */}
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-cream-100">
                  <Image
                    src={img.image_url}
                    alt={img.title.en}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-charcoal-900">{img.title.en}</h3>
                  <p className="text-sm text-charcoal-600">{img.title.ru}</p>
                  <p className="mt-1 text-xs text-charcoal-500">
                    Order: {img.display_order}
                    {img.category ? ` · ${img.category}` : ''}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    onClick={() => openEdit(img)}
                    className={ui.button.secondary}
                    size="sm"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleToggleActive(img.id, img.is_active)}
                    className={img.is_active ? ui.button.primary : ui.button.muted}
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
                    className={ui.button.danger}
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
