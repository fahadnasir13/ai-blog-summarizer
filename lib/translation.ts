// Enhanced Urdu translation with comprehensive dictionary and improved accuracy
interface TranslationResponse {
  translatedText: string
}

// Comprehensive English to Urdu dictionary with exact translations
const urduDictionary: Record<string, string> = {
  
  'artificial intelligence': 'مصنوعی ذہانت',
  
  'machine learning': 'مشین لرننگ',
  
  'deep learning': 'گہری تعلیم',
  
  'neural network': 'عصبی نیٹ ورک',
  
  'algorithm': 'الگورتھم',
  
  'technology': 'ٹیکنالوجی',
  
  'computer': 'کمپیوٹر',
  
  'internet': 'انٹرنیٹ',
  
  'software': 'سافٹ ویئر',
  
  'hardware': 'ہارڈ ویئر',
  
  'digital': 'ڈیجیٹل',
  
  'innovation': 'جدت',
  
  'development': 'ترقی',
  
  'future': 'مستقبل',
  
  'data': 'ڈیٹا',
  
  'system': 'نظام',
  
  'network': 'نیٹ ورک',
  
  'application': 'ایپلیکیشن',
  
  'programming': 'پروگرامنگ',
  
  'database': 'ڈیٹابیس',
  
  'website': 'ویب سائٹ',
  
  'platform': 'پلیٹ فارم',
  
  'device': 'آلہ',
  
  'smartphone': 'سمارٹ فون',
  
  'automation': 'خودکاری',
  
  'robotics': 'روبوٹکس',
  
  'blockchain': 'بلاک چین',
  
  'cryptocurrency': 'کرپٹو کرنسی',
  
  'cloud computing': 'کلاؤڈ کمپیوٹنگ',
  
  'cybersecurity': 'سائبر سیکیورٹی',
  
  'virtual reality': 'ورچوئل ریئلٹی',
  
  'augmented reality': 'اضافی حقیقت',
  
  'business': 'کاروبار',
  
  'company': 'کمپنی',
  
  'corporation': 'کارپوریشن',
  
  'organization': 'تنظیم',
  
  'enterprise': 'ادارہ',
  
  'market': 'بازار',
  
  'economy': 'معیشت',
  
  'economic': 'اقتصادی',
  
  'growth': 'نمو',
  
  'success': 'کامیابی',
  
  'strategy': 'حکمت عملی',
  
  'management': 'انتظام',
  
  'leadership': 'قیادت',
  
  'productivity': 'پیداوار',
  
  'investment': 'سرمایہ کاری',
  
  'profit': 'منافع',
  
  'revenue': 'آمدنی',
  
  'income': 'آمدن',
  
  'customer': 'گاہک',
  
  'client': 'کلائنٹ',
  
  'service': 'خدمات',
  
  'product': 'پروڈکٹ',
  
  'marketing': 'مارکیٹنگ',
  
  'sales': 'فروخت',
  
  'finance': 'مالیات',
  
  'financial': 'مالی',
  
  'budget': 'بجٹ',
  
  'cost': 'لاگت',
  
  'price': 'قیمت',
  
  'value': 'قدر',
  
  'brand': 'برانڈ',
  
  'competition': 'مقابلہ',
  
  'competitive': 'مسابقتی',
  
  'health': 'صحت',
  
  'healthy': 'صحت مند',
  
  'mental health': 'ذہنی صحت',
  
  'physical health': 'جسمانی صحت',
  
  'wellness': 'تندرستی',
  
  'medicine': 'دوا',
  
  'medical': 'طبی',
  
  'treatment': 'علاج',
  
  'therapy': 'تھراپی',
  
  'exercise': 'ورزش',
  
  'nutrition': 'غذائیت',
  
  'diet': 'خوراک',
  
  'fitness': 'تندرستی',
  
  'disease': 'بیماری',
  
  'illness': 'علالت',
  
  'hospital': 'ہسپتال',
  
  'doctor': 'ڈاکٹر',
  
  'physician': 'طبیب',
  
  'patient': 'مریض',
  
  'healthcare': 'صحت کی دیکھ بھال',
  
  'symptoms': 'علامات',
  
  'diagnosis': 'تشخیص',
  
  'prevention': 'روک تھام',
  
  'vaccine': 'ویکسین',
  
  'surgery': 'سرجری',
  
  'medication': 'دوائی',
  
  'prescription': 'نسخہ',
  
  'environment': 'ماحولیات',
  
  'environmental': 'ماحولیاتی',
  
  'climate change': 'موسمیاتی تبدیلی',
  
  'global warming': 'عالمی حدت',
  
  'sustainability': 'پائیداری',
  
  'sustainable': 'پائیدار',
  
  'renewable energy': 'قابل تجدید توانائی',
  
  'solar energy': 'شمسی توانائی',
  
  'wind energy': 'ہوائی توانائی',
  
  'pollution': 'آلودگی',
  
  'conservation': 'تحفظ',
  
  'ecosystem': 'ماحولیاتی نظام',
  
  'biodiversity': 'حیاتیاتی تنوع',
  
  'carbon': 'کاربن',
  
  'emissions': 'اخراج',
  
  'green': 'سبز',
  
  'nature': 'قدرت',
  
  'natural': 'قدرتی',
  
  'forest': 'جنگل',
  
  'water': 'پانی',
  
  'air': 'ہوا',
  
  'earth': 'زمین',
  
  'planet': 'سیارہ',
  
  'recycling': 'ری سائیکلنگ',
  
  'waste': 'فضلہ',
  
  'energy': 'توانائی',
  
  'resources': 'وسائل',
  
  'education': 'تعلیم',
  
  'educational': 'تعلیمی',
  
  'learning': 'سیکھنا',
  
  'teaching': 'تدریس',
  
  'school': 'اسکول',
  
  'university': 'یونیورسٹی',
  
  'college': 'کالج',
  
  'student': 'طالب علم',
  
  'teacher': 'استاد',
  
  'professor': 'پروفیسر',
  
  'academic': 'تعلیمی',
  
  'research': 'تحقیق',
  
  'study': 'مطالعہ',
  
  'knowledge': 'علم',
  
  'skill': 'مہارت',
  
  'training': 'تربیت',
  
  'book': 'کتاب',
  
  'library': 'کتب خانہ',
  
  'course': 'کورس',
  
  'degree': 'ڈگری',
  
  'examination': 'امتحان',
  
  'grade': 'درجہ',
  
  'curriculum': 'نصاب',
  
  'scholarship': 'وظیفہ',
  
  'lecture': 'لیکچر',
  
  'classroom': 'کلاس روم',
  
  'science': 'سائنس',
  
  'scientific': 'سائنسی',
  
  'discovery': 'دریافت',
  
  'experiment': 'تجربہ',
  
  'theory': 'نظریہ',
  
  'hypothesis': 'فرضیہ',
  
  'analysis': 'تجزیہ',
  
  'physics': 'طبیعیات',
  
  'chemistry': 'کیمسٹری',
  
  'biology': 'حیاتیات',
  
  'mathematics': 'ریاضی',
  
  'laboratory': 'لیبارٹری',
  
  'method': 'طریقہ',
  
  'result': 'نتیجہ',
  
  'conclusion': 'خلاصہ',
  
  'and': 'اور',
  
  'or': 'یا',
  
  'but': 'لیکن',
  
  'however': 'تاہم',
  
  'therefore': 'لہذا',
  
  'because': 'کیونکہ',
  
  'since': 'جب سے',
  
  'although': 'اگرچہ',
  
  'while': 'جبکہ',
  
  'with': 'کے ساتھ',
  
  'without': 'کے بغیر',
  
  'for': 'کے لیے',
  
  'in': 'میں',
  
  'on': 'پر',
  
  'at': 'پر',
  
  'to': 'کو',
  
  'from': 'سے',
  
  'by': 'کے ذریعے',
  
  'through': 'کے ذریعے',
  
  'during': 'کے دوران',
  
  'before': 'پہلے',
  
  'after': 'بعد میں',
  
  'above': 'اوپر',
  
  'below': 'نیچے',
  
  'over': 'اوپر',
  
  'under': 'نیچے',
  
  'between': 'کے درمیان',
  
  'among': 'کے درمیان',
  
  'is': 'ہے',
  
  'are': 'ہیں',
  
  'was': 'تھا',
  
  'were': 'تھے',
  
  'will': 'گا',
  
  'would': 'گا',
  
  'can': 'سکتا',
  
  'could': 'سکتا',
  
  'should': 'چاہیے',
  
  'must': 'ضروری',
  
  'have': 'ہے',
  
  'has': 'ہے',
  
  'had': 'تھا',
  
  'this': 'یہ',
  
  'that': 'وہ',
  
  'these': 'یہ',
  
  'those': 'وہ',
  
  'new': 'نیا',
  
  'old': 'پرانا',
  
  'good': 'اچھا',
  
  'better': 'بہتر',
  
  'best': 'بہترین',
  
  'bad': 'برا',
  
  'worse': 'بدتر',
  
  'worst': 'بدترین',
  
  'big': 'بڑا',
  
  'large': 'بڑا',
  
  'small': 'چھوٹا',
  
  'important': 'اہم',
  
  'significant': 'اہم',
  
  'major': 'بڑا',
  
  'minor': 'چھوٹا',
  
  'main': 'اصل',
  
  'primary': 'بنیادی',
  
  'secondary': 'ثانوی',
  
  'first': 'پہلا',
  
  'second': 'دوسرا',
  
  'third': 'تیسرا',
  
  'last': 'آخری',
  
  'final': 'حتمی',
  
  'next': 'اگلا',
  
  'previous': 'پچھلا',
  
  'current': 'موجودہ',
  
  'present': 'موجودہ',
  
  'past': 'ماضی',
  
  'today': 'آج',
  
  'tomorrow': 'کل',
  
  'yesterday': 'کل',
  
  'now': 'اب',
  
  'then': 'پھر',
  
  'here': 'یہاں',
  
  'there': 'وہاں',
  
  'where': 'کہاں',
  
  'when': 'کب',
  
  'why': 'کیوں',
  
  'how': 'کیسے',
  
  'what': 'کیا',
  
  'which': 'کون سا',
  
  'who': 'کون',
  
  'year': 'سال',
  
  'month': 'مہینہ',
  
  'week': 'ہفتہ',
  
  'day': 'دن',
  
  'hour': 'گھنٹہ',
  
  'minute': 'منٹ',
  
  'time': 'وقت',
  
  'world': 'دنیا',
  
  'country': 'ملک',
  
  'nation': 'قوم',
  
  'state': 'ریاست',
  
  'city': 'شہر',
  
  'town': 'قصبہ',
  
  'place': 'جگہ',
  
  'area': 'علاقہ',
  
  'region': 'خطہ',
  
  'people': 'لوگ',
  
  'person': 'شخص',
  
  'individual': 'فرد',
  
  'man': 'آدمی',
  
  'woman': 'عورت',
  
  'child': 'بچہ',
  
  'children': 'بچے',
  
  'family': 'خاندان',
  
  'society': 'معاشرہ',
  
  'community': 'کمیونٹی',
  
  'group': 'گروپ',
  
  'team': 'ٹیم',
  
  'work': 'کام',
  
  'job': 'نوکری',
  
  'career': 'کیریئر',
  
  'profession': 'پیشہ',
  
  'industry': 'صنعت',
  
  'sector': 'شعبہ',
  
  'field': 'شعبہ',
  
  'money': 'پیسہ',
  
  'currency': 'کرنسی',
  
  'dollar': 'ڈالر',
  
  'house': 'گھر',
  
  'home': 'گھر',
  
  'building': 'عمارت',
  
  'office': 'دفتر',
  
  'room': 'کمرہ',
  
  'food': 'کھانا',
  
  'meal': 'کھانا',
  
  'drink': 'مشروب',
  
  'life': 'زندگی',
  
  'living': 'زندگی',
  
  'death': 'موت',
  
  'birth': 'پیدائش',
  
  'love': 'محبت',
  
  'peace': 'امن',
  
  'war': 'جنگ',
  
  'conflict': 'تنازعہ',
  
  'problem': 'مسئلہ',
  
  'issue': 'مسئلہ',
  
  'solution': 'حل',
  
  'answer': 'جواب',
  
  'question': 'سوال',
  
  'government': 'حکومت',
  
  'politics': 'سیاست',
  
  'political': 'سیاسی',
  
  'law': 'قانون',
  
  'legal': 'قانونی',
  
  'right': 'حق',
  
  'rights': 'حقوق',
  
  'wrong': 'غلط',
  
  'correct': 'صحیح',
  
  'true': 'سچ',
  
  'truth': 'سچائی',
  
  'false': 'جھوٹ',
  
  'lie': 'جھوٹ',
  
  'yes': 'ہاں',
  
  'no': 'نہیں',
  
  'please': 'براہ کرم',
  
  'thank you': 'شکریہ',
  
  'thanks': 'شکریہ',
  
  'welcome': 'خوش آمدید',
  
  'hello': 'ہیلو',
  
  'hi': 'ہائی',
  
  'goodbye': 'الوداع',
  
  'bye': 'الوداع',
  
  'morning': 'صبح',
  
  'afternoon': 'دوپہر',
  
  'evening': 'شام',
  
  'night': 'رات',
  
  'information': 'معلومات',
  
  'news': 'خبریں',
  
  'report': 'رپورٹ',
  
  'article': 'مضمون',
  
  'story': 'کہانی',
  
  'page': 'صفحہ',
  
  'chapter': 'باب',
  
  'section': 'حصہ',
  
  'part': 'حصہ',
  
  'whole': 'پورا',
  
  'complete': 'مکمل',
  
  'full': 'بھرا',
  
  'empty': 'خالی',
  
  'half': 'آدھا',
  
  'quarter': 'چوتھائی',
  
  'review': 'جائزہ',
  
  'investigation': 'تحقیقات',
  
  'survey': 'سروے',
  
  'poll': 'رائے شماری',
  
  'outcome': 'نتیجہ',
  
  'effect': 'اثر',
  
  'impact': 'اثر',
  
  'influence': 'اثر',
  
  'change': 'تبدیلی',
  
  'improvement': 'بہتری',
  
  'progress': 'ترقی',
  
  'advancement': 'پیش قدمی',
  
  'increase': 'اضافہ',
  
  'decrease': 'کمی',
  
  'reduction': 'کمی',
  
  'rise': 'اضافہ',
  
  'fall': 'کمی',
  
  'high': 'اونچا',
  
  'low': 'نیچا',
  
  'up': 'اوپر',
  
  'down': 'نیچے',
  
  'more': 'زیادہ',
  
  'less': 'کم',
  
  'most': 'سب سے زیادہ',
  
  'least': 'سب سے کم',
  
  'many': 'بہت',
  
  'few': 'کم',
  
  'several': 'کئی',
  
  'some': 'کچھ',
  
  'all': 'تمام',
  
  'every': 'ہر',
  
  'each': 'ہر ایک',
  
  'both': 'دونوں',
  
  'either': 'یا تو',
  
  'neither': 'نہ ہی',
  
  'none': 'کوئی نہیں',
  
  'nothing': 'کچھ نہیں',
  
  'something': 'کچھ',
  
  'anything': 'کچھ بھی',
  
  'everything': 'سب کچھ',
  
  'everyone': 'ہر کوئی',
  
  'someone': 'کوئی',
  
  'anyone': 'کوئی بھی',
  
  'no one': 'کوئی نہیں',
  
  'nobody': 'کوئی نہیں',
  
  'somebody': 'کوئی',
  
  'anybody': 'کوئی بھی',
  
  'everybody': 'ہر کوئی',
  
  'according to': 'کے مطابق',
  
  'because of': 'کی وجہ سے',
  
  'due to': 'کی وجہ سے',
  
  'in order to': 'کے لیے',
  
  'so that': 'تاکہ',
  
  'as well as': 'کے ساتھ ساتھ',
  
  'such as': 'جیسے کہ',
  
  'for example': 'مثال کے طور پر',
  
  'for instance': 'مثال کے طور پر',
  
  'in fact': 'حقیقت میں',
  
  'actually': 'دراصل',
  
  'really': 'واقعی',
  
  'indeed': 'واقعی',
  
  'certainly': 'یقیناً',
  
  'definitely': 'یقیناً',
  
  'probably': 'شاید',
  
  'possibly': 'ممکن ہے',
  
  'maybe': 'شاید',
  
  'perhaps': 'شاید',
  
  'furthermore': 'مزید برآں',
  
  'moreover': 'اس کے علاوہ',
  
  'in addition': 'اضافے میں',
  
  'also': 'بھی',
  
  'too': 'بھی',
  
  'as well': 'بھی',
  
  'besides': 'اس کے علاوہ',
  
  'apart from': 'کے علاوہ',
  
  'except': 'سوائے',
  
  'unless': 'جب تک نہیں',
  
  'until': 'جب تک',
  
  'as long as': 'جب تک',
  
  'whenever': 'جب بھی',
  
  'wherever': 'جہاں بھی',
  
  'nevertheless': 'پھر بھی',
  
  'nonetheless': 'پھر بھی',
  
  'still': 'پھر بھی',
  
  'yet': 'پھر بھی',
  
  'on the other hand': 'دوسری طرف',
  
  'in contrast': 'اس کے برعکس',
  
  'instead': 'اس کی بجائے',
  
  'rather': 'بلکہ',
  
  'in conclusion': 'خلاصہ یہ ہے',
  
  'to conclude': 'خلاصہ کرنے کے لیے',
  
  'finally': 'آخر میں',
  
  'lastly': 'آخر میں',
  
  'in summary': 'خلاصہ میں',
  
  'to summarize': 'خلاصہ کرنے کے لیے',
  
  'as a result': 'نتیجے میں',
  
  'consequently': 'نتیجے میں',
  
  'thus': 'اس طرح',
  
  'hence': 'اس لیے',
  
  'so': 'اس لیے',
  
  'instead of': 'کی بجائے',
  
  'rather than': 'کی بجائے'

}

