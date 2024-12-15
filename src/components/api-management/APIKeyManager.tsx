"use client"

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { Copy, Plus, Trash2, Key } from 'lucide-react'

interface APIKey {
  id: string
  name: string
  description?: string
  created_at: string
  last_used_at?: string
}

export function APIKeyManager() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [newKeyData, setNewKeyData] = useState({ name: '', description: '' })
  const [newlyCreatedKey, setNewlyCreatedKey] = useState('')

  const createAPIKey = async () => {
    try {
      const response = await fetch('/api/management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newKeyData),
      })
      const data = await response.json()
      
      if (response.ok) {
        setApiKeys([data.data, ...apiKeys])
        setNewlyCreatedKey(data.apiKey)
        toast({
          title: 'Success',
          description: 'API key created successfully',
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create API key',
        variant: 'destructive',
      })
    }
  }

  const revokeAPIKey = async (id: string) => {
    try {
      const response = await fetch(`/api/management?id=${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setApiKeys(apiKeys.filter(key => key.id !== id))
        toast({
          title: 'Success',
          description: 'API key revoked successfully',
        })
      } else {
        throw new Error('Failed to revoke API key')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to revoke API key',
        variant: 'destructive',
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copied',
      description: 'API key copied to clipboard',
    })
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">API Keys</CardTitle>
            <CardDescription className="mt-2">
              Create and manage API keys for secure access to your application's API.
            </CardDescription>
          </div>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create API Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
                <DialogDescription>
                  Create a new API key to access the API programmatically. Make sure to copy your API key as it won't be shown again.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newKeyData.name}
                    onChange={(e) => setNewKeyData({ ...newKeyData, name: e.target.value })}
                    placeholder="e.g., Production API Key"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={newKeyData.description}
                    onChange={(e) => setNewKeyData({ ...newKeyData, description: e.target.value })}
                    placeholder="What this API key will be used for..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button onClick={createAPIKey}>Create Key</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        {newlyCreatedKey && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <Key className="h-4 w-4" />
              <p className="font-medium">New API Key Created</p>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 bg-white rounded-md border border-green-200 font-mono text-sm break-all">
                {newlyCreatedKey}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(newlyCreatedKey)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-green-700 mt-2">
              Make sure to copy this key now. For security reasons, you won't be able to see it again!
            </p>
          </div>
        )}

        <div className="rounded-lg border border-gray-200 divide-y divide-gray-200">
          {apiKeys.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No API keys created yet. Create your first API key to get started.
            </div>
          ) : (
            apiKeys.map((key) => (
              <div
                key={key.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{key.name}</h3>
                    {key.last_used_at && (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  {key.description && (
                    <p className="text-sm text-gray-500">{key.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Created {new Date(key.created_at).toLocaleDateString()}</span>
                    {key.last_used_at && (
                      <>
                        <span>•</span>
                        <span>Last used {new Date(key.last_used_at).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => revokeAPIKey(key.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
