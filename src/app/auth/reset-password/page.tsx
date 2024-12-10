'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase'
import Image from 'next/image'
import Link from 'next/link'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email address')
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })
      if (error) throw error
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Reset Password Container */}
        <div className="bg-[#111111] rounded-2xl p-8 border border-white/5">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Reset your password
            </h2>
            <p className="text-white/60">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          {success ? (
            <div className="text-center">
              <div className="bg-green-500/10 text-green-500 p-4 rounded-lg mb-6">
                Check your email for the password reset link.
                <div className="mt-2 text-sm">
                  Didn't receive the email? Check your spam folder or try again.
                </div>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => setSuccess(false)}
                  className="text-[#FFBE1A] hover:underline font-medium"
                >
                  Try again
                </button>
                <div className="block">
                  <Link
                    href="/auth"
                    className="text-white/60 hover:text-white"
                  >
                    Back to sign in
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFBE1A] focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FFBE1A] hover:bg-[#FFBE1A]/90 text-black font-medium px-4 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Reset Password'}
              </button>

              <div className="text-center mt-6">
                <Link
                  href="/auth"
                  className="text-white/60 hover:text-white"
                >
                  Back to sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
} 