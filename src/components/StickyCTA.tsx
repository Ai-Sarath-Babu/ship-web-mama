/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, FileText, Send } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

interface StickyCTAProps {
  onQuoteClick: () => void;
  onDownloadCatalog: () => void;
}

export default function StickyCTA({ onQuoteClick, onDownloadCatalog }: StickyCTAProps) {
  const { lang } = useLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md shadow-[0_-4px_12px_rgba(0,0,0,0.05)] border-t border-gray-100 py-3.5 px-4 block md:hidden animate-slideUp">
      <div className="grid grid-cols-4 gap-2 text-center">
        {/* Call Link */}
        <a
          href="tel:+919944823311"
          className="flex flex-col items-center justify-center text-gray-700 hover:text-emerald-800 space-y-1"
        >
          <div className="p-2 bg-gray-100 hover:bg-emerald-50 rounded-full text-gray-700 hover:text-emerald-700 transition-colors">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold tracking-wide">
            {lang === 'ar' ? 'اتصل بنا' : 'Call Us'}
          </span>
        </a>

        {/* WhatsApp Link */}
        <a
          href="https://wa.me/919944823311?text=Hi%20Yalini%20Exim,%20I'm%20interested%20in%20your%20export%20products."
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center text-gray-700 hover:text-emerald-800 space-y-1"
        >
          <div className="p-2 bg-green-50 rounded-full text-green-600 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.515 0 10.002-4.493 10.006-10.01.002-2.673-1.04-5.184-2.937-7.084-1.897-1.898-4.413-2.943-7.08-2.944-5.524 0-10.017 4.494-10.02 10.011-.001 1.83.483 3.614 1.4 5.176l-.102.37-1.026 3.743 3.83-1.002.372-.224zm10.614-4.82c-.24-.12-1.42-.7-1.643-.78-.223-.08-.386-.12-.55.12-.163.24-.63.78-.77.94-.14.16-.28.18-.52.06-1.226-.61-2.016-1.08-2.812-2.436-.21-.36.21-.33.6-.11.12.07.24.12.36.18.12.06.18.1.24.22.06.12.03.46-.09.7-.12.24-.55 1.32-.75 1.8-.195.48-.39.41-.53.42-.133.01-.286.01-.44.01-.153 0-.404.06-.615.29-.211.23-.806.78-.806 1.9s.815 2.2 1.025 2.48c.21.28 1.625 2.48 3.935 3.48.55.24 1.15.38 1.76.3.62-.08 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
            </svg>
          </div>
          <span className="text-[10px] font-semibold tracking-wide">
            {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
          </span>
        </a>

        {/* Catalog Action */}
        <button
          onClick={onDownloadCatalog}
          className="flex flex-col items-center justify-center text-gray-700 hover:text-emerald-800 space-y-1 cursor-pointer"
        >
          <div className="p-2 bg-amber-50 rounded-full text-amber-600 transition-colors">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold tracking-wide">
            {lang === 'ar' ? 'الكتالوج' : 'Catalog'}
          </span>
        </button>

        {/* Quote Action */}
        <button
          id="sticky-quote-btn"
          onClick={onQuoteClick}
          className="flex flex-col items-center justify-center text-gray-700 hover:text-emerald-800 space-y-1 cursor-pointer"
        >
          <div className="p-2 bg-emerald-50 rounded-full text-emerald-700 transition-colors">
            <Send className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold tracking-wide">
            {lang === 'ar' ? 'طلب سعر' : 'Get Quote'}
          </span>
        </button>
      </div>
    </div>
  );
}

