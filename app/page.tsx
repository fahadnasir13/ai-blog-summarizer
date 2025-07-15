'use client'

import { BlogScraper } from '@/components/blog-scraper'
import { RecentSummaries } from '@/components/recent-summaries'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Globe, Database, Brain, Rocket } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-2xl">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-400 rounded-full animate-bounce flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </motion.div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-6 leading-tight">
              AI Summarizer
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transform any blog into intelligent summaries with AI-powered analysis and free Urdu translation
            </p>
          </motion.div>

          {/* Feature highlights */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { icon: Brain, label: 'AI-Powered', color: 'from-purple-500 to-pink-500' },
              { icon: Globe, label: 'Free Translation', color: 'from-green-500 to-emerald-500' },
              { icon: Zap, label: 'Real-time', color: 'from-yellow-500 to-orange-500' },
              { icon: Database, label: 'Dual Storage', color: 'from-blue-500 to-cyan-500' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full border border-white/20 shadow-lg"
              >
                <div className={`h-6 w-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-medium text-white">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <BlogScraper />
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Separator className="flex-1 bg-purple-500/20" />
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-purple-400"
              />
              <span className="text-sm font-medium text-purple-200">Recent Activity</span>
            </div>
            <Separator className="flex-1 bg-purple-500/20" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <RecentSummaries />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Rocket className="h-5 w-5 text-purple-400" />
              <p className="text-purple-200">
                Built with cutting-edge technology
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-purple-300">
              <span>Next.js 15</span>
              <span>•</span>
              <span>Supabase</span>
              <span>•</span>
              <span>LibreTranslate API</span>
              <span>•</span>
              <span>Framer Motion</span>
            </div>
          </div>
        </motion.footer>
      </div>
    </main>
  )
}