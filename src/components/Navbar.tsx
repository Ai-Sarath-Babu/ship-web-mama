/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, Globe, Shield, Search, Menu, X, ArrowRight, ExternalLink, Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../utils/LanguageContext';
import { useTheme } from '../utils/ThemeContext';

interface NavbarProps {
  onQuoteClick: (productName?: string) => void;
  onAdminToggle: () => void;
  isAdminMode: boolean;
  showAdminBtn?: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activePage: string;
  onPageChange: (page: 'home' | 'about' | 'collections' | 'faq' | 'contact' | 'more' | 'profile') => void;
}

export default function Navbar({
  onQuoteClick,
  onAdminToggle,
  isAdminMode,
  showAdminBtn = false,
  searchQuery,
  onSearchChange,
  activePage,
  onPageChange,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Pristine Emerald-Green & White Theme Styling Classes
  const topBarBg = 'bg-emerald-950';
  const topBarText = 'text-white text-xs py-2 px-4 sm:px-6 lg:px-8';
  const utilityIconColor = 'text-emerald-400';
  const activePillBg = 'bg-white text-emerald-950 font-bold';
  const inactivePillText = 'text-emerald-100 hover:text-white';
  const separatorColor = 'text-emerald-800';
  const pillContainerBg = 'bg-emerald-900 border border-emerald-800';
  
  const adminBtnClass = isAdminMode
    ? 'bg-emerald-500 text-emerald-950 font-medium'
    : 'bg-emerald-900 hover:bg-emerald-850 text-emerald-100 border border-emerald-800';

  const navActiveLink = 'text-emerald-700 dark:text-emerald-400 font-bold';
  const navHoverLink = 'text-gray-600 dark:text-gray-300 hover:text-emerald-750 dark:hover:text-emerald-350';
  const quoteBtnBg = 'bg-emerald-700 hover:bg-emerald-650';
  const quoteIconBg = 'p-2 text-gray-500 hover:text-emerald-750 hover:bg-emerald-50';

  const searchFocusRing = 'focus:ring-emerald-650';

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 shadow-sm border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
      {/* Top Utility Bar */}
      <div className={`${topBarBg} ${topBarText}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-emerald-100">
            <a href="mailto:prabhu@yaliniexim.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className={`w-3.5 h-3.5 ${utilityIconColor}`} />
              <span>prabhu@yaliniexim.com</span>
            </a>
            <span className={`hidden sm:inline ${separatorColor}`}>|</span>
            <a href="tel:+919944823311" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className={`w-3.5 h-3.5 ${utilityIconColor}`} />
              <span>+91 99448 23311</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-emerald-100">
            <span className="flex items-center gap-1">
              <Globe className={`w-3.5 h-3.5 ${utilityIconColor}`} />
              <span>{t.worldwideDelivery}</span>
            </span>
            <span className={`hidden md:inline ${separatorColor}`}>|</span>
            
            {/* Elegant Language Switcher Pill */}
            <div className={`flex items-center gap-0.5 p-0.5 rounded ${pillContainerBg}`}>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 text-[10px] rounded transition-all font-semibold cursor-pointer ${
                  lang === 'en' ? activePillBg : inactivePillText
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ar')}
                className={`px-2 py-0.5 text-[10px] rounded transition-all font-semibold cursor-pointer ${
                  lang === 'ar' ? activePillBg : inactivePillText
                }`}
              >
                العربية
              </button>
            </div>

            {(showAdminBtn || isAdminMode) && (
              <>
                <span className={`hidden md:inline ${separatorColor}`}>|</span>
                <button
                  id="admin-toggle-btn"
                  onClick={onAdminToggle}
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition-all cursor-pointer ${adminBtnClass}`}
                >
                  <Shield className="w-3 h-3" />
                  <span>{isAdminMode ? t.exitAdmin : t.adminConsole}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => onPageChange('home')} className="flex items-center shrink-0 group cursor-pointer bg-transparent border-none">
            <Logo className="h-11" variant="color" />
          </button>

          {/* Search Bar - Hidden in Admin Mode */}
          {!isAdminMode && (
            <div className="hidden md:flex items-center max-w-md w-full relative">
              <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'right-3' : 'left-3'} flex items-center pointer-events-none`}>
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${searchFocusRing} focus:bg-white transition-all text-gray-800 ${
                  dir === 'rtl' ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                }`}
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className={`absolute ${dir === 'rtl' ? 'left-3' : 'right-3'} text-xs text-gray-400 hover:text-gray-600 font-medium`}
                >
                  {t.clear}
                </button>
              )}
            </div>
          )}

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <button onClick={() => onPageChange('home')} className={`text-sm font-medium cursor-pointer transition-colors ${activePage === 'home' ? navActiveLink : navHoverLink}`}>{t.navHome}</button>
            <button onClick={() => onPageChange('about')} className={`text-sm font-medium cursor-pointer transition-colors ${activePage === 'about' ? navActiveLink : navHoverLink}`}>{t.navAbout}</button>
            <button onClick={() => onPageChange('collections')} className={`text-sm font-medium cursor-pointer transition-colors ${activePage === 'collections' ? navActiveLink : navHoverLink}`}>{t.navCollections}</button>
            <button onClick={() => onPageChange('faq')} className={`text-sm font-medium cursor-pointer transition-colors ${activePage === 'faq' ? navActiveLink : navHoverLink}`}>{t.navFAQ}</button>
            <button onClick={() => onPageChange('contact')} className={`text-sm font-medium cursor-pointer transition-colors ${activePage === 'contact' ? navActiveLink : navHoverLink}`}>{t.navContact}</button>
            <button onClick={() => onPageChange('more')} className={`text-sm font-medium cursor-pointer transition-colors ${activePage === 'more' ? navActiveLink : navHoverLink}`}>{t.navMore}</button>
            <button onClick={() => onPageChange('profile')} className={`text-sm font-medium cursor-pointer transition-colors ${activePage === 'profile' ? navActiveLink : navHoverLink}`}>{lang === 'ar' ? 'تتبع الشحنة' : 'Track Shipment'}</button>
          </nav>

          {/* Action Button & Main Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors cursor-pointer text-gray-500 hover:text-emerald-750 hover:bg-emerald-50 dark:hover:bg-slate-800"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-emerald-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>

            <button
              id="get-quote-nav-btn"
              onClick={() => onQuoteClick()}
              className={`inline-flex items-center gap-1.5 px-4 py-2 ${quoteBtnBg} text-white font-medium text-sm rounded-lg shadow-sm hover:shadow transition-all cursor-pointer`}
            >
              <span>{t.getExportQuote}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-emerald-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-6 space-y-4 animate-fadeIn">
          {/* Mobile Language Switcher */}
          <div className={`flex items-center justify-between border-b border-gray-100 pb-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-700" />
              <span>Language / اللغة</span>
            </span>
            <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg border border-gray-200">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs rounded-md font-bold transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-gray-600 hover:text-emerald-700'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('ar')}
                className={`px-3 py-1 text-xs rounded-md font-bold transition-all cursor-pointer ${
                  lang === 'ar'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-gray-600 hover:text-emerald-700'
                }`}
              >
                العربية
              </button>
            </div>
          </div>

          {/* Mobile Theme Switcher */}
          <div className={`flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-emerald-400" /> : <Moon className="w-4 h-4 text-emerald-700" />}
              <span>{lang === 'ar' ? 'المظهر' : 'Theme'}</span>
            </span>
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-xs font-bold rounded-lg text-gray-700 dark:text-gray-200 transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{lang === 'ar' ? 'وضع النهار' : 'Light Mode'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-gray-500" />
                  <span>{lang === 'ar' ? 'وضع الليل' : 'Dark Mode'}</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Search */}
          {!isAdminMode && (
            <div className="relative">
              <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'right-3' : 'left-3'} flex items-center pointer-events-none`}>
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="search-input-mobile"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none text-gray-800 ${
                  dir === 'rtl' ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                }`}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            {[
              { id: 'home', label: t.navHome },
              { id: 'about', label: t.navAbout },
              { id: 'collections', label: t.navCollections },
              { id: 'faq', label: t.navFAQ },
              { id: 'contact', label: t.navContact },
              { id: 'more', label: t.navMore },
              { id: 'profile', label: lang === 'ar' ? 'تتبع الشحنة' : 'Track Shipment' },
            ].map((pageItem) => {
              const activeBgClass = 'bg-emerald-50 text-emerald-800 font-bold';
              const hoverTextClass = 'hover:bg-emerald-50 hover:text-emerald-800';
              return (
                <button
                  key={pageItem.id}
                  onClick={() => { setMobileMenuOpen(false); onPageChange(pageItem.id as any); }}
                  className={`px-3 py-2 text-sm font-medium text-gray-700 ${hoverTextClass} rounded-lg transition-colors cursor-pointer ${
                    dir === 'rtl' ? 'text-right' : 'text-left'
                  } ${activePage === pageItem.id ? activeBgClass : ''}`}
                >
                  {pageItem.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onQuoteClick();
              }}
              className="w-full text-center px-4 py-2.5 bg-emerald-700 hover:bg-emerald-650 text-white font-medium text-sm rounded-lg transition-colors cursor-pointer"
            >
              {t.getExportQuote}
            </button>
            {(showAdminBtn || isAdminMode) && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAdminToggle();
                }}
                className={`w-full text-center px-4 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  dir === 'rtl' ? 'flex-row-reverse' : ''
                }`}
              >
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>{isAdminMode ? t.exitAdmin : t.adminConsole}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

