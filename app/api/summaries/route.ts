import { NextRequest, NextResponse } from 'next/server'
import { supabase, sampleSummaries } from '@/lib/supabase'
import { handleApiError, logError } from '@/lib/error-handler'
import { apiRateLimiter, getRateLimitHeaders } from '@/lib/rate-limiter'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  
  // Rate limiting
  if (!apiRateLimiter.isAllowed(clientIP)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before trying again.' },
      { 
        status: 429,
        headers: getRateLimitHeaders(clientIP, apiRateLimiter)
      }
    )
  }

  try {
    // Check if Supabase is properly configured
    if (!supabase) {
      logError(new Error('Supabase not configured'), 'Summaries API')
      return NextResponse.json({
        success: true,
        data: sampleSummaries.map((summary, index) => ({
          id: `sample-${index}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ...summary
        })),
        total: sampleSummaries.length,
        limit: 20,
        offset: 0,
        message: 'Using sample data - Configure Supabase for full functionality'
      }, {
        headers: getRateLimitHeaders(clientIP, apiRateLimiter)
      })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const sentiment = searchParams.get('sentiment') || ''
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const order = searchParams.get('order') || 'desc'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('blog_summaries')
      .select('*')

    // Apply search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,tags.cs.{${search}},english_summary.ilike.%${search}%`)
    }

    // Apply category filter
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    // Apply sentiment filter
    if (sentiment && sentiment !== 'all') {
      query = query.eq('sentiment', sentiment)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: order === 'asc' })

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      logError(error, 'Supabase query')
      return NextResponse.json({
        success: true,
        data: sampleSummaries.map((summary, index) => ({
          id: `sample-${index}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ...summary
        })),
        total: sampleSummaries.length,
        limit,
        offset,
        message: 'Connection issue - Using sample data'
      }, {
        headers: getRateLimitHeaders(clientIP, apiRateLimiter)
      })
    }

    // If no data and this is the first request, insert sample data
    if ((!data || data.length === 0) && offset === 0) {
      try {
        const { data: insertedData, error: insertError } = await supabase
          .from('blog_summaries')
          .insert(sampleSummaries)
          .select()

        if (!insertError && insertedData) {
          return NextResponse.json({
            success: true,
            data: insertedData,
            total: insertedData.length,
            limit,
            offset,
            message: 'Sample data inserted'
          }, {
            headers: getRateLimitHeaders(clientIP, apiRateLimiter)
          })
        }
      } catch (insertError) {
        logError(insertError, 'Sample data insert')
      }
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      total: count || 0,
      limit,
      offset
    }, {
      headers: getRateLimitHeaders(clientIP, apiRateLimiter)
    })
  } catch (error) {
    logError(error, 'Summaries API')
    const { message, statusCode } = handleApiError(error)
    
    return NextResponse.json(
      { error: message },
      { 
        status: statusCode,
        headers: getRateLimitHeaders(clientIP, apiRateLimiter)
      }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  
  // Rate limiting
  if (!apiRateLimiter.isAllowed(clientIP)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before trying again.' },
      { 
        status: 429,
        headers: getRateLimitHeaders(clientIP, apiRateLimiter)
      }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' }, 
        { 
          status: 400,
          headers: getRateLimitHeaders(clientIP, apiRateLimiter)
        }
      )
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' }, 
        { 
          status: 503,
          headers: getRateLimitHeaders(clientIP, apiRateLimiter)
        }
      )
    }

    const { error } = await supabase
      .from('blog_summaries')
      .delete()
      .eq('id', id)

    if (error) {
      logError(error, 'Delete summary')
      return NextResponse.json(
        { error: 'Failed to delete summary' }, 
        { 
          status: 500,
          headers: getRateLimitHeaders(clientIP, apiRateLimiter)
        }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Summary deleted successfully' },
      { headers: getRateLimitHeaders(clientIP, apiRateLimiter) }
    )
  } catch (error) {
    logError(error, 'Delete API')
    const { message, statusCode } = handleApiError(error)
    
    return NextResponse.json(
      { error: message },
      { 
        status: statusCode,
        headers: getRateLimitHeaders(clientIP, apiRateLimiter)
      }
    )
  }
}