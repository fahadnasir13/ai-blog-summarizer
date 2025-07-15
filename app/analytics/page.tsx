'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Clock, 
  BookOpen, 
  Tag,
  Heart,
  Meh,
  Frown,
  Calendar,
  Users,
  Database
} from 'lucide-react'

interface AnalyticsData {
  totalSummaries: number
  totalWords: number
  avgReadingTime: number
  categoriesCount: Record<string, number>
  sentimentCount: Record<string, number>
  monthlyActivity: Record<string, number>
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalSummaries: 0,
    totalWords: 0,
    avgReadingTime: 0,
    categoriesCount: {},
    sentimentCount: {},
    monthlyActivity: {}
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setAnalytics({
        totalSummaries: 47,
        totalWords: 52340,
        avgReadingTime: 6.2,
        categoriesCount: {
          'Technology': 18,
          'Business': 12,
          'Health': 8,
          'Environment': 5,
          'Education': 3,
          'Science': 1
        },
        sentimentCount: {
          'positive': 28,
          'neutral': 15,
          'negative': 4
        },
        monthlyActivity: {
          'Jan': 8,
          'Feb': 12,
          'Mar': 15,
          'Apr': 12
        }
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Heart className="h-4 w-4 text-green-500" />
      case 'negative': return <Frown className="h-4 w-4 text-red-500" />
      default: return <Meh className="h-4 w-4 text-yellow-500" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800'
      case 'negative': return 'bg-red-100 text-red-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
        </div>
        <p className="text-xl text-purple-200 max-w-2xl mx-auto">
          Insights and statistics about your blog summarization activity
        </p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-300">Total Summaries</p>
                <p className="text-3xl font-bold text-blue-200">
                  {isLoading ? '...' : analytics.totalSummaries}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-300">Total Words</p>
                <p className="text-3xl font-bold text-green-200">
                  {isLoading ? '...' : analytics.totalWords.toLocaleString()}
                </p>
              </div>
              <Globe className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-300">Avg Reading Time</p>
                <p className="text-3xl font-bold text-purple-200">
                  {isLoading ? '...' : `${analytics.avgReadingTime} min`}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-300">This Month</p>
                <p className="text-3xl font-bold text-orange-200">
                  {isLoading ? '...' : Object.values(analytics.monthlyActivity).slice(-1)[0] || 0}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Categories Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-purple-400" />
                Categories Distribution
              </CardTitle>
              <CardDescription>
                Breakdown of summaries by category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(analytics.categoriesCount).map(([category, count]) => {
                const percentage = analytics.totalSummaries > 0 ? (count / analytics.totalSummaries) * 100 : 0
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Sentiment Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-400" />
                Sentiment Analysis
              </CardTitle>
              <CardDescription>
                Overall sentiment of analyzed content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(analytics.sentimentCount).map(([sentiment, count]) => {
                const percentage = analytics.totalSummaries > 0 ? (count / analytics.totalSummaries) * 100 : 0
                return (
                  <div key={sentiment} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getSentimentIcon(sentiment)}
                        <span className="text-sm font-medium capitalize">{sentiment}</span>
                      </div>
                      <Badge className={getSentimentColor(sentiment)}>{count}</Badge>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-400" />
                Monthly Activity
              </CardTitle>
              <CardDescription>
                Summary creation activity over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(analytics.monthlyActivity).map(([month, count]) => (
                  <div key={month} className="text-center space-y-2">
                    <div className="h-20 bg-gradient-to-t from-primary/20 to-primary/5 rounded-lg flex items-end justify-center p-2">
                      <div 
                        className="w-full bg-primary rounded-sm transition-all duration-1000"
                        style={{ height: `${(count / Math.max(...Object.values(analytics.monthlyActivity))) * 100}%` }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{month}</p>
                      <p className="text-xs text-muted-foreground">{count} summaries</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Database className="h-5 w-5" />
              System Performance
            </CardTitle>
            <CardDescription>
              Current system status and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="h-16 w-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
                </div>
                <h4 className="font-medium">LibreTranslate API</h4>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Online</Badge>
                <p className="text-xs text-green-400">99.9% uptime</p>
              </div>
              <div className="text-center space-y-2">
                <div className="h-16 w-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Database className="h-6 w-6 text-blue-400" />
                </div>
                <h4 className="font-medium">Supabase</h4>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Connected</Badge>
                <p className="text-xs text-blue-400">Fast queries</p>
              </div>
              <div className="text-center space-y-2">
                <div className="h-16 w-16 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Database className="h-6 w-6 text-purple-400" />
                </div>
                <h4 className="font-medium">Storage</h4>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Active</Badge>
                <p className="text-xs text-purple-400">Reliable storage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}