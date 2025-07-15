import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate Supabase credentials
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials missing. Some features may not work.')
}

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export type BlogSummary = {
  id: string
  url: string
  title: string
  english_summary: string
  urdu_summary: string
  tags: string[]
  category: string
  sentiment: 'positive' | 'neutral' | 'negative'
  created_at: string
  updated_at: string
  word_count: number
  reading_time: number
  author?: string
  publish_date?: string
  image_url?: string
}

// Sample data for demonstration
export const sampleSummaries: Omit<BlogSummary, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    url: 'https://example.com/ai-future',
    title: 'The Future of Artificial Intelligence in 2024',
    english_summary: 'Artificial Intelligence continues to evolve rapidly, with breakthrough developments in machine learning, natural language processing, and computer vision reshaping industries worldwide.',
    urdu_summary: 'مصنوعی ذہانت تیزی سے ترقی کر رہی ہے، مشین لرننگ، قدرتی زبان کی پروسیسنگ، اور کمپیوٹر ویژن میں پیش قدمی دنیا بھر کی صنعتوں کو نئی شکل دے رہی ہے۔',
    tags: ['AI', 'Technology', 'Machine Learning', 'Future'],
    category: 'Technology',
    sentiment: 'positive',
    word_count: 1250,
    reading_time: 6,
    author: 'Dr. Sarah Johnson',
    publish_date: '2024-01-15',
    image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
  },
  {
    url: 'https://example.com/climate-change',
    title: 'Climate Change: Challenges and Solutions for Tomorrow',
    english_summary: 'Climate change presents unprecedented challenges requiring immediate action. Renewable energy, sustainable practices, and global cooperation are essential for addressing this crisis.',
    urdu_summary: 'موسمیاتی تبدیلی بے مثال چیلنجز پیش کرتی ہے جن کے لیے فوری اقدام کی ضرورت ہے۔ قابل تجدید توانائی، پائیدار طریقے، اور عالمی تعاون اس بحران سے نمٹنے کے لیے ضروری ہیں۔',
    tags: ['Climate', 'Environment', 'Sustainability', 'Green Energy'],
    category: 'Environment',
    sentiment: 'neutral',
    word_count: 980,
    reading_time: 4,
    author: 'Prof. Michael Chen',
    publish_date: '2024-01-10',
    image_url: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg'
  },
  {
    url: 'https://example.com/remote-work',
    title: 'The Evolution of Remote Work Culture',
    english_summary: 'Remote work has transformed from a temporary solution to a permanent fixture in modern business. Companies are adapting their strategies to embrace distributed teams and flexible work arrangements.',
    urdu_summary: 'ریموٹ ورک ایک عارضی حل سے جدید کاروبار میں مستقل حصہ بن گیا ہے۔ کمپنیاں تقسیم شدہ ٹیموں اور لچکدار کام کے انتظامات کو اپنانے کے لیے اپنی حکمت عملیوں کو ڈھال رہی ہیں۔',
    tags: ['Remote Work', 'Business', 'Productivity', 'Technology'],
    category: 'Business',
    sentiment: 'positive',
    word_count: 1100,
    reading_time: 5,
    author: 'Lisa Rodriguez',
    publish_date: '2024-01-08',
    image_url: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg'
  },
  {
    url: 'https://example.com/mental-health',
    title: 'Mental Health Awareness in the Digital Age',
    english_summary: 'Digital technology impacts mental health in complex ways. While social media can increase anxiety and depression, digital tools also offer new opportunities for mental health support and therapy.',
    urdu_summary: 'ڈیجیٹل ٹیکنالوجی ذہنی صحت کو پیچیدہ طریقوں سے متاثر کرتی ہے۔ جبکہ سوشل میڈیا بے چینی اور ڈپریشن بڑھا سکتا ہے، ڈیجیٹل ٹولز ذہنی صحت کی مدد اور تھراپی کے لیے نئے مواقع بھی فراہم کرتے ہیں۔',
    tags: ['Mental Health', 'Digital Wellness', 'Psychology', 'Technology'],
    category: 'Health',
    sentiment: 'neutral',
    word_count: 850,
    reading_time: 4,
    author: 'Dr. Amanda Foster',
    publish_date: '2024-01-05',
    image_url: 'https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg'
  }
]