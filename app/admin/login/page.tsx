'use client';

import { useAuth } from '@/hooks/useAuth';
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
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <p className="text-gray-300">Redirecting...</p>
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-2xl font-bold text-white">
            H
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="mt-2 text-sm text-gray-600">Himalayan Sound management panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-200"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-200"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gold-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-gold-700 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
