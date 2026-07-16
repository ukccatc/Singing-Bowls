'use client';

import { formatAdminDate } from '@/lib/format';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { Package } from 'lucide-react';
import { useEffect, useState } from 'react';

interface OrderRow {
  id: string;
  email: string;
  status: string;
  total: number;
  currency: string;
  created_at: string;
}

const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

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

  const handleStatusChange = async (orderId: string, status: string) => {
    setUpdating(orderId);
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setOrders((prev) =>
          prev.map((order) => (order.id === orderId ? { ...order, status } : order))
        );
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Status update error:', error);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div>
      <h1 className={cn(ui.page.title, 'mb-2')}>Orders</h1>
      <p className={cn(ui.page.subtitle, 'mb-8')}>View and manage customer orders</p>

      {loading ? (
        <p className={ui.page.subtitle}>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-cream-300 bg-white p-12 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-charcoal-400" />
          <h2 className="text-lg font-semibold text-charcoal-900">No orders yet</h2>
          <p className={cn('mt-2', ui.page.subtitle)}>
            Orders will appear here once customers complete checkout.
          </p>
        </div>
      ) : (
        <div className={ui.tableShell}>
          <table className="min-w-full divide-y divide-cream-200">
            <thead className={ui.tableHead}>
              <tr>
                <th className="px-6 py-3 text-left">Order</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200 bg-white">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-charcoal-900">
                    {order.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-charcoal-600">
                    {order.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-charcoal-600">
                    <select
                      value={order.status}
                      disabled={updating === order.id}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={cn(
                        'rounded-md border border-cream-300 px-2 py-1 text-sm',
                        ui.focus
                      )}
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-charcoal-600">
                    {order.currency} {Number(order.total).toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-charcoal-600">
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
