/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../utils/LanguageContext';
import { Blog } from '../types';
import { BookOpen, Calendar, User, X, Briefcase, FileText, ChevronRight, Award, ShieldAlert } from 'lucide-react';

interface MorePageProps {
  blogs: Blog[];
  onQuoteClick: (productName?: string) => void;
}

export default function MorePage({ blogs, onQuoteClick }: MorePageProps) {
  const { lang, dir } = useLanguage();
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Synchronize blog query parameter on load
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('blog');
    if (blogId && blogs.length > 0 && !selectedBlog) {
      const foundBlog = blogs.find(b => b.id === blogId);
      if (foundBlog) {
        setSelectedBlog(foundBlog);
      }
    }
  }, [blogs]);

  // Sync state back to URL query params when modal is opened/closed
  React.useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedBlog) {
      url.searchParams.set('blog', selectedBlog.id);
    } else {
      url.searchParams.delete('blog');
    }
    if (url.searchParams.get('blog') !== new URLSearchParams(window.location.search).get('blog')) {
      window.history.pushState({}, '', url.toString());
    }
  }, [selectedBlog]);

  const milestones = [
    {
      year: "2023",
      title: lang === 'ar' ? "التأسيس والاعتماد" : "Inception & Licenses",
      desc: lang === 'ar'
        ? "تأسيس الشركة والحصول على التراخيص الرسمية من وزارة التجارة الهندية وبدء تصدير الأحجار."
        : "Incorporated the export legal entity, securing federal DGFT licenses, Spices Board registrations, and starting South Indian granite quarries partnership."
    },
    {
      year: "2024",
      title: lang === 'ar' ? "التوسع في الأواني والمنسوجات" : "Porcelain & Textile Expansion",
      desc: lang === 'ar'
        ? "شراكة مباشرة مع مصانع الخزف والبياضات القطنية لتوريد الفنادق والمنشآت التجارية عالمياً."
        : "Established direct joint mill runs for high-alumina porcelain crockeries, fine tableware, and corporate table linens for international hospitality chains."
    },
    {
      year: "2025",
      title: lang === 'ar' ? "تطوير ممر الخليج والمحيط الهادي" : "Pacific & GCC Sourcing Corridors",
      desc: lang === 'ar'
        ? "فتح مسارات شحن مباشرة وسريعة لتوريد دفعات حجرية ومعمارية كبرى إلى الإمارات، بريطانيا، كندا، ونيوزيلندا."
        : "Established streamlined freight paths to major distribution centers in Jebel Ali, Southampton, Auckland, and Vancouver."
    }
  ];

  return (
    <div className="py-12 sm:py-20 bg-gray-50/50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] uppercase tracking-widest text-emerald-800 font-extrabold block">
            {lang === 'ar' ? "بوابة التجارة والمعلومات المؤسسية" : "B2B Trade Intelligence Hub"}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {lang === 'ar' ? "المزيد من المعلومات والأخبار" : "Corporate Milestones & Trade Intelligence"}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed font-light">
            {lang === 'ar' 
              ? "استكشف مسيرتنا المهنية، واقرأ خطابات مجلس الإدارة، وتصفح منشورات مدونة ذكاء التجارة الخاصة بنا."
              : "Discover our historical progression, read executive letters, and browse professional export-import advisory articles."}
          </p>
          <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Executive Letter & Spices Board Certificate */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Executive Letter (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-xl space-y-6">
            <div className={`space-y-1.5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">{lang === 'ar' ? "رسالة من الإدارة العامة" : "Director's Desk Letter"}</div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
                {lang === 'ar' ? "ضمان موثوقية التوريد في عالم متغير" : "Securing Trade Certainty in a Dynamic Market"}
              </h2>
            </div>
            
            <div className={`text-xs sm:text-sm text-gray-600 leading-relaxed font-light space-y-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <p>
                {lang === 'ar'
                  ? "مرحباً بكم في ياليني إكسيم. في ظل التغيرات المتسارعة في سلاسل التوريد العالمية، يظل التزامنا الأساسي ثابتاً: تقديم الجودة الفائقة للمواد والسلع المصدرة من الهند مباشرة إلى مستودعاتكم."
                  : "Welcome to Yalini Exim. In today's volatile global logistics environment, our core operating mandate remains simple: eliminating non-conforming parameters and securing trade lanes directly from the source."}
              </p>
              <p>
                {lang === 'ar'
                  ? "نحن نؤمن بأن الصفقات الناجحة لا تنتهي بتحميل الحاويات، بل تبدأ من الفهم العميق لمتطلبات العميل التقنية وفحص الأبعاد ومعايرة الأوزان، ومتابعة الأوراق الرسمية خطوة بخطوة."
                  : "We believe professional trading is not merely a transaction, but a rigorous, daily physical engineering duty. From supervising the moisture-proof packing of cotton tablecloths to checking gang-saw alignments on Ruby Red slabs, our on-site teams defend your business value."}
              </p>
              <p className="font-semibold text-gray-900">
                {lang === 'ar'
                  ? "برابهو ديفا، المدير التنفيذي لشركة ياليني إكسيم"
                  : "Prabhu Deva, Managing Director — Yalini Exim"}
              </p>
            </div>
          </div>

          {/* Allied Commodities / Spices board (5 cols) */}
          <div className="lg:col-span-5 bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl border border-emerald-900 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,160,23,0.1),transparent_50%)]"></div>
            
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_8px_-2px_rgba(245,158,11,0.2)] border border-amber-400/10">
                <Award className="w-6 h-6 text-white" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[9px] uppercase tracking-wider text-amber-400 font-extrabold block">{lang === 'ar' ? "تسجيلات مجلس التوابل الهندي" : "Allied Trade Registrations"}</span>
                <h3 className="font-display text-lg font-bold">{lang === 'ar' ? "تصدير التوابل والسلع الزراعية الفاخرة" : "Certified Spices & Allied Export"}</h3>
                <p className="text-xs text-emerald-100/85 font-light leading-relaxed">
                  {lang === 'ar'
                    ? "بجانب تخصصنا الأساسي في مائدتك ومشاريعك الحجرية، تحمل شركتنا ترخيصاً رسمياً ومسجلاً لدى مجلس التوابل التابع لوزارة التجارة الهندية لتصدير السلع الجافة المتميزة."
                    : "In addition to our core tabletop ceramics and heavy granites, Yalini Exim is fully accredited with the Spice Board of India under the Ministry of Commerce & Industry, authorizing bulk dispatches of premium cardamom, cloves, and regional dry agricultural goods."}
                </p>
              </div>

              <div className="pt-2">
                <div className="p-3.5 bg-emerald-900/60 border border-emerald-800 rounded-xl space-y-1 text-center sm:text-left">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-amber-300">SPICES BOARD ENROLLED</div>
                  <div className="text-[11px] font-mono text-emerald-200">REG: SPB/RCMC/332402927</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Corporate Milestones (3D Timeline style) */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
              {lang === 'ar' ? "مسار نمو الشركة وتوسعها" : "Our Progressive Timeline"}
            </h2>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              {lang === 'ar'
                ? "سجل حافل من الإنجازات والالتزام بالتميز التجاري الدولي."
                : "A brief breakdown of key strategic milestones established by our core operational board."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {milestones.map((m, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:border-emerald-700/20 hover:shadow-md transition-all duration-300 space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-emerald-800/20 font-mono tracking-tight group-hover:text-emerald-800/45 transition-colors">{m.year}</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 shadow-xs">
                    <Briefcase className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-display text-sm font-bold text-gray-900">{m.title}</h4>
                  <p className="text-xs text-gray-600 font-light leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trade Insights Feed */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
              {lang === 'ar' ? "مدونة ذكاء التجارة والاستيراد" : "Trade Intelligence Portal"}
            </h2>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              {lang === 'ar'
                ? "قواعد السلوك والتحليلات الجمركية ومراجعات الموانئ لإرشاد مستورديك في الخليج وأوروبا."
                : "Regulatory reviews, customs adjustments, and regional port breakdowns drafted by our trade analysis team."}
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200 max-w-md mx-auto">
              <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <h3 className="font-display text-sm font-bold text-gray-900">{lang === 'ar' ? "لا توجد منشورات متاحة حالياً" : "Feed currently loading"}</h3>
              <p className="text-xs text-gray-400 mt-1">{lang === 'ar' ? "يرجى التحقق لاحقاً أو مراجعة المشرف." : "No published articles have been logged on the database."}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((b) => (
                <div 
                  key={b.id}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-700/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-gray-50 overflow-hidden">
                    <img
                      referrerPolicy="no-referrer"
                      src={b.image || "https://images.unsplash.com/photo-157857437130-527eed3abbec?auto=format&fit=crop&w=600&q=80"}
                      alt={b.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-3 ${dir === 'rtl' ? 'right-3' : 'left-3'} bg-emerald-950/90 text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-emerald-800`}>
                      ADVISORY
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{b.date}</span>
                      </div>
                      <h3 className="font-display text-sm font-bold text-gray-900 line-clamp-2 leading-snug hover:text-emerald-800 transition-colors">
                        {b.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed font-light">
                        {b.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedBlog(b)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-650 transition-colors cursor-pointer"
                    >
                      <span>{lang === 'ar' ? "قراءة المقال كاملاً" : "Read Full Post"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Blog Reader Popup */}
        <AnimatePresence>
          {selectedBlog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-emerald-950/80 backdrop-blur-sm pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))]" dir={dir}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl md:rounded-3xl max-w-2xl w-full max-h-[88vh] sm:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative border border-gray-100"
              >
                
                {/* Banner / Header (Sticky) */}
                <div className="relative h-48 sm:h-64 bg-emerald-950 overflow-hidden shrink-0">
                  <img
                    referrerPolicy="no-referrer"
                    src={selectedBlog.image || "https://images.unsplash.com/photo-157857437130-527eed3abbec?auto=format&fit=crop&w=600&q=80"}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent"></div>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} bg-emerald-950/80 hover:bg-emerald-900 text-white p-2 rounded-full cursor-pointer transition-colors z-10 border-0`}
                    aria-label="Close details"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-amber-400 font-bold block mb-1">
                      {selectedBlog.date} | BY {selectedBlog.author.toUpperCase()}
                    </span>
                    <h3 className="font-display text-base sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                      {selectedBlog.title}
                    </h3>
                  </div>
                </div>

                {/* Blog Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 scrollbar-thin">
                  
                  {/* Summary Callout */}
                  <div className={`p-4 bg-gray-50 border-amber-500 rounded-r-xl ${dir === 'rtl' ? 'border-r-4' : 'border-l-4'}`}>
                    <p className={`text-xs text-gray-600 font-medium italic ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {selectedBlog.summary}
                    </p>
                  </div>

                  {/* WYSIWYG Content Output */}
                  <div 
                    className={`text-xs sm:text-sm text-gray-700 leading-relaxed space-y-4 font-light ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                    dangerouslySetInnerHTML={{ __html: selectedBlog.content.replace(/\n/g, '<br />') }}
                  />

                </div>

                {/* Modal Footer (Sticky) */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? "إغلاق" : "Close"}
                  </button>
                  <button
                    onClick={() => { setSelectedBlog(null); onQuoteClick(selectedBlog.title); }}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-650 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer border-0"
                  >
                    {lang === 'ar' ? "طلب استشارة حول هذا الموضوع" : "Inquire Regarding This Topic"}
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
