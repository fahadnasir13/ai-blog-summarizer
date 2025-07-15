import { NextRequest, NextResponse } from 'next/server'
import { scrapeBlogContent, generateSummary, calculateReadingTime, extractTags, analyzeSentiment } from '@/lib/blog-scraper'
import { translateToUrdu } from '@/lib/translation'
import { supabase } from '@/lib/supabase'
import connectDB, { BlogContent } from '@/lib/mongodb'
import { handleApiError, logError } from '@/lib/error-handler'
import { scrapeRateLimiter, getRateLimitHeaders } from '@/lib/rate-limiter'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  
  // Rate limiting
  if (!scrapeRateLimiter.isAllowed(clientIP)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before trying again.' },
      { 
        status: 429,
        headers: getRateLimitHeaders(clientIP, scrapeRateLimiter)
      }
    )
  }

  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' }, 
        { 
          status: 400,
          headers: getRateLimitHeaders(clientIP, scrapeRateLimiter)
        }
      )
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' }, 
        { 
          status: 400,
          headers: getRateLimitHeaders(clientIP, scrapeRateLimiter)
        }
      )
    }

    // Check if URL already exists in Supabase
    if (supabase) {
      const { data: existingSummary } = await supabase
        .from('blog_summaries')
        .select('*')
        .eq('url', url)
        .single()

      if (existingSummary) {
        return NextResponse.json({
          success: true,
          data: existingSummary,
          message: 'Summary already exists'
        }, {
          headers: getRateLimitHeaders(clientIP, scrapeRateLimiter)
        })
      }
    }

    // Scrape blog content
    const scrapedData = await scrapeBlogContent(url)
    
    // Generate summary
    const englishSummary = generateSummary(scrapedData.content)
    
    // Translate to Urdu
    const urduSummary = await translateToUrdu(englishSummary)
    
    // Calculate reading time and extract tags
    const readingTime = calculateReadingTime(scrapedData.wordCount)
    const tags = extractTags(scrapedData.content, scrapedData.title)
    const sentiment = analyzeSentiment(scrapedData.content)

    // Optional: Connect to MongoDB and save full content
    try {
      await connectDB()
      await BlogContent.findOneAndUpdate(
        { url },
        {
          url,
          title: scrapedData.title,
          content: scrapedData.content,
          author: scrapedData.author,
          publishDate: scrapedData.publishDate,
          tags,
          category: scrapedData.category,
          wordCount: scrapedData.wordCount,
          metadata: {
            description: scrapedData.description,
            keywords: scrapedData.keywords,
            image: scrapedData.image,
            sentiment
          }
        },
        { upsert: true, new: true }
      )
    } catch (mongoError) {
      logError(mongoError, 'MongoDB save')
      // Continue without MongoDB - not critical
    }

    // Save summary to Supabase
    if (supabase) {
      const { data: summaryData, error: supabaseError } = await supabase
        .from('blog_summaries')
        .insert({
          url,
          title: scrapedData.title,
          english_summary: englishSummary,
          urdu_summary: urduSummary,
          tags,
          category: scrapedData.category || 'General',
          sentiment,
          word_count: scrapedData.wordCount,
          reading_time: readingTime,
          author: scrapedData.author,
          publish_date: scrapedData.publishDate?.toISOString(),
          image_url: scrapedData.image,
        })
        .select()
        .single()

      if (supabaseError) {
        logError(supabaseError, 'Supabase save')
        // Return the processed data even if save failed
        return NextResponse.json({
          success: true,
          data: {
            id: 'temp-' + Date.now(),
            url,
            title: scrapedData.title,
            english_summary: englishSummary,
            urdu_summary: urduSummary,
            tags,
            category: scrapedData.category || 'General',
            sentiment,
            word_count: scrapedData.wordCount,
            reading_time: readingTime,
            author: scrapedData.author,
            publish_date: scrapedData.publishDate?.toISOString(),
            image_url: scrapedData.image,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          message: 'Blog processed successfully (database save failed)',
          warning: 'Database connection failed - summary not persisted'
        }, {
          headers: getRateLimitHeaders(clientIP, scrapeRateLimiter)
        })
      }

      return NextResponse.json({
        success: true,
        data: summaryData,
        message: 'Blog scraped and summarized successfully'
      }, {
        headers: getRateLimitHeaders(clientIP, scrapeRateLimiter)
      })
    } else {
      // Return processed data without saving to database
      return NextResponse.json({
        success: true,
        data: {
          id: 'temp-' + Date.now(),
          url,
          title: scrapedData.title,
          english_summary: englishSummary,
          urdu_summary: urduSummary,
          tags,
          category: scrapedData.category || 'General',
          sentiment,
          word_count: scrapedData.wordCount,
          reading_time: readingTime,
          author: scrapedData.author,
          publish_date: scrapedData.publishDate?.toISOString(),
          image_url: scrapedData.image,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        message: 'Blog processed successfully (no database configured)',
        warning: 'No database configured - summary not persisted'
      }, {
        headers: getRateLimitHeaders(clientIP, scrapeRateLimiter)
      })
    }
  } catch (error) {
    logError(error, 'Scrape API')
    const { message, statusCode } = handleApiError(error)
    
    return NextResponse.json(
      { error: message },
      { 
        status: statusCode,
        headers: getRateLimitHeaders(clientIP, scrapeRateLimiter)
      }
    )
  }
}