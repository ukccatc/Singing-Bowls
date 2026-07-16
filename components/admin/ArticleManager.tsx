'use client';

import { Button } from '@/components/ui/button';
import { buildSitePath } from '@/lib/site';
import { getDefaultLocale } from '@/lib/translations';
import { ArticleCategory } from '@/lib/types';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { Edit2, Eye, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface AdminArticle {
  dbId: string;
  id: string;
  title: { en: string; ru: string; uk?: string };
  excerpt: { en: string; ru: string; uk?: string };
  content: { en: string; ru: string; uk?: string };
  category: string;
  image: { url: string };
  isPublished: boolean;
  publishedAt: string;
  readingTime: number;
}

const emptyForm = {
  title: { en: '', ru: '', uk: '' },
  excerpt: { en: '', ru: '', uk: '' },
  content: { en: '', ru: '', uk: '' },
  category: ArticleCategory.SOUND_HEALING,
  image_url: '',
  is_published: false,
  reading_time: 5,
};

export function ArticleManager() {
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [cloudinaryImages, setCloudinaryImages] = useState<Array<{ url: string; name: string }>>([]);

  useEffect(() => {
    loadArticles();
    loadImages();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await fetch('/api/admin/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data.data || []);
      }
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadImages = async () => {
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

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (article: AdminArticle) => {
    setEditingId(article.dbId);
    setForm({
      title: {
        en: article.title.en || '',
        ru: article.title.ru || '',
        uk: article.title.uk || '',
      },
      excerpt: {
        en: article.excerpt.en || '',
        ru: article.excerpt.ru || '',
        uk: article.excerpt.uk || '',
      },
      content: {
        en: article.content.en || '',
        ru: article.content.ru || '',
        uk: article.content.uk || '',
      },
      category: article.category as ArticleCategory,
      image_url: article.image?.url || '',
      is_published: article.isPublished,
      reading_time: article.readingTime || 5,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/articles/${editingId}` : '/api/admin/articles';
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        await loadArticles();
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save article');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving article');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return;

    try {
      const response = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setArticles(articles.filter((a) => a.dbId !== id));
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const updateField = (
    group: 'title' | 'excerpt' | 'content',
    lang: 'en' | 'ru' | 'uk',
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [group]: { ...prev[group], [lang]: value },
    }));
  };

  if (loading) {
    return <div className={cn('p-8 text-center', ui.page.subtitle)}>Loading articles...</div>;
  }

  const fieldClass = cn(ui.field, ui.focus, 'px-3');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={ui.page.title}>Blog Articles</h1>
          <p className={cn('mt-1', ui.page.subtitle)}>
            Create and manage blog content for the public site
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className={cn(ui.card, 'p-4')}>
          <p className="text-sm text-charcoal-500">Total</p>
          <p className="text-2xl font-bold text-charcoal-900">{articles.length}</p>
        </div>
        <div className={cn(ui.card, 'p-4')}>
          <p className="text-sm text-charcoal-500">Published</p>
          <p className="text-2xl font-bold text-charcoal-900">
            {articles.filter((a) => a.isPublished).length}
          </p>
        </div>
        <div className={cn(ui.card, 'p-4')}>
          <p className="text-sm text-charcoal-500">Drafts</p>
          <p className="text-2xl font-bold text-charcoal-900">
            {articles.filter((a) => !a.isPublished).length}
          </p>
        </div>
      </div>

      {showForm && (
        <div className={cn(ui.card, 'space-y-6')}>
          <h2 className="text-xl font-semibold text-charcoal-900">
            {editingId ? 'Edit Article' : 'New Article'}
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {(['en', 'ru', 'uk'] as const).map((lang) => (
              <div key={lang}>
                <label className={ui.labelSm}>Title ({lang.toUpperCase()})</label>
                <input
                  value={form.title[lang] || ''}
                  onChange={(e) => updateField('title', lang, e.target.value)}
                  className={fieldClass}
                />
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(['en', 'ru', 'uk'] as const).map((lang) => (
              <div key={lang}>
                <label className={ui.labelSm}>Excerpt ({lang.toUpperCase()})</label>
                <textarea
                  value={form.excerpt[lang] || ''}
                  onChange={(e) => updateField('excerpt', lang, e.target.value)}
                  rows={3}
                  className={fieldClass}
                />
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(['en', 'ru', 'uk'] as const).map((lang) => (
              <div key={lang}>
                <label className={ui.labelSm}>Content ({lang.toUpperCase()})</label>
                <textarea
                  value={form.content[lang] || ''}
                  onChange={(e) => updateField('content', lang, e.target.value)}
                  rows={8}
                  className={cn(fieldClass, 'font-mono text-sm')}
                />
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className={ui.labelSm}>Category</label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    category: e.target.value as ArticleCategory,
                  }))
                }
                className={fieldClass}
              >
                {Object.values(ArticleCategory).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={ui.labelSm}>Reading time (min)</label>
              <input
                type="number"
                min={1}
                value={form.reading_time}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, reading_time: Number(e.target.value) }))
                }
                className={fieldClass}
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-charcoal-700">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, is_published: e.target.checked }))
                  }
                  className="rounded border-cream-300 text-gold-600 focus:ring-gold-200"
                />
                Published
              </label>
            </div>
          </div>

          <div>
            <label className={ui.label}>Cover Image</label>
            {form.image_url ? (
              <div className="relative mb-3 h-40 w-64 overflow-hidden rounded-lg">
                <Image src={form.image_url} alt="Cover" fill className="object-cover" />
              </div>
            ) : null}
            <div className="grid max-h-40 grid-cols-4 gap-2 overflow-y-auto md:grid-cols-8">
              {cloudinaryImages.map((img) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, image_url: img.url }))}
                  className={cn(
                    'relative h-16 overflow-hidden rounded border-2',
                    form.image_url === img.url ? ui.selection.selected : ui.selection.idle
                  )}
                >
                  <Image src={img.url} alt={img.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editingId ? 'Update Article' : 'Create Article'}
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className={ui.tableShell}>
        {articles.length === 0 ? (
          <p className={cn('p-8 text-center', ui.page.subtitle)}>
            No articles yet. Create your first one.
          </p>
        ) : (
          <table className="min-w-full divide-y divide-cream-200">
            <thead className={ui.tableHead}>
              <tr>
                <th className="px-6 py-3 text-left">Article</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {articles.map((article) => (
                <tr key={article.dbId}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-charcoal-900">{article.title.en}</div>
                    <div className="line-clamp-1 text-sm text-charcoal-500">
                      {article.excerpt.en}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal-600">{article.category}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={cn(
                        'rounded-full px-2 py-1 text-xs font-medium',
                        article.isPublished ? ui.badge.success : ui.badge.muted
                      )}
                    >
                      {article.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(article)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            buildSitePath(getDefaultLocale(), `/blog/${article.id}`),
                            '_blank'
                          )
                        }
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(article.dbId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
