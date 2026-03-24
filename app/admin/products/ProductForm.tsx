'use client';

import { Product, ProductCategory } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProductFormProps {
  product?: Product;
  isNew?: boolean;
}

export default function ProductForm({ product, isNew = true }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      en: product?.name.en || '',
      ru: product?.name.ru || '',
      uk: product?.name.uk || '',
    },
    description: {
      en: product?.description.en || '',
      ru: product?.description.ru || '',
      uk: product?.description.uk || '',
    },
    slug: product?.slug || '',
    price: product?.price || 0,
    currency: product?.currency || 'USD',
    category: product?.category || ProductCategory.SINGING_BOWLS,
    inventory: product?.inventory || 0,
    sku: product?.sku || '',
    weight: product?.weight || 0,
    materials: product?.materials.join(', ') || '',
    origin: product?.origin || '',
    craftsman: product?.craftsman || '',
    isHandmade: product?.isHandmade || false,
    isFeatured: product?.isFeatured || false,
    isAvailable: product?.isAvailable !== false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        materials: formData.materials.split(',').map(m => m.trim()),
      };

      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? '/api/products' : `/api/products/${product?.id}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="product-slug"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="SKU-001"
              />
            </div>
          </div>
        </div>

        {/* Multilingual Names */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Names</h2>
          
          <div className="space-y-3">
            {(['en', 'ru', 'uk'] as const).map(lang => (
              <div key={lang}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name ({lang.toUpperCase()})
                </label>
                <input
                  type="text"
                  name={`name.${lang}`}
                  value={formData.name[lang]}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Multilingual Descriptions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Descriptions</h2>
          
          <div className="space-y-3">
            {(['en', 'ru', 'uk'] as const).map(lang => (
              <div key={lang}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description ({lang.toUpperCase()})
                </label>
                <textarea
                  name={`description.${lang}`}
                  value={formData.description[lang]}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing & Inventory</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input
                type="number"
                name="inventory"
                value={formData.inventory}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={ProductCategory.SINGING_BOWLS}>Singing Bowls</option>
                <option value={ProductCategory.MEDITATION_BELLS}>Meditation Bells</option>
                <option value={ProductCategory.GONGS}>Gongs</option>
                <option value={ProductCategory.ACCESSORIES}>Accessories</option>
                <option value={ProductCategory.GIFT_SETS}>Gift Sets</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (grams)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Kathmandu Valley, Nepal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Craftsman</label>
              <input
                type="text"
                name="craftsman"
                value={formData.craftsman}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Materials (comma-separated)</label>
              <input
                type="text"
                name="materials"
                value={formData.materials}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bronze, Copper, Tin"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Status</h2>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Available for purchase</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isHandmade"
                checked={formData.isHandmade}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Handmade</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Featured product</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Saving...' : isNew ? 'Create Product' : 'Update Product'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