// Enhanced word-by-word translation with context awareness and exact matching
function translateWithDictionary(text: string): string {
  // Split text into sentences for better context
  const sentences = text.split(/[.!?]+/).filter(s => s.trim())
  
  const translatedSentences = sentences.map(sentence => {
    let translatedSentence = sentence.toLowerCase().trim()
    
    // Replace phrases first (longer matches) - sorted by length descending for exact matching
    const phrases = Object.keys(urduDictionary)
      .filter(key => key.includes(' '))
      .sort((a, b) => b.length - a.length)
    
    phrases.forEach(phrase => {
      const regex = new RegExp(`\\b${escapeRegExp(phrase)}\\b`, 'gi')
      if (urduDictionary[phrase]) {
        translatedSentence = translatedSentence.replace(regex, urduDictionary[phrase])
      }
    })
    
    // Then replace individual words with exact matching
    const words = Object.keys(urduDictionary)
      .filter(key => !key.includes(' '))
      .sort((a, b) => b.length - a.length)
    
    words.forEach(word => {
      const regex = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'gi')
      if (urduDictionary[word]) {
        translatedSentence = translatedSentence.replace(regex, urduDictionary[word])
      }
    })
    
    // Clean up extra spaces and fix common issues
    translatedSentence = translatedSentence
      .replace(/\s+/g, ' ')
      .replace(/\s+([۔،؍])/g, '$1')
      .trim()
    
    return translatedSentence
  })
  
  return translatedSentences.join('۔ ') + '۔'
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Enhanced translation function with multiple fallback strategies
export async function translateToUrdu(text: string): Promise<string> {
  // First try our comprehensive dictionary translation
  const dictionaryTranslation = translateWithDictionary(text)
  
  // Calculate coverage ratio
  const originalWords = text.split(/\s+/).length
  const translatedWords = dictionaryTranslation.split(/\s+/).filter(word => 
    /[\u0600-\u06FF]/.test(word) // Contains Arabic/Urdu characters
  ).length
  
  const coverageRatio = translatedWords / originalWords
  
  // If dictionary translation has good coverage (more than 40% translated), use it
  if (coverageRatio > 0.4) {
    return dictionaryTranslation
  }
  
  // Try LibreTranslate API as fallback with error handling
  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: 'ur',
        format: 'text'
      })
    })

    if (response.ok) {
      const data = await response.json()
      if (data.translatedText && data.translatedText.trim()) {
        // Combine API translation with dictionary improvements
        return improveTranslation(data.translatedText, text)
      }
    }
  } catch (error) {
    console.warn('LibreTranslate API failed, using enhanced dictionary translation:', error)
  }

  // Enhanced fallback - use dictionary translation with improvements
  return enhanceDictionaryTranslation(dictionaryTranslation, text)
}

