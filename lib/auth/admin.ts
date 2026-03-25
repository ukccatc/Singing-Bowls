import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// List of admin emails - update this with your admin emails
export const ADMIN_EMAILS = [
  'ukccatc@gmail.com',
];

export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const { data: user, error } = await supabase.auth.admin.getUserById(userId);
    
    if (error || !user) return false;
    
    return ADMIN_EMAILS.includes(user.user_metadata?.email || user.email || '');
  } catch (error) {
    console.error('Admin check error:', error);
    return false;
  }
}

export async function getAdminUser(token: string) {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) return null;
    
    const adminCheck = await isAdmin(user.id);
    
    if (!adminCheck) return null;
    
    return user;
  } catch (error) {
    console.error('Get admin user error:', error);
    return null;
  }
}
