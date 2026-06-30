/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, Globe, ShieldCheck, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../utils/LanguageContext';
import { useTheme } from '../utils/ThemeContext';

interface FooterProps {
  onQuoteClick: () => void;
  onAdminToggle: () => void;
  showAdminBtn?: boolean;
  onPageChange: (page: 'home' | 'about' | 'collections' | 'faq' | 'contact' | 'more') => void;
}

export default function Footer({ onQuoteClick, onAdminToggle, showAdminBtn = false, onPageChange }: FooterProps) {
  const { lang, t, dir } = useLanguage();

  // Pristine Emerald-Green & White Theme Styling Classes
  const footerClass = "bg-emerald-950 text-white pt-16 pb-24 md:pb-12 scroll-mt-20 border-t border-emerald-900";

  const footerGridBorder = "border-b border-emerald-900";

  const textSecondaryClass = "text-xs text-emerald-100/80 leading-relaxed font-light";

  const badgeClass = "flex items-center gap-2 bg-emerald-900 border border-emerald-800 p-3 rounded-lg text-xs font-bold text-emerald-400";

  const badgeIconClass = "w-5 h-5 shrink-0 text-emerald-400";

  const columnTitleClass = "text-xs font-bold uppercase tracking-wider text-emerald-400";

  const linkContainerClass = "flex flex-col gap-2.5 text-xs text-emerald-100/80 font-light";

  const linkHoverClass = "hover:text-white transition-colors";

  const chevronClass = "w-3.5 h-3.5 text-emerald-800";

  const contactIconClass = "w-4 h-4 text-emerald-400 shrink-0";

  const contactTextClass = "space-y-3.5 text-xs text-emerald-100/80 font-light";

  const lowerBarTextClass = "pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-emerald-200/60";

  const lowerLinkHoverClass = "hover:text-white transition-colors";

  return (
    <footer className={footerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 pb-12 ${footerGridBorder}`}>
          
          {/* Column 1: Company Info */}
          <div className={`lg:col-span-4 space-y-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <Logo variant="light" className="h-11" />

            <p className={textSecondaryClass}>
              {lang === 'ar' 
                ? 'ياليني إكسيم هي شريك تصدير وتوريد عالمي معتمد لتصنيع المنتجات الهندية المتميزة بما في ذلك أدوات المائدة البورسلين الفاخرة، الفخاريات، أوعية التقديم، مستلزمات المطابخ، بياضات الطاولة والقطنيات الفاخرة، الجرانيت الطبيعي (الأحمر والأسود اللامع)، وجرانيت الأرضيات والرخام الهندي.'
                : 'Yalini Exim is a certified global exporter specializing in premium porcelain tableware, fine crockeries, serving bowls, premium kitchen utilities, elegant cotton tablecloths, cutleries, high-grade Indian granites (Ruby Red & Black Galaxy), floor granites, and natural Indian marbles.'
              }
            </p>

            <div className={`${badgeClass} ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <ShieldCheck className={badgeIconClass} />
              <span>{lang === 'ar' ? 'حامل ترخيص معتمد للاستيراد والتصدير (IEC) | معتمد حكومياً' : 'IEC Certified License Holder | Govt. Approved'}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={`lg:col-span-2 space-y-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <h4 className={columnTitleClass}>{lang === 'ar' ? 'الشركة' : 'Company'}</h4>
            <div className={linkContainerClass}>
              <button onClick={() => onPageChange('about')} className={`${linkHoverClass} flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 text-left ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                <ChevronRight className={`${chevronClass} ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                <span>{t.aboutUs}</span>
              </button>
              <button onClick={() => onPageChange('home')} className={`${linkHoverClass} flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 text-left ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                <ChevronRight className={`${chevronClass} ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                <span>{lang === 'ar' ? 'الكفاءات الأساسية' : 'Core Capabilities'}</span>
              </button>
              <button onClick={() => onPageChange('more')} className={`${linkHoverClass} flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 text-left ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                <ChevronRight className={`${chevronClass} ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                <span>{lang === 'ar' ? 'بوابة الأخبار' : 'Trade Insights'}</span>
              </button>
              <button onClick={() => onPageChange('faq')} className={`${linkHoverClass} flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 text-left ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                <ChevronRight className={`${chevronClass} ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                <span>{lang === 'ar' ? 'الأسئلة الشائعة' : 'Trade FAQs'}</span>
              </button>
            </div>
          </div>

          {/* Column 3: Category Shortcuts */}
          <div className={`lg:col-span-3 space-y-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <h4 className={columnTitleClass}>{lang === 'ar' ? 'فئات التصدير' : 'Export Categories'}</h4>
            <div className={linkContainerClass}>
              <button onClick={() => onPageChange('collections')} className={`${linkHoverClass} flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 text-left ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                <ChevronRight className={`${chevronClass} ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                <span>{lang === 'ar' ? 'أدوات المائدة وفخاريات الفنادق والمطاعم' : 'Restaurant Tableware & Crockeries'}</span>
              </button>
              <button onClick={() => onPageChange('collections')} className={`${linkHoverClass} flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 text-left ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                <ChevronRight className={`${chevronClass} ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                <span>{lang === 'ar' ? 'أدوات المطبخ والسكاكين المتنوعة' : 'Kitchenware, Cutleries & Items'}</span>
              </button>
              <button onClick={() => onPageChange('collections')} className={`${linkHoverClass} flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 text-left ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                <ChevronRight className={`${chevronClass} ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                <span>{lang === 'ar' ? 'مفارش طاولات قطنية فاخرة' : 'Premium Cotton Tablecloths'}</span>
              </button>
              <button onClick={() => onPageChange('collections')} className={`${linkHoverClass} flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 text-left ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                <ChevronRight className={`${chevronClass} ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                <span>{lang === 'ar' ? 'جرانيت روبي ريد وبلاك جالاكسي الفاخر' : 'Ruby Red, Black Galaxy & Floor Granites'}</span>
              </button>
              <button onClick={() => onPageChange('collections')} className={`${linkHoverClass} flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 text-left ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                <ChevronRight className={`${chevronClass} ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                <span>{lang === 'ar' ? 'رخام أبيض هندي طبيعي ممتاز' : 'Makrana White Indian Marbles'}</span>
              </button>
            </div>
          </div>

          {/* Column 4: Contact & Reg */}
          <div className={`lg:col-span-3 space-y-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <h4 className={columnTitleClass}>{lang === 'ar' ? 'المقر الرئيسي' : 'Headquarters'}</h4>
            <ul className={`${contactTextClass} space-y-3.5`}>
              <li className={`flex items-start gap-2.5 ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                <MapPin className={`${contactIconClass} mt-0.5`} />
                <span>
                  <strong>Yalini Exim Corp:</strong><br />
                  No.8, Yalini Illam,<br />
                  Chockalinga nagar 1st street, Burma colony,<br />
                  Karaikudi - 630002, Tamilnadu - INDIA
                </span>
              </li>
              <li className={`flex items-center gap-2.5 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <Mail className={contactIconClass} />
                <a href="mailto:prabhu@yaliniexim.com" className={linkHoverClass}>prabhu@yaliniexim.com</a>
              </li>
              <li className={`flex items-center gap-2.5 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <Phone className={contactIconClass} />
                <a href="tel:+919944823311" className={linkHoverClass}>+91 99448 23311</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className={`${lowerBarTextClass} ${dir === 'rtl' ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
          <p>
            {lang === 'ar'
              ? '© 2026 ياليني إكسيم. جميع الحقوق محفوظة. تم تصنيعها وتعبئتها وتصديرها بعناية فائقة من الهند.'
              : '© 2026 Yalini Exim. All Rights Reserved. Sourced & packaged with care in India.'
            }
          </p>
          <div className="flex gap-4">
            <a href="#about" className={lowerLinkHoverClass}>{lang === 'ar' ? 'شروط التبادل التجاري' : 'Terms of Trade'}</a>
            <span>•</span>
            <a href="#products" className={lowerLinkHoverClass}>{lang === 'ar' ? 'إرشادات FOB' : 'FOB Guidelines'}</a>
            {showAdminBtn && (
              <>
                <span>•</span>
                <button onClick={onAdminToggle} className={`${lowerLinkHoverClass} underline cursor-pointer bg-transparent border-none p-0`}>
                  {lang === 'ar' ? 'بوابة المدير' : 'Admin Gateway'}
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
