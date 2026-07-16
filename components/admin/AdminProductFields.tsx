'use client';

import { AdminProductFormData } from '@/lib/admin/product-form-schema';
import { ProductCategory } from '@/lib/types';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface AdminProductFieldsProps {
  register: UseFormRegister<AdminProductFormData>;
  errors: FieldErrors<AdminProductFormData>;
  slugReadOnly?: boolean;
}

const fieldClass = cn(ui.field, ui.focus);
const errorClass = 'text-copper-700 text-sm mt-1';

export function AdminProductFields({
  register,
  errors,
  slugReadOnly = false,
}: AdminProductFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className={ui.label}>Slug</label>
          <input
            {...register('slug')}
            readOnly={slugReadOnly}
            className={fieldClass}
          />
          {errors.slug && (
            <p className={errorClass}>{errors.slug.message}</p>
          )}
        </div>
        <div>
          <label className={ui.label}>SKU</label>
          <input
            {...register('sku')}
            placeholder="SKU-001"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={ui.label}>
            Product Name (English)
          </label>
          <input
            {...register('name.en')}
            type="text"
            placeholder="e.g., Tibetan Singing Bowl"
            className={fieldClass}
          />
          {errors.name?.en && (
            <p className={errorClass}>{errors.name.en.message}</p>
          )}
        </div>
        <div>
          <label className={ui.label}>
            Product Name (Russian)
          </label>
          <input
            {...register('name.ru')}
            type="text"
            className={fieldClass}
          />
          {errors.name?.ru && (
            <p className={errorClass}>{errors.name.ru.message}</p>
          )}
        </div>
        <div>
          <label className={ui.label}>
            Product Name (Ukrainian)
          </label>
          <input
            {...register('name.uk')}
            type="text"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={ui.label}>Price</label>
          <input
            {...register('price', { valueAsNumber: true })}
            type="number"
            step="0.01"
            className={fieldClass}
          />
          {errors.price && (
            <p className={errorClass}>{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className={ui.label}>Currency</label>
          <select
            {...register('currency')}
            className={fieldClass}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="UAH">UAH</option>
          </select>
        </div>
        <div>
          <label className={ui.label}>Inventory</label>
          <input
            {...register('inventory', { valueAsNumber: true })}
            type="number"
            className={fieldClass}
          />
          {errors.inventory && (
            <p className={errorClass}>{errors.inventory.message}</p>
          )}
        </div>
        <div>
          <label className={ui.label}>Weight (g)</label>
          <input
            {...register('weight', { valueAsNumber: true })}
            type="number"
            min={0}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={ui.label}>Diameter</label>
          <input
            {...register('diameter', { valueAsNumber: true })}
            type="number"
            min={0}
            step="0.1"
            placeholder="e.g. 18"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={ui.label}>Height</label>
          <input
            {...register('height', { valueAsNumber: true })}
            type="number"
            min={0}
            step="0.1"
            placeholder="e.g. 9"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={ui.label}>Size unit</label>
          <select
            {...register('dimension_unit')}
            className={fieldClass}
          >
            <option value="cm">cm</option>
            <option value="mm">mm</option>
            <option value="inches">inches</option>
          </select>
        </div>

        <div>
          <label className={ui.label}>Category</label>
          <select
            {...register('category')}
            className={fieldClass}
          >
            <option value={ProductCategory.SINGING_BOWLS}>Singing Bowls</option>
            <option value={ProductCategory.MEDITATION_BELLS}>Meditation Bells</option>
            <option value={ProductCategory.GONGS}>Gongs</option>
            <option value={ProductCategory.ACCESSORIES}>Accessories</option>
            <option value={ProductCategory.GIFT_SETS}>Gift Sets</option>
          </select>
        </div>
        <div>
          <label className={ui.label}>Origin</label>
          <input
            {...register('origin')}
            placeholder="Nepal"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={ui.label}>Craftsman</label>
          <input
            {...register('craftsman')}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className={ui.label}>
            Materials (comma-separated)
          </label>
          <input
            {...register('materials')}
            placeholder="Bronze, Copper, Tin"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={ui.label}>
            Tags (comma-separated)
          </label>
          <input
            {...register('tags')}
            placeholder="meditation, healing, handmade"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-charcoal-700">
          <input type="checkbox" {...register('is_featured')} className="rounded border-cream-300" />
          Featured on homepage
        </label>
        <label className="flex items-center gap-2 text-sm text-charcoal-700">
          <input type="checkbox" {...register('is_available')} className="rounded border-cream-300" />
          Available for purchase
        </label>
        <label className="flex items-center gap-2 text-sm text-charcoal-700">
          <input type="checkbox" {...register('is_handmade')} className="rounded border-cream-300" />
          Handmade
        </label>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6">
        {(['en', 'ru', 'uk'] as const).map((lang) => (
          <div key={lang}>
            <label className={ui.label}>
              Description ({lang.toUpperCase()})
            </label>
            <textarea
              {...register(`description.${lang}`)}
              rows={4}
              className={fieldClass}
            />
            {errors.description?.[lang] && (
              <p className={errorClass}>{errors.description[lang]?.message}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={ui.label}>YouTube URL</label>
          <input
            {...register('youtube_url')}
            placeholder="https://youtube.com/watch?v=..."
            className={fieldClass}
          />
          {errors.youtube_url && (
            <p className={errorClass}>{errors.youtube_url.message}</p>
          )}
        </div>
        <div>
          <label className={ui.label}>SoundCloud URL</label>
          <input
            {...register('soundcloud_url')}
            placeholder="https://soundcloud.com/..."
            className={fieldClass}
          />
          {errors.soundcloud_url && (
            <p className={errorClass}>{errors.soundcloud_url.message}</p>
          )}
        </div>
        <div>
          <label className={ui.label}>Audio sample URL</label>
          <input
            {...register('audio_sample')}
            placeholder="https://..."
            className={fieldClass}
          />
          {errors.audio_sample && (
            <p className={errorClass}>{errors.audio_sample.message}</p>
          )}
        </div>
      </div>
    </>
  );
}
