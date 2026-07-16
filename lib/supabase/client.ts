import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Типы для базы данных (будем обновлять по мере создания таблиц)
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          slug: string;
          name: Record<string, string>;
          description: Record<string, string>;
          price: number;
          currency: string;
          inventory: number;
          category: string;
          images: any[];
          specifications: any[];
          tags: string[];
          audio_sample?: string;
          video_sample?: string;
          youtube_video?: any; // ProductVideo object
          soundcloud_audio?: any; // ProductAudio object
          sku: string;
          weight: number;
          dimensions: any;
          materials: string[];
          origin: string;
          craftsman?: string;
          is_handmade: boolean;
          is_featured: boolean;
          is_available: boolean;
          seo: any;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>>;
      };
      orders: {
        Row: {
          id: string;
          customer_id?: string;
          email: string;
          status: string;
          total: number;
          currency: string;
          billing_address: any;
          shipping_address: any;
          payment_method?: string;
          notes?: string;
          coupon_code?: string | null;
          discount_amount?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>>;
      };
      product_reviews: {
        Row: {
          id: string;
          product_id: string;
          author_name: string;
          author_email: string | null;
          rating: number;
          title: string | null;
          body: string;
          is_verified: boolean;
          is_published: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['product_reviews']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['product_reviews']['Row']>;
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          description: string | null;
          discount_type: 'percent' | 'fixed';
          discount_value: number;
          min_subtotal: number;
          max_uses: number | null;
          used_count: number;
          starts_at: string | null;
          ends_at: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['coupons']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['coupons']['Row']>;
      };
      coupon_redemptions: {
        Row: {
          id: string;
          coupon_id: string;
          order_id: string | null;
          email: string | null;
          discount_amount: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['coupon_redemptions']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['coupon_redemptions']['Row']>;
      };
      abandoned_carts: {
        Row: {
          id: string;
          email: string;
          locale: string;
          items: unknown;
          subtotal: number;
          recovery_token: string;
          reminded_at: string | null;
          recovered_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['abandoned_carts']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['abandoned_carts']['Row']>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['order_items']['Row'], 'id' | 'created_at'>;
        Update: Partial<Omit<Database['public']['Tables']['order_items']['Row'], 'id' | 'created_at'>>;
      };
      customers: {
        Row: {
          id: string;
          email: string;
          first_name?: string;
          last_name?: string;
          phone?: string;
          addresses: any[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at' | 'updated_at'>>;
      };
      articles: {
        Row: {
          id: string;
          title: Record<string, string>;
          excerpt: Record<string, string>;
          content: Record<string, string>;
          slug: Record<string, string>;
          author: any;
          category: string;
          tags: string[];
          image?: any;
          is_published: boolean;
          published_at?: string;
          reading_time?: number;
          seo?: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at' | 'updated_at'>>;
      };
      push_tokens: {
        Row: {
          id: string;
          token: string;
          platform: 'ios' | 'android';
          email: string | null;
          locale: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['push_tokens']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['push_tokens']['Row'], 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};
