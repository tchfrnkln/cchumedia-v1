// src/app/login/page.tsx
'use client';

import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, isLoading, error, success, setLoading } = useAuthStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = '/dashboard';
    } catch {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl justify-center py-4">Log In</h1>
          <form onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-error mt-2">{error}</p>}
            {success && <p className="text-success mt-2">{success}</p>}
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <div className="text-center mt-4 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/auth/new" className="link link-primary">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}