'use client';

import type { AdminProduct } from '@/components/admin/ProductList';
import { AdminProductFields } from '@/components/admin/AdminProductFields';
import { ProductImagePicker } from '@/components/admin/ProductImagePicker';
import { adminProductSchema, AdminProductFormData } from '@/lib/admin/product-form-schema';
import { ProductCategory } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Image from 'next/image';
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
    category: (product.category as ProductCategory) || ProductCategory.SINGING_BOWLS,
    image_url: product.images[0]?.url || '',
    inventory: Number(product.inventory ?? 0),
    weight: Number(product.weight ?? 0),
    materials: Array.isArray(materials) ? materials.join(', ') : String(materials || ''),
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
  const images = product.images || [];
  const [imagePreview, setImagePreview] = useState<string>(images[0]?.url || '');
  const [loading, setLoading] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AdminProductFormData>({
    resolver: zodResolver(adminProductSchema),
    defaultValues: productToFormDefaults(product),
  });

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

  const handleImageUrlChange = (url: string) => {
    setValue('image_url', url);
    setImagePreview(url);
    setShowImagePicker(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg" type="button">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Images</h2>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative h-24 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200"
                >
                  <Image
                    src={img.url}
                    alt={img.alt?.en || 'Product image'}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

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
                <p className="text-gray-600">No primary image selected</p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowImagePicker(!showImagePicker)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {imagePreview ? 'Change Primary Image' : 'Select Primary Image'}
          </button>

          {showImagePicker && <ProductImagePicker onSelect={handleImageUrlChange} />}

          {errors.image_url && (
            <p className="text-red-600 text-sm mt-2">{errors.image_url.message}</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>
          <AdminProductFields register={register} errors={errors} slugReadOnly />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-semibold disabled:opacity-50"
          >
            {loading ? 'Updating Product...' : 'Update Product'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
