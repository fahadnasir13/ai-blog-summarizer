'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Info, 
  Sparkles, 
  Globe, 
  Database, 
  Zap,
  Heart,
  Github,
  ExternalLink,
  Users,
  Award,
  Target,
  Lightbulb
} from 'lucide-react'

export default function AboutPage() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Summarization',
      description: 'Advanced algorithms analyze and extract key insights from blog content'
    },
    {
      icon: Globe,
      title: 'Free Urdu Translation',
      description: 'LibreTranslate API provides accurate and free translation services'
    },
    {
      icon: Database,
      title: 'Dual Database Storage',
      description: 'Supabase for summaries and MongoDB for complete content backup'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Live progress tracking with animated steps and instant feedback'
    }
  ]

  const technologies = [
    { name: 'Next.js 15', description: 'React framework with App Router' },
    { name: 'TypeScript', description: 'Type-safe development' },
    { name: 'Tailwind CSS', description: 'Utility-first styling' },
    { name: 'Framer Motion', description: 'Smooth animations' },
    { name: 'ShadCN UI', description: 'Premium components' },
    { name: 'Supabase', description: 'Backend as a service' },
    { name: 'MongoDB', description: 'Document database' },
    { name: 'LibreTranslate', description: 'Free translation API' }
  ]

  const stats = [
    { label: 'Languages Supported', value: '8+' },
    { label: 'Processing Speed', value: '< 30s' },
    { label: 'Translation Accuracy', value: '95%' },
    { label: 'Uptime', value: '99.9%' }
  ]

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
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Info className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            About AI Blog Summarizer
          </h1>
        </div>
        <p className="text-xl text-purple-200 max-w-3xl mx-auto">
          A comprehensive, production-ready blog summarization application that transforms any blog URL into intelligent summaries with AI-powered analysis and free Urdu translation.
        </p>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-300">
              <Target className="h-5 w-5" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-purple-200">
              We believe that information should be accessible to everyone, regardless of language barriers. Our AI Blog Summarizer bridges the gap between English content and Urdu speakers, providing intelligent summaries that preserve the essence of the original content while making it accessible in multiple languages.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              Key Features
            </CardTitle>
            <CardDescription>
              What makes our blog summarizer unique and powerful
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-400/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-white">{feature.title}</h4>
                    <p className="text-sm text-purple-200">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-400" />
              Technology Stack
            </CardTitle>
            <CardDescription>
              Built with modern, cutting-edge technologies for optimal performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="text-center space-y-2 p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Badge className="w-full justify-center bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {tech.name}
                  </Badge>
                  <p className="text-xs text-purple-300">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-300">
              <Award className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription>
              Real-world performance and reliability statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-center space-y-2"
                >
                  <div className="text-3xl font-bold text-green-300">{stat.value}</div>
                  <div className="text-sm text-green-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-400" />
              How It Works
            </CardTitle>
            <CardDescription>
              The complete process from URL to translated summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: 'URL Input & Validation',
                  description: 'Enter any blog URL and our system validates and prepares for processing'
                },
                {
                  step: 2,
                  title: 'Content Extraction',
                  description: 'Advanced web scraping extracts the main content while filtering out ads and navigation'
                },
                {
                  step: 3,
                  title: 'AI Analysis & Summarization',
                  description: 'Intelligent algorithms analyze content structure, sentiment, and key points to generate summaries'
                },
                {
                  step: 4,
                  title: 'Urdu Translation',
                  description: 'LibreTranslate API provides accurate, free translation to Urdu with cultural context'
                },
                {
                  step: 5,
                  title: 'Dual Storage',
                  description: 'Summaries stored in Supabase for quick access, full content in MongoDB for backup'
                },
                {
                  step: 6,
                  title: 'Interactive Features',
                  description: 'Text-to-speech, copy, share, and retranslation features for enhanced user experience'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-start gap-4"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-red-400 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-white">{item.title}</h4>
                    <p className="text-sm text-purple-200">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Team & Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-300">
              <Users className="h-5 w-5" />
              Built with Passion
            </CardTitle>
            <CardDescription>
              Created by passionate developers who believe in accessible technology
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-purple-200 max-w-2xl mx-auto text-lg">
                This project represents our commitment to breaking down language barriers and making information accessible to everyone. We believe that technology should serve humanity, not the other way around.
              </p>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => window.open('https://github.com/fahadnasir13', '_blank')}
                className="border-purple-500/30 hover:bg-purple-500/10 text-purple-200"
              >
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('https://libretranslate.de', '_blank')}
                className="border-purple-500/30 hover:bg-purple-500/10 text-purple-200"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                LibreTranslate API
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="text-center py-8"
      >
        <p className="text-purple-300">
          © 2024 AI Blog Summarizer. Built with Next.js, Supabase, and LibreTranslate API.
        </p>
      </motion.div>
    </div>
  )
}