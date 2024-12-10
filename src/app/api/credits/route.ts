import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's credits
    const { data: credits, error: creditsError } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single()

    if (creditsError && creditsError.code !== 'PGRST116') {
      throw creditsError
    }

    return NextResponse.json({ credits: credits?.credits || 0 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error fetching credits' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { amount } = await req.json()

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get current credits
    const { data: currentCredits, error: creditsError } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single()

    if (creditsError && creditsError.code !== 'PGRST116') {
      throw creditsError
    }

    const newAmount = (currentCredits?.credits || 0) + amount

    // Update or insert credits
    const { error: updateError } = await supabase
      .from('user_credits')
      .upsert({
        user_id: user.id,
        credits: newAmount,
        updated_at: new Date().toISOString(),
      })

    if (updateError) throw updateError

    return NextResponse.json({ credits: newAmount })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error updating credits' },
      { status: 500 }
    )
  }
} 