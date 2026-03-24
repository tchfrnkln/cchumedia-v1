// src/app/login/page.tsx
'use client';

import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading, error, success, setLoading } = useAuthStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = '/dashboard';
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-max bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body p-8 md:p-10">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <LogIn className="w-9 h-9 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
            <p className="text-base-content/60 mt-2 text-center">
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full pl-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-11 pr-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="alert alert-error text-sm py-2">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success text-sm py-2">
                {success}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-full h-12 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Logging in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Links */}
          <div className="flex flex-col gap-4 mt-8 text-sm">
            <div className="text-center">
              Don&apos;t have an account?{' '}
              <Link href="/auth/new" className="link link-primary font-medium hover:underline">
                Sign up
              </Link>
            </div>

            <div className="text-center">
              <Link 
                href="/auth/forgot-password" 
                className="link link-primary hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}