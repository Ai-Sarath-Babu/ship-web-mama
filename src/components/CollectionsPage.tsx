/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../utils/LanguageContext';
import { Product, Category } from '../types';
import ProductSection from './ProductSection';
import { Layers, Sparkles, Award, Box, Info } from 'lucide-react';

interface CollectionsPageProps {
  products: Product[];
  categories: Category[];
  onQuoteClick: (productName?: string) => void;
  searchQuery: string;
}

export default function CollectionsPage({
  products,
  categories,
  onQuoteClick,
  searchQuery,
}: CollectionsPageProps) {
  const { lang, dir } = useLanguage();
  const [internalQuery, setInternalQuery] = useState(searchQuery);

  return (
    <div className="py-12 sm:py-16 bg-gray-50/50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Banner Header */}
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-emerald-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,160,23,0.1),transparent_40%)]"></div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-[11px] uppercase tracking-widest text-amber-400 font-extrabold block">
              {lang === 'ar' ? "كتالوج التصدير الفاخر واللوائح الفنية" : "Premium Wholesale Collections"}
            </span>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {lang === 'ar' ? "مجموعات التصدير المعايرة والمضمونة" : "Fully Calibrated Export Commodities"}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light">
              {lang === 'ar'
                ? "تصفح مجموعاتنا الكاملة من الأواني البورسلين الممتازة والجرانيت والرخام الطبيعي المصنع وفق أرقى الضوابط التقنية."
                : "Sourced directly from native Indian mills, processing plants, and mineral quarries. Built strictly for demanding hospitality and heavy structural contracts with ISO certified standard deviations."}
            </p>
          </div>
        </div>

        {/* 3D-styled Collections Highlight blocks */}
        <div className="grid sm:grid-cols-3 gap-6">
          
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4 hover:border-emerald-700/10 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 text-white flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_8px_-2px_rgba(245,158,11,0.2)] border border-amber-400/10 shrink-0">
              <Box className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-gray-900 truncate">
                {lang === 'ar' ? "صناديق خشبية قوية" : "Fumigated Crating"}
              </div>
              <div className="text-[10px] text-gray-400 font-light truncate">
                {lang === 'ar' ? "تعبئة متينة مخصصة للحجر" : "Secured sea-worthy master packing"}
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4 hover:border-emerald-700/10 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_8px_-2px_rgba(245,158,11,0.2)] border border-amber-400/10 shrink-0">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-gray-900 truncate">
                {lang === 'ar' ? "فحص بنسبة 100%" : "Zero-defect Inspection"}
              </div>
              <div className="text-[10px] text-gray-400 font-light truncate">
                {lang === 'ar' ? "تقارير فحص ومراقبة الجودة" : "Every piece analyzed under high-lux lamps"}
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4 hover:border-emerald-700/10 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_8px_-2px_rgba(16,185,129,0.2)] border border-emerald-400/10 shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-gray-900 truncate">
                {lang === 'ar' ? "مواصفات حسب الطلب" : "Bespoke Customization"}
              </div>
              <div className="text-[10px] text-gray-400 font-light truncate">
                {lang === 'ar' ? "علامة خاصة وتعديل الحجم" : "Custom finishes, calibrations & logo stamps"}
              </div>
            </div>
          </div>

        </div>

        {/* Main Embedded Product Section with all its rich functionalities */}
        <div className="bg-white rounded-3xl border border-gray-100/80 shadow-md overflow-hidden">
          <ProductSection
            products={products}
            categories={categories}
            onQuoteClick={onQuoteClick}
            searchQuery={internalQuery}
          />
        </div>

      </div>
    </div>
  );
}
