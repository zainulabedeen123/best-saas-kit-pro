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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { Badge } from '@/components/ui/badge'
import { Plus, Settings2, Trash2 } from 'lucide-react'

interface Webhook {
  id: string
  url: string
  events: string[]
  description?: string
  status: 'active' | 'inactive'
  created_at: string
  last_triggered_at?: string
}

const AVAILABLE_EVENTS = [
  'user.created',
  'user.updated',
  'user.deleted',
  'payment.succeeded',
  'payment.failed',
  'subscription.created',
  'subscription.updated',
  'subscription.cancelled',
]

export function WebhookManager() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [newWebhookData, setNewWebhookData] = useState({
    url: '',
    events: [] as string[],
    description: '',
  })

  const createWebhook = async () => {
    try {
      const response = await fetch('/api/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWebhookData),
      })
      const data = await response.json()
      
      if (response.ok) {
        setWebhooks([data.data, ...webhooks])
        toast({
          title: 'Success',
          description: 'Webhook created successfully',
        })
        setIsCreating(false)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create webhook',
        variant: 'destructive',
      })
    }
  }

  const updateWebhook = async (id: string, updates: Partial<Webhook>) => {
    try {
      const response = await fetch('/api/webhooks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      })
      
      if (response.ok) {
        setWebhooks(webhooks.map(hook => 
          hook.id === id ? { ...hook, ...updates } : hook
        ))
        toast({
          title: 'Success',
          description: 'Webhook updated successfully',
        })
        setIsEditing(null)
      } else {
        throw new Error('Failed to update webhook')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update webhook',
        variant: 'destructive',
      })
    }
  }

  const deleteWebhook = async (id: string) => {
    try {
      const response = await fetch(`/api/webhooks?id=${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setWebhooks(webhooks.filter(hook => hook.id !== id))
        toast({
          title: 'Success',
          description: 'Webhook deleted successfully',
        })
      } else {
        throw new Error('Failed to delete webhook')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete webhook',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Webhooks</CardTitle>
        <CardDescription>
          Configure webhooks to receive real-time updates for specific events.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Webhook
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Webhook</DialogTitle>
                <DialogDescription>
                  Set up a new webhook endpoint to receive event notifications.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="url">Endpoint URL</Label>
                  <Input
                    id="url"
                    value={newWebhookData.url}
                    onChange={(e) => setNewWebhookData({ ...newWebhookData, url: e.target.value })}
                    placeholder="https://api.your-domain.com/webhook"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Events</Label>
                  <Select
                    onValueChange={(value) => 
                      setNewWebhookData({
                        ...newWebhookData,
                        events: [...newWebhookData.events, value]
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select events" />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_EVENTS.map((event) => (
                        <SelectItem key={event} value={event}>
                          {event}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newWebhookData.events.map((event) => (
                      <Badge
                        key={event}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => 
                          setNewWebhookData({
                            ...newWebhookData,
                            events: newWebhookData.events.filter(e => e !== event)
                          })
                        }
                      >
                        {event} ×
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={newWebhookData.description}
                    onChange={(e) => setNewWebhookData({ ...newWebhookData, description: e.target.value })}
                    placeholder="Used for..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button onClick={createWebhook}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="divide-y">
          {webhooks.map((webhook) => (
            <div
              key={webhook.id}
              className="py-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{webhook.url}</h3>
                  <Badge variant={webhook.status === 'active' ? 'default' : 'secondary'}>
                    {webhook.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(webhook.id)}
                  >
                    <Settings2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteWebhook(webhook.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {webhook.description && (
                <p className="text-sm text-gray-500 mb-2">{webhook.description}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {webhook.events.map((event) => (
                  <Badge key={event} variant="outline">
                    {event}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Created {new Date(webhook.created_at).toLocaleDateString()}
                {webhook.last_triggered_at && 
                  ` • Last triggered ${new Date(webhook.last_triggered_at).toLocaleDateString()}`
                }
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
