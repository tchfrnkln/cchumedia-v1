// src/app/dashboard/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Copy, User, Mail, Link as LinkIcon, Edit2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { profile, loading, error, fetchProfile } = useProfileStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleCopy = () => {
    if (profile?.affiliate_link) {
      navigator.clipboard.writeText(profile.affiliate_link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content/70">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="alert alert-error max-w-md">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="alert alert-info max-w-md">
          No profile found. Please log in.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-4xl font-bold flex items-center gap-3">
              <User className="text-primary" size={36} />
              My Profile
            </h1>
            <p className="text-base-content/60 mt-1">Manage your account and affiliate link</p>
          </div>
          <Link
            href="/dashboard"
            className="btn btn-outline btn-sm"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Main Profile Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                <User size={40} className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{profile.full_name || 'User'}</h2>
                <p className="hidden text-base-content/60 items-center gap-2">
                  <Mail size={18} /> {profile.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <User size={20} /> Personal Information
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <User size={22} className="mt-1 opacity-70" />
                      <div className="flex-1">
                        <p className="text-sm text-base-content/60">Full Name</p>
                        <p className="font-medium text-lg">{profile.full_name || 'Not set'}</p>
                      </div>
                    </div>

                    <div className="items-start gap-4 hidden">
                      <Mail size={22} className="mt-1 opacity-70" />
                      <div className="flex-1">
                        <p className="text-sm text-base-content/60">Email Address</p>
                        <p className="font-medium text-lg">{profile.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Affiliate Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-success" /> Affiliate Program
                  </h3>

                  {/* Affiliate Link */}
                  <div className="mb-6">
                    <p className="text-sm text-base-content/60 mb-2">Your Referral Link</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={profile.affiliate_link}
                        readOnly
                        className="input input-bordered flex-1 font-mono text-sm"
                      />
                      <button
                        onClick={handleCopy}
                        className="btn btn-primary btn-square"
                      >
                        <Copy size={20} />
                      </button>
                    </div>
                    {copied && (
                      <p className="text-success text-xs mt-1 flex items-center gap-1">
                        ✓ Link copied to clipboard!
                      </p>
                    )}
                  </div>

                  {/* Earnings */}
                  <div className="bg-base-200 rounded-2xl p-6">
                    <p className="text-sm text-base-content/60">Total Affiliate Earnings</p>
                    <p className="text-4xl font-bold text-success mt-2">
                      ₦{profile.total_earnings.toLocaleString()}
                    </p>
                    <p className="text-xs text-base-content/50 mt-1">Available balance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 justify-end">
          <Link
            href="/auth/forgot-password"
            className="btn btn-outline btn-sm gap-2"
          >
            <Edit2 size={16} />
            Reset Password
          </Link>

          <Link
            href="/dashboard/orders"
            className="btn btn-primary btn-sm gap-2"
          >
            View My Orders
          </Link>
        </div>

        {/* Earnings Info */}
        <div className="alert alert-info shadow-lg">
          <div className="flex gap-3">
            <div className="text-2xl">💰</div>
            <div>
              <span className="font-semibold">Earn 10% commission</span> on every paid order from users who sign up using your affiliate link. 
              Earnings are calculated from the product subtotal (excluding tax, delivery, and design fees).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}