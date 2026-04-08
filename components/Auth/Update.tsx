'use client'

import { useState, useEffect } from 'react'
import { KeyRound, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePasswordStore } from '@/store/authPassword'
import { supabase } from '@/lib/supabase/client'

export default function UpdatePassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { isLoading, error, successMessage, setLoading, setError, setSuccess, clearMessages } = usePasswordStore()
  const router = useRouter()

  // Optional: Listen for PASSWORD_RECOVERY event
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        console.log('✅ Password recovery mode activated')
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMessages()

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({ password })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      setSuccess('Password updated successfully!')
      // Sign out the temporary recovery session
      await supabase.auth.signOut()
      
      setTimeout(() => {
        router.push('/auth')
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-(--cchu-red)/10 rounded-full flex items-center justify-center">
              <KeyRound className="w-8 h-8 text-(--cchu-red)" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">Set New Password</h2>
          <p className="text-center text-base-content/70 mb-8">
            Enter your new password below
          </p>

          <form onSubmit={handleUpdatePassword} className="space-y-6">
            {/* New Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
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
                <span className="label-text">Confirm New Password</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-12"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && <div className="alert alert-error text-sm">{error}</div>}
            {successMessage && <div className="alert alert-success text-sm">{successMessage}</div>}

            <button
              type="submit"
              className="btn bg-(--cchu-red) text-white w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Updating password...' : 'Update Password'}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link href="/auth/login" className="flex items-center justify-center gap-2 text-sm hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}