'use client'

import { motion } from 'framer-motion'
import { RecentSummaries } from '@/components/recent-summaries'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { History, Database, Search, Filter } from 'lucide-react'

export default function HistoryPage() {
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
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <History className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Summary History
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse, search, and manage all your blog summaries in one place
        </p>
        
        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Search className="h-3 w-3" />
            Advanced Search
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Filter className="h-3 w-3" />
            Smart Filtering
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Database className="h-3 w-3" />
            Dual Storage
          </Badge>
        </div>
      </motion.div>

      {/* Enhanced Recent Summaries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <RecentSummaries />
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-blue-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Database className="h-5 w-5" />
              Storage Information
            </CardTitle>
            <CardDescription>
              Your summaries are safely stored across multiple databases for redundancy and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/60 border border-blue-200/50">
                <h4 className="font-medium text-blue-700 mb-2">Supabase Database</h4>
                <p className="text-sm text-muted-foreground">
                  Stores summary metadata, tags, categories, and quick access information for fast retrieval and searching.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/60 border border-purple-200/50">
                <h4 className="font-medium text-purple-700 mb-2">MongoDB Atlas</h4>
                <p className="text-sm text-muted-foreground">
                  Stores complete blog content, full text, and detailed metadata for comprehensive analysis and backup.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}