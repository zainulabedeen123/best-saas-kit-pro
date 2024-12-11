'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthForm from '@/components/auth/AuthForm'

function AuthContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [view, setView] = useState('sign-in')
  const supabase = createClientComponentClient()

  useEffect(() => {
    const viewParam = searchParams.get('view')
    if (viewParam) {
      setView(viewParam)
    }

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push('/dashboard')
      }
    }

    checkUser()
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <AuthForm view={view} />
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  )
} 