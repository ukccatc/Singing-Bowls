'use client';

import { Button } from '@/components/ui/button';
import { formatAdminDate } from '@/lib/format';
import { getDefaultLocale } from '@/lib/translations';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
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
  currency?: string;
  category: string;
  images: Array<{
    id: string;
    url: string;
    alt: { en: string; ru: string; uk?: string };
    isPrimary?: boolean;
  }>;
  inventory: number;
  weight?: number;
  dimensions?: {
    diameter?: number;
    height?: number;
    length?: number;
    width?: number;
    unit?: 'cm' | 'mm' | 'inches';
  };
  materials?: string[] | string;
  tags?: string[] | string;
  specifications?: Array<{
    name?: { en?: string; ru?: string; uk?: string };
    value?: { en?: string; ru?: string; uk?: string };
    unit?: string;
  }>;
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
        <p className={ui.page.subtitle}>Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className={`mb-4 ${ui.page.subtitle}`}>No products yet</p>
        <Button onClick={onRefresh} className={ui.button.primary}>
          <Plus className="w-4 h-4 mr-2" />
          Create First Product
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-charcoal-900">
          Products ({products.length})
        </h2>
        <Button onClick={loadProducts} className={ui.button.primary}>
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={ui.cardInteractive}
          >
            <div className="flex gap-4">
              {/* Image */}
              <div className="relative w-24 h-24 bg-cream-100 rounded-lg overflow-hidden flex-shrink-0">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={
                      (product.images.find((img) => img.isPrimary) || product.images[0]).url
                    }
                    alt={
                      (product.images.find((img) => img.isPrimary) || product.images[0]).alt
                        ?.en || product.name.en
                    }
                    fill
                    className="object-cover"
                    onError={() => {
                      const fallback =
                        product.images.find((img) => img.isPrimary) || product.images[0];
                      console.error('Image failed to load:', fallback?.url);
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-cream-200">
                    <span className="text-charcoal-500 text-xs">No image</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-charcoal-900">
                      {product.name.en}
                    </h3>
                    <p className={`text-sm ${ui.page.subtitle}`}>
                      {product.name.ru}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-charcoal-900">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className={`text-sm ${ui.page.subtitle}`}>
                      Stock: {product.inventory}
                    </p>
                  </div>
                </div>

                <p className={`text-sm line-clamp-2 mb-3 ${ui.page.subtitle}`}>
                  {product.description.en}
                </p>

                <div className="flex gap-2 flex-wrap">
                  <span className={cn('inline-block rounded px-2 py-1 text-xs', ui.badge.primary)}>
                    {product.category}
                  </span>
                  {product.is_featured && (
                    <span className={cn('inline-block rounded px-2 py-1 text-xs', ui.badge.warning)}>
                      Featured
                    </span>
                  )}
                  {product.is_available === false && (
                    <span className={cn('inline-block rounded px-2 py-1 text-xs', ui.badge.muted)}>
                      Hidden
                    </span>
                  )}
                  {product.inventory === 0 && (
                    <span className={cn('inline-block rounded px-2 py-1 text-xs', ui.badge.danger)}>
                      Out of stock
                    </span>
                  )}
                  <span className={cn('inline-block rounded px-2 py-1 text-xs', ui.badge.info)}>
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
                    className={cn(
                      ui.button.outlineNeutral,
                      'inline-flex items-center justify-center gap-1 rounded-md px-3 py-2 text-xs font-medium'
                    )}
                  >
                    <ExternalLink className="w-3 h-3" />
                    View
                  </Link>
                )}
                <Button
                  onClick={() => onEdit(product)}
                  className={`${ui.button.primary} px-3`}
                  size="sm"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(product.id)}
                  disabled={deleting === product.id}
                  className={`${ui.button.danger} px-3`}
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
