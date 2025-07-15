import axios from 'axios'
import * as cheerio from 'cheerio'

export interface ScrapedBlog {
  title: string
  content: string
  author?: string
  publishDate?: Date
  description?: string
  keywords?: string[]
  image?: string
  wordCount: number
  category?: string
}

export async function scrapeBlogContent(url: string): Promise<ScrapedBlog> {
  try {
    console.log('Starting to scrape URL:', url)
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 120000, // 2 minutes timeout for very large blogs
      maxRedirects: 10,
      maxContentLength: 500 * 1024 * 1024, // 500MB limit for extremely large blogs
      maxBodyLength: 500 * 1024 * 1024
    })

    console.log('Successfully fetched content, status:', response.status)
    
    const $ = cheerio.load(response.data)

    // Remove unwanted elements but keep all content elements
    $('script, style, noscript, iframe, embed, object, applet, form, input, button, select, textarea').remove()
    
    // Remove navigation and UI elements but preserve content
    $('.nav, .navigation, .navbar, .menu, .header, .footer, .sidebar, .aside, .breadcrumb, .pagination, .social-share, .share-buttons, .comments, .comment-form, .ads, .advertisement, .banner, .popup, .modal, .overlay, .cookie-notice, .newsletter, .subscription, .related-posts, .author-bio, .tags-list, .category-list, .widget, .plugin').remove()
    
    // Remove by common IDs
    $('#nav, #navigation, #navbar, #menu, #header, #footer, #sidebar, #aside, #breadcrumb, #pagination, #social, #share, #comments, #ads, #advertisement, #banner, #popup, #modal, #overlay, #cookie, #newsletter, #subscription, #related, #author, #tags, #categories, #widget, #plugin').remove()

    // Extract title with multiple fallbacks
    const title = $('title').text().trim() || 
                  $('h1').first().text().trim() || 
                  $('meta[property="og:title"]').attr('content') || 
                  $('meta[name="title"]').attr('content') ||
                  'Untitled Blog Post'

    console.log('Extracted title:', title)

    // COMPLETE content extraction - get EVERYTHING
    let content = ''
    
    // Primary content selectors - try to get the main content container
    const primarySelectors = [
      'article',
      '[role="main"]',
      'main',
      '.post-content', 
      '.entry-content',
      '.content',
      '.post-body',
      '.article-content',
      '.blog-content',
      '.blog-post',
      '.post',
      '.entry',
      '.single-post',
      '.post-single',
      '.story-body',
      '.article-body',
      '.post-text',
      '.entry-text',
      '.content-body',
      '.main-content',
      '.primary-content',
      '.article-wrapper',
      '.post-wrapper',
      '.content-wrapper',
      '.blog-wrapper',
      '.story-content',
      '.article-main',
      '.post-main',
      '.content-area',
      '.main-area',
      '.primary-area'
    ]

    // Find the container with the most content
    let bestContent = ''
    let bestLength = 0
    
    for (const selector of primarySelectors) {
      const elements = $(selector)
      if (elements.length) {
        elements.each((_, element) => {
          const $element = $(element)
          // Remove unwanted nested elements
          $element.find('script, style, .ads, .advertisement, .social-share, .comments, .related-posts, .navigation, .nav, .menu, .sidebar, .footer, .header').remove()
          
          const text = $element.text().trim()
          if (text.length > bestLength) {
            bestContent = text
            bestLength = text.length
            console.log('Found better content using selector:', selector, 'Length:', text.length)
          }
        })
      }
    }

    content = bestContent

    // If still not enough content, use comprehensive extraction
    if (!content || content.length < 1000) {
      console.log('Using comprehensive content extraction for complete blog')
      
      // Get ALL content elements - paragraphs, headings, lists, blockquotes, divs with text
      const allContentElements = $('p, h1, h2, h3, h4, h5, h6, li, blockquote, pre, code, span, div, section, article')
        .map((_, el) => {
          const $el = $(el)
          const text = $el.text().trim()
          
          // Skip very short text or likely non-content
          if (text.length < 20) return null
          
          // Skip if it's likely navigation, ads, or metadata based on content
          const lowerText = text.toLowerCase()
          if (lowerText.includes('click here') && text.length < 100) return null
          if (lowerText.includes('subscribe') && text.length < 100) return null
          if (lowerText.includes('follow us') && text.length < 100) return null
          if (lowerText.match(/^\s*(home|about|contact|privacy|terms)\s*$/i)) return null
          
          return text
        })
        .get()
        .filter(text => text !== null)

      // Join all content with proper spacing
      content = allContentElements.join('\n\n')
    }

    // Final fallback - get everything from body with intelligent filtering
    if (!content || content.length < 500) {
      console.log('Using final comprehensive body extraction')
      
      // Remove all known non-content elements
      $('nav, header, footer, aside, .nav, .navigation, .navbar, .menu, .header, .footer, .sidebar, .aside, .breadcrumb, .pagination, .social, .share, .comment, .related, .tag, .category, .widget, .plugin, .ads, .advertisement, .banner, .popup, .modal, .overlay, .cookie, .newsletter, .subscription, [class*="nav"], [class*="menu"], [class*="sidebar"], [class*="footer"], [class*="header"], [class*="ad"], [class*="social"], [class*="share"], [class*="comment"], [id*="nav"], [id*="menu"], [id*="sidebar"], [id*="footer"], [id*="header"], [id*="ad"], [id*="social"], [id*="share"], [id*="comment"]').remove()
      
      // Get all remaining meaningful text
      content = $('body').text().trim()
    }

    // Clean up content while preserving readability
    content = content
      .replace(/\s+/g, ' ') // Multiple spaces to single space
      .replace(/\n\s*\n/g, '\n\n') // Clean up multiple newlines
      .replace(/\t+/g, ' ') // Tabs to spaces
      .replace(/[\u00A0\u2000-\u200B\u2028-\u2029\u202F\u205F\u3000]/g, ' ') // Various unicode spaces
      .replace(/[^\x20-\x7E\u00A1-\uFFFF]/g, '') // Remove control characters but keep unicode
      .trim()

    console.log('Final content length:', content.length)

    // Extract metadata
    const author = $('meta[name="author"]').attr('content') || 
                   $('meta[property="article:author"]').attr('content') ||
                   $('.author').first().text().trim() ||
                   $('[rel="author"]').first().text().trim() ||
                   $('.byline').first().text().trim() ||
                   $('.author-name').first().text().trim()

    const description = $('meta[name="description"]').attr('content') ||
                       $('meta[property="og:description"]').attr('content') ||
                       $('meta[name="twitter:description"]').attr('content')

    const keywords = $('meta[name="keywords"]').attr('content')?.split(',').map(k => k.trim())

    const image = $('meta[property="og:image"]').attr('content') ||
                  $('meta[name="twitter:image"]').attr('content') ||
                  $('img').first().attr('src')

    // Extract publish date
    const publishDateStr = $('meta[property="article:published_time"]').attr('content') ||
                          $('meta[name="publish_date"]').attr('content') ||
                          $('time').attr('datetime') ||
                          $('.date').first().text().trim() ||
                          $('.published').first().text().trim() ||
                          $('.post-date').first().text().trim()

    let publishDate: Date | undefined
    if (publishDateStr) {
      const date = new Date(publishDateStr)
      if (!isNaN(date.getTime())) {
        publishDate = date
      }
    }

    // Determine category based on content and metadata
    const category = determineCategory(content, title, keywords)

    const wordCount = content.split(/\s+/).filter(word => word.length > 0).length

    if (!content || content.length < 200) {
      throw new Error(`Unable to extract sufficient content from the blog. Only found ${content.length} characters. The page might be protected, have dynamic content, or require JavaScript.`)
    }

    console.log('Successfully scraped complete blog:', {
      title: title.substring(0, 50) + '...',
      contentLength: content.length,
      wordCount,
      category
    })

    return {
      title: title.substring(0, 500), // Increased title length limit
      content,
      author,
      publishDate,
      description,
      keywords,
      image,
      wordCount,
      category
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - the blog took too long to respond. Please try again or check if the URL is accessible.')
      }
     if (error.response?.status === 403) {
  throw new Error('Access forbidden - the website is blocking automated requests. Please try a different URL.')
}
if (error.response?.status === 404) {
  throw new Error('Page not found - please check if the URL is correct and accessible.')
}
if (error.response?.status && error.response.status >= 500) {
  throw new Error('Server error - the website is temporarily unavailable. Please try again later.')
}
throw new Error(`Failed to fetch blog (${error.response?.status ?? 'Network Error'}): ${error.message}`)
    }
    console.error('Scraping error:', error)
    throw new Error(`Scraping failed: ${(error as Error).message}. Please ensure the URL is accessible and contains readable content.`)
  }
}

