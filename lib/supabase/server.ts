import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './client';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Server client with full privileges (service role key)
let supabaseServerInstance: SupabaseClient<Database> | null = null;

export function getSupabaseServer(): SupabaseClient<Database> {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseServiceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  }

  if (!supabaseServerInstance) {
    supabaseServerInstance = createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return supabaseServerInstance;
}

/** @deprecated Use getSupabaseServer() for write operations */
export const supabaseServer = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop) {
    return Reflect.get(getSupabaseServer(), prop);
  },
});

// Client for server components and public reads (anon key)
export const supabaseServerClient = createClient<Database>(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
