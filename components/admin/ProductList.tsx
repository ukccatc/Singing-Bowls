'use client';

import { Button } from '@/components/ui/button';
import { formatAdminDate } from '@/lib/format';
import { getDefaultLocale } from '@/lib/translations';
import { Edit2, ExternalLink, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface AdminProduct {
  id: string;
  slug: string;
  sku?: string;
  name: { en: string; ru: string; uk?: string };
  description: { en: string; ru: string; uk?: string };
  price: number;
  category: string;
  images: Array<{
    id: string;
    url: string;
    alt: { en: string; ru: string; uk?: string };
    isPrimary?: boolean;
  }>;
  inventory: number;
  weight?: number;
  materials?: string[] | string;
  origin?: string;
  craftsman?: string;
  is_handmade?: boolean;
  is_featured?: boolean;
  is_available?: boolean;
  youtube_video?: { url?: string };
  soundcloud_audio?: { streamUrl?: string };
  audio_sample?: string;
  created_at: string;
  updated_at: string;
}

interface ProductListProps {
  onEdit: (product: AdminProduct) => void;
  onRefresh: () => void;
}

export function ProductList({ onEdit, onRefresh }: ProductListProps) {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data || []);
      }
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    setDeleting(id);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
        alert('Product deleted successfully');
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting product');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No products yet</p>
        <Button onClick={onRefresh} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create First Product
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Products ({products.length})
        </h2>
        <Button onClick={loadProducts} className="bg-blue-600 hover:bg-blue-700">
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-4">
              {/* Image */}
              <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt?.en || product.name.en}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      console.error('Image failed to load:', product.images[0].url);
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500 text-xs">No image</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {product.name.en}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {product.name.ru}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Stock: {product.inventory}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {product.description.en}
                </p>

                <div className="flex gap-2 flex-wrap">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {product.category}
                  </span>
                  {product.is_featured && (
                    <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded">
                      Featured
                    </span>
                  )}
                  {product.is_available === false && (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      Hidden
                    </span>
                  )}
                  {product.inventory === 0 && (
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                      Out of stock
                    </span>
                  )}
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                    {formatAdminDate(product.created_at)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                {product.is_available !== false && (
                  <Link
                    href={`/${getDefaultLocale()}/product/${product.slug}`}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-1 rounded-md bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View
                  </Link>
                )}
                <Button
                  onClick={() => onEdit(product)}
                  className="bg-blue-600 hover:bg-blue-700 px-3"
                  size="sm"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(product.id)}
                  disabled={deleting === product.id}
                  className="bg-red-600 hover:bg-red-700 px-3"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
