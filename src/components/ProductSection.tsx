/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Search, SlidersHorizontal, Info, Award, Download, ArrowRight, X, Sparkles, GitCompare, Check, Plus, AlertCircle } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import { motion } from 'motion/react';

interface ProductSectionProps {
  products: Product[];
  categories: { id: string; name: string; slug: string }[];
  onQuoteClick: (productRequirement?: string) => void;
  searchQuery: string;
}

const translateCategoryName = (name: string, lang: string) => {
  if (lang !== 'ar') return name;
  const mapping: Record<string, string> = {
    "Restaurant Crockeries & Tableware": "أدوات وفخاريات مائدة المطاعم",
    "Kitchenware & Premium Cutleries": "أدوات المطبخ والسكاكين الفاخرة",
    "Dining Tablecloths & Linens": "مفارش ومناشف طاولات الطعام",
    "Premium Indian Granites": "الجرانيت الهندي الفاخر",
    "Indian Marbles": "الرخام الهندي"
  };
  return mapping[name] || name;
};

const translateProduct = (product: Product, lang: string): Product => {
  if (lang !== 'ar') return product;
  
  let name = product.name;
  let description = product.descriptionAr || product.description;
  let features = product.features;
  let specifications = product.specifications;
  let moq = product.moq;

  if (product.id === "p1") {
    name = "أوعية تقديم بورسلين فاخرة";
    description = "أوعية تقديم من البورسلين المقوى عالي الألومينا، مصممة خصيصاً للفنادق والمطاعم الفاخرة والاستخدام المكثف. مقاومة للتشقق والحرارة.";
    features = [
      "حواف مقواة مقاومة للكسر والتشقق",
      "آمنة للاستخدام في غسالة الأطباق والميكروويف",
      "طلاء خالي من الرصاص والكادميوم",
      "تصميم قابل للتكديس وموفر للمساحة"
    ];
    specifications = {
      "المادة": "بورسلين / طين عالي الألومينا",
      "المقاسات المتوفرة": "6 بوصة، 8 بوصة، 10 بوصة، 12 بوصة",
      "تحمل الحرارة": "آمن من الفرن إلى الطاولة",
      "خيارات الألوان": "أبيض فائق / عاجي دافئ"
    };
    moq = "1,500 وحدة";
  } else if (product.id === "p2") {
    name = "فخاريات وأطباق سيراميك لتناول الطعام الفاخر";
    description = "أدوات مائدة وأطباق تقديم احترافية مصممة خصيصاً للفنادق الفاخرة وسلاسل المطاعم. تتميز بحماية عالية من الخدوش وتصميم كوبيه عصري مهيب.";
    features = [
      "مختبرة لأكثر من 5,000 دورة غسيل تجاري",
      "مقاومة للبقع ومحمية بطبقة لامعة",
      "إمكانية طباعة شعار علامتك التجارية تحت الطلاء",
      "حواف مزخرفة راقية متوفرة"
    ];
    specifications = {
      "الأنواع المتوفرة": "أطباق عشاء، أطباق جانبية، أوعية حساء",
      "الطلاء": "طلاء مرآة واقي ولامع",
      "سلامة الرصاص": "مطابق لمعايير FDA وCalifornia Prop 65",
      "الحد الأدنى للطلب": "500 قطعة"
    };
    moq = "2,000 قطعة";
  } else if (product.id === "p3") {
    name = "مجموعة سكاكين وملاعق احترافية من الفولاذ المقاوم للصدأ";
    description = "مجموعة أدوات مائدة رائعة من الفولاذ المقاوم للصدأ 18/10 تشمل الشوك والسكاكين والملاعق وملاعق الشاي. مصقولة وموزونة بدقة لتجربة تناول طعام راقية ومريحة.";
    features = [
      "فولاذ مقاوم للصدأ 18/10 بدرجة جراحية",
      "مقاومة عالية للتآكل والصدأ",
      "وزن ممتاز وشعور متوازن",
      "خيارات طلاء ذهب PVD فاخر متوفرة"
    ];
    specifications = {
      "التركيب": "فولاذ مقاوم للصدأ كروم-نيكل 18/10",
      "الطلاء": "تلميع مرآة فائق (درجة أ)",
      "التوافق مع غسالة الأطباق": "آمنة لغسالة الأطباق بنسبة 100٪",
      "التعبئة": "صندوق خشبي مخصص للشركات أو كرتون رئيسي"
    };
    moq = "5,000 مجموعة";
  } else if (product.id === "p4") {
    name = "أدوات ومستلزمات مطابخ تجارية عالية الجودة";
    description = "أواني ومقالي وأدوات تحضير طعام للمطابخ الصناعية الفاخرة. مصنوعة من الفولاذ المقاوم للصدأ ثلاثي الطبقات لتوزيع متساوي للحرارة في البيئات التجارية المكثفة.";
    features = [
      "هيكل متين ثلاثي الطبقات",
      "مقابض مفرغة ومثبتة تظل باردة",
      "متوافق مع مواقد الحث والغاز والكهرباء",
      "حواف ملفوفة للصب بدون تنقيط"
    ];
    specifications = {
      "المواد الأساسية": "ستانلس ستيل 304 (داخلي)، ألومنيوم (قلب)، 430 (خارجي)",
      "سمك الهيكل": "2.5 مم - 3.0 مم",
      "الشهادات": "حاصل على شهادة NSF التجارية",
      "المقاومة": "مقاوم للاعوجاج تحت الحرارة الشديدة"
    };
    moq = "200 قطعة لكل صنف";
  } else if (product.id === "p5") {
    name = "مفارش طاولات قطنية أنيقة جاكار";
    description = "بياضات ومفارش مائدة فاخرة من القطن 100% بنقوش جاكار منسوجة. مخصصة للفنادق وصالات الحفلات، معالجة لتكون مقاومة للبقع وسهلة الكي.";
    features = [
      "قطن هندي ممشط طويل التيلة 100٪",
      "مقاومة طبيعية للتجاعيد والبقع",
      "حواف عريضة مخيطة بدقة لمظهر راقي",
      "ألوان ثابتة لا تبهت مع الغسيل المتكرر"
    ];
    specifications = {
      "نوع النسيج": "جاكار دمشقي منسوج",
      "الوزن": "220 جرام لكل متر مربع (ثقيل للفنادق)",
      "المقاسات": "مستديرة، مستطيلة، مربعة بأحجام مخصصة",
      "الألوان المتوفرة": "أبيض ناصع، كريمي عاجي، رمادي، زيتي، كحلي"
    };
    moq = "500 قطعة";
  } else if (product.id === "p6") {
    name = "مفارش مائدة قطنية كلاسيكية كاروهات";
    description = "عداءات ومفارش طاولة كلاسيكية مخططة وبنقوش كاروهات ملونة. منسوجة يدوياً من القطن الطبيعي بنسبة 100% لتضيف لمسة دافئة وجميلة على طاولات المقاهي والمطاعم.";
    features = [
      "قطن هندي أصيل منسوج يدوياً",
      "امتصاص فائق للرطوبة وسهولة التنظيف",
      "مثالي للمطاعم ذات الطراز الريفي والمنزلي",
      "أصباغ صديقة للبيئة وخالية من الآزو"
    ];
    specifications = {
      "الخيوط": "غزل قطن مصبوغ شديد التحمل",
      "العرض القياسي": "14 بوصة (35 سم) بطول مخصص",
      "مقاومة الانكماش": "معالجة مسبقاً ضد الانكماش",
      "الوزن": "180 جرام لكل متر مربع"
    };
    moq = "1,000 قطعة";
  } else if (product.id === "p7") {
    name = "ألواح جرانيت إمبراطوري أحمر ياقوتي";
    description = "جرانيت أحمر ياقوتي فاخر مستخرج من أفضل المحاجر الهندية. يتميز بلون أحمر غامق مع حبيبات زرقاء ورمادية خفيفة، مثالي لواجهات المباني والأسطح والأرضيات الفاخرة.";
    features = [
      "أحد أقوى أنواع الجرانيت الطبيعي في العالم",
      "مقاوم للخدش والحرارة والجليد بنسبة 100٪",
      "تشطيب مصقول بدرجة لمعان مرآة تزيد عن 95",
      "ألوان متناسقة وموحدة للمشاريع الكبيرة"
    ];
    specifications = {
      "الاسم التجاري": "أحمر ياقوتي / إمبراطوري أحمر هندي",
      "السمك المتوفر": "20 مم، 30 مم، 40 مم",
      "التشطيبات المتاحة": "مصقول، ملتهب، شحذ، جلدي",
      "امتصاص الماء": "أقل من 0.15٪"
    };
    moq = "1 حاوية كاملة (FCL)";
  } else if (product.id === "p8") {
    name = "كتل وألواح جرانيت بلاك جالاكسي الممتاز";
    description = "جرانيت أسود داكن شهير عالمياً مرصع بنقاط ذهبية وفضية تلمع كالنجوم. يضفي لمسة ملكية وجمالاً ساحراً على أرضيات القصور وجدران الفنادق والكونترتوب.";
    features = [
      "خلفية سوداء داكنة مع برونزات برونزية لامعة",
      "كثافة عالية وامتصاص منعدم للسوائل",
      "مقاوم للبقع والمواد الكيميائية المنزلية",
      "مستخرج ومجهز بأحدث الآلات الإيطالية"
    ];
    specifications = {
      "الاسم الفني": "بلاك جالاكسي (مجرة سوداء)",
      "أبعاد الألواح": "240 سم فما فوق × 120 سم فما فوق",
      "نوع الحبيبات": "متوسطة إلى كبيرة مع بلورات برونزية",
      "بلد المنشأ": "الهند (المحاجر الجنوبية)"
    };
    moq = "1 حاوية كاملة (FCL)";
  } else if (product.id === "p9") {
    name = "رخام مكرانا الهندي الأبيض النقي";
    description = "رخام مكرانا التاريخي الأبيض النقي ذو الهيكل البلوري المميز الذي اشتهر باستخدامه في بناء تاج محل. يتميز بالمتانة الأبدية والجمال الكلاسيكي الذي يزداد بريقاً مع الوقت.";
    features = [
      "نسبة كربونات كالسيوم فائقة تتجاوز 98٪",
      "صلابة عالية جداً مقارنة بالرخام الإيطالي",
      "لا يتغير لونه أو يصفر مع مرور الزمن",
      "مثالي للأرضيات الفاخرة، المعابد، والتماثيل الفنية"
    ];
    specifications = {
      "الخامة": "رخام مكرانا طبيعي 100٪",
      "اللون": "أبيض حليبي ناصع مع عروق رمادية خفيفة",
      "معدل المتانة": "عمر افتراضي غير محدود",
      "امتصاص الرطوبة": "أقل من 0.1٪"
    };
    moq = "1 حاوية كاملة (FCL)";
  }

  return {
    ...product,
    name,
    category: translateCategoryName(product.category, lang),
    description,
    features,
    specifications,
    moq
  };
};

