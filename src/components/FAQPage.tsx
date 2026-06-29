/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../utils/LanguageContext';
import { HelpCircle, Search, ChevronDown, BookOpen, Layers, DollarSign, Calendar } from 'lucide-react';

export default function FAQPage() {
  const { lang, dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'tableware' | 'stone' | 'logistics'>('all');
  const [openFAQId, setOpenFAQId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: lang === 'ar' ? "الكل" : "All", icon: Layers },
    { id: 'tableware', label: lang === 'ar' ? "أدوات مائدة ومنسوجات" : "Tableware & Linens", icon: BookOpen },
    { id: 'stone', label: lang === 'ar' ? "الجرانيت والرخام" : "Granite & Marble", icon: Layers },
    { id: 'logistics', label: lang === 'ar' ? "اللوجستيات والأسعار" : "Incoterms & Payments", icon: DollarSign },
  ];

  const faqs = [
    {
      id: 'f1',
      category: 'tableware',
      question: lang === 'ar' ? "ما هو الحد الأدنى لكمية الطلب (MOQ) لأدوات المائدة المصنوعة من البورسلين؟" : "What is the typical MOQ for custom porcelain tableware?",
      answer: lang === 'ar'
        ? "بالنسبة لأدوات المائدة القياسية من البورسلين، يبلغ الحد الأدنى لكمية الطلب عادةً 1,500 وحدة لكل طراز. بالنسبة لتصميمات OEM المخصصة أو الشعار المطبوع تحت الطلاء، يبلغ الحد الأدنى 3,000 وحدة."
        : "Standard white porcelain tableware has an MOQ of 1,500 units per model. For bespoke OEM molds, private-label printing, or custom reactive glazing, the minimum run is 3,000 pieces per master stock code."
    },
    {
      id: 'f2',
      category: 'tableware',
      question: lang === 'ar' ? "هل الأواني الخزفية لديكم آمنة للاستخدام في الميكروويف وغسالات الأطباق التجارية؟" : "Are your ceramics and crockeries dishwasher and microwave safe?",
      answer: lang === 'ar'
        ? "نعم، يتم تسخين جميع أواني البورسلين والألومينا المرتفعة عند درجات حرارة تزيد عن 1320 درجة مئوية. وهي مقاومة للخدش تمامًا وآمنة للاستخدام في غسالات الأطباق التجارية والميكروويف وأفران الفنادق."
        : "Absolutely. Sourced from high-alumina clay bodies, our crockeries undergo dual firing at temperatures surpassing 1320°C. They are fully compliant with commercial kitchen parameters (resistant to thermal shock, microwave safe, and scratch-resistant)."
    },
    {
      id: 'f3',
      category: 'stone',
      question: lang === 'ar' ? "كيف يتم قياس وضبط أبعاد بلاطات الجرانيت الهندي؟" : "What calibration controls do you provide for Indian Granites?",
      answer: lang === 'ar'
        ? "تتم معايرة ألواح الجرانيت لدينا باستخدام آلات قطع حديثة الإيطالية. نوفر سمكًا معايرًا بدقة (مثلاً: 20 مم أو 30 مم مع دقة +/- 0.5 مم)، وحواف مشطوبة، وتلميعًا ممتازًا بنسبة تزيد عن 95%."
        : "Our granite products are processed through Italian-head multi-wire gang saws. We implement rigid calibration (thickness tolerance of +/- 0.5mm, perfect right angles, and a minimum gloss reflectivity level of 95% on polished stones)."
    },
    {
      id: 'f4',
      category: 'stone',
      question: lang === 'ar' ? "هل يمكنني طلب مقاسات وسماكات مخصصة لمشاريع البناء الكبيرة؟" : "Do you offer custom sizes and calibration for major architectural works?",
      answer: lang === 'ar'
        ? "نعم، بصفتنا شريك تصدير مباشر، نقوم بتوفير ألواح الجرانيت والرخام وبلاط الأرضيات بمقاسات مخصصة (مثلاً: 60x60 سم، 60x30 سم) بالسمك الذي يطلبه مقاول المشروع مباشرة من المحاجر."
        : "Yes, we handle project-specific custom sizes, steps, risers, and calibrated structural facade panels. These are cut to order directly at partner dressing yards in Rajasthan and Tamil Nadu."
    },
    {
      id: 'f5',
      category: 'logistics',
      question: lang === 'ar' ? "ما هي شروط الشحن القياسية التي تقبلونها (Incoterms)؟" : "Which Incoterms and payment terms do you support?",
      answer: lang === 'ar'
        ? "نحن ندعم شروط الشحن FOB (شحن على ظهر السفينة من موانئ تشيناي أو موندرا) وشروط CIF (الشحن والتأمين حتى ميناء وصولك)، وكذلك CFR و EXW. طريقة الدفع المفضلة هي خطاب الاعتماد غير القابل للإلغاء (L/C) أو التحويل المصرفي (T/T)."
        : "We conduct business under standard ICC Incoterms including FOB (free-on-board at Chennai, Tuticorin, or Mundra ports), CIF (cost, insurance & freight to your sea port), and CFR. Standard payment terms are irrevocable LC at sight or 30% advance TT with balance paid upon copy BL transmission."
    },
    {
      id: 'f6',
      category: 'logistics',
      question: lang === 'ar' ? "هل توفرون شهادات الفحص والتقارير الصحية قبل المغادرة؟" : "Do you dispatch Phytosanitary certificates and SGS inspection logs?",
      answer: lang === 'ar'
        ? "نعم، نحن نوفر مجموعة مستندات كاملة تشمل: شهادة المنشأ الصادرة عن غرف التجارة الهندية، الفحص الصحي النباتي، الفحص المستقل بواسطة SGS أو Intertek لتأكيد الوزن والمواصفات الجودة."
        : "Yes, every export dispatch includes a complete dossier: Certificate of Origin, Phytosanitary papers (for natural fibers/linens), Chamber of Commerce endorsements, and clean onboard Bills of Lading, alongside third-party SGS quality reports."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFAQ = (id: string) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  return (
    <div className="py-12 sm:py-20 bg-gray-50/50" dir={dir}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[11px] uppercase tracking-widest text-emerald-800 font-extrabold block">
            {lang === 'ar' ? "مركز دعم الاستيراد والتصدير" : "Trade Compliances & Logistics"}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {lang === 'ar' ? "الأسئلة الشائعة حول الاستيراد" : "F.A.Q. Trade Portal"}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed font-light">
            {lang === 'ar' 
              ? "ابحث في مستنداتنا وإرشادات التصدير لمعرفة الشروط والمواصفات والضمانات اللوجستية التي نقدمها."
              : "Search through our official trade compliance guides, incoterm support sheets, and commercial parameters."}
          </p>
          <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Search Bar & Categories Bar */}
        <div className="space-y-6">
          
          {/* Visual Search Box */}
          <div className="max-w-xl mx-auto relative">
            <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'right-4' : 'left-4'} flex items-center pointer-events-none`}>
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="faq-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ar' ? "ابحث عن الأسئلة (مثلاً: جودة، شحن، أسعار)..." : "Search B2B import questions (e.g. Incoterms, MOQ)..."}
              className={`w-full py-3.5 text-xs bg-white border border-gray-250 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800 shadow-sm ${
                dir === 'rtl' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'
              }`}
            />
          </div>

          {/* 3D-styled Categories Tabs bar */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id as any); setOpenFAQId(null); }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-800 text-white shadow-md shadow-emerald-800/10' 
                      : 'bg-white border border-gray-100 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CatIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-gray-500'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* FAQs Accordion Grid */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 max-w-md mx-auto">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-display text-base font-bold text-gray-900">
                {lang === 'ar' ? "لا توجد أسئلة تطابق بحثك" : "No matching questions"}
              </h3>
              <p className="text-xs text-gray-500 mt-1 font-light">
                {lang === 'ar' ? "حاول تغيير كلمة البحث أو تصفية فئة أخرى." : "Try adjusting your trade terminology or selecting a different tab."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => {
                const isOpen = openFAQId === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:border-emerald-700/10 transition-all overflow-hidden"
                  >
                    {/* Header trigger button */}
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className={`w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left focus:outline-none cursor-pointer ${
                        dir === 'rtl' ? 'flex-row-reverse text-right' : ''
                      }`}
                    >
                      <span className="font-display text-sm sm:text-base font-bold text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <div className={`p-1.5 rounded-lg bg-gray-50 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-emerald-50 text-emerald-800' : ''}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Answer Area */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className={`p-6 sm:p-8 bg-gray-50/50 border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed font-light ${
                            dir === 'rtl' ? 'text-right' : 'text-left'
                          }`}>
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Global Compliance Cert Card */}
        <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-emerald-900 text-center space-y-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,160,23,0.08),transparent_50%)]"></div>
          <HelpCircle className="w-8 h-8 text-amber-400 mx-auto animate-bounce" />
          <h3 className="font-display text-lg sm:text-xl font-bold">
            {lang === 'ar' ? "لديك أسئلة مخصصة أو مواصفات خاصة؟" : "Have Custom Sourcing Requirements?"}
          </h3>
          <p className="text-xs text-emerald-100/90 font-light leading-relaxed max-w-xl mx-auto">
            {lang === 'ar'
              ? "تواصل مع مكاتبنا التجارية مباشرة. نحن نرحب بالاتصالات والاستفسارات والمواصفات الفنية لطلبات OEM الخاصة بك."
              : "Contact our physical trading coordinators directly. We are fully capable of drafting customized packaging plans and quality protocols."}
          </p>
        </div>

      </div>
    </div>
  );
}
