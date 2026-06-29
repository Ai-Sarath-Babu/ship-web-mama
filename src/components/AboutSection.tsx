/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Leaf, Warehouse, CheckCircle2, Award, Users2, Building2 } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import { motion } from 'motion/react';

export default function AboutSection() {
  const { lang, t, dir } = useLanguage();

  const pillars = lang === 'ar' ? [
    {
      icon: <Leaf className="w-5 h-5 text-emerald-600" />,
      title: "أولوية الاستدامة",
      text: "دعم البدائل القابلة للتحلل الحيوي لمكافحة البلاستيك أحادي الاستخدام عالمياً."
    },
    {
      icon: <Warehouse className="w-5 h-5 text-emerald-600" />,
      title: "بنية تحتية للتوريد المباشر",
      text: "اتفاقيات وشراكات مباشرة مع أفضل مصانع ومطاحن ومحاجر الجرانيت والرخام الهندية."
    },
    {
      icon: <Users2 className="w-5 h-5 text-emerald-600" />,
      title: "صناعة العلامة والإنتاج الخاص (OEM)",
      text: "دورة تصنيع متكاملة، طباعة الصناديق المخصصة، ونقش وتسمية الشعارات التجارية الخاصة."
    }
  ] : [
    {
      icon: <Leaf className="w-5 h-5 text-emerald-600" />,
      title: "Sustainability-First",
      text: "Championing bio-compostable alternatives to combat single-use plastics worldwide."
    },
    {
      icon: <Warehouse className="w-5 h-5 text-emerald-600" />,
      title: "Direct Sourcing Infrastructure",
      text: "Tie-ups with premium agro-mills, processing plants, and mineral quarries."
    },
    {
      icon: <Users2 className="w-5 h-5 text-emerald-600" />,
      title: "Private Label & OEM Services",
      text: "End-to-end manufacturing, custom box packaging, and logo engraving."
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-gray-50/50 dark:bg-slate-900/20 scroll-mt-20 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[400px]">
              {/* Blue backing decorative block */}
              <div className={`absolute top-4 w-full h-full bg-blue-500/10 dark:bg-blue-400/5 rounded-2xl border border-blue-500/20 dark:border-blue-400/10 ${
                dir === 'rtl' ? '-right-4' : '-left-4'
              }`}></div>
              
              {/* Primary image */}
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
                alt="B2B Meeting & Sourcing Discussion"
                className="relative z-10 w-full h-80 object-cover rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800"
              />

              {/* Float Badge: Quality Certified */}
              <div className={`absolute z-20 -bottom-5 bg-emerald-900 dark:bg-slate-950 border border-emerald-800 dark:border-slate-850 text-white p-4 rounded-xl shadow-xl flex items-center gap-3 ${
                dir === 'rtl' ? '-left-5' : '-right-5'
              }`}>
                <div className="p-2.5 bg-emerald-800 dark:bg-slate-900 rounded-lg text-blue-400 dark:text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <div className="text-sm font-bold">IEC Certified</div>
                  <div className="text-[10px] text-emerald-200 dark:text-slate-300">{lang === 'ar' ? 'رخصة التصدير الحكومية #192003882' : 'Export License #192003882'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Informational Column */}
          <div className={`lg:col-span-7 space-y-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-extrabold block">
                {lang === 'ar' ? 'من نحن' : 'Who We Are'}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                {t.aboutTitle}
              </h2>
              <div className={`w-12 h-1 bg-blue-600 rounded ${dir === 'rtl' ? 'mr-0 ml-auto' : 'mx-0'}`}></div>
            </div>

            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              <strong>{lang === 'ar' ? 'ياليني إكسيم' : 'Yalini Exim'}</strong> {lang === 'ar' ? 'هي شركة رائدة لتصدير وتوريد المنتجات الهندية المتميزة وتوريد التصنيع للشركات.' : 'is a leading-edge Indian export and manufacturing sourcing enterprise.'} {t.aboutDesc1}
            </p>

            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              {t.aboutDesc2}
            </p>

            {/* Sourcing Pillars List */}
            <div className="grid sm:grid-cols-3 gap-6 pt-4 border-t border-gray-100 dark:border-slate-800">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <span className="p-1 bg-emerald-50 dark:bg-emerald-950/30 rounded-md">
                      {pillar.icon}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white font-display">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white dark:bg-slate-950/30 border border-gray-100 dark:border-slate-800/80 rounded-xl mt-4">
              <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                <div className="text-2xl font-extrabold text-emerald-800 dark:text-emerald-400">2023</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{t.establishedYear}</div>
              </div>
              <div className={`border-t sm:border-t-0 border-gray-100 dark:border-slate-800 pt-2 sm:pt-0 ${
                dir === 'rtl' ? 'text-right border-r sm:border-r border-l-0 border-gray-100 dark:border-slate-800 pr-4 pl-0' : 'text-left border-l sm:border-l border-gray-100 dark:border-slate-800 pl-4 pr-0'
              }`}>
                <div className="text-2xl font-extrabold text-emerald-800 dark:text-emerald-400">{t.noLimit}</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{t.monthlyCapacity}</div>
              </div>
              <div className={`border-t sm:border-t-0 border-gray-100 dark:border-slate-800 pt-2 sm:pt-0 ${
                dir === 'rtl' ? 'text-right border-r sm:border-r border-l-0 border-gray-100 dark:border-slate-800 pr-4 pl-0' : 'text-left border-l sm:border-l border-gray-100 dark:border-slate-800 pl-4 pr-0'
              }`}>
                <div className="text-2xl font-extrabold text-emerald-800 dark:text-emerald-400">{t.direct}</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{t.directPricing}</div>
              </div>
              <div className={`border-t sm:border-t-0 border-gray-100 dark:border-slate-800 pt-2 sm:pt-0 ${
                dir === 'rtl' ? 'text-right border-r sm:border-r border-l-0 border-gray-100 dark:border-slate-800 pr-4 pl-0' : 'text-left border-l sm:border-l border-gray-100 dark:border-slate-800 pl-4 pr-0'
              }`}>
                <div className="text-2xl font-extrabold text-emerald-800 dark:text-emerald-400">100%</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{t.customsClearance}</div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

