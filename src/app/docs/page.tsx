'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";

// Navigation items with their sections
const navigation = [
  {
    title: 'Get started',
    items: [
      { name: 'Introduction', href: '#introduction' },
      { name: 'Quick Start', href: '#quick-start' },
      { name: 'Environment Setup', href: '#environment' },
    ]
  },
  {
    title: 'Features',
    items: [
      { name: 'Authentication', href: '#auth' },
      { name: 'Database', href: '#database' },
      { name: 'Payments', href: '#payments' },
      { name: 'Components', href: '#components' },
    ]
  },
  {
    title: 'Tutorials',
    items: [
      { name: 'User Authentication', href: '#user-auth' },
      { name: 'API Calls', href: '#api-calls' },
      { name: 'Stripe Integration', href: '#stripe' },
      { name: 'Error Handling', href: '#error-handling' },
    ]
  },
  {
    title: 'Components',
    items: [
      { name: 'UI Components', href: '#ui-components' },
      { name: 'Layouts', href: '#layouts' },
      { name: 'Forms', href: '#forms' },
    ]
  }
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 h-screen bg-card border-r border-border fixed left-0 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <span className="text-2xl">⚡</span>
              </div>
              <span className="text-xl font-semibold">Documentation</span>
            </div>

            <nav className="space-y-8">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                            activeSection === item.href.replace('#', '')
                              ? 'bg-[#FFBE1A]/10 text-[#FFBE1A] font-medium'
                              : 'text-foreground/80 hover:bg-accent hover:text-foreground'
                          }`}
                          onClick={() => setActiveSection(item.href.replace('#', ''))}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-64">
          <div className="max-w-4xl mx-auto py-12 px-8">
            {/* Introduction Section */}
            <section id="introduction" className="mb-16">
              <h1 className="text-4xl font-bold mb-6">Introduction</h1>
              <Card className="p-6">
                <p className="text-muted-foreground mb-4">
                  Best SAAS Kit Pro is a comprehensive starter kit for building modern SaaS applications. 
                  Built with Next.js 14, TypeScript, and Tailwind CSS, it provides everything you need to launch 
                  your SaaS product quickly and efficiently.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold">What's included:</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Next.js 14 with App Router</li>
                      <li>TypeScript Configuration</li>
                      <li>Tailwind CSS & shadcn/ui</li>
                      <li>Supabase Integration</li>
                      <li>Stripe Payments</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Prerequisites:</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Node.js 18.17 or later</li>
                      <li>Supabase Account</li>
                      <li>Stripe Account</li>
                      <li>Basic knowledge of React</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            {/* Quick Start Section */}
            <section id="quick-start" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Quick Start</h2>
              <Card className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">1. Clone and Install</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
                    <code>{`git clone https://github.com/your-username/best-saas-kit-pro.git
cd best-saas-kit-pro
npm install`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">2. Set up Environment Variables</h3>
                  <p className="text-muted-foreground mb-2">Create a .env.local file in the root directory:</p>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
                    <code>{`cp .env.example .env.local`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">3. Start Development Server</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
                    <code>{`npm run dev`}</code>
                  </pre>
                </div>
              </Card>
            </section>

            {/* Environment Setup Section */}
            <section id="environment" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Environment Setup</h2>
              <Card className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Supabase Configuration</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
                    <code>{`NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Stripe Configuration</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm">
                    <code>{`STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key`}</code>
                  </pre>
                </div>
              </Card>
            </section>

            {/* Authentication Section */}
            <section id="auth" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Authentication</h2>
              <Card className="p-6">
                <p className="text-muted-foreground mb-4">
                  Authentication is handled through Supabase, providing a secure and scalable solution with features like:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Email/Password authentication</li>
                  <li>Social authentication (Google, GitHub)</li>
                  <li>Magic link authentication</li>
                  <li>JWT token management</li>
                  <li>Role-based access control</li>
                </ul>
              </Card>
            </section>

            {/* Database Section */}
            <section id="database" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Database</h2>
              <Card className="p-6">
                <p className="text-muted-foreground mb-4">
                  We use Supabase's PostgreSQL database with the following features:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Real-time subscriptions</li>
                  <li>Row level security</li>
                  <li>Database backups</li>
                  <li>PostgREST API</li>
                </ul>
              </Card>
            </section>

            {/* Payments Section */}
            <section id="payments" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Payments</h2>
              <Card className="p-6">
                <p className="text-muted-foreground mb-4">
                  Payment processing is handled through Stripe, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Subscription management</li>
                  <li>Usage-based billing</li>
                  <li>Invoice generation</li>
                  <li>Payment webhook handling</li>
                </ul>
              </Card>
            </section>

            {/* Components Section */}
            <section id="components" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Components</h2>
              <Card className="p-6">
                <p className="text-muted-foreground mb-4">
                  Built with shadcn/ui and Tailwind CSS, our components are:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Fully accessible</li>
                  <li>Customizable</li>
                  <li>Dark mode ready</li>
                  <li>Responsive by default</li>
                </ul>
              </Card>
            </section>

            {/* Add more sections for each navigation item... */}
            {/* User Authentication Tutorial */}
            <section id="user-auth" className="mb-16">
              {/* Content */}
            </section>

            {/* API Calls */}
            <section id="api-calls" className="mb-16">
              {/* Content */}
            </section>

            {/* Stripe Integration */}
            <section id="stripe" className="mb-16">
              {/* Content */}
            </section>

            {/* Error Handling */}
            <section id="error-handling" className="mb-16">
              {/* Content */}
            </section>

            {/* UI Components */}
            <section id="ui-components" className="mb-16">
              {/* Content */}
            </section>

            {/* Layouts */}
            <section id="layouts" className="mb-16">
              {/* Content */}
            </section>

            {/* Forms */}
            <section id="forms" className="mb-16">
              {/* Content */}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 