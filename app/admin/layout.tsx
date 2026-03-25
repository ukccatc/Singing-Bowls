import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Manage your store',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Himalayan Sound</p>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          <Link
            href="/admin/products"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            ➕ Add Product
          </Link>
          <Link
            href="/admin/media"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            🖼️ Media Library
          </Link>
          <Link
            href="/admin/orders"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            📦 Orders
          </Link>
          <Link
            href="/admin/analytics"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            📊 Analytics
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <Link
            href="/"
            className="block px-4 py-2 text-center bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
