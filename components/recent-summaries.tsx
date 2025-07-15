'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Clock, 
  BookOpen, 
  Search, 
  Filter,
  Eye,
  Copy,
  Volume2,
  Calendar,
  User,
  RefreshCw,
  Heart,
  Meh,
  Frown,
  Tag,
  Trash2,
  ExternalLink,
  VolumeX,
  Download,
  Share2
} from 'lucide-react'
import { BlogSummary } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { speakUrdu, stopSpeaking } from '@/lib/translation'

export function RecentSummaries() {
  const [summaries, setSummaries] = useState<BlogSummary[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [sentiment, setSentiment] = useState('all')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchSummaries = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        category,
        sentiment,
        sortBy,
        order: sortOrder,
        limit: '20',
        offset: '0'
      })

      const response = await fetch(`/api/summaries?${params}`)
      const result = await response.json()

      if (result.success) {
        setSummaries(result.data)
        if (result.message) {
          toast({
            title: "Welcome! 👋",
            description: result.message,
          })
        }
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Failed to fetch summaries:', error)
      toast({
        title: "Failed to load summaries",
        description: "Please try again later",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSummaries()
  }, [searchTerm, category, sentiment, sortBy, sortOrder])

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

  const handleSpeak = (text: string, id: string) => {
    try {
      if (speakingId === id) {
        stopSpeaking()
        setSpeakingId(null)
        toast({
          title: "Speech Stopped",
          description: "Text-to-speech has been stopped",
        })
      } else {
        if (speakingId) {
          stopSpeaking()
        }
        speakUrdu(text)
        setSpeakingId(id)
        toast({
          title: "Speaking... 🔊",
          description: "Playing Urdu text-to-speech",
        })
        
        // Auto-stop speaking indicator
        setTimeout(() => setSpeakingId(null), text.length * 100)
      }
    } catch (error) {
      toast({
        title: "Speech Failed",
        description: "Text-to-speech is not available",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/summaries?id=${id}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (result.success) {
        setSummaries(prev => prev.filter(summary => summary.id !== id))
        toast({
          title: "Deleted! 🗑️",
          description: "Summary has been deleted",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete summary",
        variant: "destructive"
      })
    }
  }

  const handleShare = async (summary: BlogSummary) => {
    const shareData = {
      title: summary.title,
      text: summary.english_summary,
      url: summary.url,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(`${summary.title}\n\n${summary.english_summary}\n\nRead more: ${summary.url}`)
        toast({
          title: "Shared! 🔗",
          description: "Content copied to clipboard for sharing",
        })
      }
    } catch (error) {
      console.error('Share error:', error)
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Heart className="h-3 w-3 text-green-500" />
      case 'negative': return <Frown className="h-3 w-3 text-red-500" />
      default: return <Meh className="h-3 w-3 text-yellow-500" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-200'
      case 'negative': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-800 border-blue-200',
      'Business': 'bg-purple-100 text-purple-800 border-purple-200',
      'Health': 'bg-green-100 text-green-800 border-green-200',
      'Environment': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Education': 'bg-orange-100 text-orange-800 border-orange-200',
      'Lifestyle': 'bg-pink-100 text-pink-800 border-pink-200',
      'Science': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'General': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[category as keyof typeof colors] || colors.General
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <motion.h2 
            className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Recent Summaries
          </motion.h2>
          <Button 
            variant="outline" 
            onClick={fetchSummaries} 
            disabled={isLoading}
            className="border-primary/20 hover:bg-primary/5"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Search and Filter Controls */}
        <Card className="bg-gradient-to-r from-background to-muted/20 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search summaries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-primary/20 focus:border-primary/50"
                />
              </div>
              
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-primary/20">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Environment">Environment</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sentiment} onValueChange={setSentiment}>
                <SelectTrigger className="border-primary/20">
                  <SelectValue placeholder="Sentiment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sentiments</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>

              <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                const [field, order] = value.split('-')
                setSortBy(field)
                setSortOrder(order)
              }}>
                <SelectTrigger className="border-primary/20">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at-desc">Newest First</SelectItem>
                  <SelectItem value="created_at-asc">Oldest First</SelectItem>
                  <SelectItem value="title-asc">Title A-Z</SelectItem>
                  <SelectItem value="title-desc">Title Z-A</SelectItem>
                  <SelectItem value="word_count-desc">Most Words</SelectItem>
                  <SelectItem value="word_count-asc">Least Words</SelectItem>
                  <SelectItem value="reading_time-desc">Longest Read</SelectItem>
                  <SelectItem value="reading_time-asc">Shortest Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summaries Grid */}
      <AnimatePresence>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {summaries.map((summary, index) => (
            <motion.div
              key={summary.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              layout
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/10 border-primary/20 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {summary.title}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(summary.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge className={`text-xs ${getCategoryColor(summary.category)}`}>
                      <Tag className="h-2 w-2 mr-1" />
                      {summary.category}
                    </Badge>
                    <Badge className={`text-xs ${getSentimentColor(summary.sentiment)}`}>
                      {getSentimentIcon(summary.sentiment)}
                      <span className="ml-1 capitalize">{summary.sentiment}</span>
                    </Badge>
                  </div>
                  
                  <CardDescription className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(summary.created_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {summary.word_count} words
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {summary.reading_time} min
                    </span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* English Summary */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-blue-700">English Summary</h4>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCopy(summary.english_summary, 'English summary')}
                        className="h-6 w-6 p-0 hover:bg-blue-50"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {summary.english_summary}
                    </p>
                  </div>

                  {/* Urdu Summary */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-green-700">Urdu Summary</h4>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSpeak(summary.urdu_summary, summary.id)}
                          className="h-6 w-6 p-0 hover:bg-green-50"
                        >
                          {speakingId === summary.id ? (
                            <VolumeX className="h-3 w-3" />
                          ) : (
                            <Volume2 className="h-3 w-3" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleCopy(summary.urdu_summary, 'Urdu summary')}
                          className="h-6 w-6 p-0 hover:bg-green-50"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 text-right leading-relaxed" 
                       style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                      {summary.urdu_summary}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {summary.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {summary.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{summary.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs"
                      onClick={() => window.open(summary.url, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Original
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShare(summary)}
                      className="text-xs"
                    >
                      <Share2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Empty State */}
      {summaries.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="text-center py-16 bg-gradient-to-br from-muted/20 to-muted/40 border-dashed border-2 border-primary/20">
            <CardContent>
              <BookOpen className="h-16 w-16 mx-auto mb-6 text-muted-foreground/50" />
              <CardTitle className="mb-4 text-2xl">No summaries found</CardTitle>
              <CardDescription className="text-lg mb-6">
                {searchTerm || category !== 'all' || sentiment !== 'all' 
                  ? 'Try adjusting your search filters or create a new summary'
                  : 'Start by analyzing your first blog post above!'
                }
              </CardDescription>
              {(searchTerm || category !== 'all' || sentiment !== 'all') && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('')
                    setCategory('all')
                    setSentiment('all')
                  }}
                  className="border-primary/20 hover:bg-primary/5"
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-96 animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
                <div className="h-3 bg-muted rounded w-4/6"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}