export default function ProductSection({
  products,
  categories,
  onQuoteClick,
  searchQuery,
}: ProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);
  const [compareWarning, setCompareWarning] = useState<string | null>(null);

  const handleToggleCompare = (productId: string) => {
    setCompareWarning(null);
    setComparedIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 3) {
        setCompareWarning(lang === 'ar' ? 'تنبيه: يمكنك مقارنة ما يصل إلى 3 منتجات فقط.' : 'Limit reached: You can compare up to 3 products side-by-side.');
        return prev;
      }
      return [...prev, productId];
    });
  };
  const { lang, t, dir } = useLanguage();

  // Synchronize product query parameter on load/navigation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    if (productId && products.length > 0 && !selectedProduct) {
      const foundProduct = products.find(p => p.id === productId);
      if (foundProduct) {
        setSelectedProduct(foundProduct);
      }
    }
  }, [products]);

  // Sync product selection back to URL query params
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedProduct) {
      url.searchParams.set('product', selectedProduct.id);
    } else {
      url.searchParams.delete('product');
    }
    if (url.searchParams.get('product') !== new URLSearchParams(window.location.search).get('product')) {
      window.history.pushState({}, '', url.toString());
    }
  }, [selectedProduct]);

  // Real-time Currency Conversion Setup
  const [selectedCurrency, setSelectedCurrency] = useState<'INR' | 'USD' | 'EUR' | 'SGD'>('USD');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({
    INR: 83.5,
    USD: 1.0,
    EUR: 0.92,
    SGD: 1.34,
  });
  const [ratesLoading, setRatesLoading] = useState(false);

  useEffect(() => {
    const fetchRates = async () => {
      setRatesLoading(true);
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        if (res.ok) {
          const data = await res.json();
          if (data.rates) {
            setExchangeRates({
              USD: 1.0,
              INR: data.rates.INR || 83.5,
              EUR: data.rates.EUR || 0.92,
              SGD: data.rates.SGD || 1.34,
            });
          }
        }
      } catch (err) {
        console.warn('Failed to fetch live exchange rates, using resilient defaults', err);
      } finally {
        setRatesLoading(false);
      }
    };
    fetchRates();
  }, []);

  const BASE_PRICES: Record<string, { value: number; unitEn: string; unitAr: string }> = {
    p1: { value: 1.25, unitEn: 'Piece', unitAr: 'قطعة' },
    p2: { value: 2.40, unitEn: 'Piece', unitAr: 'قطعة' },
    p3: { value: 0.85, unitEn: 'Set', unitAr: 'مجموعة' },
    p4: { value: 15.50, unitEn: 'Piece', unitAr: 'قطعة' },
    p5: { value: 4.50, unitEn: 'Piece', unitAr: 'قطعة' },
    p6: { value: 3.20, unitEn: 'Meter', unitAr: 'متر' },
    p7: { value: 35.00, unitEn: 'Sq Meter', unitAr: 'متر مربع' },
    p8: { value: 48.00, unitEn: 'Sq Meter', unitAr: 'متر مربع' },
    p9: { value: 65.00, unitEn: 'Sq Meter', unitAr: 'متر مربع' },
  };

  const convertPrice = (productId: string) => {
    const base = BASE_PRICES[productId];
    if (!base) return null;
    const rate = exchangeRates[selectedCurrency] || 1.0;
    const convertedVal = base.value * rate;
    const symbol = selectedCurrency === 'INR' ? '₹' : selectedCurrency === 'EUR' ? '€' : selectedCurrency === 'SGD' ? 'S$' : '$';
    const unit = lang === 'ar' ? base.unitAr : base.unitEn;
    return {
      formatted: `${symbol}${convertedVal.toFixed(2)}`,
      unit
    };
  };

  // Map and translate categories dynamically
  const localizedCategories = categories.map(cat => ({
    ...cat,
    name: translateCategoryName(cat.name, lang)
  }));

  const localizedProducts = products.map(prod => translateProduct(prod, lang));

  // Filter products based on category and search query
  const filteredProducts = localizedProducts.filter((product) => {
    // Check match on original or translated category
    const originalCategory = products.find(p => p.id === product.id)?.category || '';
    const matchesCategory = 
      selectedCategory === 'all' || 
      product.category === selectedCategory || 
      originalCategory === selectedCategory;
    
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.features && product.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        Object.values(product.specifications).some(val => val.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-16 sm:py-24 bg-white dark:bg-slate-900 scroll-mt-20 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-extrabold block">
            {lang === 'ar' ? 'كتالوج التصدير الفاخر B2B' : 'Premium B2B Catalog'}
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {lang === 'ar' ? 'استكشف مجموعات التصدير الشاملة لدينا' : 'Explore Our Comprehensive Export Collections'}
          </h2>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light">
            {lang === 'ar'
              ? 'يتم توريد منتجاتنا وتصنيعها مباشرة من المصانع والمحاجر المعتمدة بموجب ضوابط جودة صارمة وشهادات عالمية. انقر فوق أي منتج لعرض المواصفات الفنية الكاملة وطلب عروض أسعار FOB أو CIF.'
              : 'Sourced directly from certified factories and processed under rigorous international quality controls. Click on any product to view full technical specifications and request FOB / CIF quotes.'
            }
          </p>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-4 rounded"></div>
        </div>

        {/* Categories Bar & Search */}
        <div className="space-y-4 mb-8">
          
          {/* Real-time Currency Conversion Widget */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/30 p-3 rounded-xl max-w-2xl mx-auto text-xs" dir={dir}>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {lang === 'ar' ? 'عرض الأسعار التقريبية بـ:' : 'View Pricing Estimates In:'}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {(['USD', 'EUR', 'SGD', 'INR'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-3 py-1 rounded-lg font-mono font-extrabold text-xs transition-all cursor-pointer border ${
                    selectedCurrency === curr
                      ? 'bg-amber-500 text-emerald-950 border-amber-500 shadow-sm font-bold'
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-slate-800 hover:bg-gray-50'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            <div className="text-[10px] text-gray-400 font-light">
              {lang === 'ar'
                ? `* أسعار FOB تقريبية. 1 USD = ${exchangeRates[selectedCurrency]} ${selectedCurrency}`
                : `* FOB Estimates. 1 USD = ${exchangeRates[selectedCurrency]} ${selectedCurrency}`
              }
            </div>
          </div>

          {/* Category Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2" dir={dir}>
            <button
              id="category-pill-all"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-emerald-800 text-white shadow-md shadow-emerald-800/10'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              {lang === 'ar' ? `كل الفئات (${products.length})` : `All Categories (${products.length})`}
            </button>
            {localizedCategories.map((cat) => {
              // Get original category name to count products
              const originalCat = categories.find(c => c.id === cat.id);
              const count = products.filter(p => p.category === (originalCat?.name || cat.name)).length;
              return (
                <button
                  key={cat.id}
                  id={`category-pill-${cat.slug}`}
                  onClick={() => setSelectedCategory(originalCat?.name || cat.name)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    selectedCategory === (originalCat?.name || cat.name)
                      ? 'bg-emerald-800 text-white shadow-md shadow-emerald-800/10'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Result Banner */}
          {searchQuery && (
            <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/40 text-sm px-4 py-2 rounded-lg inline-flex items-center gap-2 mx-auto">
              <span>
                {lang === 'ar'
                  ? <>تم العثور على <strong>{filteredProducts.length}</strong> منتج مطابق للبحث &quot;{searchQuery}&quot;</>
                  : <>Found <strong>{filteredProducts.length}</strong> matching products for &quot;{searchQuery}&quot;</>
                }
              </span>
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-slate-950/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-xl max-w-xl mx-auto">
            <SlidersHorizontal className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{lang === 'ar' ? 'لم يتم العثور على أي منتجات مطابقة' : 'No matching products found'}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{lang === 'ar' ? 'يرجى تغيير تصنيف الفئة أو كلمات البحث.' : 'Try modifying your category filter or search terms.'}</p>
            <button
              onClick={() => { setSelectedCategory('all'); }}
              className="mt-4 px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'إعادة ضبط التصفية' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                id={`product-card-${product.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group flex flex-col bg-white dark:bg-slate-950/40 border border-gray-100 dark:border-slate-800/80 rounded-xl overflow-hidden hover:border-emerald-700/20 hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300"
              >
                {/* Product Image Panel */}
                <div className="relative aspect-video bg-gray-50 dark:bg-slate-900 overflow-hidden">
                  <img
                    referrerPolicy="no-referrer"
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                  />
                  {/* Category overlay */}
                  <div className={`absolute top-3 ${dir === 'rtl' ? 'right-3' : 'left-3'} bg-emerald-950/95 backdrop-blur-md text-emerald-100 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded border border-emerald-800/50`}>
                    {product.category}
                  </div>
                  {/* Compare toggle button overlay */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleCompare(product.id);
                    }}
                    className={`absolute top-3 ${dir === 'rtl' ? 'left-3' : 'right-3'} z-10 p-1.5 rounded-lg backdrop-blur-md border cursor-pointer transition-all flex items-center gap-1.5 ${
                      comparedIds.includes(product.id)
                        ? 'bg-amber-500 border-amber-500 text-emerald-950 shadow-md font-extrabold'
                        : 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-800/50 text-white'
                    }`}
                    title={lang === 'ar' ? 'مقارنة المنتج' : 'Compare Product'}
                  >
                    <GitCompare className="w-3.5 h-3.5" />
                    {comparedIds.includes(product.id) ? (
                      <span className="text-[10px] font-extrabold">{lang === 'ar' ? 'مضاف للمقارنة' : 'Added to compare'}</span>
                    ) : (
                      <span className="text-[10px] font-medium hidden sm:inline">{lang === 'ar' ? 'مقارنة' : 'Compare'}</span>
                    )}
                  </button>
                  {/* MOQ Indicator */}
                  <div className={`absolute bottom-3 ${dir === 'rtl' ? 'left-3' : 'right-3'} bg-amber-500 text-emerald-950 text-xs font-bold px-2.5 py-1 rounded shadow`}>
                    {lang === 'ar' ? `حد أدنى: ${product.moq}` : `MOQ: ${product.moq}`}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className={`space-y-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-amber-400 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    
                    {/* Currency converted price */}
                    {(() => {
                      const priceInfo = convertPrice(product.id);
                      if (!priceInfo) return null;
                      return (
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 dark:bg-amber-500/5 text-amber-800 dark:text-amber-400 rounded-lg text-[11px] font-extrabold border border-amber-500/20 ${
                          dir === 'rtl' ? 'flex-row-reverse' : ''
                        }`}>
                          <span>{lang === 'ar' ? 'السعر التقريبي (FOB):' : 'Est. FOB Price:'}</span>
                          <span className="font-mono text-xs">{priceInfo.formatted}</span>
                          <span className="text-[10px] text-gray-400 font-light">/ {priceInfo.unit}</span>
                        </div>
                      );
                    })()}

                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    {/* Tiny specs highlight list */}
                    <div className={`pt-2 flex flex-wrap gap-1.5 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      {product.features.slice(0, 2).map((feat, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-[10px] text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded font-medium">
                          <Sparkles className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className={`pt-3 border-t border-gray-55 dark:border-slate-800/60 flex items-center justify-between gap-3 ${
                    dir === 'rtl' ? 'flex-row-reverse' : ''
                  }`}>
                    <button
                      id={`spec-btn-${product.id}`}
                      onClick={() => setSelectedProduct(product)}
                      className={`inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:text-emerald-650 dark:hover:text-emerald-300 cursor-pointer transition-colors ${
                        dir === 'rtl' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <Info className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'عرض المواصفات' : 'View Specifications'}</span>
                    </button>

                    <button
                      id={`quote-btn-${product.id}`}
                      onClick={() => onQuoteClick(`${product.name} (MOQ: ${product.moq})`)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-55/30 hover:bg-emerald-50/50 text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white font-bold text-xs rounded-lg transition-all cursor-pointer border border-emerald-100/50 dark:border-emerald-800/30 ${
                        dir === 'rtl' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span>{lang === 'ar' ? 'استفسار' : 'Inquire'}</span>
                      <ArrowRight className={`w-3 h-3 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )/*modal is next*/}
      </motion.div>

      {/* Product Specification Modal Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-emerald-950/80 backdrop-blur-sm animate-fadeIn pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))]" dir={dir}>
          <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 rounded-2xl md:rounded-3xl max-w-2xl w-full max-h-[88vh] sm:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800 relative">
            
            {/* Modal Header banner */}
            <div className="relative aspect-video md:aspect-[21/9] bg-emerald-900 overflow-hidden shrink-0">
              <img
                referrerPolicy="no-referrer"
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover brightness-75"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} bg-emerald-950/80 hover:bg-emerald-900 text-white p-2 rounded-full cursor-pointer transition-colors z-10 border-0`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 to-transparent"></div>
              <div className={`absolute bottom-4 ${dir === 'rtl' ? 'right-6 text-right' : 'left-6 text-left'} left-6 right-6`}>
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block mb-1">
                  {selectedProduct.category}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {selectedProduct.name}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 scrollbar-thin">
              
              {/* Description */}
              <div className={`space-y-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">{lang === 'ar' ? 'نبذة عن المنتج' : 'Product Overview'}</h4>
                <p className="text-sm text-gray-700 dark:text-gray-350 leading-relaxed font-light">{selectedProduct.description}</p>
              </div>

              {/* Technical Specifications Table */}
              <div className={`space-y-3 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">{lang === 'ar' ? 'المواصفات الفنية التقنية' : 'Technical Specifications'}</h4>
                <div className="border border-gray-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full border-collapse text-xs">
                    <tbody>
                      {Object.entries(selectedProduct.specifications).map(([key, val], idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50/50 dark:bg-slate-950/20' : 'bg-white dark:bg-slate-900'}>
                          <td className={`p-3 font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 w-1/3 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{key}</td>
                          <td className={`p-3 text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-slate-800 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{val}</td>
                        </tr>
                      ))}
                      {(() => {
                        const priceInfo = convertPrice(selectedProduct.id);
                        if (!priceInfo) return null;
                        return (
                          <tr className="bg-amber-500/5">
                            <td className={`p-3 font-semibold text-amber-900 dark:text-amber-400 border-b border-gray-100 dark:border-slate-800 w-1/3 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                              {lang === 'ar' ? 'سعر الوحدة التقديري (FOB)' : 'Est. FOB Unit Price'}
                            </td>
                            <td className={`p-3 text-amber-800 dark:text-amber-400 font-mono font-extrabold border-b border-gray-100 dark:border-slate-800 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                              {priceInfo.formatted} <span className="text-[10px] text-gray-400 font-light">/ {priceInfo.unit}</span>
                            </td>
                          </tr>
                        );
                      })()}
                      <tr className="bg-white dark:bg-slate-900">
                        <td className={`p-3 font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 w-1/3 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{lang === 'ar' ? 'الحد الأدنى للطلب (MOQ)' : 'Minimum Order Qty'}</td>
                        <td className={`p-3 text-amber-700 dark:text-amber-400 font-bold border-b border-gray-100 dark:border-slate-800 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{selectedProduct.moq}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Premium Features Checklist */}
              <div className={`space-y-3 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">{lang === 'ar' ? 'مزايا التصدير وشهادات الجودة' : 'Export Advantages & Certifications'}</h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {selectedProduct.features.map((feat, i) => (
                    <div key={i} className={`flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-950/20 p-2.5 rounded-lg border border-gray-100 dark:border-slate-800 ${
                      dir === 'rtl' ? 'flex-row-reverse text-right' : ''
                    }`}>
                      <Award className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className={`pt-6 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 ${
                dir === 'rtl' ? 'sm:flex-row-reverse' : ''
              }`}>
                <button
                  id="modal-quote-btn"
                  onClick={() => {
                    setSelectedProduct(null);
                    onQuoteClick(`${selectedProduct.name} (MOQ: ${selectedProduct.moq})`);
                  }}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-650 text-white font-bold text-sm rounded-xl shadow transition-colors cursor-pointer ${
                    dir === 'rtl' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <span>{lang === 'ar' ? 'طلب عرض سعر تصدير فوري' : 'Request Instant Export Quote'}</span>
                  <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
                
                <a
                  href={`/assets/catalogs/${selectedProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-spec-sheet.pdf`}
                  onClick={(e) => {
                    e.preventDefault();
                    const msg = lang === 'ar'
                      ? `ورقة مواصفات ${selectedProduct.name} قيد التجميع حالياً. تم إرسال طلب تنزيل عينة إلى سجل مستندات ياليني إكسيم.`
                      : `Spec sheet for ${selectedProduct.name} is currently compiling. A sample download request has been dispatched to Yalini Exim document registry.`;
                    alert(msg);
                  }}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 border border-gray-200 dark:border-slate-800 hover:border-emerald-700/30 hover:bg-emerald-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 hover:text-emerald-900 dark:hover:text-white font-semibold text-sm rounded-xl transition-all cursor-pointer ${
                    dir === 'rtl' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <Download className="w-4 h-4 text-emerald-700" />
                  <span>{lang === 'ar' ? 'تنزيل ورقة المواصفات' : 'Download Spec Sheet'}</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Sticky Compare Tray */}
      {comparedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 animate-fadeIn">
          <div className="bg-emerald-950/95 backdrop-blur-md text-white border border-emerald-800 rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="bg-amber-500 text-emerald-950 p-2 rounded-lg shrink-0">
                <GitCompare className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white font-display">
                  {lang === 'ar' ? 'مقارنة المنتجات' : 'Compare Products'}
                </h4>
                <p className="text-[10px] text-emerald-200 font-light">
                  {lang === 'ar'
                    ? `تم اختيار ${comparedIds.length} من أصل 3 منتجات للمقارنة`
                    : `${comparedIds.length} of 3 selected for side-by-side spec comparison`
                  }
                </p>
              </div>
            </div>

            {compareWarning && (
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 animate-pulse">
                {compareWarning}
              </span>
            )}

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              {/* Selected Thumbnails with quick remove */}
              <div className="flex items-center gap-1.5 mr-2">
                {comparedIds.map(id => {
                  const prod = products.find(p => p.id === id);
                  if (!prod) return null;
                  return (
                    <div key={id} className="relative group/thumb w-8 h-8 rounded bg-gray-900 border border-emerald-850 overflow-hidden">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleToggleCompare(id)}
                        className="absolute inset-0 bg-red-600/90 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity text-white font-extrabold cursor-pointer"
                        title={lang === 'ar' ? 'إزالة' : 'Remove'}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setComparedIds([])}
                className="text-xs text-gray-300 hover:text-white px-2.5 py-1 cursor-pointer"
              >
                {lang === 'ar' ? 'مسح الكل' : 'Clear All'}
              </button>

              <button
                onClick={() => setShowCompareModal(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer border-0"
              >
                {lang === 'ar' ? 'قارن الآن' : 'Compare Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Product Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-emerald-950/80 backdrop-blur-sm animate-fadeIn pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))]" dir={dir}>
          <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 rounded-3xl max-w-5xl w-full max-h-[88vh] sm:max-h-[85vh] overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0 pt-[calc(1.5rem+env(safe-area-inset-top))]">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-emerald-800 dark:text-amber-400" />
                <h3 className="font-display text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white">
                  {lang === 'ar' ? 'مقارنة المواصفات الفنية للمنتجات' : 'Technical Specifications Comparison'}
                </h3>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer transition-colors border-0 bg-transparent"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content Container */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 scrollbar-thin">
              
              {/* Main Compare Table Wrapper */}
              <div className="border border-gray-150 dark:border-slate-800/80 rounded-2xl shadow-sm overflow-x-auto w-full">
                <table className="w-full border-collapse text-xs min-w-[640px]">
                  <thead>
                    <tr className="bg-gray-50/70 dark:bg-slate-950/40">
                      <th className={`p-4 font-extrabold text-gray-500 uppercase tracking-wider border-b border-gray-150 dark:border-slate-800 w-1/4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {lang === 'ar' ? 'المواصفة التقنية' : 'Specification / Prop'}
                      </th>
                      {(() => {
                        const items = products.filter(p => comparedIds.includes(p.id));
                        return items.map(prod => (
                          <th key={prod.id} className="p-4 border-b border-gray-150 dark:border-slate-800 w-1/4 relative group text-left">
                            <button
                              onClick={() => handleToggleCompare(prod.id)}
                              className="absolute top-2 right-2 p-1 bg-red-50 hover:bg-red-105 dark:bg-red-950/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                              title={lang === 'ar' ? 'حذف من المقارنة' : 'Remove from comparison'}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <div className="flex flex-col gap-2">
                              <img src={prod.image} alt={prod.name} className="w-full h-24 object-cover rounded-lg border border-gray-100 dark:border-slate-800 shadow-xs" />
                              <div>
                                <span className="text-[9px] uppercase tracking-wider text-emerald-850 dark:text-amber-400 font-bold block">
                                  {prod.category}
                                </span>
                                <h4 className="font-display font-extrabold text-sm text-gray-900 dark:text-white mt-0.5 line-clamp-1">
                                  {prod.name}
                                </h4>
                              </div>
                            </div>
                          </th>
                        ));
                      })()}
                      {/* Empty column states if comparing < 3 */}
                      {Array.from({ length: Math.max(0, 3 - comparedIds.length) }).map((_, i) => (
                        <th key={i} className="p-4 border-b border-gray-150 dark:border-slate-800 w-1/4 bg-gray-50/20 dark:bg-slate-950/5">
                          <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-xl text-center text-gray-400">
                            <Plus className="w-5 h-5 mb-1" />
                            <span className="text-[10px] font-medium px-2">
                              {lang === 'ar' ? 'أضف منتج آخر للمقارنة' : 'Add Product to Compare'}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* MOQ row */}
                    <tr className="border-b border-gray-100 dark:border-slate-850">
                      <td className={`p-4 font-bold text-gray-700 dark:text-gray-300 bg-gray-50/30 dark:bg-slate-950/10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {lang === 'ar' ? 'الحد الأدنى للطلب (MOQ)' : 'Minimum Order Qty (MOQ)'}
                      </td>
                      {products.filter(p => comparedIds.includes(p.id)).map(prod => (
                        <td key={prod.id} className="p-4 font-bold text-amber-700 dark:text-amber-400 text-left">
                          {prod.moq}
                        </td>
                      ))}
                      {Array.from({ length: Math.max(0, 3 - comparedIds.length) }).map((_, i) => (
                        <td key={i} className="p-4 bg-gray-50/10 dark:bg-slate-950/2"></td>
                      ))}
                    </tr>

                    {/* Unit Price (FOB) row */}
                    <tr className="border-b border-gray-100 dark:border-slate-850">
                      <td className={`p-4 font-bold text-gray-700 dark:text-gray-300 bg-gray-50/30 dark:bg-slate-950/10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {lang === 'ar' ? 'سعر الوحدة التقديري (FOB)' : 'Est. FOB Unit Price'}
                      </td>
                      {products.filter(p => comparedIds.includes(p.id)).map(prod => {
                        const priceInfo = convertPrice(prod.id);
                        return (
                          <td key={prod.id} className="p-4 text-left">
                            {priceInfo ? (
                              <div className="flex flex-col">
                                <span className="font-mono font-extrabold text-sm text-emerald-800 dark:text-amber-400">{priceInfo.formatted}</span>
                                <span className="text-[10px] text-gray-400 font-light">/ {priceInfo.unit}</span>
                              </div>
                            ) : '-'}
                          </td>
                        );
                      })}
                      {Array.from({ length: Math.max(0, 3 - comparedIds.length) }).map((_, i) => (
                        <td key={i} className="p-4 bg-gray-50/10 dark:bg-slate-950/2"></td>
                      ))}
                    </tr>

                    {/* All Unique Specifications keys rows */}
                    {(() => {
                      const items = products.filter(p => comparedIds.includes(p.id));
                      const allKeys = Array.from(new Set(items.flatMap(p => Object.keys(p.specifications || {}))));
                      
                      return allKeys.map(key => (
                        <tr key={key} className="border-b border-gray-100 dark:border-slate-850 hover:bg-gray-50/20">
                          <td className={`p-4 font-semibold text-gray-700 dark:text-gray-300 bg-gray-50/30 dark:bg-slate-950/10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                            {key}
                          </td>
                          {items.map(prod => (
                            <td key={prod.id} className="p-4 text-gray-600 dark:text-gray-300 text-left leading-relaxed font-light">
                              {prod.specifications[key] || <span className="text-gray-300 dark:text-gray-700">-</span>}
                            </td>
                          ))}
                          {Array.from({ length: Math.max(0, 3 - comparedIds.length) }).map((_, i) => (
                            <td key={i} className="p-4 bg-gray-50/10 dark:bg-slate-950/2"></td>
                          ))}
                        </tr>
                      ));
                    })()}

                    {/* Features checklist row */}
                    <tr className="border-b border-gray-100 dark:border-slate-850">
                      <td className={`p-4 font-bold text-gray-700 dark:text-gray-300 bg-gray-50/30 dark:bg-slate-950/10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {lang === 'ar' ? 'المزايا والمواصفات الفنية' : 'Key Advantages'}
                      </td>
                      {products.filter(p => comparedIds.includes(p.id)).map(prod => (
                        <td key={prod.id} className="p-4 text-left">
                          <ul className="space-y-1.5">
                            {prod.features.map((feat, i) => (
                              <li key={i} className="flex items-start gap-1 text-[10px] text-gray-600 dark:text-gray-300 font-light">
                                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                      {Array.from({ length: Math.max(0, 3 - comparedIds.length) }).map((_, i) => (
                        <td key={i} className="p-4 bg-gray-50/10 dark:bg-slate-950/2"></td>
                      ))}
                    </tr>

                    {/* Action trigger row */}
                    <tr>
                      <td className={`p-4 bg-gray-50/30 dark:bg-slate-950/10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}></td>
                      {products.filter(p => comparedIds.includes(p.id)).map(prod => (
                        <td key={prod.id} className="p-4 text-left">
                          <button
                            onClick={() => {
                              setShowCompareModal(false);
                              onQuoteClick(`${prod.name} (MOQ: ${prod.moq})`);
                            }}
                            className="w-full py-2 bg-emerald-700 hover:bg-emerald-650 text-white font-extrabold text-xs rounded-xl shadow-sm transition-colors cursor-pointer text-center border-0"
                          >
                            {lang === 'ar' ? 'طلب تسعير' : 'Inquire Now'}
                          </button>
                        </td>
                      ))}
                      {Array.from({ length: Math.max(0, 3 - comparedIds.length) }).map((_, i) => (
                        <td key={i} className="p-4 bg-gray-50/10 dark:bg-slate-950/2"></td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950/10 flex justify-between items-center text-xs text-gray-500 font-light pb-[calc(1.25rem+env(safe-area-inset-bottom))] shrink-0">
              <span className="max-w-md">
                {lang === 'ar' 
                  ? '* يمكن طلب تسعيرة لعدة شحنات مجمعة في نموذج الاستفسارات.' 
                  : '* Direct technical parameters sourced under Indian mineral and ceramics associations standards.'}
              </span>
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-gray-200 font-bold rounded-lg cursor-pointer transition-colors border-0 shrink-0"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
