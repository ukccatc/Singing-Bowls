import { AdminSettingsFaq } from '@/components/admin/AdminSettingsFaq';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const adminSections = [
  {
    title: 'Products',
    href: '/admin/products',
    description: 'Catalog, prices, inventory, featured items, images from Media Library',
    status: 'Ready' as const,
  },
  {
    title: 'Blog Articles',
    href: '/admin/content',
    description: 'Create, edit, publish multilingual blog posts with cover images',
    status: 'Ready' as const,
  },
  {
    title: 'Gallery',
    href: '/admin/gallery',
    description: 'Manage gallery photos and event albums grouped by date and activity',
    status: 'Ready' as const,
  },
  {
    title: 'Media Library',
    href: '/admin/media',
    description: 'Upload and manage product/article images via Cloudinary',
    status: 'Ready' as const,
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    description: 'View orders and update fulfillment status',
    status: 'Ready' as const,
  },
  {
    title: 'Store Settings',
    href: '/admin/settings',
    description: 'Contact email, Gmail SMTP — via environment variables (docs/email-setup.md)',
    status: 'Env-based' as const,
  },
  {
    title: 'Static Page Text',
    description: 'About page, navigation labels, footer copy — in lib/translations.ts (code)',
    status: 'Code-based' as const,
  },
  {
    title: 'Newsletter',
    description: 'Subscriber list and email delivery — not yet implemented',
    status: 'Planned' as const,
  },
];

function statusClass(status: (typeof adminSections)[number]['status']) {
  switch (status) {
    case 'Ready':
      return ui.badge.success;
    case 'Env-based':
      return ui.badge.warning;
    case 'Code-based':
      return ui.badge.info;
    default:
      return ui.badge.muted;
  }
}

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className={ui.page.title}>Settings & Data Guide</h1>
        <p className={cn('mt-1', ui.page.subtitle)}>
          Overview of where to manage each part of the site, plus a FAQ for add/edit workflows.
        </p>
      </div>

      <AdminSettingsFaq />

      <Card className="border-cream-200 shadow-sm">
        <CardHeader>
          <CardTitle>Production checklist</CardTitle>
          <CardDescription>Recommended order for filling real content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-charcoal-700">
          <p>
            1. Upload product photos in{' '}
            <Link href="/admin/media" className={ui.link}>
              Media Library
            </Link>
          </p>
          <p>
            2. Add products with featured flag in{' '}
            <Link href="/admin/products" className={ui.link}>
              Products
            </Link>
          </p>
          <p>
            3. Write blog articles in{' '}
            <Link href="/admin/content" className={ui.link}>
              Content
            </Link>
          </p>
          <p>
            4. Curate gallery in{' '}
            <Link href="/admin/gallery" className={ui.link}>
              Gallery
            </Link>
          </p>
          <p>
            5. Set <code className="rounded bg-cream-100 px-1">ADMIN_USERNAME</code> and{' '}
            <code className="rounded bg-cream-100 px-1">ADMIN_PASSWORD</code> in production env
          </p>
          <p>6. Configure Cloudinary, Supabase, and Stripe env vars on Vercel</p>
          <p>
            7. Set Gmail SMTP (<code className="rounded bg-cream-100 px-1">SMTP_USER</code>,{' '}
            <code className="rounded bg-cream-100 px-1">SMTP_PASS</code>) — see{' '}
            <code className="rounded bg-cream-100 px-1">docs/email-setup.md</code>
          </p>
          <p>
            8. Set{' '}
            <code className="rounded bg-cream-100 px-1">NEXT_PUBLIC_GOOGLE_ANALYTICS_ID</code> for
            analytics (loads only after cookie consent)
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {adminSections.map((section) => (
          <Card key={section.title} className="border-cream-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <span
                  className={cn(
                    'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium',
                    statusClass(section.status)
                  )}
                >
                  {section.status}
                </span>
              </div>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            {'href' in section && section.href ? (
              <CardContent>
                <Link href={section.href} className={cn(ui.link, 'text-sm font-medium')}>
                  Open {section.title} →
                </Link>
              </CardContent>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
