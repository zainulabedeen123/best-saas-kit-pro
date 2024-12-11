'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckIcon } from '@heroicons/react/24/outline'

const plans = [
  {
    name: 'Basic',
    description: 'For small to medium sized business that have a smaller target audience',
    price: {
      monthly: 49,
      annually: 39,
    },
    features: [
      '10 GB Storage',
      '1 Custom Domain',
      'Multiple addresses',
      'Invoicing & Reimbursements',
      'Multi-State Payroll',
      'Custom integrations',
    ],
    cta: 'Schedule a demo',
    highlighted: false,
  },
  {
    name: 'Professional',
    description: 'For larger more dynamic businesses that have more than 100k active users',
    price: {
      monthly: 99,
      annually: 79,
    },
    features: [
      '100 GB Storage',
      '5 Custom Domain',
      'Multiple addresses',
      'Invoicing & Reimbursements',
      'Full Payroll Tax State Regulations',
      'Custom integrations',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'For major institutions that have millions of transactions each month',
    price: {
      monthly: 299,
      annually: 239,
    },
    features: [
      'Unlimited Storage',
      '20 Custom Domain',
      'Multiple addresses',
      'Invoicing & Reimbursements',
      'Full Payroll Tax State Regulations',
      'Custom API Development',
    ],
    cta: 'Schedule a demo',
    highlighted: false,
  },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/80 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-white font-bold text-xl">
              SaaS Kit Pro
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/features" className="text-white/80 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/docs" className="text-white/80 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="/auth" className="text-[#FFBE1A] hover:text-[#FFBE1A]/80 transition-colors">
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FFBE1A]/10 text-[#FFBE1A] text-sm mb-4">
            SaaS Kit Pro raised $100m Series A
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            A universal tool for all<br />your project needs at<br />your price point
          </h1>
          <p className="text-white/60 text-lg mb-8">
            Consolidate your projects into a uniformed and centralised<br />control center. No credit card required.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-white/60'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/10"
            >
              <span className="sr-only">Toggle billing period</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-[#FFBE1A] transition ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-white' : 'text-white/60'}`}>
              Annually <span className="text-[#FFBE1A]">20% off</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-[#FFBE1A]/20 to-transparent border-[#FFBE1A]/20'
                  : 'bg-white/5'
              } border border-white/10 relative`}
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">
                    ${isAnnual ? plan.price.annually : plan.price.monthly}
                  </span>
                  <span className="text-white/60 ml-2">/ month</span>
                </div>
                {isAnnual && (
                  <div className="text-sm text-[#FFBE1A] mt-1">
                    Save ${(plan.price.monthly - plan.price.annually) * 12} a year
                  </div>
                )}
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium mb-8 ${
                  plan.highlighted
                    ? 'bg-[#FFBE1A] text-black hover:bg-[#FFBE1A]/90'
                    : 'bg-white/10 text-white hover:bg-white/20'
                } transition-colors`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-white/80">
                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-[#FFBE1A]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 