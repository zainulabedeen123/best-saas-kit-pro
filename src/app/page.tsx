'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  CodeBracketIcon,
  RocketLaunchIcon,
  CpuChipIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'
import PricingCard from './components/PricingCard'
import FaqItem from './components/FaqItem'
import TestimonialCard from './components/TestimonialCard'
import FeatureCard from './components/FeatureCard'

const features = [
  {
    icon: <CodeBracketIcon className="w-6 h-6" />,
    title: 'Production-Ready Code',
    description: 'Get started with professionally written, well-structured code that scales.',
  },
  {
    icon: <RocketLaunchIcon className="w-6 h-6" />,
    title: 'Quick Deployment',
    description: 'Deploy your application with one click to your favorite cloud platform.',
  },
  {
    icon: <CpuChipIcon className="w-6 h-6" />,
    title: 'AI Integration',
    description: 'Built-in AI capabilities to supercharge your application features.',
  },
]

const pricingPlans = [
  {
    title: 'Starter',
    price: '99',
    description: 'Perfect for side projects and small startups',
    features: [
      'Up to 5 team members',
      'Basic analytics',
      'Community support',
      '5GB storage',
      'API access',
    ],
    buttonText: 'Get Started',
    priceId: 'price_1QTPalGI6vk81n8V8PtyW1ow'
  },
  {
    title: 'Pro',
    price: '249',
    description: 'Best for growing businesses',
    features: [
      'Unlimited team members',
      'Advanced analytics',
      'Priority support',
      '50GB storage',
      'API access',
      'Custom integrations',
    ],
    buttonText: 'Start Free Trial',
    popular: true,
    priceId: 'price_1QTPbgGI6vk81n8VgYFOi983'
  },
  {
    title: 'Enterprise',
    price: '999',
    description: 'For large scale applications',
    features: [
      'Unlimited everything',
      'White-label options',
      '24/7 phone support',
      '500GB storage',
      'API access',
      'Custom development',
    ],
    buttonText: 'Contact Sales',
    priceId: 'price_1QTPcUGI6vk81n8V9567pzL9'
  },
]

const faqs = [
  {
    question: 'What is included in the starter package?',
    answer: 'The starter package includes all essential features to get your project up and running, including basic analytics, community support, and API access.',
  },
  {
    question: 'Can I upgrade my plan later?',
    answer: 'Yes, you can upgrade your plan at any time. Your new features will be available immediately after upgrading.',
  },
  {
    question: 'Do you offer custom development?',
    answer: 'Yes, our enterprise plan includes custom development options to meet your specific needs.',
  },
]

