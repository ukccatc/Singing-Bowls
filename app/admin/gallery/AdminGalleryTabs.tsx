'use client';

import { AlbumManager } from '@/components/admin/AlbumManager';
import { GalleryManager } from '@/components/admin/GalleryManager';
import { MediaStorageStatus } from '@/components/admin/MediaStorageStatus';
import { Button } from '@/components/ui/button';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { ExternalLink, Images, Layers } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminGalleryTabs() {
  const [tab, setTab] = useState<'photos' | 'albums'>('photos');

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className={ui.page.title}>Gallery</h1>
          <p className={`mt-1 ${ui.page.subtitle}`}>
            Manage public gallery photos and event albums grouped by date and activity.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/en/gallery" target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              All Photos
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/en/gallery/albums" target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Albums Page
            </Link>
          </Button>
        </div>
      </div>

      <MediaStorageStatus />

      <div className="flex gap-2 border-b border-cream-200 pb-1">
        <button
          type="button"
          onClick={() => setTab('photos')}
          className={cn(
            'inline-flex items-center gap-2 rounded-t-lg px-4 py-2 text-sm font-medium transition-colors',
            tab === 'photos' ? ui.tab.active : ui.tab.inactive
          )}
        >
          <Images className="h-4 w-4" />
          Photos
        </button>
        <button
          type="button"
          onClick={() => setTab('albums')}
          className={cn(
            'inline-flex items-center gap-2 rounded-t-lg px-4 py-2 text-sm font-medium transition-colors',
            tab === 'albums' ? ui.tab.active : ui.tab.inactive
          )}
        >
          <Layers className="h-4 w-4" />
          Albums
        </button>
      </div>

      {tab === 'photos' ? <GalleryManager /> : <AlbumManager />}
    </div>
  );
}
