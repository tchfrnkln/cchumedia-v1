// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const { signup, isLoading, error, success } = useAuthStore();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // You could also use a toast or dedicated error field
      alert("Passwords don't match!");
      return;
    }

    if (!gender) {
      alert('Please select a gender');
      return;
    }

    try {
      await signup(email, password, fullName, gender, location);
      // Optional: clear form or redirect after success
      // window.location.href = '/login'; // or show success message only
    } catch {
      // error is already set in store
    }
  };

  return (
    <div className="md:flex items-center justify-center bg-base-100 md:bg-base-200 py-24">
      <div className="w-[80%] md:w-3/5 bg-base-100 md:shadow-xl rounded-lg p-4">
        <div className="w-full md:p-4 md:px-24">
          <h1 className="card-title text-2xl justify-center py-4">Sign up</h1>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-xs">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-2/3"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-xs">Email</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-2/3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Gender */}
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-xs">Gender</span>
              </label>
              <select
                className="select select-bordered w-2/3"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            {/* Location */}
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-xs">Location (State)</span>
              </label>
              <input
                type="text"
                placeholder="Abuja"
                className="input input-bordered w-2/3"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-xs">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-2/3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-xs">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-2/3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Messages */}
            {error && <p className="text-error text-sm mt-2">{error}</p>}
            {success && <p className="text-success text-sm mt-2">{success}</p>}

            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner"></span> Signing up...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-4 text-sm">
            Already have an account?{' '}
            <Link href="/auth/new" className="link link-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}