'use client';

import { AdminProductFields } from '@/components/admin/AdminProductFields';
import { ProductImagePicker } from '@/components/admin/ProductImagePicker';
import { adminProductSchema, AdminProductFormData } from '@/lib/admin/product-form-schema';
import { slugify } from '@/lib/admin/products';
import { ProductCategory } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProductFormProps {
  onSuccess?: () => void;
}

export function ProductForm({ onSuccess }: ProductFormProps) {
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);

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
      weight: 0,
      category: ProductCategory.SINGING_BOWLS,
      origin: 'Nepal',
      materials: '',
      is_featured: false,
      is_available: true,
      is_handmade: true,
      youtube_url: '',
      soundcloud_url: '',
      audio_sample: '',
    },
  });

  const englishName = watch('name.en');

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

  const handleImageUrlChange = (url: string) => {
    setValue('image_url', url);
    setImagePreview(url);
    setShowImagePicker(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Image</h2>

          {imagePreview ? (
            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Image src={imagePreview} alt="Product preview" fill className="object-cover" />
              <button
                type="button"
                onClick={() => {
                  setImagePreview('');
                  setValue('image_url', '');
                }}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No image selected</p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowImagePicker(!showImagePicker)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {imagePreview ? 'Change Image' : 'Select Image'}
          </button>

          {showImagePicker && <ProductImagePicker onSelect={handleImageUrlChange} />}

          {errors.image_url && (
            <p className="text-red-600 text-sm mt-2">{errors.image_url.message}</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>
          <AdminProductFields register={register} errors={errors} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-semibold disabled:opacity-50"
        >
          {loading ? 'Creating Product...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