function determineCategory(content: string, title: string, keywords?: string[]): string {
  const text = (content + ' ' + title).toLowerCase()
  const keywordText = keywords?.join(' ').toLowerCase() || ''
  const fullText = text + ' ' + keywordText

  const categories = {
    'Technology': ['technology', 'ai', 'artificial intelligence', 'software', 'programming', 'computer', 'digital', 'tech', 'innovation', 'startup', 'app', 'web', 'mobile', 'cloud', 'data', 'algorithm', 'machine learning', 'blockchain', 'cryptocurrency'],
    'Business': ['business', 'entrepreneur', 'marketing', 'finance', 'economy', 'investment', 'company', 'corporate', 'management', 'strategy', 'sales', 'revenue', 'profit', 'market', 'customer', 'brand', 'leadership'],
    'Health': ['health', 'medical', 'wellness', 'fitness', 'nutrition', 'mental health', 'therapy', 'medicine', 'healthcare', 'disease', 'treatment', 'doctor', 'hospital', 'patient', 'symptoms', 'diagnosis'],
    'Environment': ['environment', 'climate', 'sustainability', 'green', 'renewable', 'conservation', 'pollution', 'ecosystem', 'carbon', 'nature', 'energy', 'solar', 'wind', 'recycling', 'waste', 'earth'],
    'Education': ['education', 'learning', 'school', 'university', 'student', 'teacher', 'academic', 'research', 'study', 'knowledge', 'course', 'degree', 'training', 'skill', 'development'],
    'Lifestyle': ['lifestyle', 'travel', 'food', 'fashion', 'culture', 'entertainment', 'hobby', 'personal', 'family', 'home', 'cooking', 'recipe', 'style', 'beauty', 'relationship'],
    'Science': ['science', 'research', 'discovery', 'experiment', 'physics', 'chemistry', 'biology', 'mathematics', 'scientific', 'laboratory', 'theory', 'hypothesis', 'analysis', 'study']
  }

  let maxScore = 0
  let bestCategory = 'General'

  Object.entries(categories).forEach(([category, keywords]) => {
    const score = keywords.reduce((acc, keyword) => {
      const regex = new RegExp(keyword, 'gi')
      const matches = fullText.match(regex)
      return acc + (matches ? matches.length : 0)
    }, 0)

    if (score > maxScore) {
      maxScore = score
      bestCategory = category
    }
  })

  return bestCategory
}

