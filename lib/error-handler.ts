// Enhanced error handling utilities
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function handleApiError(error: unknown): { message: string; statusCode: number } {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode
    }
  }

  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes('timeout')) {
      return {
        message: 'Request timeout - please try again',
        statusCode: 408
      }
    }

    if (error.message.includes('network')) {
      return {
        message: 'Network error - please check your connection',
        statusCode: 503
      }
    }

    if (error.message.includes('rate limit')) {
      return {
        message: 'Too many requests - please wait before trying again',
        statusCode: 429
      }
    }

    return {
      message: error.message,
      statusCode: 500
    }
  }

  return {
    message: 'An unexpected error occurred',
    statusCode: 500
  }
}

export function logError(error: unknown, context?: string) {
  const timestamp = new Date().toISOString()
  const contextStr = context ? `[${context}] ` : ''
  
  if (error instanceof Error) {
    console.error(`${timestamp} ${contextStr}${error.name}: ${error.message}`)
    if (error.stack) {
      console.error(error.stack)
    }
  } else {
    console.error(`${timestamp} ${contextStr}Unknown error:`, error)
  }
}