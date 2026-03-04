import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { SCAN_LIMITS } from '@/types'

// POST /api/scan — Save scan result and increment scan count
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to scan.' },
        { status: 401 }
      )
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Profile not found.' },
        { status: 404 }
      )
    }

    // Check scan limit
    const limit = SCAN_LIMITS[profile.subscription_tier as keyof typeof SCAN_LIMITS]
    if (profile.scans_this_month >= limit) {
      return NextResponse.json(
        {
          error: 'Scan limit reached. Upgrade your plan for unlimited scans.',
          remaining: 0,
          limit,
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { image_url, disease_name, confidence, severity, treatment, details } = body

    if (!disease_name || confidence === undefined || !severity) {
      return NextResponse.json(
        { error: 'Missing required fields: disease_name, confidence, severity.' },
        { status: 400 }
      )
    }

    // Save scan result
    const { data: scan, error: scanError } = await supabase
      .from('scans')
      .insert({
        user_id: user.id,
        image_url: image_url || null,
        disease_name,
        confidence,
        severity,
        treatment: treatment || null,
        details: details || null,
      })
      .select()
      .single()

    if (scanError) {
      console.error('Scan insert error:', scanError)
      return NextResponse.json(
        { error: 'Failed to save scan result.' },
        { status: 500 }
      )
    }

    // Increment scan count
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ scans_this_month: profile.scans_this_month + 1 })
      .eq('id', user.id)

    if (updateError) {
      console.error('Scan count update error:', updateError)
    }

    const remaining = limit === Infinity
      ? Infinity
      : limit - (profile.scans_this_month + 1)

    return NextResponse.json({
      scan,
      remaining,
    })
  } catch (error) {
    console.error('Scan API error:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}

// GET /api/scan — Return remaining scans for current user
export async function GET() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      )
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_tier, scans_this_month')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Profile not found.' },
        { status: 404 }
      )
    }

    const limit = SCAN_LIMITS[profile.subscription_tier as keyof typeof SCAN_LIMITS]
    const remaining = limit === Infinity
      ? Infinity
      : limit - profile.scans_this_month

    return NextResponse.json({
      remaining,
      limit,
      used: profile.scans_this_month,
      tier: profile.subscription_tier,
    })
  } catch (error) {
    console.error('Scan GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
