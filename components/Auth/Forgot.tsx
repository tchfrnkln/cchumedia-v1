'use client'

import { useState } from 'react'
import { Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { usePasswordStore } from '@/store/authPassword'
import { supabase } from '@/lib/supabase/client'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const { isLoading, error, successMessage, setLoading, setError, setSuccess, clearMessages } = usePasswordStore()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMessages()
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      setSuccess('Check your email! We sent you a password reset link.')
      setEmail('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-(--cchu-red)/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-(--cchu-red)" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">Forgot Password?</h2>
          <p className="text-center text-base-content/70 mb-8">
            No worries! Enter your email and we&apos;ll send you a reset link.
          </p>

          <form onSubmit={handleReset} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
              </div>
            </div>

            {error && <div className="alert alert-error text-sm">{error}</div>}
            {successMessage && <div className="alert alert-success text-sm">{successMessage}</div>}

            <button
              type="submit"
              className="btn bg-(--cchu-red) text-white w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Sending reset link...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link href="/auth" className="flex items-center justify-center gap-2 text-sm hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}