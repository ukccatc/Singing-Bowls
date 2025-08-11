'use client';

import React, { useEffect, useState } from 'react';

export default function TestPage() {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      // Попробуем импортировать данные
      import('@/lib/data/products').then(({ sampleProducts }) => {
        console.log('Successfully imported products:', sampleProducts);
      }).catch((err) => {
        console.error('Import error:', err);
        setError(err.message);
      });
    } catch (err: any) {
      console.error('Error in useEffect:', err);
      setError(err.message);
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      <p>Check browser console for details</p>
    </div>
  );
} 