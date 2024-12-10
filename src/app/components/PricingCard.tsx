'use client'

import { CheckIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
  priceId: string
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
  popular = false,
  priceId,
}: PricingCardProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubscribe = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        // If not authenticated, redirect to login with return URL
        const returnUrl = '/dashboard/billing'
        router.push(`/auth?returnUrl=${encodeURIComponent(returnUrl)}`)
        return
      }

      // Create Stripe Checkout Session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout URL
      window.location.href = result.url
    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'Failed to process subscription')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`rounded-lg p-8 ${
        popular
          ? 'bg-green-900/20 border-2 border-green-500'
          : 'bg-gray-800/50 border border-gray-700'
      }`}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-gray-400 ml-2">/month</span>
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      {error && (
        <div className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}
      <button
        onClick={handleSubscribe}
        disabled={isLoading}
        className={`w-full text-center py-3 px-6 rounded-lg transition-colors ${
          popular
            ? 'bg-green-500 hover:bg-green-600 text-black'
            : 'bg-white hover:bg-gray-200 text-black'
        } disabled:opacity-50`}
      >
        {isLoading ? 'Loading...' : buttonText}
      </button>
    </div>
  )
}

export default PricingCard 