const testimonials = [
  {
    content: "This toolkit saved us months of development time. We launched our MVP in just 2 weeks!",
    author: {
      name: "Sarah Chen",
      avatar: "/avatars/placeholder.svg",
      title: "CTO at TechStart"
    },
    stats: [
      { label: "Time Saved", value: "3 months" },
      { label: "ROI", value: "300%" }
    ]
  },
  {
    content: "The code quality is exceptional. It's like having a senior developer on the team.",
    author: {
      name: "Mike Johnson",
      avatar: "/avatars/placeholder.svg",
      title: "Lead Developer"
    }
  },
  {
    content: "Best investment we made for our startup. The support is amazing too!",
    author: {
      name: "Lisa Park",
      avatar: "/avatars/placeholder.svg",
      title: "Founder at AppLabs"
    }
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
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
              <Link href="/more" className="text-sm text-white/70 hover:text-white">
                More
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

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-6">
                <span className="mr-2">⚡</span> Ship faster with our SaaS Kit
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                Ship your startup<br />in days, not weeks
              </h1>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                The fastest way to build and deploy your startup with production-ready code
              </p>
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center bg-white/5 px-3 py-1 rounded-full">
                  <div className="flex">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i} className="text-[#FFBE1A]">
                        {star}
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-[#FFBE1A] font-medium">4.9/5</span>
                  <span className="mx-2 text-white/30">•</span>
                  <span className="text-white/70">from 1000+ reviews</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth?view=sign-up"
                  className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-[#FFBE1A] text-black font-medium hover:bg-[#FFBE1A]/90 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex justify-center items-center px-6 py-3 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
                >
                  View Demo
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="/Saas-Header.png"
                alt="SaaS Platform Preview"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {/* Launch Time */}
            <div className="text-[#4ADE80] text-sm font-mono">
              const launch_time = "01:19 AM";
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent">
                Supercharge your app instantly,<br />
                launch faster, make $
              </h2>
              <p className="text-lg text-white/60 max-w-3xl">
                Login users, process payments and send emails at lightspeed. Spend your time building 
                your startup, not integrating APIs. ShipFast provides you with the boilerplate code you 
                need to launch, FAST.
              </p>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-2xl">@</span>
                </div>
                <span className="text-white/60 text-sm">Emails</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-2xl">💳</span>
                </div>
                <span className="text-white/60 text-sm">Payments</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <span className="text-white/60 text-sm">Login</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-2xl">🗄️</span>
                </div>
                <span className="text-white/60 text-sm">Database</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
                <span className="text-white/60 text-sm">SEO</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <span className="text-white/60 text-sm">Style</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-2xl">⋯</span>
                </div>
                <span className="text-[#FFBE1A] text-sm">More</span>
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-4 text-lg">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-[#4ADE80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white/80">Tips to write copy that sells</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-[#4ADE80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white/80">Discord community to stay accountable</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-[#4ADE80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white/80">
                  <span className="text-[#FFBE1A]">Crisp</span> customer support (auto show/hide, variables...)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-[#4ADE80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white/80">Collect emails for a waitlist if your product isn't ready</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-[#4ADE80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white/80">Prompts to generate terms & privacy policy with ChatGPT</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-[#4ADE80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white/80">Copy paste code templates</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-[#4ADE80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white/80">Dead simple tutorials</span>
              </div>
            </div>

            {/* Time Saved */}
            <div className="text-[#4ADE80] text-lg">
              Time saved: ∞ hours
            </div>
          </div>
        </div>
      </section>

      {/* Time Breakdown Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#1A1311] rounded-3xl p-10 text-center">
            <div className="space-y-3">
              <div className="text-[#FF6B6B] font-medium">4 hrs <span className="text-white/60">to set up emails</span></div>
              <div><span className="text-[#FF6B6B] font-medium">+ 6 hrs</span> <span className="text-white/60">designing a landing page</span></div>
              <div><span className="text-[#FF6B6B] font-medium">+ 4 hrs</span> <span className="text-white/60">to handle Stripe webhooks</span></div>
              <div><span className="text-[#FF6B6B] font-medium">+ 2 hrs</span> <span className="text-white/60">for SEO tags</span></div>
              <div><span className="text-[#FF6B6B] font-medium">+ 1 hr</span> <span className="text-white/60">applying for Google Oauth</span></div>
              <div><span className="text-[#FF6B6B] font-medium">+ 3 hrs</span> <span className="text-white/60">for DNS records</span></div>
              <div><span className="text-[#FF6B6B] font-medium">+ 2 hrs</span> <span className="text-white/60">for protected API routes</span></div>
              <div><span className="text-[#FF6B6B] font-medium">+ ∞ hrs</span> <span className="text-white/60">overthinking...</span></div>
              <div className="pt-3 flex items-center justify-center gap-2">
                <span className="text-[#FF6B6B] font-medium">= 22+ hours</span>
                <span className="text-white/60">of headaches</span>
                <span className="text-2xl">🌧️</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <div className="inline-flex items-center text-white/60 gap-2">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              There's an easier way
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Save hours of repetitive code,<br />ship fast, get profitable
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            5000+ makers built AI tools,<br />
            SaaS, and more
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Testimonial with Stats */}
            <div className="bg-[#111111] rounded-2xl p-8 border border-white/5">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <span className="text-white/70">👤</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">Sarah Chen</h3>
                  <p className="text-white/60 text-sm">CTO at TechStart</p>
                </div>
              </div>
              <p className="text-white/80 mb-6">
                This toolkit saved us months of development time. We launched our MVP in just 2 weeks!
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-semibold text-white mb-1">3 months</div>
                  <div className="text-white/60 text-sm">Time Saved</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white mb-1">300%</div>
                  <div className="text-white/60 text-sm">ROI</div>
                </div>
              </div>
            </div>

            {/* Second Testimonial */}
            <div className="bg-[#111111] rounded-2xl p-8 border border-white/5">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <span className="text-white/70">👤</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">Mike Johnson</h3>
                  <p className="text-white/60 text-sm">Lead Developer</p>
                </div>
              </div>
              <p className="text-white/80">
                The code quality is exceptional. It's like having a senior developer on the team.
              </p>
            </div>

            {/* Third Testimonial */}
            <div className="bg-[#111111] rounded-2xl p-8 border border-white/5">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <span className="text-white/70">👤</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">Lisa Park</h3>
                  <p className="text-white/60 text-sm">Founder at AppLabs</p>
                </div>
              </div>
              <p className="text-white/80">
                Best investment we made for our startup. The support is amazing too!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-white/70 hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="text-white/70 hover:text-white">Pricing</Link></li>
                <li><Link href="/docs" className="text-white/70 hover:text-white">Documentation</Link></li>
                <li><Link href="/changelog" className="text-white/70 hover:text-white">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-white/70 hover:text-white">About</Link></li>
                <li><Link href="/blog" className="text-white/70 hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="text-white/70 hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="text-white/70 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/community" className="text-white/70 hover:text-white">Community</Link></li>
                <li><Link href="/help" className="text-white/70 hover:text-white">Help Center</Link></li>
                <li><Link href="/status" className="text-white/70 hover:text-white">Status</Link></li>
                <li><Link href="/terms" className="text-white/70 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="https://twitter.com" className="text-white/70 hover:text-white">Twitter</Link></li>
                <li><Link href="https://github.com" className="text-white/70 hover:text-white">GitHub</Link></li>
                <li><Link href="https://discord.com" className="text-white/70 hover:text-white">Discord</Link></li>
                <li><Link href="/newsletter" className="text-white/70 hover:text-white">Newsletter</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
