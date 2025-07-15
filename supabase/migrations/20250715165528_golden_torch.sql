/*
  # Create blog_summaries table for AI Blog Summarizer

  1. New Tables
    - `blog_summaries`
      - `id` (uuid, primary key)
      - `url` (text, unique, not null)
      - `title` (text, not null)
      - `english_summary` (text, not null)
      - `urdu_summary` (text, not null)
      - `tags` (text array, default empty)
      - `category` (text, default 'General')
      - `sentiment` (text, check constraint)
      - `word_count` (integer, default 0)
      - `reading_time` (integer, default 0)
      - `author` (text, nullable)
      - `publish_date` (text, nullable)
      - `image_url` (text, nullable)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `blog_summaries` table
    - Add policies for public access (read, insert, update, delete)

  3. Performance
    - Create indexes on frequently queried columns
    - Add updated_at trigger for automatic timestamp updates
*/

-- Create blog_summaries table
CREATE TABLE IF NOT EXISTS blog_summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text UNIQUE NOT NULL,
  title text NOT NULL,
  english_summary text NOT NULL,
  urdu_summary text NOT NULL,
  tags text[] DEFAULT '{}',
  category text DEFAULT 'General',
  sentiment text DEFAULT 'neutral' CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  word_count integer DEFAULT 0,
  reading_time integer DEFAULT 0,
  author text,
  publish_date text,
  image_url text,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blog_summaries ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Enable read access for all users" ON blog_summaries
FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON blog_summaries
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON blog_summaries
FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON blog_summaries
FOR DELETE USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_summaries_created_at ON blog_summaries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_summaries_url ON blog_summaries(url);
CREATE INDEX IF NOT EXISTS idx_blog_summaries_category ON blog_summaries(category);
CREATE INDEX IF NOT EXISTS idx_blog_summaries_sentiment ON blog_summaries(sentiment);
CREATE INDEX IF NOT EXISTS idx_blog_summaries_tags ON blog_summaries USING GIN(tags);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_blog_summaries_updated_at ON blog_summaries;
CREATE TRIGGER update_blog_summaries_updated_at 
BEFORE UPDATE ON blog_summaries 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data if table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM blog_summaries LIMIT 1) THEN
    INSERT INTO blog_summaries (url, title, english_summary, urdu_summary, tags, category, sentiment, word_count, reading_time, author, publish_date, image_url) VALUES
    (
      'https://example.com/ai-future',
      'The Future of Artificial Intelligence in 2024',
      'Artificial Intelligence continues to evolve rapidly, with breakthrough developments in machine learning, natural language processing, and computer vision reshaping industries worldwide.',
      'مصنوعی ذہانت تیزی سے ترقی کر رہی ہے، مشین لرننگ، قدرتی زبان کی پروسیسنگ، اور کمپیوٹر ویژن میں پیش قدمی دنیا بھر کی صنعتوں کو نئی شکل دے رہی ہے۔',
      ARRAY['AI', 'Technology', 'Machine Learning', 'Future'],
      'Technology',
      'positive',
      1250,
      6,
      'Dr. Sarah Johnson',
      '2024-01-15',
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
    ),
    (
      'https://example.com/climate-change',
      'Climate Change: Challenges and Solutions for Tomorrow',
      'Climate change presents unprecedented challenges requiring immediate action. Renewable energy, sustainable practices, and global cooperation are essential for addressing this crisis.',
      'موسمیاتی تبدیلی بے مثال چیلنجز پیش کرتی ہے جن کے لیے فوری اقدام کی ضرورت ہے۔ قابل تجدید توانائی، پائیدار طریقے، اور عالمی تعاون اس بحران سے نمٹنے کے لیے ضروری ہیں۔',
      ARRAY['Climate', 'Environment', 'Sustainability', 'Green Energy'],
      'Environment',
      'neutral',
      980,
      4,
      'Prof. Michael Chen',
      '2024-01-10',
      'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg'
    ),
    (
      'https://example.com/remote-work',
      'The Evolution of Remote Work Culture',
      'Remote work has transformed from a temporary solution to a permanent fixture in modern business. Companies are adapting their strategies to embrace distributed teams and flexible work arrangements.',
      'ریموٹ ورک ایک عارضی حل سے جدید کاروبار میں مستقل حصہ بن گیا ہے۔ کمپنیاں تقسیم شدہ ٹیموں اور لچکدار کام کے انتظامات کو اپنانے کے لیے اپنی حکمت عملیوں کو ڈھال رہی ہیں۔',
      ARRAY['Remote Work', 'Business', 'Productivity', 'Technology'],
      'Business',
      'positive',
      1100,
      5,
      'Lisa Rodriguez',
      '2024-01-08',
      'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg'
    );
  END IF;
END $$;