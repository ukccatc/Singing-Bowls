'use client';

import { NativeShell } from '@/components/native/NativeShell';
import { Locale } from '@/lib/types';

export function NativeShellLoader({ locale }: { locale: Locale }) {
  return <NativeShell locale={locale} />;
}
