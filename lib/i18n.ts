export type Language = 'en' | 'ar' | 'fa';

const translations: Record<string, Record<Language, string>> = {
  'site.title': {
    en: 'Welcome',
    ar: 'مرحبا',
    fa: 'خوش آمدید',
  },
  'site.subtitle': {
    en: 'Choose a tool to get started',
    ar: 'اختر أداة للبدء',
    fa: 'یک ابزار را برای شروع انتخاب کنید',
  },
  'mu.title': {
    en: 'Muslim Utilities',
    ar: 'أدوات المسلم',
    fa: 'ابزارهای مسلمان',
  },
  'mu.desc': {
    en: 'Prayer times, Qibla finder, Zakat calculator, Hijri converter, Dhikr counter, and more — all in one place.',
    ar: 'مواقيت الصلاة، محدد القبلة، حاسبة الزكاة، محول التاريخ الهجري، عداد الأذكار، والمزيد — الكل في مكان واحد.',
    fa: 'اوقات نماز، قبله‌نما، محاسبه زکات، تبدیل تاریخ هجری، شمارنده ذکر، و بیشتر — همه در یک جا.',
  },
  'qsd.title': {
    en: 'Quran SM Download',
    ar: 'تحميل القرآن للسوشال ميديا',
    fa: 'دانلود قرآن برای شبکه‌های اجتماعی',
  },
  'qsd.desc': {
    en: 'Create beautiful Quran recitation videos and images for social media with custom backgrounds, reciters, and formats.',
    ar: 'أنشئ فيديوهات وصور تلاوة قرآنية جميلة لوسائل التواصل الاجتماعي مع خلفيات وقراء وتنسيقات مخصصة.',
    fa: 'ویدیوها و تصاویر زیبای تلاوت قرآن برای شبکه‌های اجتماعی با پس‌زمینه‌ها، قاریان و فرمت‌های دلخواه بسازید.',
  },
  'footer.built': {
    en: 'Built by',
    ar: 'بناه',
    fa: 'ساخته شده توسط',
  },
  'theme.light': {
    en: 'Light',
    ar: 'فاتح',
    fa: 'روشن',
  },
  'theme.dark': {
    en: 'Dark',
    ar: 'داکن',
    fa: 'تاریک',
  },
  'theme.emerald': {
    en: 'Emerald',
    ar: 'زمردي',
    fa: 'زمردی',
  },
  'visit': {
    en: 'Open',
    ar: 'فتح',
    fa: 'باز کردن',
  },
};

export function t(key: string, lang: Language): string {
  return translations[key]?.[lang] || translations[key]?.en || key;
}
