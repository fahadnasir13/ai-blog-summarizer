import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.warn('MongoDB URI is missing. Please add MONGODB_URI to your .env.local file.')
}

interface Cached {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

let cached: Cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB

// Blog Content Schema for MongoDB
const blogContentSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String },
  publishDate: { type: Date },
  tags: [{ type: String }],
  category: { type: String },
  wordCount: { type: Number },
  scrapedAt: { type: Date, default: Date.now },
  metadata: {
    description: String,
    keywords: [String],
    image: String,
    sentiment: String,
  }
})

export const BlogContent = mongoose.models.BlogContent || mongoose.model('BlogContent', blogContentSchema)