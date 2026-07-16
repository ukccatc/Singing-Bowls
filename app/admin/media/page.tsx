import { ImageUploadManager } from '@/components/admin/ImageUploadManager';

export const metadata = {
  title: 'Media Library - Admin',
  description: 'Upload and manage Cloudinary images for products, gallery, and articles',
};

export default function MediaPage() {
  return <ImageUploadManager />;
}
