'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in')
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        // Get return URL from query params or default to dashboard
        const returnUrl = searchParams.get('returnUrl') || '/dashboard'
        router.push(returnUrl)
      }
    }

    checkUser()
  }, [])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Get return URL from query params or default to dashboard
      const returnUrl = searchParams.get('returnUrl') || '/dashboard'
      router.push(returnUrl)
    } catch (err) {
      console.error('Error signing in:', err)
      setError(err instanceof Error ? err.message : 'Error signing in')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      // Show success message or redirect
      setView('sign-in')
      alert('Please check your email to confirm your account')
    } catch (err) {
      console.error('Error signing up:', err)
      setError(err instanceof Error ? err.message : 'Error signing up')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="max-w-sm w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-white">
            {view === 'sign-in' ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>

        <form className="space-y-6" onSubmit={view === 'sign-in' ? handleSignIn : handleSignUp}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFBE1A] focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFBE1A] focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 rounded-lg bg-[#FFBE1A] hover:bg-[#FFBE1A]/90 text-black font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFBE1A] disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : view === 'sign-in' ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => setView(view === 'sign-in' ? 'sign-up' : 'sign-in')}
            className="text-[#FFBE1A] hover:underline"
          >
            {view === 'sign-in'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>

        {view === 'sign-in' && (
          <div className="text-center">
            <Link
              href="/auth/reset-password"
              className="text-[#FFBE1A] hover:underline text-sm"
            >
              Forgot your password?
            </Link>
          </div>
        )}
      </div>
    </div>
  )
} 