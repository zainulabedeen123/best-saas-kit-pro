import { createYoga } from 'graphql-yoga'
import { createSchema } from 'graphql-yoga'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const typeDefs = `
  type Query {
    apiKeys: [APIKey!]!
    webhooks: [Webhook!]!
    integrations: [Integration!]!
  }

  type Mutation {
    createAPIKey(input: APIKeyInput!): APIKeyResponse!
    revokeAPIKey(id: ID!): SuccessResponse!
    createWebhook(input: WebhookInput!): WebhookResponse!
    updateWebhook(id: ID!, input: WebhookInput!): WebhookResponse!
    deleteWebhook(id: ID!): SuccessResponse!
  }

  type APIKey {
    id: ID!
    name: String!
    description: String
    createdAt: String!
    lastUsedAt: String
  }

  type APIKeyResponse {
    apiKey: String
    data: APIKey!
  }

  type Webhook {
    id: ID!
    url: String!
    events: [String!]!
    description: String
    status: String!
    createdAt: String!
    lastTriggeredAt: String
  }

  type WebhookResponse {
    secret: String
    data: Webhook!
  }

  type Integration {
    id: ID!
    name: String!
    type: String!
    status: String!
    config: JSON
  }

  type SuccessResponse {
    message: String!
  }

  input APIKeyInput {
    name: String!
    description: String
  }

  input WebhookInput {
    url: String!
    events: [String!]!
    description: String
  }

  scalar JSON
`

const resolvers = {
  Query: {
    apiKeys: async (_, __, { supabase, user }) => {
      if (!user) throw new Error('Unauthorized')

      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', user.id)
      
      if (error) throw error
      return data
    },
    webhooks: async (_, __, { supabase, user }) => {
      if (!user) throw new Error('Unauthorized')

      const { data, error } = await supabase
        .from('webhooks')
        .select('*')
        .eq('user_id', user.id)
      
      if (error) throw error
      return data
    },
    integrations: async (_, __, { supabase, user }) => {
      if (!user) throw new Error('Unauthorized')

      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .eq('user_id', user.id)
      
      if (error) throw error
      return data
    }
  },
  Mutation: {
    createAPIKey: async (_, { input }, { supabase, user }) => {
      // Implementation similar to REST endpoint
      // Returns { apiKey, data }
    },
    revokeAPIKey: async (_, { id }, { supabase, user }) => {
      // Implementation similar to REST endpoint
      // Returns { message }
    },
    createWebhook: async (_, { input }, { supabase, user }) => {
      // Implementation similar to REST endpoint
      // Returns { secret, data }
    },
    updateWebhook: async (_, { id, input }, { supabase, user }) => {
      // Implementation similar to REST endpoint
      // Returns { data }
    },
    deleteWebhook: async (_, { id }, { supabase, user }) => {
      // Implementation similar to REST endpoint
      // Returns { message }
    }
  }
}

const schema = createSchema({
  typeDefs,
  resolvers
})

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  context: async () => {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    return { supabase, user }
  }
})

export { handleRequest as GET, handleRequest as POST }
