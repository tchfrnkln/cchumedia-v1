// src/app/dashboard/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Copy, User, Mail, DollarSign, Link as LinkIcon } from 'lucide-react';

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
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-info">No profile found. Please log in.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 mt-24">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl flex items-center gap-3 mb-6">
              <User size={28} /> My Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User size={20} className="opacity-70" />
                  <div>
                    <p className="text-sm opacity-60">Full Name</p>
                    <p className="font-medium">{profile.full_name || 'Not set'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={20} className="opacity-70" />
                  <div>
                    <p className="text-sm opacity-60">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <LinkIcon size={20} className="opacity-70" />
                  <div className="w-full">
                    <p className="text-sm opacity-60">Your Affiliate Link</p>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        value={profile.affiliate_link}
                        readOnly
                        className="input input-bordered input-sm w-full"
                      />
                      <button
                        className="btn btn-sm btn-primary gap-2"
                        onClick={handleCopy}
                      >
                        <Copy size={16} />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign size={20} className="opacity-70" />
                  <div>
                    <p className="text-sm opacity-60">Total Affiliate Earnings</p>
                    <p className="text-xl font-bold text-success">
                      ₦{profile.total_earnings.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: Earnings explanation */}
        <div className="alert alert-info shadow-lg">
          <div>
            <span>
              You earn <strong>10%</strong> of the product subtotal (excluding tax, delivery & design fees) from every paid order made by users who signed up using your affiliate link.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}