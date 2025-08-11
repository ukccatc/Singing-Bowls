import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Eye,
  Clock,
} from 'lucide-react';

// Mock data - в реальном проекте это будет из API
const stats = [
  {
    title: 'Total Products',
    value: '24',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Package,
  },
  {
    title: 'Total Orders',
    value: '156',
    change: '+8%',
    changeType: 'positive' as const,
    icon: ShoppingCart,
  },
  {
    title: 'Total Customers',
    value: '1,234',
    change: '+23%',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Revenue',
    value: '$12,345',
    change: '-2%',
    changeType: 'negative' as const,
    icon: DollarSign,
  },
];

const recentOrders = [
  {
    id: '#1234',
    customer: 'John Doe',
    product: 'Tibetan Singing Bowl',
    amount: '$299',
    status: 'pending',
    date: '2 hours ago',
  },
  {
    id: '#1233',
    customer: 'Jane Smith',
    product: 'Crystal Meditation Bell',
    amount: '$199',
    status: 'completed',
    date: '4 hours ago',
  },
  {
    id: '#1232',
    customer: 'Mike Johnson',
    product: 'Himalayan Bronze Bowl',
    amount: '$399',
    status: 'shipped',
    date: '6 hours ago',
  },
];

const quickActions = [
  {
    title: 'Add Product',
    description: 'Create a new product listing',
    icon: Plus,
    href: '/admin/products/new',
  },
  {
    title: 'View Orders',
    description: 'Check recent orders',
    icon: Eye,
    href: '/admin/orders',
  },
  {
    title: 'Manage Content',
    description: 'Edit blog articles and pages',
    icon: Clock,
    href: '/admin/content',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{order.id}</p>
                      <p className="text-xs text-gray-500">{order.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        order.status === 'completed'
                          ? 'default'
                          : order.status === 'shipped'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {order.status}
                    </Badge>
                    <span className="text-sm font-medium">{order.amount}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full">
              View All Orders
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickActions.map((action) => (
                <Button key={action.title} variant="outline" className="w-full justify-start">
                  <action.icon className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{action.title}</span>
                    <span className="text-xs text-gray-500">{action.description}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div className="flex-1">
                <p className="text-sm">New product "Crystal Meditation Bell" was added</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <p className="text-sm">Order #1234 was completed</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <div className="flex-1">
                <p className="text-sm">New customer "Jane Smith" registered</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
