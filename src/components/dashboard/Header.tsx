'use client'

import { useState, useEffect } from 'react'
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

  useEffect(() => {
    fetchUserAndCredits()
  }, [])

  const fetchUserAndCredits = async () => {
    try {
      // Get user
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) throw new Error('No user found')
      setUser(currentUser)

      // Get credits
      const { data: credits, error: creditsError } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', currentUser.id)
        .single()

      if (creditsError && creditsError.code !== 'PGRST116') {
        console.error('Error fetching credits:', creditsError)
        return
      }

      setCredits(credits?.credits || 0)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/auth')
    } catch (error) {
      console.error('Error signing out:', error)
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