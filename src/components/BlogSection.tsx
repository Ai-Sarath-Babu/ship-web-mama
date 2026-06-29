/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { Blog } from '../types';
import { Calendar, User, ArrowRight, X, BookOpen, Send } from 'lucide-react';

interface BlogSectionProps {
  blogs: Blog[];
  onQuoteClick: (productName?: string) => void;
}

export default function BlogSection({ blogs, onQuoteClick }: BlogSectionProps) {
  const { lang, dir } = useLanguage();
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Fallback translations
  const tBlog = {
    en: {
      title: "Export Insights & Trade Intelligence",
      subtitle: "Stay updated with global sourcing guidelines, mineral logistics advice, and hotel tableware industry trends.",
      badge: "Industry Intelligence",
      readMore: "Read Full Article",
      writtenBy: "By",
      publishedOn: "Published",
      close: "Close Article",
      noBlogs: "No articles published yet. Stay tuned!",
      sourcingInquiry: "Interested in sourcing? Ask our team directly",
      askTeam: "Ask About This Topic",
      authorRole: "Trade Analyst",
      minutesRead: "4 min read"
    },
    ar: {
      title: "تحليلات التصدير ورؤى التجارة",
      subtitle: "ابق على اطلاع بإرشادات التوريد العالمية، ولوجستيات تصدير المعادن، واتجاهات أدوات مائدة الفنادق والمطاعم.",
      badge: "رؤى الصناعة والتجارة",
      readMore: "اقرأ المقال كاملاً",
      writtenBy: "بواسطة",
      publishedOn: "نُشر في",
      close: "إغلاق المقال",
      noBlogs: "لا توجد مقالات منشورة حالياً. تابعنا قريباً!",
      sourcingInquiry: "مهتم بالتوريد؟ استفسر من فريقنا مباشرة",
      askTeam: "استفسر عن هذا الموضوع",
      authorRole: "محلل تجاري",
      minutesRead: "قراءة في ٤ دقائق"
    }
  };

  const localT = tBlog[lang] || tBlog.en;

  return (
    <section id="blog" className="py-16 sm:py-24 bg-gray-50/50 scroll-mt-20 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-widest text-emerald-700 font-extrabold block">
            {localT.badge}
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {localT.title}
          </h2>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed font-light">
            {localT.subtitle}
          </p>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-8 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500 font-light">{localT.noBlogs}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {blogs.map((blog) => (
              <article 
                key={blog.id}
                className={`bg-white rounded-2xl border border-gray-100 shadow-2xs hover:shadow-lg hover:border-emerald-700/10 transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  dir === 'rtl' ? 'text-right' : 'text-left'
                }`}
              >
                <div>
                  {/* Image banner */}
                  <div className="h-52 overflow-hidden relative group">
                    <img 
                      src={blog.image || "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=600&q=80"} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <span className={`absolute bottom-3 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-amber-500 text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded`}>
                      {localT.minutesRead}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 sm:p-8 space-y-4">
                    {/* Meta */}
                    <div className={`flex flex-wrap items-center gap-4 text-xs text-gray-400 ${
                      dir === 'rtl' ? 'flex-row-reverse' : ''
                    }`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{blog.date}</span>
                      </span>
                      <span className="text-gray-200">|</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{blog.author || "Director"}</span>
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 leading-snug hover:text-emerald-700 transition-colors cursor-pointer" onClick={() => setSelectedBlog(blog)}>
                      {blog.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed font-light line-clamp-3">
                      {blog.summary}
                    </p>
                  </div>
                </div>

                {/* Footer action */}
                <div className="p-6 sm:px-8 sm:pb-8 pt-0">
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline transition-colors cursor-pointer ${
                      dir === 'rtl' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <span>{localT.readMore}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Detailed Modal/Overlay for selected blog */}
        {selectedBlog && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))] animate-fadeIn">
            <div className="bg-white rounded-2xl md:rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100 max-h-[88vh] sm:max-h-[85vh] flex flex-col">
              
              {/* Modal Header/Banner */}
              <div className="relative h-48 sm:h-64 shrink-0">
                <img 
                  src={selectedBlog.image || "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=600&q=80"} 
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent"></div>
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedBlog(null)}
                  className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} bg-black/45 text-white hover:bg-black/75 p-2 rounded-full transition-colors cursor-pointer border-0`}
                  title={localT.close}
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Banner Meta Info */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white space-y-1">
                  <div className={`flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-emerald-200`}>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{selectedBlog.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      <span>{selectedBlog.author || "Yalini Team"}</span>
                    </span>
                  </div>
                  <h3 className={`font-display text-base sm:text-xl font-bold leading-tight text-white ${
                    dir === 'rtl' ? 'text-right' : 'text-left'
                  }`}>
                    {selectedBlog.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-grow overflow-y-auto p-5 sm:p-8 space-y-6 scrollbar-thin">
                {/* Full text content */}
                <div className={`text-xs sm:text-sm text-gray-700 leading-relaxed font-light space-y-4 whitespace-pre-wrap ${
                  dir === 'rtl' ? 'text-right' : 'text-left'
                }`}>
                  {selectedBlog.content}
                </div>

                {/* Sourcing Prompt inside post */}
                <div className={`p-4 sm:p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  dir === 'rtl' ? 'sm:flex-row-reverse' : ''
                }`}>
                  <div className={`space-y-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <h4 className="font-bold text-xs text-emerald-900">{localT.sourcingInquiry}</h4>
                    <p className="text-[11px] text-gray-500 font-light">
                      {lang === 'ar' 
                        ? 'احصل على تفاصيل الشحن والأسعار المباشرة لمواصفات مشروعك الخاص.' 
                        : 'Get direct bulk pricing and container routing schedules matched to your custom requirements.'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedBlog(null);
                      onQuoteClick(`Inquiry regarding: ${selectedBlog.title}`);
                    }}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-650 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 border-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{localT.askTeam}</span>
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
                >
                  {localT.close}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
