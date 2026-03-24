'use client';

import ProductForm from '../ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>
      <ProductForm isNew={true} />
    </div>
  );
}
