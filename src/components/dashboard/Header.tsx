'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import {
  CreditCardIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [credits, setCredits] = useState<number>(0)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const fetchUserAndCredits = useCallback(async () => {
    try {
      // Get user
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        console.error('Error fetching user:', userError.message)
        return
      }
      
      if (!currentUser) {
        console.log('No user found')
        return
      }
      
      setUser(currentUser)

      // Try to get existing credits
      const { data: credits, error: creditsError } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', currentUser.id)
        .single()

      // Handle the case where either the record doesn't exist or there's another error
      if (creditsError) {
        if (creditsError.code === 'PGRST116') {
          // Record not found, try to create one
          const { data: newCredits, error: insertError } = await supabase
            .from('user_credits')
            .insert([
              { 
                user_id: currentUser.id, 
                credits: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            ])
            .select('credits')
            .single()

          if (insertError) {
            if (insertError.code === '42P01') {
              // Table doesn't exist, redirect to support
              console.error('Credits table not found. Please contact support.')
              return
            }
            console.error('Error creating credits record:', insertError.message)
            return
          }

          setCredits(newCredits?.credits || 0)
          return
        }

        // Handle other types of errors
        console.error('Error fetching credits:', creditsError.message)
        return
      }

      setCredits(credits?.credits || 0)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Unexpected error:', error.message)
      } else {
        console.error('Unknown error:', error)
      }
    }
  }, [supabase])

  useEffect(() => {
    fetchUserAndCredits()
  }, [fetchUserAndCredits])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/auth')
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error signing out:', error.message)
      } else {
        console.error('Error signing out:', error)
      }
    }
  }

  return (
    <header className="h-16 bg-black border-b border-white/5">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left side - Dashboard Title */}
        <div className="flex items-center">
          <h1 className="text-white font-bold text-xl">Dashboard</h1>
        </div>

        {/* Right side - Credits & Profile */}
        <div className="flex items-center space-x-4">
          {/* Credits Display */}
          <div className="flex items-center text-sm">
            <CreditCardIcon className="h-5 w-5 text-[#FFBE1A] mr-2" />
            <span className="text-white/80">{credits} Credits</span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-sm text-white/80 hover:text-white transition-colors"
            >
              <UserCircleIcon className="h-5 w-5" />
              <span className="max-w-[150px] truncate">{user?.email}</span>
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#111111] border border-white/5 rounded-lg shadow-lg py-1 z-50">
                <button
                  onClick={() => router.push('/dashboard/profile')}
                  className="block w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => router.push('/dashboard/billing')}
                  className="block w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                >
                  Billing & Credits
                </button>
                <div className="border-t border-white/5 my-1" />
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-white/5"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 