// Improve API translation with dictionary corrections
function improveTranslation(apiTranslation: string, originalText: string): string {
  let improvedTranslation = apiTranslation
  
  // Fix common technical terms that APIs often miss or mistranslate
  const technicalTerms = {
    'artificial intelligence': 'مصنوعی ذہانت',
    'machine learning': 'مشین لرننگ',
    'deep learning': 'گہری تعلیم',
    'neural network': 'عصبی نیٹ ورک',
    'climate change': 'موسمیاتی تبدیلی',
    'global warming': 'عالمی حدت',
    'renewable energy': 'قابل تجدید توانائی',
    'solar energy': 'شمسی توانائی',
    'mental health': 'ذہنی صحت',
    'digital transformation': 'ڈیجیٹل تبدیلی',
    'cloud computing': 'کلاؤڈ کمپیوٹنگ',
    'cybersecurity': 'سائبر سیکیورٹی',
    'blockchain': 'بلاک چین',
    'cryptocurrency': 'کرپٹو کرنسی'
  }
  
  Object.entries(technicalTerms).forEach(([english, urdu]) => {
    if (originalText.toLowerCase().includes(english)) {
      const regex = new RegExp(english, 'gi')
      improvedTranslation = improvedTranslation.replace(regex, urdu)
    }
  })
  
  return improvedTranslation
}

