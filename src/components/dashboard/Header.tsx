'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Database } from '@/types/supabase'

interface User {
  id: string
  email: string
  credits: number
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          setUser(null)
          setIsLoading(false)
          return
        }

        const { data: userData } = await supabase
          .from('users')
          .select('id, email, credits')
          .eq('id', session.user.id)
          .single()

        if (userData) {
          setUser({
            id: userData.id,
            email: session.user.email || userData.email,
            credits: userData.credits
          })
        }
      } catch (error) {
        console.error('Error:', error)
        setError('Error loading user data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const { data: userData } = await supabase
          .from('users')
          .select('id, email, credits')
          .eq('id', session.user.id)
          .single()

        if (userData) {
          setUser({
            id: userData.id,
            email: session.user.email || userData.email,
            credits: userData.credits
          })
        }
      } else {
        setUser(null)
        router.replace('/auth')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.replace('/auth')
    } catch (error) {
      console.error('Error signing out:', error)
      setError('Error signing out')
    }
  }

  if (isLoading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="animate-pulse bg-white/5 h-8 w-24 rounded"></div>
            <div className="animate-pulse bg-white/5 h-8 w-32 rounded"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              SAAS Kit
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
            
            <div className="flex items-center space-x-4">
              <div className="text-white/60">
                Credits: {user?.credits || 0}
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-white/80"
                >
                  <span>{user?.email}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false)
                          handleSignOut()
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 