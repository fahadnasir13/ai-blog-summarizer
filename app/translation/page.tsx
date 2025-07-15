'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { 
  Globe, 
  ArrowRightLeft, 
  Volume2, 
  Copy, 
  Download,
  Loader2,
  CheckCircle,
  VolumeX,
  RefreshCw
} from 'lucide-react'
import { translateToUrdu, speakUrdu, stopSpeaking } from '@/lib/translation'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
]

export default function TranslationPage() {
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('ur')
  const [isTranslating, setIsTranslating] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const { toast } = useToast()

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "No Text to Translate",
        description: "Please enter some text to translate",
        variant: "destructive"
      })
      return
    }

    setIsTranslating(true)
    try {
      if (targetLang === 'ur') {
        // Use our custom Urdu translation
        const result = await translateToUrdu(sourceText)
        setTranslatedText(result)
      } else {
        // Use LibreTranslate API for other languages
        const response = await fetch('https://libretranslate.de/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: sourceText,
            source: sourceLang,
            target: targetLang,
            format: 'text'
          })
        })

        if (response.ok) {
          const data = await response.json()
          setTranslatedText(data.translatedText || 'Translation failed')
        } else {
          throw new Error('Translation service unavailable')
        }
      }

      toast({
        title: "Translation Complete! 🌐",
        description: "Text has been successfully translated",
      })
    } catch (error) {
      toast({
        title: "Translation Failed",
        description: error instanceof Error ? error.message : "Translation service is unavailable",
        variant: "destructive"
      })
    } finally {
      setIsTranslating(false)
    }
  }

  const handleSwapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
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
        if (targetLang === 'ur') {
          speakUrdu(text)
        } else {
          const utterance = new SpeechSynthesisUtterance(text)
          utterance.lang = targetLang === 'en' ? 'en-US' : targetLang
          speechSynthesis.speak(utterance)
        }
        setIsSpeaking(true)
        toast({
          title: "Speaking... 🔊",
          description: "Playing text-to-speech",
        })
        
        setTimeout(() => setIsSpeaking(false), text.length * 100)
      }
    } catch (error) {
      toast({
        title: "Speech Failed",
        description: "Text-to-speech is not available",
        variant: "destructive"
      })
    }
  }

  const handleDownload = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast({
      title: "Downloaded! 📥",
      description: `${filename} has been downloaded`,
    })
  }

  const wordCount = sourceText.trim().split(/\s+/).filter(word => word.length > 0).length
  const charCount = sourceText.length

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
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-green-600 flex items-center justify-center">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Advanced Translation
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Powerful translation tools with support for multiple languages and text-to-speech
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Badge variant="secondary" className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            LibreTranslate API
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Volume2 className="h-3 w-3" />
            Text-to-Speech
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            8+ Languages
          </Badge>
        </div>
      </motion.div>

      {/* Language Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-blue-50/50 to-green-50/50 border-blue-200/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">From</label>
                <Select value={sourceLang} onValueChange={setSourceLang}>
                  <SelectTrigger className="border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwapLanguages}
                className="mt-6 border-blue-200 hover:bg-blue-50"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">To</label>
                <Select value={targetLang} onValueChange={setTargetLang}>
                  <SelectTrigger className="border-green-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Translation Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-lg">
                    {languages.find(l => l.code === sourceLang)?.flag}
                  </span>
                  Source Text
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {wordCount} words, {charCount} chars
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter text to translate..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="min-h-48 resize-none border-blue-200 focus:border-blue-400"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleTranslate}
                  disabled={isTranslating || !sourceText.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  {isTranslating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4 mr-2" />
                      Translate
                    </>
                  )}
                </Button>
                {sourceText && (
                  <Button
                    variant="outline"
                    onClick={() => handleCopy(sourceText, 'Source text')}
                    className="border-blue-200 hover:bg-blue-50"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Translated Text */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg">
                  {languages.find(l => l.code === targetLang)?.flag}
                </span>
                Translated Text
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="min-h-48 p-3 border rounded-md bg-muted/20 border-green-200">
                {translatedText ? (
                  <p className={`text-sm leading-relaxed ${
                    targetLang === 'ur' ? 'text-right font-urdu' : ''
                  }`} style={targetLang === 'ur' ? { fontFamily: 'Noto Nastaliq Urdu, serif', lineHeight: '2' } : {}}>
                    {translatedText}
                  </p>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Translation will appear here...
                  </p>
                )}
              </div>
              
              {translatedText && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleSpeak(translatedText)}
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
                    onClick={() => handleCopy(translatedText, 'Translation')}
                    className="border-green-200 hover:bg-green-50"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(translatedText, `translation_${targetLang}.txt`)}
                    className="border-green-200 hover:bg-green-50"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Translation History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              Quick Translations
            </CardTitle>
            <CardDescription>
              Common phrases and quick translation examples
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { en: 'Hello, how are you?', ur: 'ہیلو، آپ کیسے ہیں؟' },
                { en: 'Thank you very much', ur: 'بہت شکریہ' },
                { en: 'Good morning', ur: 'صبح بخیر' },
                { en: 'Welcome to our website', ur: 'ہماری ویب سائٹ میں خوش آمدید' },
                { en: 'Please help me', ur: 'براہ کرم میری مدد کریں' },
                { en: 'Have a nice day', ur: 'آپ کا دن اچھا گزرے' }
              ].map((phrase, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" 
                      onClick={() => {
                        setSourceText(phrase.en)
                        setTranslatedText(phrase.ur)
                        setSourceLang('en')
                        setTargetLang('ur')
                      }}>
                  <CardContent className="p-4 space-y-2">
                    <p className="text-sm font-medium">{phrase.en}</p>
                    <p className="text-sm text-muted-foreground text-right" 
                       style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                      {phrase.ur}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* API Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-green-50/50 to-blue-50/50 border-green-200/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>LibreTranslate API Online</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>Text-to-Speech Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-purple-500" />
                <span>8+ Languages Supported</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}