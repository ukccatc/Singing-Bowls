'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { triggerHapticLight } from '@/lib/native-actions';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { releaseNativeBodyLock } from '@/lib/native-body-lock';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

interface NativeSearchSheetProps {
  locale: Locale;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NativeSearchSheet({ locale, open, onOpenChange }: NativeSearchSheetProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    triggerHapticLight();
    onOpenChange(false);
    releaseNativeBodyLock();
    router.push(`/${locale}/shop?search=${encodeURIComponent(q)}`);
    setQuery('');
  };

  return (
    <Sheet
      open={open}
      modal={false}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) releaseNativeBodyLock();
      }}
    >
      <SheetContent side="top" className="rounded-b-2xl pt-[calc(1rem+var(--safe-area-top))]">
        <SheetHeader className="text-left">
          <SheetTitle>{t('common.search', locale)}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('native.searchPlaceholder', locale)}
              className="pl-9"
              autoFocus
            />
          </div>
          <Button type="submit" className="shrink-0 bg-gold-500 hover:bg-gold-600">
            {t('common.search', locale)}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
