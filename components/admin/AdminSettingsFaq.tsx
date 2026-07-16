'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ui } from '@/lib/ui';
import Link from 'next/link';

const faqItems = [
  {
    id: 'getting-started',
    question: 'How do I use the admin panel?',
    answer: (
      <div className="space-y-2">
        <p>
          Sign in at <code className="rounded bg-cream-100 px-1">/admin/login</code>, then use the
          left sidebar to move between sections. The gold highlight shows the current page.
        </p>
        <p>
          Typical daily flow: upload images → create/edit products → publish content → curate
          gallery → process orders. Open any storefront page with “Back to Store” or the external
          links on Gallery / Content.
        </p>
      </div>
    ),
  },
  {
    id: 'media',
    question: 'How do I add or delete images (Media Library)?',
    answer: (
      <div className="space-y-2">
        <p>
          Open{' '}
          <Link href="/admin/media" className={ui.link}>
            Media Library
          </Link>
          . Upload files at the top (JPG/PNG/WebP). Images are stored on Cloudinary — check the
          storage bar for remaining space.
        </p>
        <p>
          Use search, folder filter, and sort to find assets. Select one or more items to bulk
          delete. Copy URL or public ID when you need them outside admin. Always upload media here
          first, then attach it from Products, Content, or Gallery.
        </p>
      </div>
    ),
  },
  {
    id: 'products-add',
    question: 'How do I add a new product?',
    answer: (
      <div className="space-y-2">
        <p>
          Go to{' '}
          <Link href="/admin/products" className={ui.link}>
            Products
          </Link>{' '}
          → <strong>Add New Product</strong>.
        </p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Fill slug (URL), SKU (auto-generated if empty), title/description in EN / RU / UK.</li>
          <li>Set price, currency, inventory, category, and optional dimensions / weight.</li>
          <li>
            Attach one or more images from Media Library; mark one as primary. Add YouTube /
            SoundCloud / audio sample URLs if needed.
          </li>
          <li>
            Toggle Featured / Available / Handmade, then save. The product appears in the store
            catalog when Available is on.
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: 'products-edit',
    question: 'How do I edit or remove a product?',
    answer: (
      <div className="space-y-2">
        <p>
          On{' '}
          <Link href="/admin/products" className={ui.link}>
            Products
          </Link>
          , open a product with Edit. Change any field, reorder or replace images, update
          specifications, then save.
        </p>
        <p>
          To hide a product without deleting it, turn off <strong>Available</strong>. Use delete
          only when you are sure — related storefront links will break.
        </p>
      </div>
    ),
  },
  {
    id: 'gallery',
    question: 'How do I manage Gallery photos and albums?',
    answer: (
      <div className="space-y-2">
        <p>
          Open{' '}
          <Link href="/admin/gallery" className={ui.link}>
            Gallery
          </Link>
          . Switch tabs: <strong>Photos</strong> or <strong>Albums</strong>.
        </p>
        <p>
          <strong>Photos:</strong> pick images from Media Library, set titles (EN/RU/UK), category,
          and display order. Edit or deactivate items from the list.
        </p>
        <p>
          <strong>Albums:</strong> create an album with title, slug, event date, and activity type.
          Click photos to add them, set a cover, reorder with arrows, then save. Inactive albums
          stay hidden on the public albums page.
        </p>
      </div>
    ),
  },
  {
    id: 'content',
    question: 'How do I add or edit blog articles?',
    answer: (
      <div className="space-y-2">
        <p>
          Open{' '}
          <Link href="/admin/content" className={ui.link}>
            Content
          </Link>{' '}
          → <strong>New Article</strong>. Fill title, excerpt, and body for EN / RU / UK, pick a
          category and cover image from Media Library, set reading time, then check{' '}
          <strong>Published</strong> when ready.
        </p>
        <p>
          Edit or preview from the table actions. Unpublish by editing and clearing Published.
          Delete removes the article permanently.
        </p>
      </div>
    ),
  },
  {
    id: 'orders',
    question: 'How do I process orders?',
    answer: (
      <div className="space-y-2">
        <p>
          Open{' '}
          <Link href="/admin/orders" className={ui.link}>
            Orders
          </Link>
          . Each row shows email, total, and date. Change status with the dropdown:{' '}
          <code className="rounded bg-cream-100 px-1">pending</code> →{' '}
          <code className="rounded bg-cream-100 px-1">processing</code> →{' '}
          <code className="rounded bg-cream-100 px-1">shipped</code> →{' '}
          <code className="rounded bg-cream-100 px-1">delivered</code> (or{' '}
          <code className="rounded bg-cream-100 px-1">cancelled</code>).
        </p>
        <p>
          Customers on the{' '}
          <Link href="/admin/customers" className={ui.link}>
            Customers
          </Link>{' '}
          page are derived automatically from order emails — no separate create form.
        </p>
      </div>
    ),
  },
  {
    id: 'i18n',
    question: 'How do multilingual fields work?',
    answer: (
      <div className="space-y-2">
        <p>
          Products, articles, and gallery items have EN / RU / UK fields side by side. English is
          the primary fallback on the storefront. Fill RU and UK for full localization; leave a
          language empty only if you accept falling back to EN.
        </p>
        <p>
          Static site copy (About, nav, footer) lives in code (
          <code className="rounded bg-cream-100 px-1">lib/translations.ts</code>), not in this
          panel.
        </p>
      </div>
    ),
  },
  {
    id: 'env',
    question: 'What cannot be changed in this panel?',
    answer: (
      <div className="space-y-2">
        <p>
          Admin login, contact email, SMTP, Cloudinary, Supabase, and Stripe are configured via
          environment variables (local <code className="rounded bg-cream-100 px-1">.env.local</code>{' '}
          or Vercel). See <code className="rounded bg-cream-100 px-1">docs/email-setup.md</code> for
          Gmail SMTP.
        </p>
        <p>
          Change <code className="rounded bg-cream-100 px-1">ADMIN_USERNAME</code> /{' '}
          <code className="rounded bg-cream-100 px-1">ADMIN_PASSWORD</code> in production before
          launch. Newsletter tools are not available yet.
        </p>
      </div>
    ),
  },
  {
    id: 'tips',
    question: 'Common tips and troubleshooting',
    answer: (
      <ul className="list-disc space-y-1 pl-5">
        <li>If an image picker is empty, upload to Media Library first, then refresh the form.</li>
        <li>Slug must be unique and URL-safe (lowercase, hyphens). Changing a slug breaks old links.</li>
        <li>Featured products appear in homepage / featured sections when Available is on.</li>
        <li>Watch Media storage on Gallery — Free Cloudinary plans have a hard limit.</li>
        <li>After saving, open the public page in a new tab to verify EN / RU / UK rendering.</li>
      </ul>
    ),
  },
];

export function AdminSettingsFaq() {
  return (
    <Card className="border-cream-200 shadow-sm">
      <CardHeader>
        <CardTitle>FAQ — How to use the admin panel</CardTitle>
        <CardDescription>
          Step-by-step guide for adding and editing products, media, gallery, content, and orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left text-charcoal-900 hover:text-gold-800 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-charcoal-700">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
