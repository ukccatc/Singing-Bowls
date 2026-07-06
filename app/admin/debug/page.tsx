'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DebugPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<{
    count?: number;
    products?: unknown[];
    sample?: unknown;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      try {
        const response = await fetch('/api/debug/products');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    return <div className="p-8">Loading...</div>;
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Debug: Products Data</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <p className="text-lg">
          Total Products: <strong>{data?.count || 0}</strong>
        </p>
      </div>

      {data?.sample != null && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Sample Product</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(data.sample, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
