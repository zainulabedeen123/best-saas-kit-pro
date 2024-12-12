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

    const { url, events, description } = await request.json()
    
    // Generate webhook secret
    const secret = crypto.randomBytes(32).toString('hex')
    const secretHash = crypto.createHash('sha256').update(secret).digest('hex')

    const { data, error } = await supabase
      .from('webhooks')
      .insert([
        {
          user_id: user.id,
          url,
          events,
          description,
          secret_hash: secretHash,
          created_at: new Date().toISOString(),
          status: 'active'
        }
      ])
      .select()

    if (error) throw error

    return NextResponse.json({ 
      message: 'Webhook created successfully',
      secret, // Only show once
      data: { ...data[0], secret_hash: undefined }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating webhook' }, { status: 500 })
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
      .from('webhooks')
      .select('id, url, events, description, created_at, last_triggered_at, status')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching webhooks' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, url, events, description, status } = await request.json()

    const { data, error } = await supabase
      .from('webhooks')
      .update({ url, events, description, status })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()

    if (error) throw error

    return NextResponse.json({ 
      message: 'Webhook updated successfully',
      data: data[0]
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating webhook' }, { status: 500 })
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
      .from('webhooks')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ message: 'Webhook deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting webhook' }, { status: 500 })
  }
}
