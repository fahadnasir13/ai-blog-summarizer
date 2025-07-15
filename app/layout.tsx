import './globals.css'
import type { Metadata } from 'next'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Toaster } from '@/components/ui/sonner'


export const metadata: Metadata = {
  title: 'AI Blog Summarizer - Premium Urdu Translation',
  description: 'Transform any blog post into intelligent summaries with AI-powered analysis and free Urdu translation. Built with Next.js, Supabase, MongoDB, and LibreTranslate API.',
  keywords: [
    'blog summarizer', 
    'AI analysis', 
    'Urdu translation', 
    'content analysis', 
    'blog scraping', 
    'text summarization',
    'LibreTranslate',
    'Next.js',
    'Supabase',
    'MongoDB'
  ],
  authors: [{ name: 'AI Blog Summarizer Team' }],
  openGraph: {
    title: 'AI Blog Summarizer - Premium Urdu Translation',
    description: 'Transform any blog post into intelligent summaries with AI-powered analysis and free Urdu translation.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Blog Summarizer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Blog Summarizer - Premium Urdu Translation',
    description: 'Transform any blog post into intelligent summaries with AI-powered analysis and free Urdu translation.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <style dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap');
            .font-urdu { font-family: 'Noto Nastaliq Urdu', serif; }
          `
        }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <LayoutWrapper>
          {children}
          <Toaster />
        </LayoutWrapper>
      </body>
    </html>
  )
}