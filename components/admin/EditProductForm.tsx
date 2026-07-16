'use client';

import type { AdminProduct } from '@/components/admin/ProductList';
import { AdminProductFields } from '@/components/admin/AdminProductFields';
import { ProductImagesField } from '@/components/admin/ProductImagesField';
import { ProductSpecificationsField } from '@/components/admin/ProductSpecificationsField';
import { adminProductSchema, AdminProductFormData } from '@/lib/admin/product-form-schema';
import { ProductCategory } from '@/lib/types';
import { ui } from '@/lib/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface EditProductFormProps {
  product: AdminProduct;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function productToFormDefaults(product: AdminProduct): AdminProductFormData {
  const youtube = product.youtube_video;
  const soundcloud = product.soundcloud_audio;
  const materials = product.materials;
  const tags = product.tags;
  const images = product.images || [];
  const currency =
    product.currency === 'EUR' || product.currency === 'UAH' ? product.currency : 'USD';

  const formImages =
    images.length > 0
      ? images.map((image, index) => ({
          id: image.id,
          url: image.url,
          isPrimary: Boolean(image.isPrimary) || (images.every((img) => !img.isPrimary) && index === 0),
        }))
      : [];

  // Ensure exactly one primary in form defaults
  if (formImages.length > 0 && !formImages.some((image) => image.isPrimary)) {
    formImages[0].isPrimary = true;
  } else if (formImages.filter((image) => image.isPrimary).length > 1) {
    let seen = false;
    for (const image of formImages) {
      if (image.isPrimary) {
        if (seen) image.isPrimary = false;
        else seen = true;
      }
    }
  }

  return {
    slug: product.slug || '',
    sku: product.sku || '',
    name: {
      en: product.name.en || '',
      ru: product.name.ru || '',
      uk: product.name.uk || '',
    },
    description: {
      en: product.description.en || '',
      ru: product.description.ru || '',
      uk: product.description.uk || '',
    },
    price: Number(product.price),
    currency,
    category: (product.category as ProductCategory) || ProductCategory.SINGING_BOWLS,
    images: formImages,
    inventory: Number(product.inventory ?? 0),
    weight: product.weight != null ? Number(product.weight) : undefined,
    diameter:
      product.dimensions?.diameter != null
        ? Number(product.dimensions.diameter)
        : undefined,
    height:
      product.dimensions?.height != null ? Number(product.dimensions.height) : undefined,
    dimension_unit:
      product.dimensions?.unit === 'mm' || product.dimensions?.unit === 'inches'
        ? product.dimensions.unit
        : 'cm',
    materials: Array.isArray(materials) ? materials.join(', ') : String(materials || ''),
    tags: Array.isArray(tags) ? tags.join(', ') : String(tags || ''),
    specifications: (product.specifications || []).map((spec) => ({
      name: {
        en: spec.name?.en || '',
        ru: spec.name?.ru || '',
        uk: spec.name?.uk || '',
      },
      value: {
        en: spec.value?.en || '',
        ru: spec.value?.ru || '',
        uk: spec.value?.uk || '',
      },
      unit: spec.unit || '',
    })),
    origin: product.origin || 'Nepal',
    craftsman: product.craftsman || '',
    is_handmade: product.is_handmade ?? true,
    is_featured: product.is_featured ?? false,
    is_available: product.is_available ?? true,
    youtube_url: youtube?.url || '',
    soundcloud_url: soundcloud?.streamUrl || '',
    audio_sample: product.audio_sample || '',
  };
}

export function EditProductForm({ product, onSuccess, onCancel }: EditProductFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AdminProductFormData>({
    resolver: zodResolver(adminProductSchema),
    defaultValues: productToFormDefaults(product),
  });

  const images = watch('images') || [];
  const specifications = watch('specifications') || [];

  const onSubmit = async (data: AdminProductFormData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Product updated successfully!');
        onSuccess?.();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8 flex items-center gap-4">
        <button onClick={onCancel} className={`rounded-lg p-2 ${ui.button.ghost}`} type="button">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className={ui.page.title}>Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className={ui.card}>
          <ProductImagesField
            images={images}
            onChange={(next) => setValue('images', next, { shouldValidate: true })}
            error={errors.images?.message || errors.images?.root?.message}
          />
        </div>

        <div className={ui.card}>
          <h2 className="mb-4 text-xl font-semibold text-charcoal-900">Product Details</h2>
          <AdminProductFields register={register} errors={errors} slugReadOnly />
        </div>

        <div className={ui.card}>
          <ProductSpecificationsField
            specifications={specifications}
            onChange={(next) => setValue('specifications', next, { shouldValidate: true })}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`${ui.button.primaryGradient} flex-1 rounded-lg px-6 py-3 font-semibold shadow-md transition-all disabled:opacity-50`}
          >
            {loading ? 'Updating Product...' : 'Update Product'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={`${ui.button.outlineNeutral} flex-1 rounded-lg px-6 py-3 font-semibold transition-all`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
