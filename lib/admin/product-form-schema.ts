import { ProductCategory } from '@/lib/types';
import { z } from 'zod';

const optionalUrl = z
  .string()
  .optional()
  .refine((val) => !val || val === '' || z.string().url().safeParse(val).success, {
    message: 'Must be a valid URL',
  });

export const adminProductSchema = z.object({
  slug: z.string().min(2, 'Slug required'),
  sku: z.string().optional(),
  name: z.object({
    en: z.string().min(2, 'English name required'),
    ru: z.string().min(2, 'Russian name required'),
    uk: z.string().optional(),
  }),
  description: z.object({
    en: z.string().min(10, 'English description required'),
    ru: z.string().min(10, 'Russian description required'),
    uk: z.string().optional(),
  }),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  category: z.nativeEnum(ProductCategory),
  image_url: z.string().url('Valid image URL required'),
  inventory: z.number().min(0, 'Inventory cannot be negative'),
  weight: z.number().min(0).optional(),
  materials: z.string().optional(),
  origin: z.string().optional(),
  craftsman: z.string().optional(),
  is_handmade: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  is_available: z.boolean().optional(),
  youtube_url: optionalUrl,
  soundcloud_url: optionalUrl,
  audio_sample: optionalUrl,
});

export type AdminProductFormData = z.infer<typeof adminProductSchema>;
