export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'bowlsadmin';
export const ADMIN_SESSION_COOKIE = 'admin_session';
export const ADMIN_SESSION_TOKEN = 'himalayan-admin-authenticated';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'admin';
}

export function validateAdminCredentials(username: string, password: string): boolean {
  return username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function getAdminUser(): AdminUser {
  return {
    id: 'admin-1',
    username: ADMIN_USERNAME,
    name: 'Admin',
    role: 'admin',
  };
}
