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
      timeout: 120000,
      maxRedirects: 10,
      maxContentLength: 500 * 1024 * 1024,
      maxBodyLength: 500 * 1024 * 1024
    })

    console.log('Successfully fetched content, status:', response.status)
    const $ = cheerio.load(response.data)

    $('script, style, noscript, iframe, embed, object, applet, form, input, button, select, textarea').remove()
    $('.nav, .navigation, .navbar, .menu, .header, .footer, .sidebar, .aside, .breadcrumb, .pagination, .social-share, .share-buttons, .comments, .comment-form, .ads, .advertisement, .banner, .popup, .modal, .overlay, .cookie-notice, .newsletter, .subscription, .related-posts, .author-bio, .tags-list, .category-list, .widget, .plugin').remove()
    $('#nav, #navigation, #navbar, #menu, #header, #footer, #sidebar, #aside, #breadcrumb, #pagination, #social, #share, #comments, #ads, #advertisement, #banner, #popup, #modal, #overlay, #cookie, #newsletter, #subscription, #related, #author, #tags, #categories, #widget, #plugin').remove()

    const title = $('title').text().trim() ||
      $('h1').first().text().trim() ||
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="title"]').attr('content') ||
      'Untitled Blog Post'

    console.log('Extracted title:', title)

    const primarySelectors = [
      'article', '[role="main"]', 'main', '.post-content', '.entry-content', '.content', '.post-body',
      '.article-content', '.blog-content', '.blog-post', '.post', '.entry', '.single-post', '.post-single',
      '.story-body', '.article-body', '.post-text', '.entry-text', '.content-body', '.main-content',
      '.primary-content', '.article-wrapper', '.post-wrapper', '.content-wrapper', '.blog-wrapper',
      '.story-content', '.article-main', '.post-main', '.content-area', '.main-area', '.primary-area'
    ]

    let bestContent = ''
    let bestLength = 0
    for (const selector of primarySelectors) {
      const elements = $(selector)
      if (elements.length) {
        elements.each((_, element) => {
          const $element = $(element)
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

    let content = bestContent

    if (!content || content.length < 1000) {
      console.log('Using comprehensive content extraction')
      const allContentElements = $('p, h1, h2, h3, h4, h5, h6, li, blockquote, pre, code, span, div, section, article')
        .map((_, el) => {
          const text = $(el).text().trim()
          if (text.length < 20) return null
          const lower = text.toLowerCase()
          if (lower.includes('click here') || lower.includes('subscribe') || lower.includes('follow us') || lower.match(/^\s*(home|about|contact|privacy|terms)\s*$/)) return null
          return text
        }).get().filter(Boolean)

      content = allContentElements.join('\n\n')
    }

    if (!content || content.length < 500) {
      console.log('Using final fallback content extraction')
      $('nav, header, footer, aside, .nav, .navigation, .navbar, .menu, .header, .footer, .sidebar, .aside, .breadcrumb, .pagination, .social, .share, .comment, .related, .tag, .category, .widget, .plugin, .ads, .advertisement, .banner, .popup, .modal, .overlay, .cookie, .newsletter, .subscription, [class*="nav"], [class*="menu"], [class*="sidebar"], [class*="footer"], [class*="header"], [class*="ad"], [class*="social"], [class*="share"], [class*="comment"], [id*="nav"], [id*="menu"], [id*="sidebar"], [id*="footer"], [id*="header"], [id*="ad"], [id*="social"], [id*="share"], [id*="comment"]').remove()
      content = $('body').text().trim()
    }

    content = content.replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .replace(/\t+/g, ' ')
      .replace(/[\u00A0\u2000-\u200B\u2028-\u2029\u202F\u205F\u3000]/g, ' ')
      .replace(/[^\x20-\x7E\u00A1-\uFFFF]/g, '')
      .trim()

    console.log('Final content length:', content.length)

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

    const publishDateStr = $('meta[property="article:published_time"]').attr('content') ||
      $('meta[name="publish_date"]').attr('content') ||
      $('time').attr('datetime') ||
      $('.date').first().text().trim() ||
      $('.published').first().text().trim() ||
      $('.post-date').first().text().trim()

    let publishDate: Date | undefined = undefined
    if (publishDateStr) {
      const parsed = new Date(publishDateStr)
      if (!isNaN(parsed.getTime())) publishDate = parsed
    }

    const category = determineCategory(content, title, keywords)
    const wordCount = content.split(/\s+/).filter(word => word.length > 0).length

    if (!content || content.length < 200) {
      throw new Error(`Unable to extract sufficient content from the blog. Only found ${content.length} characters.`)
    }

    console.log('Successfully scraped complete blog:', {
      title: title.substring(0, 50) + '...',
      contentLength: content.length,
      wordCount,
      category
    })

    return {
      title: title.substring(0, 500),
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
        throw new Error('Request timeout - the blog took too long to respond.')
      }
      if (error.response?.status === 403) {
        throw new Error('Access forbidden - the website is blocking automated requests.')
      }
      if (error.response?.status === 404) {
        throw new Error('Page not found - please check if the URL is correct and accessible.')
      }
      if (error.response && error.response.status !== undefined && error.response.status >= 500) {
        throw new Error('Server error - the website is temporarily unavailable.')
      }
      throw new Error(`Failed to fetch blog (${error.response?.status || 'Network Error'}): ${error.message}`)
    }

    console.error('Scraping error:', error)
    throw new Error(`Scraping failed: ${(error as Error).message}.`)
  }
}

function determineCategory(content: string, title: string, keywords?: string[]): string {
  const text = (content + ' ' + title).toLowerCase()
  const keywordText = keywords?.join(' ').toLowerCase() || ''
  const fullText = text + ' ' + keywordText

  const categories = {
    'Technology': ['technology', 'ai', 'software', 'programming', 'machine learning', 'blockchain'],
    'Business': ['business', 'entrepreneur', 'marketing', 'finance', 'economy'],
    'Health': ['health', 'medical', 'fitness', 'mental'],
    'Environment': ['environment', 'climate', 'green', 'pollution'],
    'Education': ['education', 'learning', 'student', 'teacher'],
    'Lifestyle': ['lifestyle', 'travel', 'food', 'fashion'],
    'Science': ['science', 'physics', 'biology', 'chemistry']
  }

  let maxScore = 0
  let bestCategory = 'General'
  for (const [cat, keys] of Object.entries(categories)) {
    const score = keys.reduce((sum, word) => sum + (fullText.match(new RegExp(`\\b${word}\\b`, 'gi')) || []).length, 0)
    if (score > maxScore) {
      maxScore = score
      bestCategory = cat
    }
  }
  return bestCategory
}