export function generateSummary(content: string, maxLength: number = 800): string {
  // Enhanced AI-style summarization algorithm for complete blog content
  const sentences = content
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 30 && s.length < 500) // Filter out very short or very long sentences
  
  if (sentences.length <= 8) {
    return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '')
  }

  // Score sentences based on multiple factors for complete blog summarization
  const scoredSentences = sentences.map((sentence, index) => {
    let score = 0
    
    // Position score (beginning, middle key points, and conclusion are important)
    if (index < 8) score += 5 // Strong opening
    if (index >= sentences.length - 5) score += 4 // Strong conclusion
    if (index >= 3 && index <= 10) score += 3 // Early key points
    if (index >= sentences.length * 0.3 && index <= sentences.length * 0.7) score += 2 // Middle content
    
    // Length score (prefer medium-length sentences)
    const words = sentence.trim().split(/\s+/).length
    if (words >= 12 && words <= 40) score += 4
    if (words >= 8 && words <= 50) score += 2
    if (words < 5 || words > 60) score -= 2
    
    // Keyword frequency score - enhanced for complete blogs
    const importantWords = [
      'important', 'key', 'main', 'significant', 'crucial', 'essential', 'primary',
      'major', 'critical', 'fundamental', 'central', 'core', 'vital', 'necessary',
      'shows', 'reveals', 'demonstrates', 'indicates', 'suggests', 'proves', 'confirms',
      'according', 'research', 'study', 'analysis', 'report', 'findings', 'data',
      'however', 'therefore', 'consequently', 'furthermore', 'moreover', 'additionally',
      'first', 'second', 'third', 'finally', 'conclusion', 'result', 'outcome',
      'discovered', 'found', 'revealed', 'showed', 'demonstrated', 'explained',
      'because', 'since', 'due to', 'as a result', 'leads to', 'causes', 'effects'
    ]
    
    importantWords.forEach(word => {
      if (sentence.toLowerCase().includes(word)) score += 1.5
    })
    
    // Avoid sentences with too many numbers or technical jargon (unless it's key data)
    const numberCount = (sentence.match(/\d+/g) || []).length
    if (numberCount > 4) score -= 1
    if (numberCount >= 1 && numberCount <= 3) score += 0.5 // Some numbers are good
    
    // Prefer sentences with proper nouns (names, places, companies)
    const capitalWords = sentence.match(/\b[A-Z][a-z]+/g) || []
    score += Math.min(capitalWords.length * 0.3, 2)
    
    // Boost sentences that seem to contain main ideas
    if (sentence.toLowerCase().includes('main') || sentence.toLowerCase().includes('primary') || 
        sentence.toLowerCase().includes('key point') || sentence.toLowerCase().includes('important')) {
      score += 2
    }
    
    return { sentence: sentence.trim(), score, index }
  })

  // Sort by score and select top sentences for comprehensive summary
  const topSentences = scoredSentences
    .sort((a, b) => b.score - a.score)
    .slice(0, 10) // Take top 10 sentences for complete blog summary
    .sort((a, b) => a.index - b.index) // Restore original order
    .map(s => s.sentence)

  let summary = topSentences.join('. ') + '.'
  
  // Ensure summary doesn't exceed max length
  if (summary.length > maxLength) {
    // Try with fewer sentences
    for (let i = 9; i >= 5; i--) {
      const shorterSummary = topSentences.slice(0, i).join('. ') + '.'
      if (shorterSummary.length <= maxLength) {
        summary = shorterSummary
        break
      }
    }
    
    // If still too long, truncate
    if (summary.length > maxLength) {
      summary = summary.substring(0, maxLength - 3) + '...'
    }
  }
  
  return summary
}

