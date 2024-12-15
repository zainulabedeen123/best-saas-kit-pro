"use client"

import { Card } from '@/components/ui/card'
import dynamic from 'next/dynamic'

// Dynamically import GraphiQL to avoid SSR issues
const GraphiQL = dynamic(
  () => import('graphiql').then((mod) => mod.GraphiQL),
  { ssr: false }
)

const fetcher = async (graphQLParams: any) => {
  const data = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphQLParams),
    credentials: 'same-origin',
  })
  return data.json().catch(() => data.text())
}

export function GraphiQLComponent() {
  return (
    <Card className="w-full">
      <div className="h-[600px]">
        <GraphiQL
          fetcher={fetcher}
          defaultQuery={`# Welcome to GraphiQL
#\n# GraphiQL is an in-browser tool for writing, validating, and\n# testing GraphQL queries.\n#\n# Type queries into this side of the screen, and you will see intelligent\n# typeaheads aware of the current GraphQL type schema and live syntax and\n# validation errors highlighted within the text.\n#\n# GraphQL queries typically start with a "{" character. Lines that start\n# with a # are ignored.\n#\n# Here's an example query to get you started:\n\nquery {\n  apiKeys {\n    id\n    name\n    createdAt\n    lastUsedAt\n  }\n  webhooks {\n    id\n    url\n    events\n    status\n  }\n}\n`}
        />
      </div>
    </Card>
  )
}
