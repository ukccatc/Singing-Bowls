'use client';

import { EditProductForm } from '@/components/admin/EditProductForm';
import { ProductForm } from '@/components/admin/ProductForm';
import { ProductList } from '@/components/admin/ProductList';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function ProductsPage() {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setView('edit');
  };

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Product Management</h1>
          <p className="text-gray-600">Manage all your products, edit details, and upload images</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setView('list')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              view === 'list'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            📋 All Products
          </button>
          <button
            onClick={() => setView('create')}
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

        {/* Content */}
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
    </div>
  );
}
