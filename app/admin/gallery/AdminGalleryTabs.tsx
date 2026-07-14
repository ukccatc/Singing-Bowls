'use client';

import { AlbumManager } from '@/components/admin/AlbumManager';
import { GalleryManager } from '@/components/admin/GalleryManager';
import { Button } from '@/components/ui/button';
import { ExternalLink, Images, Layers } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminGalleryTabs() {
  const [tab, setTab] = useState<'photos' | 'albums'>('photos');

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
          <p className="mt-1 text-gray-600">
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

      <div className="flex gap-2 border-b border-gray-200 pb-1">
        <button
          type="button"
          onClick={() => setTab('photos')}
          className={`inline-flex items-center gap-2 rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === 'photos'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Images className="h-4 w-4" />
          Photos
        </button>
        <button
          type="button"
          onClick={() => setTab('albums')}
          className={`inline-flex items-center gap-2 rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === 'albums'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Layers className="h-4 w-4" />
          Albums
        </button>
      </div>

      {tab === 'photos' ? <GalleryManager /> : <AlbumManager />}
    </div>
  );
}
