'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { 
  FileText, 
  Upload, 
  Play, 
  Pause, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Globe,
  Download,
  Trash2
} from 'lucide-react'

interface BatchItem {
  id: string
  url: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  title?: string
  progress: number
  error?: string
}

export default function BatchPage() {
  const [urls, setUrls] = useState('')
  const [batchItems, setBatchItems] = useState<BatchItem[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { toast } = useToast()

  const parseUrls = (text: string): string[] => {
    return text
      .split('\n')
      .map(url => url.trim())
      .filter(url => {
        try {
          new URL(url)
          return true
        } catch {
          return false
        }
      })
  }

  const startBatchProcessing = () => {
    const urlList = parseUrls(urls)
    
    if (urlList.length === 0) {
      toast({
        title: "No Valid URLs",
        description: "Please enter at least one valid URL",
        variant: "destructive"
      })
      return
    }

    const items: BatchItem[] = urlList.map((url, index) => ({
      id: `batch-${index}`,
      url,
      status: 'pending',
      progress: 0
    }))

    setBatchItems(items)
    setIsProcessing(true)
    setCurrentIndex(0)
    
    processBatchItems(items)
  }

  const processBatchItems = async (items: BatchItem[]) => {
    for (let i = 0; i < items.length; i++) {
      if (!isProcessing) break

      setCurrentIndex(i)
      setBatchItems(prev => prev.map((item, index) => 
        index === i ? { ...item, status: 'processing', progress: 0 } : item
      ))

      try {
        // Simulate processing steps
        for (let progress = 0; progress <= 100; progress += 20) {
          setBatchItems(prev => prev.map((item, index) => 
            index === i ? { ...item, progress } : item
          ))
          await new Promise(resolve => setTimeout(resolve, 300))
        }

        // Simulate API call
        const response = await fetch('/api/scrape', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: items[i].url })
        })

        const result = await response.json()

        if (response.ok) {
          setBatchItems(prev => prev.map((item, index) => 
            index === i ? { 
              ...item, 
              status: 'completed', 
              progress: 100,
              title: result.data?.title || 'Untitled'
            } : item
          ))
        } else {
          throw new Error(result.error || 'Processing failed')
        }
      } catch (error) {
        setBatchItems(prev => prev.map((item, index) => 
          index === i ? { 
            ...item, 
            status: 'error', 
            progress: 100,
            error: error instanceof Error ? error.message : 'Unknown error'
          } : item
        ))
      }

      // Small delay between items
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    setIsProcessing(false)
    toast({
      title: "Batch Processing Complete! 🎉",
      description: `Processed ${items.length} URLs`,
    })
  }

  const pauseProcessing = () => {
    setIsProcessing(false)
  }

  const clearBatch = () => {
    setBatchItems([])
    setUrls('')
    setIsProcessing(false)
    setCurrentIndex(0)
  }

  const getStatusIcon = (status: BatchItem['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'processing': return <Clock className="h-4 w-4 text-blue-500 animate-spin" />
      default: return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: BatchItem['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const completedCount = batchItems.filter(item => item.status === 'completed').length
  const errorCount = batchItems.filter(item => item.status === 'error').length
  const overallProgress = batchItems.length > 0 ? ((completedCount + errorCount) / batchItems.length) * 100 : 0

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
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Batch Processing
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Process multiple blog URLs simultaneously for efficient bulk summarization
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 border-purple-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-purple-600" />
              URL Input
            </CardTitle>
            <CardDescription>
              Enter multiple blog URLs, one per line. Each URL will be processed and summarized.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="https://example.com/blog-post-1&#10;https://example.com/blog-post-2&#10;https://example.com/blog-post-3"
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              className="min-h-32 border-purple-200 focus:border-purple-400"
              disabled={isProcessing}
            />
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {parseUrls(urls).length} valid URLs detected
              </div>
              <div className="flex gap-2">
                {batchItems.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={clearBatch}
                    disabled={isProcessing}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
                {isProcessing ? (
                  <Button
                    onClick={pauseProcessing}
                    variant="outline"
                    className="border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    <Pause className="h-4 w-4 mr-1" />
                    Pause
                  </Button>
                ) : (
                  <Button
                    onClick={startBatchProcessing}
                    disabled={parseUrls(urls).length === 0}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Start Processing
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress Overview */}
      {batchItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Processing Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedCount + errorCount} / {batchItems.length}
                </span>
              </div>
              <Progress value={overallProgress} className="h-2" />
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Completed: {completedCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span>Errors: {errorCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                  <span>Pending: {batchItems.length - completedCount - errorCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Batch Items */}
      {batchItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold">Processing Queue</h3>
          <div className="space-y-3">
            {batchItems.map((item, index) => (
              <Card 
                key={item.id} 
                className={`transition-all duration-300 ${
                  index === currentIndex && isProcessing ? 'ring-2 ring-primary/50 shadow-lg' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(item.status)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium truncate">
                          {item.title || item.url}
                        </p>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      
                      {item.status === 'processing' && (
                        <Progress value={item.progress} className="h-1 mb-2" />
                      )}
                      
                      <p className="text-xs text-muted-foreground truncate">
                        {item.url}
                      </p>
                      
                      {item.error && (
                        <p className="text-xs text-red-600 mt-1">
                          Error: {item.error}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Export Results */}
      {completedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-green-50/50 to-blue-50/50 border-green-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Download className="h-5 w-5" />
                Export Results
              </CardTitle>
              <CardDescription>
                Download your batch processing results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button variant="outline" className="border-green-200 hover:bg-green-50">
                  <Download className="h-4 w-4 mr-1" />
                  Export as CSV
                </Button>
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                  <Download className="h-4 w-4 mr-1" />
                  Export as JSON
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}