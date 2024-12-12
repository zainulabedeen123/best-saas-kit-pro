'use client';

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

// Type definitions
type Step = {
  title: string;
  description: string;
  code?: string;
};

type VideoContent = {
  title: string;
  description: string;
  videoId: string;
};

type StepsContent = {
  title: string;
  description?: string;
  steps: Step[];
};

type TextContent = {
  title: string;
  description: string;
};

type ContentItem = VideoContent | StepsContent | TextContent;

type Section = {
  id: string;
  title: string;
  content: ContentItem[];
};

// Documentation sections
const sections: Section[] = [
  {
    id: 'video-tutorial',
    title: 'Video Tutorial',
    content: [
      {
        title: 'Getting Started Tutorial',
        description: 'Watch our comprehensive video tutorial to get started with Best SAAS Kit Pro.',
        videoId: 'zXwkOqIDzSU',
      },
    ],
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    content: [
      {
        title: 'Installation',
        steps: [
          {
            title: 'Clone the Repository',
            description: 'Start by cloning the repository to your local machine.',
            code: 'git clone https://github.com/yourusername/best-saas-kit.git',
          },
          {
            title: 'Install Dependencies',
            description: 'Navigate to the project directory and install the required dependencies.',
            code: 'cd best-saas-kit\nnpm install',
          },
          {
            title: 'Environment Setup',
            description: 'Create a .env.local file in the root directory with your environment variables.',
            code: `# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key

# Email (Resend)
RESEND_API_KEY=your_resend_api_key`,
          },
          {
            title: 'Start Development Server',
            description: 'Run the development server to start working on your project.',
            code: 'npm run dev',
          },
        ],
      },
      {
        title: 'Project Structure',
        description: `The project follows a clean and organized structure:

- /app - Next.js app router pages and API routes
- /components - Reusable React components
- /lib - Utility functions and configurations
- /public - Static assets
- /styles - Global styles and Tailwind configuration`,
      },
    ],
  },
  {
    id: 'authentication',
    title: 'Authentication',
    content: [
      {
        title: 'Setting up Supabase Auth',
        steps: [
          {
            title: 'Create Supabase Project',
            description: 'Go to Supabase dashboard and create a new project.',
          },
          {
            title: 'Configure Auth Settings',
            description: 'Enable Email/Password authentication in your Supabase project settings.',
          },
          {
            title: 'Add Environment Variables',
            description: 'Copy your Supabase URL and anon key to your .env.local file.',
          },
        ],
      },
      {
        title: 'Authentication Flow',
        description: `The authentication flow includes:
- Sign up with email/password
- Email verification
- Sign in with email/password
- Password reset functionality
- Protected routes and middleware`,
      },
    ],
  },
  {
    id: 'email',
    title: 'Email Integration',
    content: [
      {
        title: 'Resend Email Setup',
        steps: [
          {
            title: 'Create Resend Account',
            description: 'Sign up for a Resend account at https://resend.com and get your API key.',
          },
          {
            title: 'Configure API Key',
            description: 'Add your Resend API key to the .env.local file.',
            code: 'RESEND_API_KEY=your_resend_api_key',
          },
          {
            title: 'Verify Domain',
            description: 'Add and verify your sending domain in the Resend dashboard for better deliverability.',
          },
        ],
      },
      {
        title: 'Email Features',
        description: `Integrated email functionality includes:
- Welcome emails for new sign-ups
- Beautiful, responsive email templates
- React-based email components
- Email delivery tracking
- Custom email templates for various notifications`,
      },
      {
        title: 'Customizing Email Templates',
        description: 'Email templates are located in src/lib/email/templates/ and can be customized using React Email components.',
        steps: [
          {
            title: 'Template Structure',
            description: 'Each email template is a React component using @react-email/components.',
            code: `import { 
  Body, Container, Head, Html, 
  Preview, Section, Text 
} from '@react-email/components';

export const EmailTemplate = ({ 
  username = 'there' 
}) => (
  <Html>
    <Head />
    <Preview>Welcome message</Preview>
    <Body>
      <Container>
        <Text>Hello {username}!</Text>
      </Container>
    </Body>
  </Html>
);`,
          },
        ],
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payments',
    content: [
      {
        title: 'Stripe Integration',
        steps: [
          {
            title: 'Create Stripe Account',
            description: 'Sign up for a Stripe account and get your API keys.',
          },
          {
            title: 'Configure Webhook',
            description: 'Set up Stripe webhook to handle payment events.',
            code: 'stripe listen --forward-to localhost:3000/api/webhooks/stripe',
          },
          {
            title: 'Add Products',
            description: 'Create your products and price plans in the Stripe dashboard.',
          },
        ],
      },
      {
        title: 'Subscription Management',
        description: `Features included:
- Subscription creation and management
- Usage-based billing
- Credit system integration
- Payment history
- Invoice management`,
      },
    ],
  },
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('video-tutorial')

  const isVideoContent = (item: ContentItem): item is VideoContent => {
    return 'videoId' in item;
  }

  const isStepsContent = (item: ContentItem): item is StepsContent => {
    return 'steps' in item;
  }

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/80 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-white font-bold text-xl">
              Documentation
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-white/80 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/features" className="text-white/80 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/auth" className="text-[#FFBE1A] hover:text-[#FFBE1A]/80 transition-colors">
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 max-w-3xl">
            {sections
              .find((section) => section.id === activeSection)
              ?.content.map((item, index) => (
                <div key={index} className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">{item.title}</h2>
                  {isVideoContent(item) && (
                    <div className="aspect-video mb-6">
                      <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${item.videoId}`}
                        title="Tutorial Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                  {item.description && (
                    <div className="prose prose-invert mb-6">
                      <p className="text-white/80 whitespace-pre-line">{item.description}</p>
                    </div>
                  )}
                  {isStepsContent(item) && item.steps && (
                    <div className="space-y-6">
                      {item.steps.map((step, stepIndex) => (
                        <div
                          key={stepIndex}
                          className="bg-white/5 rounded-lg p-6 border border-white/10"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-full bg-[#FFBE1A] text-black flex items-center justify-center flex-shrink-0 mt-1">
                              {stepIndex + 1}
                            </div>
                            <div className="space-y-3">
                              <h3 className="text-lg font-semibold text-white">
                                {step.title}
                              </h3>
                              <p className="text-white/80">{step.description}</p>
                              {step.code && (
                                <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto">
                                  <code className="text-white/90 whitespace-pre">
                                    {step.code}
                                  </code>
                                </pre>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
} 