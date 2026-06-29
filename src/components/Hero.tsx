/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, FileText, Send, ShieldCheck, Award, Globe, HelpCircle } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

interface HeroProps {
  onQuoteClick: () => void;
  onDownloadCatalog: () => void;
}

export default function Hero({ onQuoteClick, onDownloadCatalog }: HeroProps) {
  const { t, dir } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white overflow-hidden py-20 lg:py-28">
      {/* Dynamic Background Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,160,23,0.1),transparent_45%)]"></div>
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

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
                <svg className="w-5 h-5 fill-current text-emerald-600" viewBox="0 0 24 24">
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

