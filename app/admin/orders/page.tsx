'use client';

import { Package } from 'lucide-react';
import { formatAdminDate } from '@/lib/format';
import { useEffect, useState } from 'react';

interface OrderRow {
  id: string;
  email: string;
  status: string;
  total: number;
  currency: string;
  created_at: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data.data || []);
        }
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Orders</h1>
      <p className="mb-8 text-gray-600">View and manage customer orders</p>

      {loading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">No orders yet</h2>
          <p className="mt-2 text-gray-600">Orders will appear here once customers complete checkout.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{order.email}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{order.status}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {order.currency} {Number(order.total).toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {formatAdminDate(order.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
