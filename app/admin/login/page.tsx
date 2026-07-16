'use client';

import { useAuth } from '@/hooks/useAuth';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

export default function AdminLoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/admin');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal-900">
        <p className="text-cream-200">Redirecting...</p>
      </div>
    );
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(username, password);
    setLoading(false);

    if (success) {
      router.replace('/admin');
      return;
    }

    setError('Invalid username or password');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-bronze-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-cream-200 bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-600 text-2xl font-bold text-white shadow-md">
            H
          </div>
          <h1 className="text-2xl font-bold text-charcoal-900">Admin Login</h1>
          <p className="mt-2 text-sm text-charcoal-600">Himalayan Sound management panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-charcoal-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={cn(
                'w-full rounded-lg border border-cream-300 px-4 py-3',
                ui.focus
              )}
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-charcoal-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={cn(
                'w-full rounded-lg border border-cream-300 px-4 py-3',
                ui.focus
              )}
              placeholder="••••••••"
              required
            />
          </div>

          {error ? <p className={ui.banner.danger}>{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className={cn(ui.button.primary, 'w-full rounded-lg px-4 py-3 font-semibold disabled:opacity-60')}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