// Enhance dictionary translation when API is not available
function enhanceDictionaryTranslation(dictionaryTranslation: string, originalText: string): string {
  // Add common sentence connectors and improve flow
  let enhanced = dictionaryTranslation
  
  // Fix common patterns
  enhanced = enhanced
    .replace(/\s+/g, ' ')
    .replace(/۔\s*۔/g, '۔')
    .trim()
  
  // If translation is too short or mostly English, provide a basic structure
  if (enhanced.length < originalText.length * 0.3) {
    const words = originalText.split(/\s+/)
    const translatedWords = words.map(word => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '')
      return urduDictionary[cleanWord] || word
    })
    enhanced = translatedWords.join(' ')
  }
  
  return enhanced
}

export function speakUrdu(text: string) {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    // Cancel any ongoing speech
    speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ur-PK'
    utterance.rate = 0.7 // Slower for better Urdu pronunciation
    utterance.pitch = 1
    utterance.volume = 1
    
    // Try to find an Urdu voice
    const voices = speechSynthesis.getVoices()
    const urduVoice = voices.find(voice => 
      voice.lang.includes('ur') || 
      voice.name.toLowerCase().includes('urdu') ||
      voice.lang.includes('hi') || // Hindi as fallback for similar phonetics
      voice.name.toLowerCase().includes('hindi')
    )
    
    if (urduVoice) {
      utterance.voice = urduVoice
      console.log('Using voice:', urduVoice.name, urduVoice.lang)
    } else {
      console.log('No Urdu voice found, using default')
    }
    
    // Add error handling
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error)
    }
    
    utterance.onend = () => {
      console.log('Speech synthesis completed')
    }
    
    speechSynthesis.speak(utterance)
  } else {
    console.error('Speech synthesis not supported')
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    speechSynthesis.cancel()
  }
}

// Load voices when available
if (typeof window !== 'undefined' && window.speechSynthesis) {
  speechSynthesis.onvoiceschanged = () => {
    const voices = speechSynthesis.getVoices()
    console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`))
  }
}

// Initialize voices loading on client side only
if (typeof window !== 'undefined') {
  // Trigger voices loading
  if (window.speechSynthesis) {
    speechSynthesis.getVoices()
  }
}
export {}
