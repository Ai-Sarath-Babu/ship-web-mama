/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Ship, Anchor, Compass, Navigation, Waves, ArrowRight, FileText, Send, ShieldCheck, Award, Globe, HelpCircle } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

interface HeroProps {
  onQuoteClick: () => void;
  onDownloadCatalog: () => void;
}

export default function Hero({ onQuoteClick, onDownloadCatalog }: HeroProps) {
  const { lang, t, dir } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white overflow-hidden py-20 lg:py-28">
      
      {/* Floating Glassmorphic Ship & Navigation Badges (Interactive & Animated) */}
      
      {/* 1. Active Shipments Vessel Badge (Top Right) */}
      <motion.div 
        className="absolute top-[8%] right-[5%] z-20 hidden xl:flex items-center gap-3.5 bg-emerald-950/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] max-w-[280px]"
        initial={{ y: 0, rotate: -1 }}
        animate={{ 
          y: [0, -15, 0],
          rotate: [-1, 1, -1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative shrink-0 flex items-center justify-center w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
          <Ship className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
        </div>
        <div className="min-w-0">
          <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400 font-mono">
            {lang === 'ar' ? 'أسطول الشحن النشط' : 'Live Fleet Track'}
          </div>
          <h4 className="text-xs font-bold text-white mt-0.5 truncate">
            {lang === 'ar' ? 'سفينة ياليني: قيد العبور البحري' : 'Yalini Vessel: Ocean Transit'}
          </h4>
          <p className="text-[10px] text-emerald-200/70 mt-1 font-light truncate">
            {lang === 'ar' ? 'تشيناي ← ميناء نوتردام' : 'Chennai → Rotterdam'}
          </p>
        </div>
      </motion.div>

      {/* 2. Maritime Anchor Secure Badge (Left Middle) */}
      <motion.div 
        className="absolute top-[25%] left-[2%] z-20 hidden 2xl:flex items-center gap-3 bg-emerald-950/45 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 shadow-2xl max-w-[240px]"
        initial={{ y: 0, rotate: 0 }}
        animate={{ 
          y: [0, 12, 0],
          rotate: [0, -2, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="shrink-0 flex items-center justify-center w-10 h-10 bg-emerald-900/80 border border-emerald-800 rounded-xl text-amber-400">
          <Anchor className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="text-[9px] uppercase font-bold tracking-wider text-emerald-300 font-mono">
            {lang === 'ar' ? 'التوجيه واللوجستيات' : 'Trade Logistics'}
          </div>
          <h4 className="text-xs font-bold text-white mt-0.5">
            {lang === 'ar' ? 'تخليص جمركي مضمون 100%' : '100% Guaranteed Custom'}
          </h4>
        </div>
      </motion.div>

      {/* 3. Sea Wave Grid Overlay Behind Content */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="absolute bottom-0 left-0 w-full h-24 text-emerald-800/30" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 24C120 24 240 10 360 10C480 10 600 32 720 32C840 32 960 16 1080 16C1200 16 1320 28 1440 28V74H0V24Z" fill="currentColor" />
        </svg>
      </div>

      {/* Dynamic Background Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_45%)]"></div>
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Immersive Glassmorphic & Floating Ship-Related Background Animation Loop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle blur highlights for premium glass refraction */}
        <div className="absolute top-[20%] left-[15%] w-72 h-72 rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-[25%] right-[20%] w-80 h-80 rounded-full bg-amber-500/5 blur-[90px] pointer-events-none"></div>
        <div className="absolute top-[50%] right-[40%] w-64 h-64 rounded-full bg-emerald-600/10 blur-[100px] pointer-events-none"></div>

        {/* 1. Floating Ship Glassmorphic Icon */}
        <motion.div
          className="absolute top-[15%] left-[8%] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-lg flex items-center justify-center text-amber-400"
          animate={{
            y: [0, -18, 0],
            x: [0, 8, 0],
            rotate: [0, 4, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Ship className="w-6 h-6 opacity-45" />
        </motion.div>

        {/* 2. Floating Anchor Glassmorphic Icon */}
        <motion.div
          className="absolute bottom-[18%] left-[12%] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-lg flex items-center justify-center text-emerald-300"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
            rotate: [0, -6, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <Anchor className="w-5 h-5 opacity-40" />
        </motion.div>

        {/* 3. Floating Compass Glassmorphic Icon */}
        <motion.div
          className="absolute top-[45%] left-[28%] bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-3.5 shadow-lg flex items-center justify-center text-amber-500"
          animate={{
            y: [0, -12, 0],
            rotate: [0, 360]
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
        >
          <Compass className="w-5 h-5 opacity-40" />
        </motion.div>

        {/* 4. Floating Navigation Arrow Glassmorphic Icon */}
        <motion.div
          className="absolute top-[20%] right-[32%] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-lg flex items-center justify-center text-emerald-200"
          animate={{
            y: [0, 16, 0],
            x: [0, 12, 0],
            rotate: [45, 60, 45]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <Navigation className="w-5 h-5 opacity-35" />
        </motion.div>

        {/* 5. Floating Waves Glassmorphic Icon */}
        <motion.div
          className="absolute bottom-[30%] right-[8%] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 shadow-lg flex items-center justify-center text-amber-400"
          animate={{
            y: [0, -14, 0],
            x: [0, -12, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <Waves className="w-6 h-6 opacity-45" />
        </motion.div>

        {/* 6. Floating Globe Glassmorphic Icon */}
        <motion.div
          className="absolute top-[65%] left-[5%] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-2.5 shadow-lg flex items-center justify-center text-emerald-300"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -10, 0],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2
          }}
        >
          <Globe className="w-5 h-5 opacity-35" />
        </motion.div>

        {/* 7. Floating Additional Ship Vessel Badge Center-Right */}
        <motion.div
          className="absolute top-[50%] right-[25%] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-xl flex items-center justify-center text-amber-500"
          animate={{
            y: [0, -20, 0],
            x: [0, 6, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        >
          <div className="flex flex-col items-center gap-1">
            <Ship className="w-5 h-5 opacity-50" />
            <span className="text-[7px] tracking-widest font-mono text-emerald-300 uppercase opacity-40">CARGO</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className={`lg:col-span-7 space-y-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/80 border border-emerald-750 rounded-full text-xs font-medium text-amber-400">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>{t.globalTradingPartner}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {t.heroTitle}
            </h1>

            <p className="text-lg text-emerald-100 max-w-2xl leading-relaxed font-light">
              {t.heroDesc}
            </p>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row gap-4 pt-2 ${dir === 'rtl' ? 'sm:flex-row-reverse justify-end' : ''}`}>
              <button
                id="hero-get-quote-btn"
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-450 text-emerald-950 font-bold text-base rounded-lg transition-all shadow-lg shadow-amber-500/10 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{t.getExportQuote}</span>
                <ArrowRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </button>

              <button
                id="hero-catalog-btn"
                onClick={onDownloadCatalog}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-800 hover:bg-emerald-750 text-white font-semibold text-base rounded-lg border border-emerald-700 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <FileText className="w-5 h-5 text-amber-400" />
                <span>{t.downloadCatalog}</span>
              </button>

              <a
                href="https://wa.me/919944823311?text=Hi%20Yalini%20Exim,%20I'm%20interested%20in%20your%20export%20products."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-50 text-emerald-900 font-semibold text-base rounded-lg transition-all hover:-translate-y-0.5 shadow"
              >
                <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.515 0 10.002-4.493 10.006-10.01.002-2.673-1.04-5.184-2.937-7.084-1.897-1.898-4.413-2.943-7.08-2.944-5.524 0-10.017 4.494-10.02 10.011-.001 1.83.483 3.614 1.4 5.176l-.102.37-1.026 3.743 3.83-1.002.372-.224zm10.614-4.82c-.24-.12-1.42-.7-1.643-.78-.223-.08-.386-.12-.55.12-.163.24-.63.78-.77.94-.14.16-.28.18-.52.06-1.226-.61-2.016-1.08-2.812-2.436-.21-.36.21-.33.6-.11.12.07.24.12.36.18.12.06.18.1.24.22.06.12.03.46-.09.7-.12.24-.55 1.32-.75 1.8-.195.48-.39.41-.53.42-.133.01-.286.01-.44.01-.153 0-.404.06-.615.29-.211.23-.806.78-.806 1.9s.815 2.2 1.025 2.48c.21.28 1.625 2.48 3.935 3.48.55.24 1.15.38 1.76.3.62-.08 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
                </svg>
                <span>{t.whatsapp}</span>
              </a>
            </div>

            {/* Highlighted B2B Pillars with modern 3D floating cards */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="group relative bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-all duration-300 hover:border-amber-500/30 shadow-2xl hover:shadow-emerald-500/5 hover:-translate-y-1 animate-float-3d">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-amber-500/20 blur-md rounded-full scale-110"></div>
                  <div className="relative p-3 bg-gradient-to-tr from-amber-500 to-yellow-300 text-emerald-950 rounded-xl shadow-lg border border-amber-400/20">
                    <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">{t.qualityCertified}</h4>
                  <p className="text-[11px] text-emerald-200/80 mt-0.5 font-light">Certified premium exports</p>
                </div>
              </div>

              <div className="group relative bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-all duration-300 hover:border-amber-500/30 shadow-2xl hover:shadow-emerald-500/5 hover:-translate-y-1 animate-float-3d-delayed">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-amber-500/20 blur-md rounded-full scale-110"></div>
                  <div className="relative p-3 bg-gradient-to-tr from-amber-500 to-yellow-300 text-emerald-950 rounded-xl shadow-lg border border-amber-400/20">
                    <Award className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">{t.standardsAssured}</h4>
                  <p className="text-[11px] text-emerald-200/80 mt-0.5 font-light">International quality checks</p>
                </div>
              </div>

              <div className="group relative bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-all duration-300 hover:border-amber-500/30 shadow-2xl hover:shadow-emerald-500/5 hover:-translate-y-1 animate-float-3d">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-amber-500/20 blur-md rounded-full scale-110"></div>
                  <div className="relative p-3 bg-gradient-to-tr from-amber-500 to-yellow-300 text-emerald-950 rounded-xl shadow-lg border border-amber-400/20">
                    <Globe className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">FOB / CIF Sourcing</h4>
                  <p className="text-[11px] text-emerald-200/80 mt-0.5 font-light">Secure global logistics ports</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Showcase Column */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-[450px]">
              
              {/* Back ambient card */}
              <div className="absolute -inset-2 bg-emerald-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>

              {/* Floating Compass Badge */}
              <motion.div 
                className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-3 bg-emerald-950/90 backdrop-blur-md border border-emerald-700/50 rounded-2xl p-3.5 shadow-2xl"
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="relative flex items-center justify-center w-9 h-9 bg-emerald-900 border border-emerald-700 rounded-lg text-amber-400">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  >
                    <Compass className="w-5 h-5" />
                  </motion.div>
                </div>
                <div>
                  <div className="text-[9px] uppercase font-bold tracking-wider text-amber-400 font-mono">
                    {lang === 'ar' ? 'مسارات ذكية' : 'Smart Routing'}
                  </div>
                  <h5 className="text-[11px] font-bold text-white leading-tight">
                    {lang === 'ar' ? 'أقصر مسارات الشحن' : 'Lowest Freight Lines'}
                  </h5>
                </div>
              </motion.div>

              {/* Main Visual Frame */}
              <div className="relative bg-emerald-900 border border-emerald-800 rounded-2xl overflow-hidden p-3 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80"
                  alt="International Cargo Ship and Container Terminal"
                  className="w-full h-64 object-cover rounded-xl shadow-inner brightness-90"
                />
                
                {/* Overlay Badge for Fast Facts */}
                <div className={`absolute top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} bg-emerald-950/90 border border-emerald-700/50 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg shadow flex items-center gap-1.5`}>
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
                  <span>{dir === 'rtl' ? 'ميناء التحميل: تشيناي وموندرا' : 'Port of Loading: Chennai & Mundra'}</span>
                </div>

                {/* Micro metrics card below image */}
                <div className="mt-4 p-4 bg-emerald-950/50 rounded-xl border border-emerald-800/60 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-amber-400">100%</div>
                    <div className="text-[10px] text-emerald-200 uppercase tracking-wider">{t.customsClearance}</div>
                  </div>
                  <div className="border-x border-emerald-800/60">
                    <div className="text-lg font-bold text-amber-400">13+</div>
                    <div className="text-[10px] text-emerald-200 uppercase tracking-wider">{dir === 'rtl' ? 'الدول المخدومة' : 'Countries Served'}</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-amber-400">Flexible</div>
                    <div className="text-[10px] text-emerald-200 uppercase tracking-wider">{dir === 'rtl' ? 'حدود مرنة' : 'MOQ Limits'}</div>
                  </div>
                </div>
              </div>

              {/* Float Card: Private Label/OEM */}
              <div className={`absolute -bottom-6 ${dir === 'rtl' ? '-right-6' : '-left-6'} bg-amber-500 text-emerald-950 p-4 rounded-xl shadow-lg border border-amber-400/20 max-w-[190px] hidden sm:block ${
                dir === 'rtl' ? 'text-right' : 'text-left'
              }`}>
                <div className="font-bold text-sm">{dir === 'rtl' ? 'تتوفر صناعة خاصة OEM' : 'OEM / ODM Available'}</div>
                <div className="text-[11px] text-emerald-900 leading-tight mt-1">
                  {dir === 'rtl' ? 'مواصفات وتغليف مخصص لعلامتك التجارية لجميع الطلبات التجارية والمائدة.' : 'Custom sizes, custom print & private labeling options on all food ware & FMCG items.'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