export function calculateReadingTime(wordCount: number): number {
  // Average reading speed is 200-250 words per minute
  return Math.ceil(wordCount / 225)
}

export function extractTags(content: string, title: string): string[] {
  const text = (content + ' ' + title).toLowerCase()
  
  // Common stop words to exclude
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your',
    'his', 'her', 'its', 'our', 'their', 'myself', 'yourself', 'himself', 'herself', 'itself',
    'ourselves', 'yourselves', 'themselves', 'what', 'which', 'who', 'whom', 'whose', 'where',
    'when', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some',
    'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just',
    'now', 'here', 'there', 'then', 'once', 'during', 'before', 'after', 'above', 'below',
    'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once'
  ])
  
  // Extract words and filter
  const words = text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => 
      word.length > 3 && 
      word.length < 25 && 
      !stopWords.has(word) &&
      !/^\d+$/.test(word) // Exclude pure numbers
    )
  
  // Count word frequency
  const wordFreq = words.reduce((freq, word) => {
    freq[word] = (freq[word] || 0) + 1
    return freq
  }, {} as Record<string, number>)
  
  // Get top words by frequency
  const topWords = Object.entries(wordFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20)
    .map(([word]) => word)
  
  // Add some domain-specific important terms that might appear less frequently
  const importantTerms = [
    'artificial intelligence', 'machine learning', 'blockchain', 'cryptocurrency',
    'climate change', 'renewable energy', 'sustainability', 'mental health',
    'remote work', 'digital transformation', 'innovation', 'entrepreneurship',
    'data science', 'cloud computing', 'cybersecurity', 'automation'
  ]
  
  importantTerms.forEach(term => {
    if (text.includes(term) && !topWords.includes(term.replace(' ', ''))) {
      topWords.push(term.replace(' ', ''))
    }
  })
  
  return topWords.slice(0, 10) // Return top 10 tags
}

export function analyzeSentiment(content: string): 'positive' | 'neutral' | 'negative' {
  const text = content.toLowerCase()
  
  const positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'awesome', 'outstanding',
    'success', 'successful', 'achievement', 'progress', 'improvement', 'growth', 'advance',
    'innovation', 'breakthrough', 'opportunity', 'benefit', 'advantage', 'positive', 'optimistic',
    'hope', 'promising', 'bright', 'future', 'solution', 'solve', 'effective', 'efficient',
    'productive', 'valuable', 'useful', 'helpful', 'beneficial', 'superior', 'enhanced',
    'improved', 'better', 'best', 'perfect', 'ideal', 'optimal', 'remarkable', 'impressive'
  ]
  
  const negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'disaster', 'crisis', 'problem', 'issue',
    'challenge', 'difficulty', 'failure', 'decline', 'decrease', 'negative', 'pessimistic',
    'concern', 'worry', 'threat', 'risk', 'danger', 'harmful', 'damage', 'destruction',
    'loss', 'waste', 'ineffective', 'disappointing', 'frustrating', 'concerning', 'alarming',
    'worse', 'worst', 'poor', 'inferior', 'inadequate', 'insufficient', 'lacking', 'failed'
  ]
  
  let positiveScore = 0
  let negativeScore = 0
  
  positiveWords.forEach(word => {
    const matches = text.match(new RegExp(`\\b${word}\\b`, 'g'))
    if (matches) positiveScore += matches.length
  })
  
  negativeWords.forEach(word => {
    const matches = text.match(new RegExp(`\\b${word}\\b`, 'g'))
    if (matches) negativeScore += matches.length
  })
  
  const difference = positiveScore - negativeScore
  const total = positiveScore + negativeScore
  
  // More nuanced sentiment analysis
  if (total === 0) return 'neutral'
  if (difference > total * 0.2) return 'positive'
  if (difference < -total * 0.2) return 'negative'
  return 'neutral'
}