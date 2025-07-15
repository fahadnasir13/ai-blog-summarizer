# 🚀 AI Blog Summarizer - Complete Setup Guide

A modern, AI-powered blog summarization application that transforms any blog URL into intelligent summaries with free Urdu translation. Built with Next.js 15, Supabase, and LibreTranslate API.

![AI Blog Summarizer](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop)

## ✨ Features

- 🤖 **AI-Powered Summarization** - Intelligent content analysis and extraction
- 🌐 **Free Urdu Translation** - Powered by LibreTranslate API
- 💾 **Supabase Database** - Real-time data storage and retrieval
- 🎨 **Modern UI/UX** - Dark theme with glassmorphism effects
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔊 **Text-to-Speech** - Urdu voice synthesis
- 📊 **Analytics Dashboard** - Usage statistics and insights
- 🔄 **Batch Processing** - Process multiple URLs simultaneously
- 📤 **Export Functionality** - Export data in multiple formats

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: ShadCN UI, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Translation**: LibreTranslate API
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before setting up the project, ensure you have:

- **Node.js 18+** installed on your system
- **npm** or **yarn** package manager
- **Git** (for version control)
- **Supabase account** (free tier available)
- **Code editor** (VS Code recommended)

## 🚀 Local Setup Instructions

### Step 1: Download and Extract Project

1. **Download the ZIP file** of the project
2. **Extract** the ZIP file to your desired location
3. **Open terminal/command prompt** in the extracted folder

### Step 2: Install Dependencies

```bash
# Install all required dependencies
npm install

# Or if you prefer yarn
yarn install
```

### Step 3: Environment Configuration

1. **Create environment file**:
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   ```

2. **Update `.env.local`** with the provided credentials:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://qhixrgnklfjhazzkovbq.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoaXhyZ25rbGZqaGF6emtvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1OTE5NzUsImV4cCI6MjA2ODE2Nzk3NX0.3hBUrJqg7uUzWz1ZT7Y7ftF4QVGe71V2Xx1bg6tg1FU

   # Optional: App URL (for production)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### Step 4: Database Setup (Supabase)

The database is already configured with the provided credentials. The application will automatically create sample data if the database is empty.

**Database Schema** (already set up):
- `blog_summaries` table with all required fields
- Row Level Security (RLS) enabled
- Proper indexes for performance
- Sample data for demonstration

### Step 5: Run the Application

```bash
# Start the development server
npm run dev

# Or with yarn
yarn dev
```

The application will be available at: **http://localhost:3000**

### Step 6: Test the Application

1. **Open your browser** and navigate to `http://localhost:3000`
2. **Test URL summarization** with these sample URLs:
   - `https://techcrunch.com/2024/01/15/ai-breakthrough/`
   - `https://medium.com/@author/article-title`
   - `https://dev.to/username/post-title`
3. **Explore all features**:
   - Dashboard (main summarization)
   - History (view all summaries)
   - Analytics (usage statistics)
   - Batch processing (multiple URLs)
   - Translation tools
   - Export functionality
   - Settings and preferences

## 📁 Project Structure

```
ai-blog-summarizer/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── scrape/              # Blog scraping endpoint
│   │   └── summaries/           # CRUD operations
│   ├── analytics/               # Analytics dashboard
│   ├── batch/                   # Batch processing
│   ├── export/                  # Data export
│   ├── history/                 # Summary history
│   ├── settings/                # App settings
│   ├── translation/             # Translation tools
│   ├── about/                   # About page
│   ├── page.tsx                 # Main dashboard
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                      # ShadCN UI components
│   ├── blog-scraper.tsx         # Main scraping interface
│   ├── recent-summaries.tsx     # Summary browser
│   ├── navbar.tsx               # Navigation bar
│   ├── sidebar.tsx              # Sidebar navigation
│   └── layout-wrapper.tsx       # Layout wrapper
├── lib/                         # Utility libraries
│   ├── supabase.ts             # Supabase client
│   ├── blog-scraper.ts         # Content extraction
│   ├── translation.ts          # Translation logic
│   └── utils.ts                # Helper functions
├── .env.local                   # Environment variables
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind configuration
└── README.md                    # This file
```

## 🎯 Key Features Explained

### 1. **Blog Summarization**
- Enter any blog URL in the main dashboard
- AI-powered content extraction and analysis
- Intelligent summarization with key points
- Automatic categorization and sentiment analysis

### 2. **Urdu Translation**
- Free translation using LibreTranslate API
- Fallback dictionary for offline translation
- Text-to-speech for Urdu content
- Retranslation functionality

### 3. **Data Management**
- Supabase for real-time data storage
- Advanced search and filtering
- Export data in JSON, CSV, XML formats
- Batch processing for multiple URLs

### 4. **Analytics & Insights**
- Usage statistics and trends
- Category distribution analysis
- Sentiment analysis overview
- Performance metrics

## 🔧 Customization Options

### Modify UI Theme
Edit `tailwind.config.ts` and `app/globals.css` to customize colors and styling.

### Add New Languages
Update `lib/translation.ts` to add support for additional languages.

### Extend Analytics
Modify `app/analytics/page.tsx` to add new metrics and visualizations.

### Custom Scraping Rules
Update `lib/blog-scraper.ts` to handle specific website structures.

## 🐛 Troubleshooting

### Common Issues and Solutions

**1. Dependencies Installation Error**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**2. Environment Variables Not Loading**
- Ensure `.env.local` file exists in the root directory
- Restart the development server after changes
- Check for typos in variable names

**3. Supabase Connection Issues**
- Verify the Supabase URL and API key
- Check if the database table exists
- Ensure RLS policies are properly configured

**4. Translation Not Working**
- LibreTranslate API might be temporarily down
- Check internet connection
- Try the retranslate button

**5. Blog Scraping Fails**
- Some websites block automated requests
- Try different blog URLs
- Check if the URL is accessible in browser

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🚀 Deployment Guide

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/ai-blog-summarizer.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in project settings
   - Deploy!

3. **Environment Variables for Production**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://qhixrgnklfjhazzkovbq.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoaXhyZ25rbGZqaGF6emtvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1OTE5NzUsImV4cCI6MjA2ODE2Nzk3NX0.3hBUrJqg7uUzWz1ZT7Y7ftF4QVGe71V2Xx1bg6tg1FU
   NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
   ```

## 📊 Performance Optimization

- **Caching**: Summaries are cached to avoid re-processing
- **Lazy Loading**: Components load on demand
- **Image Optimization**: Next.js automatic optimization
- **Database Indexing**: Optimized queries with proper indexes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **LibreTranslate** - Free and open-source translation API
- **Supabase** - Backend-as-a-service platform
- **Vercel** - Deployment and hosting platform
- **ShadCN UI** - Beautiful component library
- **Framer Motion** - Animation library
- **Next.js Team** - Amazing React framework

## 📞 Support

If you encounter any issues:

1. Check this README first
2. Look at the troubleshooting section
3. Check browser console for errors
4. Create an issue on GitHub
5. Contact: [GitHub Profile](https://github.com/fahadnasir13)

---

**🚀 Ready to transform blogs into intelligent summaries!**

*Built with passion using Next.js 15, Supabase, and LibreTranslate API*