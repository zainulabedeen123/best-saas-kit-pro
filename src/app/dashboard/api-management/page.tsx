import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { APIKeyManager } from '@/components/api-management/APIKeyManager'
import { WebhookManager } from '@/components/api-management/WebhookManager'
import { GraphiQLComponent } from '@/components/api-management/GraphiQL'
import { CommandLineIcon, KeyIcon, BoltIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'API Management - Dashboard',
  description: 'Manage your API keys, webhooks, and explore the GraphQL API.',
}

export default function APIManagementPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">API Management</h2>
            <p className="text-gray-500 mt-2">
              Manage your API integrations, webhooks, and explore the GraphQL API.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <Tabs defaultValue="api-keys" className="space-y-6">
            <div className="border-b border-gray-200">
              <TabsList className="flex h-10 items-center space-x-4 -mb-px">
                <TabsTrigger
                  value="api-keys"
                  className="flex items-center space-x-2 px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <KeyIcon className="h-5 w-5" />
                  <span>API Keys</span>
                </TabsTrigger>
                <TabsTrigger
                  value="webhooks"
                  className="flex items-center space-x-2 px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <BoltIcon className="h-5 w-5" />
                  <span>Webhooks</span>
                </TabsTrigger>
                <TabsTrigger
                  value="graphql"
                  className="flex items-center space-x-2 px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <CommandLineIcon className="h-5 w-5" />
                  <span>GraphQL Explorer</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="api-keys" className="space-y-6">
              <div className="grid gap-6">
                <APIKeyManager />
              </div>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-6">
              <div className="grid gap-6">
                <WebhookManager />
              </div>
            </TabsContent>

            <TabsContent value="graphql" className="space-y-6">
              <div className="grid gap-6">
                <GraphiQLComponent />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
