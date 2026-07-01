import { AdminShell } from '@/components/admin/AdminShell';
import { AuthProvider } from '@/hooks/useAuth';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Manage your store',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
