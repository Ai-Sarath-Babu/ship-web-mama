/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Globe, ShieldAlert, BadgeDollarSign, Truck, FileCheck2, Zap } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

export default function TrustSection() {
  const { t, dir } = useLanguage();

  const icons = [
    <div className="relative p-3 bg-gradient-to-tr from-blue-600 to-indigo-400 text-white rounded-xl shadow-lg border border-blue-400/20 animate-float-3d shrink-0">
      <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full scale-110"></div>
      <Globe className="w-6 h-6 relative z-10" />
    </div>,
    <div className="relative p-3 bg-gradient-to-tr from-red-600 to-rose-400 text-white rounded-xl shadow-lg border border-red-400/20 animate-float-3d-delayed shrink-0">
      <div className="absolute inset-0 bg-red-500/20 blur-md rounded-full scale-110"></div>
      <ShieldAlert className="w-6 h-6 relative z-10" />
    </div>,
    <div className="relative p-3 bg-gradient-to-tr from-amber-500 to-yellow-400 text-white rounded-xl shadow-lg border border-amber-400/20 animate-float-3d shrink-0">
      <div className="absolute inset-0 bg-amber-500/20 blur-md rounded-full scale-110"></div>
      <BadgeDollarSign className="w-6 h-6 relative z-10" />
    </div>,
    <div className="relative p-3 bg-gradient-to-tr from-cyan-500 to-teal-400 text-white rounded-xl shadow-lg border border-cyan-400/20 animate-float-3d-delayed shrink-0">
      <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full scale-110"></div>
      <Zap className="w-6 h-6 relative z-10" />
    </div>,
    <div className="relative p-3 bg-gradient-to-tr from-emerald-600 to-green-400 text-white rounded-xl shadow-lg border border-emerald-400/20 animate-float-3d shrink-0">
      <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full scale-110"></div>
      <FileCheck2 className="w-6 h-6 relative z-10" />
    </div>,
    <div className="relative p-3 bg-gradient-to-tr from-purple-600 to-fuchsia-400 text-white rounded-xl shadow-lg border border-purple-400/20 animate-float-3d-delayed shrink-0">
      <div className="absolute inset-0 bg-purple-500/20 blur-md rounded-full scale-110"></div>
      <Truck className="w-6 h-6 relative z-10" />
    </div>
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Visual Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-[11px] uppercase tracking-widest text-emerald-700 font-bold">
            {t.trustBadge}
          </h2>
          <p className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {t.trustTitle}
          </p>
          <div className="w-12 h-1 bg-emerald-700 mx-auto mt-3 rounded"></div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.trustPoints.map((point, index) => (
            <div 
              key={index} 
              id={`trust-card-${index}`}
              className={`flex items-start gap-4 p-5 rounded-xl border border-gray-150 bg-gray-50/50 hover:bg-white hover:border-emerald-700/20 hover:shadow-md transition-all duration-300 ${
                dir === 'rtl' ? 'flex-row-reverse text-right' : 'text-left'
              }`}
            >
              <div className="shrink-0">
                {icons[index] || icons[0]}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 font-display">
                  {point.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

