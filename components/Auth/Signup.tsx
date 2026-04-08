// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Mail, MapPin, Lock, Eye, EyeOff, UserCheck } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const affiliateId = searchParams.get('aff');
  const redirect = searchParams.get('redirect');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup, isLoading, error, success } = useAuthStore();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!gender) {
      alert('Please select a gender');
      return;
    }

    try {
      await signup(email, password, fullName, gender, location, affiliateId);
      router.push("/auth");
    } catch {
      // error is already set in store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl">
        <div className="card-body p-8 md:p-10">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-(--cchu-red)/10 rounded-2xl flex items-center justify-center mb-4">
              <UserCheck className="w-9 h-9 text-(--cchu-red)" />
            </div>
            <h1 className="text-3xl font-bold text-center">Create Account</h1>
            <p className="text-base-content/60 mt-2 text-center">
              Join us today and get started
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full pl-11"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
              </div>
            </div>

            {/* Email */}
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

            {/* Gender */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Gender</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Location (State)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Abuja"
                  className="input input-bordered w-full pl-11"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <MapPin className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
              </div>
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-11 pr-11"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="btn bg-(--cchu-red) w-full h-12 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8 text-sm">
            Already have an account?{' '}
            <Link href={`/auth?aff=${affiliateId}&redirect=${redirect}`} className="link link-primary font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}