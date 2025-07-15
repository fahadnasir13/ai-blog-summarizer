// Simple in-memory rate limiter for API endpoints
interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private requests = new Map<string, RateLimitEntry>()
  private readonly maxRequests: number
  private readonly windowMs: number

  constructor(maxRequests = 10, windowMs = 60000) { // 10 requests per minute by default
    this.maxRequests = maxRequests
    this.windowMs = windowMs
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const entry = this.requests.get(identifier)

    if (!entry || now > entry.resetTime) {
      // First request or window has reset
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      })
      return true
    }

    if (entry.count >= this.maxRequests) {
      return false
    }

    entry.count++
    return true
  }

  getRemainingRequests(identifier: string): number {
    const entry = this.requests.get(identifier)
    if (!entry || Date.now() > entry.resetTime) {
      return this.maxRequests
    }
    return Math.max(0, this.maxRequests - entry.count)
  }

  getResetTime(identifier: string): number {
    const entry = this.requests.get(identifier)
    if (!entry || Date.now() > entry.resetTime) {
      return Date.now() + this.windowMs
    }
    return entry.resetTime
  }

  // Clean up expired entries periodically
  cleanup() {
    const now = Date.now()
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key)
      }
    }
  }
}

export const apiRateLimiter = new RateLimiter(20, 60000) // 20 requests per minute
export const scrapeRateLimiter = new RateLimiter(5, 60000) // 5 scrape requests per minute

// Cleanup expired entries every 5 minutes
setInterval(() => {
  apiRateLimiter.cleanup()
  scrapeRateLimiter.cleanup()
}, 5 * 60 * 1000)

export function getRateLimitHeaders(identifier: string, limiter: RateLimiter) {
  return {
    'X-RateLimit-Limit': limiter['maxRequests'].toString(),
    'X-RateLimit-Remaining': limiter.getRemainingRequests(identifier).toString(),
    'X-RateLimit-Reset': Math.ceil(limiter.getResetTime(identifier) / 1000).toString()
  }
}