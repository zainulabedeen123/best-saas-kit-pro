'use client';

import { CheckCircle2, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { BookOpenIcon } from '@heroicons/react/24/outline';

// Current Features
const currentFeatures = [
  {
    category: "Authentication & Security",
    features: [
      "Supabase Authentication Integration",
      "Email/Password Authentication",
      "Social Auth (Google, GitHub)",
      "Protected Routes & Middleware",
      "Role-Based Access Control",
      "JWT Token Management",
      "Session Handling",
    ]
  },
  {
    category: "Database & Backend",
    features: [
      "Supabase PostgreSQL Database",
      "Real-time Subscriptions",
      "Row Level Security",
      "Database Backups",
      "API Routes Implementation",
      "Server-Side Rendering",
      "Data Caching",
    ]
  },
  {
    category: "Payment Integration",
    features: [
      "Stripe Integration",
      "Subscription Management",
      "Usage-Based Billing",
      "Payment Webhook Handling",
      "Invoice Generation",
      "Credit System",
      "Payment History",
    ]
  },
  {
    category: "UI/UX Components",
    features: [
      "Modern Dashboard Layout",
      "Responsive Design",
      "Dark Mode Support",
      "Loading States & Animations",
      "Toast Notifications",
      "Form Validations",
      "Error Handling UI",
    ]
  }
];

// Upcoming Features
const upcomingFeatures = [
  {
    category: "Advanced AI Features",
    features: [
      "AI-Powered Content Generation",
      "Smart Analytics Insights",
      "Automated Customer Support",
      "Personalized User Recommendations",
      "AI Document Processing",
    ]
  },
  {
    category: "Enhanced Security",
    features: [
      "Two-Factor Authentication (2FA)",
      "Single Sign-On (SSO)",
      "Advanced Audit Logs",
      "IP Whitelisting",
      "Enhanced Encryption",
    ]
  },
  {
    category: "Team Collaboration",
    features: [
      "Team Workspaces",
      "Role Management",
      "Activity Timeline",
      "Team Chat Integration",
      "Document Collaboration",
    ]
  },
  {
    category: "Analytics & Reporting",
    features: [
      "Custom Dashboard Builder",
      "Advanced Analytics",
      "Automated Reports",
      "Data Export Options",
      "Custom Metrics Tracking",
    ]
  },
  {
    category: "Integration & API",
    features: [
      "Webhook Management System",
      "API Key Management",
      "Third-party Integrations",
      "Custom API Endpoints",
      "GraphQL Support",
    ]
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-white">
                Startup
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-sm text-white hover:text-white border-b-2 border-[#FFBE1A]">
                Features
              </Link>
              <Link href="/pricing" className="text-sm text-white/70 hover:text-white">
                Pricing
              </Link>
              <Link href="/docs" className="text-sm text-white/70 hover:text-white flex items-center space-x-1">
                <BookOpenIcon className="w-4 h-4" />
                <span>Docs</span>
              </Link>
              <Link href="/blog" className="text-sm text-white/70 hover:text-white">
                Blog
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth" 
                className="text-sm text-white/70 hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/auth?view=sign-up"
                className="bg-[#FFBE1A] text-black text-sm px-4 py-2 rounded-lg hover:bg-[#FFBE1A]/90"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="relative pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
        <div className="relative px-6 lg:px-8 py-24 mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-6">
              <span className="mr-2">✨</span> Discover what's possible
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Powerful Features for Your SaaS
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
              Everything you need to build, launch, and scale your SaaS application. From authentication to payments, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth?view=sign-up"
                className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-[#FFBE1A] text-black font-medium hover:bg-[#FFBE1A]/90 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/docs"
                className="inline-flex justify-center items-center px-6 py-3 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Current Features */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 mb-12">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <h2 className="text-2xl font-bold text-white">Current Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentFeatures.map((category) => (
              <div
                key={category.category}
                className="bg-white/[0.02] rounded-xl border border-white/5 p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="py-16 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 mb-12">
            <Clock className="w-6 h-6 text-[#FFBE1A]" />
            <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingFeatures.map((category) => (
              <div
                key={category.category}
                className="bg-black/40 rounded-xl border border-white/5 p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-[#FFBE1A] mt-0.5" />
                      <span className="text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/60 mb-8">
            Join us today and get access to all these amazing features to help grow your business.
          </p>
          <a
            href="/auth?view=sign-up"
            className="inline-flex px-6 py-3 bg-[#FFBE1A] text-black font-medium rounded-lg hover:bg-[#FFBE1A]/90 transition-colors"
          >
            Start Free Trial
          </a>
        </div>
      </section>
    </div>
  );
} 