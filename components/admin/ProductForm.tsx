'use client';

import { AdminProductFields } from '@/components/admin/AdminProductFields';
import { ProductImagesField } from '@/components/admin/ProductImagesField';
import { ProductSpecificationsField } from '@/components/admin/ProductSpecificationsField';
import { adminProductSchema, AdminProductFormData } from '@/lib/admin/product-form-schema';
import { slugify } from '@/lib/admin/products';
import { ProductCategory } from '@/lib/types';
import { ui } from '@/lib/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProductFormProps {
  onSuccess?: () => void;
}

export function ProductForm({ onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AdminProductFormData>({
    resolver: zodResolver(adminProductSchema),
    defaultValues: {
      slug: '',
      sku: '',
      price: 0,
      inventory: 0,
      currency: 'USD',
      weight: undefined,
      diameter: undefined,
      height: undefined,
      dimension_unit: 'cm',
      category: ProductCategory.SINGING_BOWLS,
      origin: 'Nepal',
      materials: '',
      tags: '',
      specifications: [],
      images: [],
      is_featured: false,
      is_available: true,
      is_handmade: true,
      youtube_url: '',
      soundcloud_url: '',
      audio_sample: '',
    },
  });

  const englishName = watch('name.en');
  const images = watch('images') || [];
  const specifications = watch('specifications') || [];

  useEffect(() => {
    if (englishName) {
      setValue('slug', slugify(englishName));
    }
  }, [englishName, setValue]);

  const onSubmit = async (data: AdminProductFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Product created successfully!');
        onSuccess?.();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className={`mb-8 ${ui.page.title}`}>Add New Product</h1>

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
          <AdminProductFields register={register} errors={errors} />
        </div>

        <div className={ui.card}>
          <ProductSpecificationsField
            specifications={specifications}
            onChange={(next) => setValue('specifications', next, { shouldValidate: true })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`${ui.button.primaryGradient} w-full rounded-lg px-6 py-3 font-semibold shadow-md transition-all disabled:opacity-50`}
        >
          {loading ? 'Creating Product...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
