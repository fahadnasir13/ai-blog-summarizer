'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { 
  Download, 
  FileText, 
  Database, 
  Filter,
  CheckCircle,
  Calendar,
  Tag,
  Globe,
  BarChart3
} from 'lucide-react'
import { BlogSummary } from '@/lib/supabase'

export default function ExportPage() {
  const [summaries, setSummaries] = useState<BlogSummary[]>([])
  const [selectedSummaries, setSelectedSummaries] = useState<string[]>([])
  const [exportFormat, setExportFormat] = useState('json')
  const [exportFields, setExportFields] = useState({
    title: true,
    url: true,
    english_summary: true,
    urdu_summary: true,
    tags: true,
    category: true,
    sentiment: true,
    word_count: true,
    reading_time: true,
    author: false,
    publish_date: false,
    created_at: true
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchSummaries()
  }, [])

  const fetchSummaries = async () => {
    try {
      const response = await fetch('/api/summaries')
      const result = await response.json()
      if (result.success) {
        setSummaries(result.data)
        setSelectedSummaries(result.data.map((s: BlogSummary) => s.id))
      }
    } catch (error) {
      toast({
        title: "Failed to load summaries",
        description: "Please try again later",
        variant: "destructive"
      })
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSummaries(summaries.map(s => s.id))
    } else {
      setSelectedSummaries([])
    }
  }

  const handleSelectSummary = (summaryId: string, checked: boolean) => {
    if (checked) {
      setSelectedSummaries(prev => [...prev, summaryId])
    } else {
      setSelectedSummaries(prev => prev.filter(id => id !== summaryId))
    }
  }

  const handleFieldToggle = (field: keyof typeof exportFields) => {
    setExportFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const generateExportData = () => {
    const selectedData = summaries
      .filter(summary => selectedSummaries.includes(summary.id))
      .map(summary => {
        const exportItem: any = {}
        Object.entries(exportFields).forEach(([field, include]) => {
          if (include && field in summary) {
            exportItem[field] = (summary as any)[field]
          }
        })
        return exportItem
      })

    return selectedData
  }

  const exportAsJSON = () => {
    const data = generateExportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    downloadFile(blob, 'blog_summaries.json')
  }

  const exportAsCSV = () => {
    const data = generateExportData()
    if (data.length === 0) return

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header]
          if (Array.isArray(value)) {
            return `"${value.join('; ')}"`
          }
          return `"${String(value).replace(/"/g, '""')}"`
        }).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    downloadFile(blob, 'blog_summaries.csv')
  }

  const exportAsXML = () => {
    const data = generateExportData()
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<summaries>
${data.map(item => `  <summary>
${Object.entries(item).map(([key, value]) => {
  if (Array.isArray(value)) {
    return `    <${key}>${value.map(v => `<item>${v}</item>`).join('')}</${key}>`
  }
  return `    <${key}>${String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</${key}>`
}).join('\n')}
  </summary>`).join('\n')}
</summaries>`

    const blob = new Blob([xmlContent], { type: 'application/xml' })
    downloadFile(blob, 'blog_summaries.xml')
  }

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Export Complete! 📥",
      description: `${filename} has been downloaded`,
    })
  }

  const handleExport = () => {
    if (selectedSummaries.length === 0) {
      toast({
        title: "No Data Selected",
        description: "Please select at least one summary to export",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      switch (exportFormat) {
        case 'json':
          exportAsJSON()
          break
        case 'csv':
          exportAsCSV()
          break
        case 'xml':
          exportAsXML()
          break
      }
      setIsLoading(false)
    }, 1000)
  }

  const selectedCount = selectedSummaries.length
  const totalCount = summaries.length

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
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <Download className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Export Data
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Export your blog summaries in various formats with customizable field selection
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Badge variant="secondary" className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            Multiple Formats
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Filter className="h-3 w-3" />
            Custom Fields
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Database className="h-3 w-3" />
            {totalCount} Summaries
          </Badge>
        </div>
      </motion.div>

      {/* Export Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Format and Fields Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Export Format */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                Export Format
              </CardTitle>
              <CardDescription>
                Choose the format for your exported data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="border-orange-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON - JavaScript Object Notation</SelectItem>
                  <SelectItem value="csv">CSV - Comma Separated Values</SelectItem>
                  <SelectItem value="xml">XML - Extensible Markup Language</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Field Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-orange-600" />
                Export Fields
              </CardTitle>
              <CardDescription>
                Select which fields to include in the export
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(exportFields).map(([field, checked]) => (
                  <div key={field} className="flex items-center space-x-2">
                    <Checkbox
                      id={field}
                      checked={checked}
                      onCheckedChange={() => handleFieldToggle(field as keyof typeof exportFields)}
                    />
                    <label htmlFor={field} className="text-sm font-medium capitalize cursor-pointer">
                      {field.replace(/_/g, ' ')}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExportFields(Object.fromEntries(
                    Object.keys(exportFields).map(key => [key, true])
                  ) as typeof exportFields)}
                  className="border-orange-200 hover:bg-orange-50"
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExportFields(Object.fromEntries(
                    Object.keys(exportFields).map(key => [key, false])
                  ) as typeof exportFields)}
                  className="border-orange-200 hover:bg-orange-50"
                >
                  Select None
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary Selection */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-orange-600" />
                  Select Summaries
                </CardTitle>
                <Badge variant="secondary">
                  {selectedCount} / {totalCount} selected
                </Badge>
              </div>
              <CardDescription>
                Choose which summaries to include in the export
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b">
                <Checkbox
                  id="select-all"
                  checked={selectedCount === totalCount}
                  onCheckedChange={handleSelectAll}
                />
                <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                  Select All Summaries
                </label>
              </div>
              
              <div className="max-h-96 overflow-y-auto space-y-2">
                {summaries.map((summary) => (
                  <div key={summary.id} className="flex items-start space-x-2 p-2 rounded-lg hover:bg-muted/50">
                    <Checkbox
                      id={summary.id}
                      checked={selectedSummaries.includes(summary.id)}
                      onCheckedChange={(checked) => handleSelectSummary(summary.id, checked as boolean)}
                    />
                    <div className="flex-1 min-w-0">
                      <label htmlFor={summary.id} className="text-sm font-medium line-clamp-2 cursor-pointer">
                        {summary.title}
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {summary.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(summary.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Export Summary and Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-orange-50/50 to-red-50/50 border-orange-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <BarChart3 className="h-5 w-5" />
              Export Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-orange-600">{selectedCount}</p>
                <p className="text-sm text-muted-foreground">Summaries</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-orange-600">
                  {Object.values(exportFields).filter(Boolean).length}
                </p>
                <p className="text-sm text-muted-foreground">Fields</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-orange-600 uppercase">{exportFormat}</p>
                <p className="text-sm text-muted-foreground">Format</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-orange-600">
                  {summaries
                    .filter(s => selectedSummaries.includes(s.id))
                    .reduce((total, s) => total + s.word_count, 0)
                    .toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Words</p>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleExport}
                disabled={isLoading || selectedCount === 0}
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-8"
              >
                {isLoading ? (
                  <>
                    <Download className="h-4 w-4 mr-2 animate-bounce" />
                    Preparing Export...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export {selectedCount} Summaries
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Export Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Export Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-green-700">JSON Format</h4>
                <p className="text-sm text-muted-foreground">
                  Best for developers and applications. Preserves data types and structure.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-blue-700">CSV Format</h4>
                <p className="text-sm text-muted-foreground">
                  Perfect for spreadsheets like Excel or Google Sheets. Easy to analyze.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-purple-700">XML Format</h4>
                <p className="text-sm text-muted-foreground">
                  Structured format for data exchange and integration with other systems.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}