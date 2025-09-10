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
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>>;
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
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};
