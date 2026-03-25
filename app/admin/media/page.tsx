import { ImageUploadManager } from '@/components/admin/ImageUploadManager';

export const metadata = {
  title: 'Media Library - Admin',
  description: 'Manage product images and media files',
};

export default function MediaPage() {
  return <ImageUploadManager />;
}
