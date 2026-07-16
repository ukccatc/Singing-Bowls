'use client';

import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/lib/context/WishlistContext';
import { t } from '@/lib/translations';
import { Locale, Product } from '@/lib/types';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'en';
  const { productIds, isLoaded, clearWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    const load = async () => {
      if (productIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch('/api/products');
        const result = await response.json();
        const all: Product[] = result.data || [];
        const idSet = new Set(productIds);
        setProducts(all.filter((product) => idSet.has(product.id)));
      } catch (error) {
        console.error('Failed to load wishlist products:', error);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [productIds, isLoaded]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-charcoal-900">
              {t('wishlist.title', locale)}
            </h1>
            <p className="mt-1 text-charcoal-600">{t('wishlist.subtitle', locale)}</p>
          </div>
          {products.length > 0 ? (
            <Button variant="outline" onClick={clearWishlist}>
              {t('wishlist.clear', locale)}
            </Button>
          ) : null}
        </div>

        {!isLoaded || loading ? (
          <p className="text-charcoal-600">{t('wishlist.loading', locale)}</p>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-cream-300 bg-white p-12 text-center">
            <Heart className="mx-auto mb-4 h-12 w-12 text-charcoal-400" />
            <h2 className="text-xl font-semibold text-charcoal-900">
              {t('wishlist.empty', locale)}
            </h2>
            <p className="mt-2 text-charcoal-600">{t('wishlist.emptyHint', locale)}</p>
            <Button asChild className="mt-6">
              <Link href={`/${locale}/shop`}>{t('wishlist.browseShop', locale)}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                locale={locale}
                showAudio
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
