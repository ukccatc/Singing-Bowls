'use client';

import { EditProductForm } from '@/components/admin/EditProductForm';
import { ProductForm } from '@/components/admin/ProductForm';
import { ProductList, type AdminProduct } from '@/components/admin/ProductList';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function ProductsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const clearQuery = useCallback(() => {
    router.replace('/admin/products');
  }, [router]);

  const openEditById = useCallback(async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedProduct(data.data as AdminProduct);
        setView('edit');
      }
    } catch (error) {
      console.error('Failed to load product for edit:', error);
    }
  }, []);

  useEffect(() => {
    const editId = searchParams.get('edit');
    const createView = searchParams.get('view');

    if (editId) {
      openEditById(editId);
      return;
    }

    if (createView === 'create') {
      setView('create');
      setSelectedProduct(null);
      return;
    }

    setView('list');
    setSelectedProduct(null);
  }, [searchParams, openEditById]);

  const handleEdit = (product: AdminProduct) => {
    setSelectedProduct(product);
    setView('edit');
    router.replace(`/admin/products?edit=${product.id}`);
  };

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    setView('list');
    setSelectedProduct(null);
    clearQuery();
  };

  const handleCancel = () => {
    setView('list');
    setSelectedProduct(null);
    clearQuery();
  };

  const showList = () => {
    setView('list');
    setSelectedProduct(null);
    clearQuery();
  };

  const showCreate = () => {
    setView('create');
    setSelectedProduct(null);
    router.replace('/admin/products?view=create');
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className={ui.page.title}>Product Management</h1>
        <p className={cn('mt-1', ui.page.subtitle)}>
          Manage products, edit details, and attach images from the media library
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={showList}
          className={cn(
            'rounded-lg px-6 py-3 font-medium transition-all',
            view === 'list' ? ui.tab.active : cn(ui.tab.inactive, 'border border-cream-200')
          )}
        >
          All Products
        </button>
        <button
          onClick={showCreate}
          className={cn(
            'flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all',
            view === 'create' ? ui.tab.active : cn(ui.tab.inactive, 'border border-cream-200')
          )}
        >
          <Plus className="h-5 w-5" />
          Add New Product
        </button>
      </div>

      <div className={ui.card}>
        {view === 'list' && (
          <div className="p-6">
            <ProductList
              key={refreshKey}
              onEdit={handleEdit}
              onRefresh={() => setRefreshKey((prev) => prev + 1)}
            />
          </div>
        )}

        {view === 'create' && (
          <div className="p-6">
            <ProductForm onSuccess={handleSuccess} />
          </div>
        )}

        {view === 'edit' && selectedProduct && (
          <div className="p-6">
            <EditProductForm
              product={selectedProduct}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
}
