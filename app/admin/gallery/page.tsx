import AdminGalleryTabs from '@/app/admin/gallery/AdminGalleryTabs';

export const metadata = {
  title: 'Gallery Manager - Admin',
  description: 'Manage gallery images and albums',
};

export default function GalleryPage() {
  return <AdminGalleryTabs />;
}
