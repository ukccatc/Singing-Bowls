'use client';

import { Badge } from '@/components/ui/badge';
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
import { Calendar, Mail, Search, User } from 'lucide-react';
import { formatAdminDate } from '@/lib/format';
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Customers derived from completed orders</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${customers.reduce((sum, customer) => sum + customer.totalSpent, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customer List</CardTitle>
              <CardDescription>Unique customers from order history</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search customers..."
                className="w-64 pl-10"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-600">Loading customers...</p>
          ) : filteredCustomers.length === 0 ? (
            <div className="py-12 text-center">
              <User className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">No customers yet</h2>
              <p className="mt-2 text-gray-600">Customers will appear after the first order.</p>
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
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{customer.email.split('@')[0]}</div>
                          <div className="text-sm text-gray-500">Guest checkout</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{customer.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{customer.orders} orders</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${customer.totalSpent.toFixed(2)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">
                          {formatAdminDate(customer.lastOrder)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">{customer.status}</Badge>
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
