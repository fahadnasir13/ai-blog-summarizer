'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { 
  Globe, 
  Loader2, 
  BookOpen, 
  Clock, 
  User, 
  Calendar,
  Copy,
  Share2,
  Volume2,
  Download,
  Eye,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Heart,
  Meh,
  Frown,
  Tag,
  TrendingUp,
  Image as ImageIcon,
  ExternalLink,
  VolumeX
} from 'lucide-react'
import { translateToUrdu, speakUrdu, stopSpeaking } from '@/lib/translation'
import { BlogSummary } from '@/lib/supabase'

interface ProcessingStep {
  id: string
  label: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  progress: number
}

export function BlogScraper() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [blogData, setBlogData] = useState<BlogSummary | null>(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([])
  const { toast } = useToast()

  const initializeSteps = () => {
    setProcessingSteps([
      { id: 'fetch', label: 'Fetching blog content', status: 'pending', progress: 0 },
      { id: 'extract', label: 'Extracting main content', status: 'pending', progress: 0 },
      { id: 'analyze', label: 'Analyzing content', status: 'pending', progress: 0 },
      { id: 'summarize', label: 'Generating summary', status: 'pending', progress: 0 },
      { id: 'translate', label: 'Translating to Urdu', status: 'pending', progress: 0 },
      { id: 'save', label: 'Saving to database', status: 'pending', progress: 0 }
    ])
  }

  const updateStep = (stepId: string, status: ProcessingStep['status'], progress: number = 100) => {
    setProcessingSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status, progress } : step
    ))
  }

  const handleScrape = async () => {
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a valid blog URL to scrape.",
        variant: "destructive"
      })
      return
    }

    // Validate URL
    try {
      new URL(url.trim())
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    setBlogData(null)
    initializeSteps()

    try {
      // Simulate processing steps with realistic timing
      updateStep('fetch', 'processing', 0)
      await new Promise(resolve => setTimeout(resolve, 500))
      updateStep('fetch', 'processing', 50)
      await new Promise(resolve => setTimeout(resolve, 800))
      updateStep('fetch', 'completed')

      updateStep('extract', 'processing', 0)
      await new Promise(resolve => setTimeout(resolve, 600))
      updateStep('extract', 'processing', 70)
      await new Promise(resolve => setTimeout(resolve, 400))
      updateStep('extract', 'completed')

      updateStep('analyze', 'processing', 0)
      await new Promise(resolve => setTimeout(resolve, 700))
      updateStep('analyze', 'processing', 60)
      await new Promise(resolve => setTimeout(resolve, 500))
      updateStep('analyze', 'completed')

      updateStep('summarize', 'processing', 0)
      await new Promise(resolve => setTimeout(resolve, 800))
      updateStep('summarize', 'processing', 80)
      await new Promise(resolve => setTimeout(resolve, 600))
      updateStep('summarize', 'completed')

      updateStep('translate', 'processing', 0)
      await new Promise(resolve => setTimeout(resolve, 1000))
      updateStep('translate', 'processing', 90)
      await new Promise(resolve => setTimeout(resolve, 500))
      updateStep('translate', 'completed')

      updateStep('save', 'processing', 0)
      
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      const result = await response.json()

      if (!response.ok) {
        updateStep('save', 'error')
        throw new Error(result.error || 'Failed to scrape blog')
      }

      updateStep('save', 'completed')
      setBlogData(result.data)
      
      toast({
        title: "Success! 🎉",
        description: result.message || "Blog scraped and summarized successfully!",
      })
    } catch (error) {
      console.error('Scraping error:', error)
      
      // Mark current processing step as error
      const currentStep = processingSteps.find(step => step.status === 'processing')
      if (currentStep) {
        updateStep(currentStep.id, 'error')
      }
      
      toast({
        title: "Scraping Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied! 📋",
        description: `${type} copied to clipboard`,
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      })
    }
  }

  const handleShare = async () => {
    if (!blogData) return

    const shareData = {
      title: blogData.title,
      text: blogData.english_summary,
      url: blogData.url,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(`${blogData.title}\n\n${blogData.english_summary}\n\nRead more: ${blogData.url}`)
        toast({
          title: "Shared! 🔗",
          description: "Content copied to clipboard for sharing",
        })
      }
    } catch (error) {
      console.error('Share error:', error)
    }
  }

  const handleSpeak = (text: string) => {
    try {
      if (isSpeaking) {
        stopSpeaking()
        setIsSpeaking(false)
        toast({
          title: "Speech Stopped",
          description: "Text-to-speech has been stopped",
        })
      } else {
        speakUrdu(text)
        setIsSpeaking(true)
        toast({
          title: "Speaking... 🔊",
          description: "Playing Urdu text-to-speech",
        })
        
        // Auto-stop speaking indicator after a reasonable time
        setTimeout(() => setIsSpeaking(false), text.length * 100)
      }
    } catch (error) {
      toast({
        title: "Speech Failed",
        description: "Text-to-speech is not available in your browser",
        variant: "destructive"
      })
    }
  }

  const handleRetranslate = async () => {
    if (!blogData) return

    setIsTranslating(true)
    try {
      const newUrduTranslation = await translateToUrdu(blogData.english_summary)
      setBlogData(prev => prev ? { ...prev, urdu_summary: newUrduTranslation } : null)
      toast({
        title: "Retranslated! 🔄",
        description: "Summary has been retranslated to Urdu",
      })
    } catch (error) {
      toast({
        title: "Translation Failed",
        description: "Failed to retranslate the summary",
        variant: "destructive"
      })
    } finally {
      setIsTranslating(false)
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Heart className="h-4 w-4 text-green-500" />
      case 'negative': return <Frown className="h-4 w-4 text-red-500" />
      default: return <Meh className="h-4 w-4 text-yellow-500" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-200'
      case 'negative': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  }

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border-2 border-dashed border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>
          
          <CardHeader className="text-center relative z-10">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                AI Blog Summarizer
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transform any blog post into intelligent summaries with AI-powered analysis and free Urdu translation
              </CardDescription>
            </motion.div>
          </CardHeader>
          
          <CardContent className="space-y-6 relative z-10">
            <div className="flex gap-3 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Globe className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="https://example.com/blog-post"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-12 h-12 text-lg border-2 focus:border-primary/50 bg-background/80 backdrop-blur-sm"
                  onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleScrape()}
                />
              </div>
              <Button 
                onClick={handleScrape} 
                disabled={isLoading || !url.trim()}
                size="lg"
                className="px-8 h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Analyze Blog
                  </>
                )}
              </Button>
            </div>

            {/* Processing Steps */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="max-w-2xl mx-auto"
                >
                  <Card className="bg-background/60 backdrop-blur-sm border border-primary/20">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Processing Your Blog
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {processingSteps.map((step, index) => (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="flex-shrink-0">
                            {step.status === 'completed' && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            {step.status === 'processing' && (
                              <Loader2 className="h-5 w-5 text-primary animate-spin" />
                            )}
                            {step.status === 'error' && (
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            )}
                            {step.status === 'pending' && (
                              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-sm font-medium ${
                                step.status === 'completed' ? 'text-green-600' :
                                step.status === 'processing' ? 'text-primary' :
                                step.status === 'error' ? 'text-red-600' :
                                'text-muted-foreground'
                              }`}>
                                {step.label}
                              </span>
                              {step.status === 'processing' && (
                                <span className="text-xs text-muted-foreground">
                                  {step.progress}%
                                </span>
                              )}
                            </div>
                            {step.status === 'processing' && (
                              <Progress value={step.progress} className="h-1" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Section */}
      <AnimatePresence>
        {blogData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Blog Info Card */}
            <Card className="overflow-hidden bg-gradient-to-br from-background to-muted/20 border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 border-b border-primary/10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <CardTitle className="text-xl md:text-2xl leading-tight">
                      {blogData.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {blogData.author && (
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {blogData.author}
                        </span>
                      )}
                      {blogData.publish_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(blogData.publish_date).toLocaleDateString()}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {blogData.word_count.toLocaleString()} words
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {blogData.reading_time} min read
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => window.open(blogData.url, '_blank')}>
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Original
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {blogData.category}
                  </Badge>
                  <Badge className={`flex items-center gap-1 ${getSentimentColor(blogData.sentiment)}`}>
                    {getSentimentIcon(blogData.sentiment)}
                    {blogData.sentiment}
                  </Badge>
                  {blogData.tags.slice(0, 4).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {blogData.tags.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{blogData.tags.length - 4} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* English Summary Card */}
            <Card className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-blue-200/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    English Summary
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleCopy(blogData.english_summary, 'English summary')}
                    className="border-blue-200 hover:bg-blue-50"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {blogData.english_summary}
                </p>
              </CardContent>
            </Card>

            {/* Urdu Summary Card */}
            <Card className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 border-green-200/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    Urdu Summary / اردو خلاصہ
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSpeak(blogData.urdu_summary)}
                      className="border-green-200 hover:bg-green-50"
                    >
                      {isSpeaking ? (
                        <VolumeX className="h-4 w-4 mr-1" />
                      ) : (
                        <Volume2 className="h-4 w-4 mr-1" />
                      )}
                      {isSpeaking ? 'Stop' : 'Speak'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleRetranslate}
                      disabled={isTranslating}
                      className="border-green-200 hover:bg-green-50"
                    >
                      {isTranslating ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <Globe className="h-4 w-4 mr-1" />
                      )}
                      Retranslate
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleCopy(blogData.urdu_summary, 'Urdu summary')}
                      className="border-green-200 hover:bg-green-50"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg text-right" 
                   style={{ fontFamily: 'Noto Nastaliq Urdu, serif', lineHeight: '2' }}>
                  {blogData.urdu_summary}
                </p>
              </CardContent>
            </Card>

            {/* Storage Info */}
            <Card className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 border-purple-200/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    Summary stored in Supabase
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    Full content stored in MongoDB
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    Free LibreTranslate API
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}