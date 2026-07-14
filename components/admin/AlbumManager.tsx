'use client';

import { isMissingAlbumsTable } from '@/lib/admin/gallery-albums-sync';
import { GalleryCategory } from '@/lib/supabase/gallery';
import { Button } from '@/components/ui/button';
import {
  ArrowDown,
  ArrowUp,
  Edit2,
  ExternalLink,
  Eye,
  EyeOff,
  Plus,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface GalleryImageOption {
  id: string;
  image_url: string;
  title: { en: string; ru: string; uk?: string };
  display_order: number;
  is_active: boolean;
}

interface AlbumImageLink {
  display_order: number;
  gallery: GalleryImageOption | GalleryImageOption[] | null;
}

interface GalleryAlbumRow {
  id: string;
  slug: string;
  title: { en: string; ru: string; uk?: string };
  description: { en: string; ru: string; uk?: string };
  event_date: string | null;
  category: GalleryCategory | null;
  location?: { en: string; ru: string; uk?: string } | null;
  cover_image_url?: string | null;
  display_order: number;
  is_active: boolean;
  gallery_album_images?: AlbumImageLink[];
}

const CATEGORIES: { value: GalleryCategory; label: string }[] = [
  { value: 'meditation', label: 'Meditation' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'retreat', label: 'Retreat' },
  { value: 'ceremony', label: 'Ceremony' },
];

function linkedGalleryIds(album: GalleryAlbumRow): string[] {
  return (album.gallery_album_images ?? [])
    .slice()
    .sort((a, b) => a.display_order - b.display_order)
    .flatMap((link) => {
      if (!link.gallery) return [];
      return Array.isArray(link.gallery) ? link.gallery.map((g) => g.id) : [link.gallery.id];
    });
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const emptyForm = (displayOrder = 0) => ({
  slug: '',
  title: { en: '', ru: '', uk: '' },
  description: { en: '', ru: '', uk: '' },
  event_date: '',
  category: 'meditation' as GalleryCategory,
  location: { en: '', ru: '', uk: '' },
  display_order: displayOrder,
  gallery_ids: [] as string[],
  cover_gallery_id: '' as string,
});

export function AlbumManager() {
  const [albums, setAlbums] = useState<GalleryAlbumRow[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImageOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [setupRequired, setSetupRequired] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [editingAlbum, setEditingAlbum] = useState<GalleryAlbumRow | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState(emptyForm());

  const loadData = useCallback(async () => {
    setLoading(true);
    setStatusMessage(null);

    try {
      const [albumsRes, galleryRes] = await Promise.all([
        fetch('/api/gallery/albums?all=true'),
        fetch('/api/gallery?all=true'),
      ]);

      const albumsData = await albumsRes.json();
      const galleryData = await galleryRes.json();

      if (!albumsRes.ok) {
        const message = albumsData.error || 'Failed to load albums';
        if (isMissingAlbumsTable(message)) {
          setSetupRequired(true);
          setAlbums([]);
        } else {
          setStatusMessage(message);
        }
      } else {
        setSetupRequired(false);
        setAlbums(albumsData.data || []);
      }

      if (galleryRes.ok) {
        setGalleryImages(galleryData.data || []);
      }
    } catch (error) {
      console.error('Failed to load albums:', error);
      setStatusMessage('Failed to load albums');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const resetForm = () => {
    setForm(emptyForm(albums.length));
    setEditingAlbum(null);
    setShowCreateForm(false);
  };

  const startCreate = () => {
    setEditingAlbum(null);
    setForm(emptyForm(albums.length));
    setShowCreateForm(true);
  };

  const startEdit = (album: GalleryAlbumRow) => {
    const ids = linkedGalleryIds(album);
    const coverId =
      galleryImages.find((image) => image.image_url === album.cover_image_url)?.id ||
      ids[0] ||
      '';

    setEditingAlbum(album);
    setShowCreateForm(true);
    setForm({
      slug: album.slug,
      title: {
        en: album.title.en,
        ru: album.title.ru,
        uk: album.title.uk || '',
      },
      description: {
        en: album.description.en,
        ru: album.description.ru,
        uk: album.description.uk || '',
      },
      event_date: album.event_date || '',
      category: album.category || 'meditation',
      location: {
        en: album.location?.en || '',
        ru: album.location?.ru || '',
        uk: album.location?.uk || '',
      },
      display_order: album.display_order,
      gallery_ids: ids,
      cover_gallery_id: coverId,
    });
  };

  const toggleGalleryImage = (galleryId: string) => {
    setForm((current) => {
      const isSelected = current.gallery_ids.includes(galleryId);
      const gallery_ids = isSelected
        ? current.gallery_ids.filter((id) => id !== galleryId)
        : [...current.gallery_ids, galleryId];

      let cover_gallery_id = current.cover_gallery_id;
      if (!gallery_ids.includes(cover_gallery_id)) {
        cover_gallery_id = gallery_ids[0] || '';
      }
      if (!cover_gallery_id && gallery_ids.length > 0) {
        cover_gallery_id = gallery_ids[0];
      }

      return { ...current, gallery_ids, cover_gallery_id };
    });
  };

  const moveImage = (galleryId: string, direction: -1 | 1) => {
    setForm((current) => {
      const index = current.gallery_ids.indexOf(galleryId);
      if (index === -1) return current;

      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.gallery_ids.length) return current;

      const gallery_ids = [...current.gallery_ids];
      [gallery_ids[index], gallery_ids[nextIndex]] = [
        gallery_ids[nextIndex],
        gallery_ids[index],
      ];

      return { ...current, gallery_ids };
    });
  };

  const handleSave = async () => {
    if (!form.slug.trim() || !form.title.en.trim()) {
      setStatusMessage('Slug and English title are required.');
      return;
    }

    if (form.gallery_ids.length === 0) {
      setStatusMessage('Select at least one gallery photo for the album.');
      return;
    }

    const coverImage =
      galleryImages.find((image) => image.id === form.cover_gallery_id) ||
      galleryImages.find((image) => image.id === form.gallery_ids[0]);

    const payload = {
      slug: form.slug.trim(),
      title: form.title,
      description: form.description,
      event_date: form.event_date || null,
      category: form.category,
      location: form.location.en ? form.location : null,
      display_order: form.display_order,
      is_active: true,
      gallery_ids: form.gallery_ids,
      cover_image_url: coverImage?.image_url || null,
    };

    setSaving(true);
    setStatusMessage(null);

    try {
      const response = await fetch(
        editingAlbum ? `/api/gallery/albums/${editingAlbum.id}` : '/api/gallery/albums',
        {
          method: editingAlbum ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setStatusMessage(data.error || 'Failed to save album');
        return;
      }

      setStatusMessage(editingAlbum ? 'Album updated.' : 'Album created.');
      await loadData();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('Failed to save album');
    } finally {
      setSaving(false);
    }
  };

  const handleSyncSeed = async () => {
    setSyncing(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/gallery/albums/sync-seed', { method: 'POST' });
      const data = await response.json();

      if (!response.ok) {
        if (isMissingAlbumsTable(data.error || '')) {
          setSetupRequired(true);
        }
        setStatusMessage(data.error || 'Seed sync failed');
        return;
      }

      setStatusMessage(`Imported ${data.ok} seed albums${data.failed ? ` (${data.failed} failed)` : ''}.`);
      await loadData();
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('Seed sync failed');
    } finally {
      setSyncing(false);
    }
  };

  const handleToggleActive = async (album: GalleryAlbumRow) => {
    try {
      const response = await fetch(`/api/gallery/albums/${album.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !album.is_active }),
      });

      if (response.ok) {
        await loadData();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this album? Gallery photos will remain.')) return;

    try {
      const response = await fetch(`/api/gallery/albums/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setStatusMessage('Album deleted.');
        await loadData();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div className="rounded-xl border bg-white p-8 text-center text-gray-600">Loading albums...</div>;
  }

  return (
    <div className="space-y-6">
      {setupRequired ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-semibold text-amber-900">Album tables not set up yet</h2>
          <p className="mt-2 text-sm text-amber-800">
            Run the SQL migration in Supabase SQL Editor, then import the default albums.
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-amber-900">
            <li>Open Supabase → SQL Editor → New query</li>
            <li>Paste SQL from <code className="rounded bg-amber-100 px-1">supabase/migrations/20260714_create_gallery_albums.sql</code></li>
            <li>Click Run</li>
            <li>Return here and click &quot;Import seed albums&quot;</li>
          </ol>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={handleSyncSeed} disabled={syncing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
              Import seed albums
            </Button>
            <Button variant="outline" onClick={loadData}>
              Check again
            </Button>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Event Albums ({albums.length})</h2>
          <p className="text-sm text-gray-600">
            Group photos by event date and activity type for the public albums page.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleSyncSeed} disabled={syncing || setupRequired}>
            <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
            Import seed albums
          </Button>
          <Button onClick={showCreateForm ? resetForm : startCreate}>
            <Plus className="mr-2 h-4 w-4" />
            {showCreateForm ? 'Close form' : 'New album'}
          </Button>
        </div>
      </div>

      {statusMessage ? (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          {statusMessage}
        </div>
      ) : null}

      {showCreateForm ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingAlbum ? 'Edit album' : 'Create album'}
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium text-gray-700">English title *</span>
              <input
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={form.title.en}
                onChange={(e) => {
                  const en = e.target.value;
                  setForm((current) => ({
                    ...current,
                    title: { ...current.title, en },
                    slug: editingAlbum ? current.slug : slugify(en),
                  }));
                }}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Slug *</span>
              <input
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Event date</span>
              <input
                type="date"
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={form.event_date}
                onChange={(e) => setForm({ ...form, event_date: e.target.value })}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Activity / category</span>
              <select
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as GalleryCategory })
                }
              >
                {CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Display order</span>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={form.display_order}
                onChange={(e) =>
                  setForm({ ...form, display_order: Number(e.target.value) })
                }
              />
            </label>
          </div>

          {(['ru', 'uk'] as const).map((lang) => (
            <label key={lang} className="block text-sm">
              <span className="font-medium text-gray-700">Title ({lang.toUpperCase()})</span>
              <input
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={form.title[lang]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: { ...form.title, [lang]: e.target.value },
                  })
                }
              />
            </label>
          ))}

          {(['en', 'ru', 'uk'] as const).map((lang) => (
            <div key={`loc-${lang}`} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block text-sm">
                <span className="font-medium text-gray-700">Location ({lang.toUpperCase()})</span>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                  value={form.location[lang]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      location: { ...form.location, [lang]: e.target.value },
                    })
                  }
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-gray-700">Description ({lang.toUpperCase()})</span>
                <textarea
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                  rows={2}
                  value={form.description[lang]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: { ...form.description, [lang]: e.target.value },
                    })
                  }
                />
              </label>
            </div>
          ))}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">
                Album photos ({form.gallery_ids.length} selected)
              </p>
              <p className="text-xs text-gray-500">Click to add/remove. Use arrows to reorder.</p>
            </div>

            {galleryImages.length === 0 ? (
              <p className="rounded-lg border border-dashed p-4 text-sm text-gray-600">
                No gallery photos yet. Add photos on the Photos tab first.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6 max-h-96 overflow-y-auto">
                {galleryImages.map((image) => {
                  const selectedIndex = form.gallery_ids.indexOf(image.id);
                  const selected = selectedIndex !== -1;
                  const isCover = form.cover_gallery_id === image.id;

                  return (
                    <div
                      key={image.id}
                      className={`rounded-lg border-2 p-1 ${
                        selected ? 'border-gold-600' : 'border-transparent'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleGalleryImage(image.id)}
                        className="relative aspect-square w-full overflow-hidden rounded-md"
                      >
                        <Image
                          src={image.image_url}
                          alt={image.title.en}
                          fill
                          className="object-cover"
                        />
                        {selected ? (
                          <span className="absolute left-1 top-1 rounded bg-gold-600 px-2 py-0.5 text-xs font-semibold text-white">
                            #{selectedIndex + 1}
                          </span>
                        ) : null}
                        {!image.is_active ? (
                          <span className="absolute right-1 top-1 rounded bg-gray-800/80 px-1.5 py-0.5 text-[10px] text-white">
                            hidden
                          </span>
                        ) : null}
                      </button>
                      {selected ? (
                        <div className="mt-1 flex items-center justify-between gap-1">
                          <button
                            type="button"
                            onClick={() => moveImage(image.id, -1)}
                            className="rounded border p-1 hover:bg-gray-50"
                            aria-label="Move up"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setForm((current) => ({
                                ...current,
                                cover_gallery_id: image.id,
                              }))
                            }
                            className={`flex-1 rounded px-1 py-0.5 text-[10px] font-medium ${
                              isCover ? 'bg-gold-600 text-white' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {isCover ? 'Cover' : 'Set cover'}
                          </button>
                          <button
                            type="button"
                            onClick={() => moveImage(image.id, 1)}
                            className="rounded border p-1 hover:bg-gray-50"
                            aria-label="Move down"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editingAlbum ? 'Update album' : 'Create album'}
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </div>
      ) : null}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {albums.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-gray-600">No albums yet.</p>
            {!setupRequired ? (
              <div className="mt-4 flex justify-center gap-2">
                <Button onClick={startCreate}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create album
                </Button>
                <Button variant="outline" onClick={handleSyncSeed} disabled={syncing}>
                  Import seed albums
                </Button>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {albums.map((album) => {
              const imageIds = linkedGalleryIds(album);
              const cover =
                album.cover_image_url ||
                galleryImages.find((image) => image.id === imageIds[0])?.image_url;

              return (
                <div
                  key={album.id}
                  className={`overflow-hidden rounded-xl border ${
                    album.is_active ? 'border-gray-200' : 'border-gray-300 opacity-70'
                  }`}
                >
                  <div className="relative h-44 bg-gray-100">
                    {cover ? (
                      <Image src={cover} alt={album.title.en} fill className="object-cover" />
                    ) : null}
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{album.title.en}</h3>
                        <p className="text-xs text-gray-500">{album.slug}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/en/gallery/albums/${album.slug}`} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(album)}
                        >
                          {album.is_active ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => startEdit(album)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(album.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="line-clamp-2 text-sm text-gray-600">{album.description.en}</p>
                    <p className="text-xs text-gray-500">
                      {album.event_date || 'No date'} · {album.category || 'meditation'} ·{' '}
                      {imageIds.length} photos
                      {album.location?.en ? ` · ${album.location.en}` : ''}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
