import ProductsPageClient from '@/app/admin/products/ProductsPageClient';
import { Suspense } from 'react';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-charcoal-600">Loading products...</div>}>
      <ProductsPageClient />
    </Suspense>
  );
}
