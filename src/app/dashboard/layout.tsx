'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import {
  HomeIcon,
  ChartBarIcon,
  UserCircleIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import Header from '@/components/dashboard/Header'

interface NavItem {
  name: string
  href: string
  icon: typeof HomeIcon
}

const navigation: NavItem[] = [
  { name: 'Overview', href: '/dashboard', icon: HomeIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
  { name: 'Documents', href: '/dashboard/documents', icon: DocumentTextIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.replace('/auth')
          return
        }
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error checking session:', error)
        router.replace('/auth')
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/auth')
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase.auth])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)] pt-16">
        {/* Sidebar */}
        <div className="fixed left-0 w-64 h-[calc(100vh-4rem)] bg-[#111111] border-r border-white/5 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  )
} 