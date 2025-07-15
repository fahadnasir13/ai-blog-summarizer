'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { 
  Settings, 
  Palette, 
  Volume2, 
  Globe, 
  Database,
  Bell,
  Shield,
  Download,
  RefreshCw,
  CheckCircle
} from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: 'system',
    language: 'en',
    autoTranslate: true,
    enableNotifications: true,
    enableSpeech: true,
    speechRate: [0.8],
    speechVolume: [1.0],
    autoSave: true,
    compressionLevel: [5],
    maxSummaryLength: [400],
    enableAnalytics: true,
    enableBackup: true
  })
  const { toast } = useToast()

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const saveSettings = () => {
    // Simulate saving settings
    setTimeout(() => {
      toast({
        title: "Settings Saved! ✅",
        description: "Your preferences have been updated successfully",
      })
    }, 500)
  }

  const resetSettings = () => {
    setSettings({
      theme: 'system',
      language: 'en',
      autoTranslate: true,
      enableNotifications: true,
      enableSpeech: true,
      speechRate: [0.8],
      speechVolume: [1.0],
      autoSave: true,
      compressionLevel: [5],
      maxSummaryLength: [400],
      enableAnalytics: true,
      enableBackup: true
    })
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to defaults",
    })
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
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
            Settings & Preferences
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Customize your blog summarizer experience with advanced configuration options
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-600" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize the visual appearance of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme</label>
                <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="ur">🇵🇰 Urdu</SelectItem>
                    <SelectItem value="ar">🇸🇦 Arabic</SelectItem>
                    <SelectItem value="hi">🇮🇳 Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Auto-translate summaries</label>
                  <p className="text-xs text-muted-foreground">Automatically translate to Urdu</p>
                </div>
                <Switch
                  checked={settings.autoTranslate}
                  onCheckedChange={(checked) => handleSettingChange('autoTranslate', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Audio Settings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-blue-600" />
                Audio & Speech
              </CardTitle>
              <CardDescription>
                Configure text-to-speech and audio preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Enable text-to-speech</label>
                  <p className="text-xs text-muted-foreground">Allow Urdu voice synthesis</p>
                </div>
                <Switch
                  checked={settings.enableSpeech}
                  onCheckedChange={(checked) => handleSettingChange('enableSpeech', checked)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Speech Rate</label>
                <Slider
                  value={settings.speechRate}
                  onValueChange={(value) => handleSettingChange('speechRate', value)}
                  max={2}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Slow</span>
                  <span>{settings.speechRate[0]}x</span>
                  <span>Fast</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Speech Volume</label>
                <Slider
                  value={settings.speechVolume}
                  onValueChange={(value) => handleSettingChange('speechVolume', value)}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Quiet</span>
                  <span>{Math.round(settings.speechVolume[0] * 100)}%</span>
                  <span>Loud</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Processing Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                Processing
              </CardTitle>
              <CardDescription>
                Configure how blog content is processed and summarized
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Maximum Summary Length</label>
                <Slider
                  value={settings.maxSummaryLength}
                  onValueChange={(value) => handleSettingChange('maxSummaryLength', value)}
                  max={800}
                  min={200}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Short</span>
                  <span>{settings.maxSummaryLength[0]} words</span>
                  <span>Long</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Compression Level</label>
                <Slider
                  value={settings.compressionLevel}
                  onValueChange={(value) => handleSettingChange('compressionLevel', value)}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Detailed</span>
                  <span>Level {settings.compressionLevel[0]}</span>
                  <span>Concise</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Auto-save summaries</label>
                  <p className="text-xs text-muted-foreground">Automatically save to database</p>
                </div>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data & Privacy */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Data & Privacy
              </CardTitle>
              <CardDescription>
                Manage your data storage and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Enable notifications</label>
                  <p className="text-xs text-muted-foreground">Get updates about processing</p>
                </div>
                <Switch
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => handleSettingChange('enableNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Usage analytics</label>
                  <p className="text-xs text-muted-foreground">Help improve the service</p>
                </div>
                <Switch
                  checked={settings.enableAnalytics}
                  onCheckedChange={(checked) => handleSettingChange('enableAnalytics', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Automatic backup</label>
                  <p className="text-xs text-muted-foreground">Backup data to cloud storage</p>
                </div>
                <Switch
                  checked={settings.enableBackup}
                  onCheckedChange={(checked) => handleSettingChange('enableBackup', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Database Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-50/50 to-green-50/50 border-blue-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Database className="h-5 w-5" />
              Database Status
            </CardTitle>
            <CardDescription>
              Current status of your data storage systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/60 border border-blue-200/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Database className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700">Supabase</h4>
                    <p className="text-sm text-muted-foreground">Summary storage</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-white/60 border border-green-200/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Database className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-700">MongoDB</h4>
                    <p className="text-sm text-muted-foreground">Full content storage</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex justify-center gap-4"
      >
        <Button
          variant="outline"
          onClick={resetSettings}
          className="border-gray-200 hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button
          onClick={saveSettings}
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </motion.div>
    </div>
  )
}