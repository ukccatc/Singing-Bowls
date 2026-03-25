'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Debug: Products Data</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <p className="text-lg">Total Products: <strong>{data?.count || 0}</strong></p>
      </div>

      {data?.sample && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Sample Product</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(data.sample, null, 2)}
          </pre>
        </div>
      )}

      {data?.products && (
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">All Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Name (EN)</th>
                  <th className="p-2 text-left">Image URL</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Stock</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product: any) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-2 font-mono text-xs">{product.id.slice(0, 8)}...</td>
                    <td className="p-2">{product.name?.en || 'N/A'}</td>
                    <td className="p-2">
                      {product.image_url ? (
                        <a
                          href={product.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs truncate max-w-xs"
                        >
                          {product.image_url.slice(0, 50)}...
                        </a>
                      ) : (
                        <span className="text-red-600">No image</span>
                      )}
                    </td>
                    <td className="p-2">${product.price}</td>
                    <td className="p-2">{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
