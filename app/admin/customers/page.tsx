'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatAdminDate } from '@/lib/format';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { Calendar, Mail, Search, User } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface OrderRow {
  id: string;
  email: string;
  status: string;
  total: number;
  currency: string;
  created_at: string;
}

interface CustomerSummary {
  email: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'active' | 'inactive';
}

function buildCustomerSummaries(orders: OrderRow[]): CustomerSummary[] {
  const grouped = new Map<string, CustomerSummary>();

  for (const order of orders) {
    const existing = grouped.get(order.email);
    const orderDate = order.created_at;

    if (!existing) {
      grouped.set(order.email, {
        email: order.email,
        orders: 1,
        totalSpent: Number(order.total),
        lastOrder: orderDate,
        status: 'active',
      });
      continue;
    }

    existing.orders += 1;
    existing.totalSpent += Number(order.total);
    if (new Date(orderDate) > new Date(existing.lastOrder)) {
      existing.lastOrder = orderDate;
    }
  }

  return Array.from(grouped.values()).sort(
    (a, b) => new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime()
  );
}

export default function AdminCustomers() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await fetch('/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data.data || []);
        }
      } catch (error) {
        console.error('Failed to load customers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  const customers = useMemo(() => buildCustomerSummaries(orders), [orders]);
  const filteredCustomers = customers.filter((customer) =>
    customer.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className={ui.page.title}>Customers</h1>
        <p className={cn('mt-1', ui.page.subtitle)}>
          Customers derived from completed orders
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-cream-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-charcoal-600">
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-charcoal-900">{customers.length}</div>
          </CardContent>
        </Card>
        <Card className="border-cream-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-charcoal-600">
              Active Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-charcoal-900">{customers.length}</div>
          </CardContent>
        </Card>
        <Card className="border-cream-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-charcoal-600">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-charcoal-900">{orders.length}</div>
          </CardContent>
        </Card>
        <Card className="border-cream-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-charcoal-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-charcoal-900">
              ${customers.reduce((sum, customer) => sum + customer.totalSpent, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-cream-200 shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-charcoal-900">Customer List</CardTitle>
              <CardDescription>Unique customers from order history</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
              <Input
                placeholder="Search customers..."
                className="w-64 border-cream-300 pl-10 focus-visible:ring-gold-200"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className={ui.page.subtitle}>Loading customers...</p>
          ) : filteredCustomers.length === 0 ? (
            <div className="py-12 text-center">
              <User className="mx-auto mb-4 h-12 w-12 text-charcoal-400" />
              <h2 className="text-lg font-semibold text-charcoal-900">No customers yet</h2>
              <p className={cn('mt-2', ui.page.subtitle)}>
                Customers will appear after the first order.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.email}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-200">
                          <User className="h-4 w-4 text-charcoal-600" />
                        </div>
                        <div>
                          <div className="font-medium text-charcoal-900">
                            {customer.email.split('@')[0]}
                          </div>
                          <div className="text-sm text-charcoal-500">Guest checkout</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-charcoal-400" />
                        <span>{customer.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                          ui.badge.muted
                        )}
                      >
                        {customer.orders} orders
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-charcoal-900">
                        ${customer.totalSpent.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-charcoal-400" />
                        <span className="text-sm text-charcoal-600">
                          {formatAdminDate(customer.lastOrder)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                          ui.badge.success
                        )}
                      >
                        {customer.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
