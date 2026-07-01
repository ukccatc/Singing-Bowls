'use client';

import LanguageChanger from '@/components/layout/LanguageChanger';
import { NativeNavButton } from '@/components/native/NativePressable';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { releaseNativeBodyLock } from '@/lib/native-body-lock';
import { Info, Mail, Newspaper } from 'lucide-react';

interface NativeMoreMenuProps {
  locale: Locale;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const links = [
  { href: (locale: string) => `/${locale}/about`, labelKey: 'nav.about', icon: Info },
  { href: (locale: string) => `/${locale}/blog`, labelKey: 'nav.blog', icon: Newspaper },
  { href: (locale: string) => `/${locale}/contact`, labelKey: 'nav.contact', icon: Mail },
] as const;

export function NativeMoreMenu({ locale, open, onOpenChange }: NativeMoreMenuProps) {
  return (
    <Sheet
      open={open}
      modal={false}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) releaseNativeBodyLock();
      }}
    >
      <SheetContent side="bottom" className="rounded-t-2xl pb-[calc(1rem+var(--safe-area-bottom))]">
        <SheetHeader className="text-left">
          <SheetTitle>{t('nav.more', locale)}</SheetTitle>
          <SheetDescription>{t('nav.moreDescription', locale)}</SheetDescription>
        </SheetHeader>

        <nav className="mt-4 flex flex-col gap-1">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NativeNavButton
                key={item.labelKey}
                href={item.href(locale)}
                variant="icon"
                haptic="medium"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-base font-medium text-charcoal-800"
                onNavigate={() => onOpenChange(false)}
              >
                <Icon className="h-5 w-5 shrink-0 text-gold-600" />
                {t(item.labelKey, locale)}
              </NativeNavButton>
            );
          })}
        </nav>

        <div className="mt-4 border-t border-cream-200 pt-4">
          <p className="mb-2 text-sm font-medium text-charcoal-600">{t('nav.language', locale)}</p>
          <LanguageChanger variant="inline" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
