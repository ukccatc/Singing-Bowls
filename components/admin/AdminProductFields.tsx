'use client';

import { AdminProductFormData } from '@/lib/admin/product-form-schema';
import { ProductCategory } from '@/lib/types';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface AdminProductFieldsProps {
  register: UseFormRegister<AdminProductFormData>;
  errors: FieldErrors<AdminProductFormData>;
  slugReadOnly?: boolean;
}

export function AdminProductFields({
  register,
  errors,
  slugReadOnly = false,
}: AdminProductFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
          <input
            {...register('slug')}
            readOnly={slugReadOnly}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
          {errors.slug && (
            <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
          <input
            {...register('sku')}
            placeholder="SKU-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name (English)
          </label>
          <input
            {...register('name.en')}
            type="text"
            placeholder="e.g., Tibetan Singing Bowl"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.name?.en && (
            <p className="text-red-600 text-sm mt-1">{errors.name.en.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name (Russian)
          </label>
          <input
            {...register('name.ru')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.name?.ru && (
            <p className="text-red-600 text-sm mt-1">{errors.name.ru.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name (Ukrainian)
          </label>
          <input
            {...register('name.uk')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
          <input
            {...register('price', { valueAsNumber: true })}
            type="number"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.price && (
            <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Inventory</label>
          <input
            {...register('inventory', { valueAsNumber: true })}
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.inventory && (
            <p className="text-red-600 text-sm mt-1">{errors.inventory.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight (g)</label>
          <input
            {...register('weight', { valueAsNumber: true })}
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            {...register('category')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={ProductCategory.SINGING_BOWLS}>Singing Bowls</option>
            <option value={ProductCategory.MEDITATION_BELLS}>Meditation Bells</option>
            <option value={ProductCategory.GONGS}>Gongs</option>
            <option value={ProductCategory.ACCESSORIES}>Accessories</option>
            <option value={ProductCategory.GIFT_SETS}>Gift Sets</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Origin</label>
          <input
            {...register('origin')}
            placeholder="Nepal"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Craftsman</label>
          <input
            {...register('craftsman')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Materials (comma-separated)
        </label>
        <input
          {...register('materials')}
          placeholder="Bronze, Copper, Tin"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" {...register('is_featured')} className="rounded border-gray-300" />
          Featured on homepage
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" {...register('is_available')} className="rounded border-gray-300" />
          Available for purchase
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" {...register('is_handmade')} className="rounded border-gray-300" />
          Handmade
        </label>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6">
        {(['en', 'ru', 'uk'] as const).map((lang) => (
          <div key={lang}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description ({lang.toUpperCase()})
            </label>
            <textarea
              {...register(`description.${lang}`)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.description?.[lang] && (
              <p className="text-red-600 text-sm mt-1">{errors.description[lang]?.message}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
          <input
            {...register('youtube_url')}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.youtube_url && (
            <p className="text-red-600 text-sm mt-1">{errors.youtube_url.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SoundCloud URL</label>
          <input
            {...register('soundcloud_url')}
            placeholder="https://soundcloud.com/..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.soundcloud_url && (
            <p className="text-red-600 text-sm mt-1">{errors.soundcloud_url.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Audio sample URL</label>
          <input
            {...register('audio_sample')}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.audio_sample && (
            <p className="text-red-600 text-sm mt-1">{errors.audio_sample.message}</p>
          )}
        </div>
      </div>
    </>
  );
}
