import { ProductCategory } from '@/lib/types';
import { z } from 'zod';

const optionalUrl = z
  .string()
  .optional()
  .refine((val) => !val || val === '' || z.string().url().safeParse(val).success, {
    message: 'Must be a valid URL',
  });

/** Treat empty / NaN number inputs as undefined (HTML number fields). */
const optionalNonNegativeNumber = z.preprocess((value) => {
  if (value === '' || value === null || value === undefined) return undefined;
  if (typeof value === 'number' && Number.isNaN(value)) return undefined;
  return value;
}, z.number().min(0).optional());

const localizedText = z.object({
  en: z.string().optional().default(''),
  ru: z.string().optional().default(''),
  uk: z.string().optional().default(''),
});

export const adminProductImageSchema = z.object({
  id: z.string().optional(),
  url: z.string().url('Valid image URL required'),
  isPrimary: z.boolean(),
});

export const adminProductSpecSchema = z.object({
  name: localizedText,
  value: localizedText,
  unit: z.string().optional(),
});

export const adminProductSchema = z
  .object({
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
    price: z.preprocess((value) => {
      if (value === '' || value === null || value === undefined) return undefined;
      if (typeof value === 'number' && Number.isNaN(value)) return undefined;
      return value;
    }, z.number().min(0.01, 'Price must be greater than 0')),
    currency: z.enum(['USD', 'EUR', 'UAH']).default('USD'),
    category: z.nativeEnum(ProductCategory),
    images: z
      .array(adminProductImageSchema)
      .min(1, 'Add at least one product image'),
    inventory: z.preprocess((value) => {
      if (value === '' || value === null || value === undefined) return 0;
      if (typeof value === 'number' && Number.isNaN(value)) return 0;
      return value;
    }, z.number().min(0, 'Inventory cannot be negative')),
    weight: optionalNonNegativeNumber,
    diameter: optionalNonNegativeNumber,
    height: optionalNonNegativeNumber,
    dimension_unit: z.enum(['cm', 'mm', 'inches']).optional(),
    materials: z.string().optional(),
    tags: z.string().optional(),
    specifications: z.array(adminProductSpecSchema).optional().default([]),
    origin: z.string().optional(),
    craftsman: z.string().optional(),
    is_handmade: z.boolean().optional(),
    is_featured: z.boolean().optional(),
    is_available: z.boolean().optional(),
    youtube_url: optionalUrl,
    soundcloud_url: optionalUrl,
    audio_sample: optionalUrl,
  })
  .superRefine((data, ctx) => {
    const primaryCount = data.images.filter((image) => image.isPrimary).length;
    if (primaryCount !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Choose exactly one primary image',
        path: ['images'],
      });
    }
  });

export type AdminProductFormData = z.infer<typeof adminProductSchema>;
export type AdminProductImageFormData = z.infer<typeof adminProductImageSchema>;
export type AdminProductSpecFormData = z.infer<typeof adminProductSpecSchema>;
