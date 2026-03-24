'use client';

import { Product } from '@/lib/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductForm from '../../ProductForm';

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          const foundProduct = data.data?.find((p: Product) => p.id === id);
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            setError('Product not found');
          }
        } else {
          setError('Failed to fetch product');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Error loading product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">Product not found</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Product</h1>
      <ProductForm product={product} isNew={false} />
    </div>
  );
}
