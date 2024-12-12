import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, description } = await request.json()
    
    // Generate API key
    const apiKey = `sk_${crypto.randomBytes(32).toString('hex')}`
    const hashedKey = crypto.createHash('sha256').update(apiKey).digest('hex')

    const { data, error } = await supabase
      .from('api_keys')
      .insert([
        {
          user_id: user.id,
          name,
          description,
          key_hash: hashedKey,
          created_at: new Date().toISOString(),
        }
      ])
      .select()

    if (error) throw error

    return NextResponse.json({ 
      message: 'API key created successfully',
      apiKey, // Only show once
      data: { ...data[0], key_hash: undefined }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating API key' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('api_keys')
      .select('id, name, description, created_at, last_used_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching API keys' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ message: 'API key revoked successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error revoking API key' }, { status: 500 })
  }
}
