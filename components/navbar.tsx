'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Menu, 
  X, 
  Sparkles, 
  Github,
  Home,
  History,
  BarChart3,
  FileText,
  Globe,
  Database,
  Settings,
  Info,
  Zap,
  CheckCircle,
  ChevronDown,
  Download
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface NavbarProps {
  onToggleSidebar?: () => void
  isSidebarOpen?: boolean
}

const mainNavItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'History', href: '/history', icon: History },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Translate', href: '/translation', icon: Globe },
]

const moreNavItems = [
  { name: 'Batch Process', href: '/batch', icon: FileText },
  { name: 'Export Data', href: '/export', icon: Download },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'About', href: '/about', icon: Info },
]

export function Navbar({ onToggleSidebar, isSidebarOpen }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="font-bold text-xl bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                    AI Summarizer
                  </span>
                  <div className="text-xs text-purple-300">Powered by AI</div>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </motion.div>
                  </Link>
                )
              })}

              {/* More Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
                  >
                    More
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="start" 
                  className="w-48 bg-slate-900/95 backdrop-blur-xl border-purple-500/20"
                >
                  {moreNavItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link 
                          href={item.href}
                          className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer ${
                            isActive 
                              ? 'bg-purple-500/20 text-white' 
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Center - Status indicators (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="hidden sm:inline">LibreTranslate</span>
              </Badge>
            </motion.div>
            <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span className="hidden sm:inline">Supabase</span>
            </Badge>
            <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              <span className="hidden sm:inline">Real-time</span>
            </Badge>
          </div>

          {/* Right side - GitHub and Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://github.com/fahadnasir13', '_blank')}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-600/50 text-gray-200 hover:from-gray-700/50 hover:to-gray-800/50 hover:border-gray-500/50 transition-all duration-300"
            >
              <Github className="h-4 w-4" />
              <span className="hidden md:inline">GitHub</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden hover:bg-purple-500/20 text-white border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0, 
            opacity: isMobileMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden border-t border-purple-500/20"
        >
          <div className="py-4 space-y-2">
            {/* Main Navigation Items */}
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto h-2 w-2 rounded-full bg-purple-400"
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}

            {/* Separator */}
            <div className="border-t border-purple-500/20 my-2"></div>

            {/* More Navigation Items */}
            {moreNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto h-2 w-2 rounded-full bg-purple-400"
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
            
            {/* Mobile GitHub link */}
            <Button
              variant="outline"
              onClick={() => {
                window.open('https://github.com/fahadnasir13', '_blank')
                setIsMobileMenuOpen(false)
              }}
              className="w-full justify-start gap-3 mt-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-600/50 text-gray-200 hover:from-gray-700/50 hover:to-gray-800/50"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </Button>

            {/* Mobile status indicators */}
            <div className="flex flex-wrap gap-2 mt-4 px-4">
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                LibreTranslate
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Supabase
              </Badge>
              <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30 flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Real-time
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}