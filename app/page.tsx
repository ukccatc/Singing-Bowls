import { getDefaultLocale } from '@/lib/translations';
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect(`/${getDefaultLocale()}`);
}