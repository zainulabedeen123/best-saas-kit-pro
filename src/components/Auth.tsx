'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/utils/supabase'

export default function AuthComponent() {
  return (
    <div className="max-w-md w-full mx-auto p-6">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={['google', 'github']}
        redirectTo={`${window.location.origin}/auth/callback`}
      />
    </div>
  )
} 