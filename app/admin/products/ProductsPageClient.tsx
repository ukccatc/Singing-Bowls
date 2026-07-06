'use client';

import { EditProductForm } from '@/components/admin/EditProductForm';
import { ProductForm } from '@/components/admin/ProductForm';
import { ProductList, type AdminProduct } from '@/components/admin/ProductList';
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
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Product Management</h1>
        <p className="text-gray-600">Manage all your products, edit details, and upload images</p>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={showList}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            view === 'list'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          All Products
        </button>
        <button
          onClick={showCreate}
          className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            view === 'create'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
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
