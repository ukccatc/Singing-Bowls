// Core product types
export interface Product {
  id: string;
  slug: string;
  name: Record<string, string>; // Multilingual names
  description: Record<string, string>; // Multilingual descriptions
  price: number;
  currency: string;
  images: ProductImage[];
  audioSample?: string;
  // New media fields
  youtubeVideo?: ProductVideo;
  soundcloudAudio?: ProductAudio;
  category: ProductCategory;
  specifications: ProductSpecification[];
  inventory: number;
  sku: string;
  weight: number; // in grams
  dimensions: Dimensions;
  materials: string[];
  origin: string;
  craftsman?: string;
  isHandmade: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  seo: SEOData;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: Record<string, string>; // Multilingual alt text
  width: number;
  height: number;
  isPrimary: boolean;
  is360?: boolean;
}

export interface ProductVideo {
  id: string;
  videoId: string; // YouTube video ID
  title: string;
  description?: string;
  thumbnail?: string;
  duration?: string; // ISO 8601 duration format
  url: string; // Full YouTube URL
  platform: 'youtube';
  isEmbeddable: boolean;
  privacyStatus: 'public' | 'unlisted' | 'private';
  createdAt: string;
}

export interface ProductAudio {
  id: string;
  trackId: string; // SoundCloud track ID
  title: string;
  description?: string;
  streamUrl: string;
  artworkUrl?: string;
  duration: number; // in seconds
  genre?: string;
  tags: string[];
  platform: 'soundcloud';
  isPublic: boolean;
  downloadable: boolean;
  createdAt: string;
}

export interface ProductSpecification {
  name: Record<string, string>;
  value: Record<string, string>;
  unit?: string;
}

export interface Dimensions {
  diameter?: number;
  height?: number;
  length?: number;
  width?: number;
  unit: 'cm' | 'mm' | 'inches';
}

export enum ProductCategory {
  SINGING_BOWLS = 'singing_bowls',
  MEDITATION_BELLS = 'meditation_bells',
  GONGS = 'gongs',
  ACCESSORIES = 'accessories',
  GIFT_SETS = 'gift_sets',
}

// Cart and order types
export interface CartItem {
  productId: string;
  quantity: number;
  variant?: string;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerId?: string;
  email: string;
  items: OrderItem[];
  billing: Address;
  shipping: Address;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  currency: string;
  paymentMethod: string;
  stripePaymentIntentId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  sku: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone?: string;
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum FulfillmentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

// Content types
export interface Article {
  id: string;
  title: Record<string, string>;
  excerpt: Record<string, string>;
  content: Record<string, string>;
  slug: Record<string, string>;
  author: Author;
  category: ArticleCategory;
  tags: string[];
  image: ArticleImage;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  seo: SEOData;
  readingTime: number; // in minutes
}

export interface Author {
  id: string;
  name: string;
  bio: Record<string, string>;
  avatar?: string;
  social?: SocialLinks;
}

export interface SocialLinks {
  website?: string;
  instagram?: string;
  youtube?: string;
}

export interface ArticleImage {
  url: string;
  alt: Record<string, string>;
  width: number;
  height: number;
  caption?: Record<string, string>;
}

export enum ArticleCategory {
  SOUND_HEALING = 'sound_healing',
  MEDITATION = 'meditation',
  WELLNESS = 'wellness',
  CULTURE = 'culture',
  TUTORIALS = 'tutorials',
}

// Internationalization types
export type Locale = 'en' | 'ru' | 'uk';

export interface Translation {
  [key: string]: string | Translation;
}

export interface Translations {
  [locale: string]: Translation;
}

// SEO and metadata types
export interface SEOData {
  title: Record<string, string>;
  description: Record<string, string>;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: any;
}

// Shipping and location types
export interface ShippingRate {
  id: string;
  name: string;
  price: number;
  currency: string;
  estimatedDays: number;
  carrier: string;
  service: string;
}

export interface Country {
  code: string;
  name: Record<string, string>;
  isShippingAvailable: boolean;
  taxRate?: number;
}

// User and authentication types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  preferredLocale: Locale;
  addresses: Address[];
  orders: string[]; // Order IDs
  wishlist: string[]; // Product IDs
  marketingConsent: boolean;
  createdAt: string;
  updatedAt: string;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form validation types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: Locale;
}

export interface NewsletterForm {
  email: string;
  locale: Locale;
  consent: boolean;
}

// Analytics and tracking types
export interface AnalyticsEvent {
  name: string;
  category: string;
  label?: string;
  value?: number;
  parameters?: Record<string, any>;
}

// PWA types
export interface PWAInstallPrompt {
  isInstallable: boolean;
  isInstalled: boolean;
  platform: 'ios' | 'android' | 'desktop' | 'unknown';
}

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: any;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

// Filter and search types
export interface ProductFilters {
  category?: ProductCategory[];
  priceRange?: [number, number];
  materials?: string[];
  inStock?: boolean;
  isHandmade?: boolean;
  diameter?: [number, number];
  origin?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest' | 'popularity';
}

export interface SearchResult {
  products: Product[];
  articles: Article[];
  totalResults: number;
  suggestions: string[];
}