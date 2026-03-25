'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@supabase/supabase-js';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const productSchema = z.object({
  name: z.object({
    en: z.string().min(2, 'English name required'),
    ru: z.string().min(2, 'Russian name required'),
    uk: z.string().min(2, 'Ukrainian name required'),
  }),
  description: z.object({
    en: z.string().min(10, 'English description required'),
    ru: z.string().min(10, 'Russian description required'),
    uk: z.string().min(10, 'Ukrainian description required'),
  }),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  category: z.string().min(1, 'Category required'),
  image_url: z.string().url('Valid image URL required'),
  inventory: z.number().min(0, 'Inventory cannot be negative'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSuccess?: () => void;
}

export function ProductForm({ onSuccess }: ProductFormProps) {
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      price: 0,
      inventory: 0,
      category: 'SINGING_BOWLS',
    },
  });

  const imageUrl = watch('image_url');

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
        {/* Image Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Image</h2>

          {imagePreview ? (
            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Image
                src={imagePreview}
                alt="Product preview"
                fill
                className="object-cover"
              />
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

          {showImagePicker && (
            <ImagePicker onSelect={handleImageUrlChange} />
          )}

          {errors.image_url && (
            <p className="text-red-600 text-sm mt-2">{errors.image_url.message}</p>
          )}
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* English Name */}
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

            {/* Russian Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name (Russian)
              </label>
              <input
                {...register('name.ru')}
                type="text"
                placeholder="e.g., Тибетская поющая чаша"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.name?.ru && (
                <p className="text-red-600 text-sm mt-1">{errors.name.ru.message}</p>
              )}
            </div>

            {/* Ukrainian Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name (Ukrainian)
              </label>
              <input
                {...register('name.uk')}
                type="text"
                placeholder="e.g., Тибетська співаюча чаша"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.name?.uk && (
                <p className="text-red-600 text-sm mt-1">{errors.name.uk.message}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                {...register('price', { valueAsNumber: true })}
                type="number"
                step="0.01"
                placeholder="99.99"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            {/* Inventory */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inventory Quantity
              </label>
              <input
                {...register('inventory', { valueAsNumber: true })}
                type="number"
                placeholder="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.inventory && (
                <p className="text-red-600 text-sm mt-1">{errors.inventory.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                {...register('category')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="SINGING_BOWLS">Singing Bowls</option>
                <option value="BELLS">Meditation Bells</option>
                <option value="ACCESSORIES">Accessories</option>
              </select>
              {errors.category && (
                <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>
          </div>

          {/* English Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (English)
            </label>
            <textarea
              {...register('description.en')}
              placeholder="Describe the product in English..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.description?.en && (
              <p className="text-red-600 text-sm mt-1">{errors.description.en.message}</p>
            )}
          </div>

          {/* Russian Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Russian)
            </label>
            <textarea
              {...register('description.ru')}
              placeholder="Опишите продукт на русском языке..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.description?.ru && (
              <p className="text-red-600 text-sm mt-1">{errors.description.ru.message}</p>
            )}
          </div>

          {/* Ukrainian Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Ukrainian)
            </label>
            <textarea
              {...register('description.uk')}
              placeholder="Опишіть продукт українською мовою..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.description?.uk && (
              <p className="text-red-600 text-sm mt-1">{errors.description.uk.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
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

interface ImagePickerProps {
  onSelect: (url: string) => void;
}

function ImagePicker({ onSelect }: ImagePickerProps) {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        console.error('Not authenticated');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/cloudinary/list', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setImages(data.images || []);
      }
    } catch (error) {
      console.error('Failed to load images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-3">Select from Media Library</h3>

      {loading ? (
        <p className="text-gray-600">Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-gray-600">No images in media library. Upload some first.</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
          {images.map((image) => (
            <button
              key={image.publicId}
              type="button"
              onClick={() => onSelect(image.url)}
              className="relative h-20 rounded-lg overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-colors"
            >
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
