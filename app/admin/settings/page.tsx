import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const adminSections = [
  {
    title: 'Products',
    href: '/admin/products',
    description: 'Catalog, prices, inventory, featured items, images from Media Library',
    status: 'Ready',
  },
  {
    title: 'Blog Articles',
    href: '/admin/content',
    description: 'Create, edit, publish multilingual blog posts with cover images',
    status: 'Ready',
  },
  {
    title: 'Gallery',
    href: '/admin/gallery',
    description: 'Event photos with titles, descriptions, display order, and visibility',
    status: 'Ready',
  },
  {
    title: 'Media Library',
    href: '/admin/media',
    description: 'Upload and manage product/article images via Cloudinary',
    status: 'Ready',
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    description: 'View orders and update fulfillment status',
    status: 'Ready',
  },
  {
    title: 'Store Settings',
    href: '/admin/settings',
    description: 'Contact info, social links, shipping rules — configured via environment variables',
    status: 'Env-based',
  },
  {
    title: 'Static Page Text',
    description: 'About page, navigation labels, footer copy — in lib/translations.ts (code)',
    status: 'Code-based',
  },
  {
    title: 'Newsletter',
    description: 'Subscriber list and email delivery — not yet implemented',
    status: 'Planned',
  },
];

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings & Data Guide</h1>
        <p className="text-gray-600">
          Overview of where to manage each part of the site before going live with real data.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Production checklist</CardTitle>
          <CardDescription>Recommended order for filling real content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-700">
          <p>1. Upload product photos in <Link href="/admin/media" className="text-blue-600 underline">Media Library</Link></p>
          <p>2. Add products with featured flag in <Link href="/admin/products" className="text-blue-600 underline">Products</Link></p>
          <p>3. Write blog articles in <Link href="/admin/content" className="text-blue-600 underline">Content</Link></p>
          <p>4. Curate gallery in <Link href="/admin/gallery" className="text-blue-600 underline">Gallery</Link></p>
          <p>5. Set <code className="rounded bg-gray-100 px-1">ADMIN_USERNAME</code> and <code className="rounded bg-gray-100 px-1">ADMIN_PASSWORD</code> in production env</p>
          <p>6. Configure Cloudinary, Supabase, and Stripe env vars on Netlify/Vercel</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {adminSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                  section.status === 'Ready'
                    ? 'bg-green-100 text-green-800'
                    : section.status === 'Env-based'
                      ? 'bg-amber-100 text-amber-800'
                      : section.status === 'Code-based'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-700'
                }`}>
                  {section.status}
                </span>
              </div>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            {section.href && (
              <CardContent>
                <Link href={section.href} className="text-sm font-medium text-blue-600 hover:underline">
                  Open {section.title} →
                </Link>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
