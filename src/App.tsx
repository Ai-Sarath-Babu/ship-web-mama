/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import AboutSection from './components/AboutSection';
import ProductSection from './components/ProductSection';
import WhyChooseUs from './components/WhyChooseUs';
import ExportMap from './components/ExportMap';
import Certifications from './components/Certifications';
import FAQSection from './components/FAQSection';
import BlogSection from './components/BlogSection';
import InquiryFormPopup from './components/InquiryFormPopup';
import StickyCTA from './components/StickyCTA';
import ExitIntentDetector from './components/ExitIntentDetector';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import CertificationBadges from './components/CertificationBadges';
import { Product, Category, Inquiry, Blog } from './types';
import { Sparkles, MessageCircle, AlertCircle, ArrowUp, Send, CheckCircle } from 'lucide-react';

import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import FAQPage from './components/FAQPage';
import CollectionsPage from './components/CollectionsPage';
import MorePage from './components/MorePage';
import ProfilePage from './components/ProfilePage';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isQuotePopupOpen, setIsQuotePopupOpen] = useState(false);
  const [prefilledProduct, setPrefilledProduct] = useState('');
  const [leadSource, setLeadSource] = useState<'Form' | 'ExitIntent' | 'Catalog' | 'WhatsApp'>('Form');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState<'home' | 'about' | 'collections' | 'faq' | 'contact' | 'more' | 'profile'>('home');

  // Synchronize activePage with URL on load/navigation
  useEffect(() => {
    const handleUrlSync = () => {
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page');
      if (page && ['home', 'about', 'collections', 'faq', 'contact', 'more', 'profile'].includes(page)) {
        setActivePage(page as any);
      }
    };
    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    return () => window.removeEventListener('popstate', handleUrlSync);
  }, []);

  const handlePageChange = (page: 'home' | 'about' | 'collections' | 'faq' | 'contact' | 'more' | 'profile') => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL query parameters
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    if (page !== 'collections') url.searchParams.delete('product');
    if (page !== 'more') url.searchParams.delete('blog');
    
    if (url.searchParams.get('page') !== new URLSearchParams(window.location.search).get('page')) {
      window.history.pushState({}, '', url.toString());
    }
  };

  // Server entities states with clean pre-population defaults
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [seo, setSeo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load database entities from Node Express server APIs
  const loadData = async () => {
    try {
      const prodRes = await fetch('/api/products');
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
      }

      const catRes = await fetch('/api/categories');
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }

      const inqRes = await fetch('/api/inquiries');
      if (inqRes.ok) {
        const inqData = await inqRes.json();
        setInquiries(inqData);
      }

      const blogRes = await fetch('/api/blogs');
      if (blogRes.ok) {
        const blogData = await blogRes.json();
        setBlogs(blogData);
      }

      const seoRes = await fetch('/api/seo');
      if (seoRes.ok) {
        const seoData = await seoRes.json();
        setSeo(seoData);
      }
    } catch (err) {
      console.error("API connection failed. Fallback logic initialized", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Dynamically update SEO head meta tags based on active page
  useEffect(() => {
    if (!seo) return;
    
    // Determine active page override or global default
    const pageSeo = seo.pages?.[activePage];
    const title = pageSeo?.title || seo.title || "Yalini Exim | Premium Indian Sourcing & Sourcing Partner";
    const description = pageSeo?.description || seo.description || "Leading global trading partner exporting premium restaurant tableware, high-grade kitchenware, fine dining tablecloths, Makrana marble, and southern Indian granites.";
    const ogImage = pageSeo?.ogImage || seo.ogImage || "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80";

    // Update document title
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // Update OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // Update OpenGraph Image
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement('meta');
      ogImg.setAttribute('property', 'og:image');
      document.head.appendChild(ogImg);
    }
    ogImg.setAttribute('content', ogImage);

  }, [activePage, seo]);

  // Exit intent popup handler
  const handleExitIntent = () => {
    // Only prompt if no other modal is currently active
    if (!isQuotePopupOpen && !isAdminMode) {
      setLeadSource('ExitIntent');
      setPrefilledProduct('');
      setIsQuotePopupOpen(true);
    }
  };

  // Generic Quote popup trigger
  const handleTriggerQuote = (productName?: string) => {
    if (productName) {
      setPrefilledProduct(productName);
      setLeadSource('Form');
    } else {
      setPrefilledProduct('');
      setLeadSource('Form');
    }
    setIsQuotePopupOpen(true);
  };

  // Catalog Quote trigger
  const handleCatalogDownload = () => {
    setLeadSource('Catalog');
    setPrefilledProduct('Full Product Catalog PDF');
    setIsQuotePopupOpen(true);
  };

  // Inquiry Success alert
  const handleInquirySuccess = () => {
    loadData(); // Reload inquiries list for the Admin Dashboard
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col justify-between selection:bg-emerald-850 selection:text-white">
      
      {/* Desktop/Mobile Navigation */}
      <Navbar
        onQuoteClick={handleTriggerQuote}
        onAdminToggle={() => setIsAdminMode(!isAdminMode)}
        isAdminMode={isAdminMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activePage={activePage}
        onPageChange={handlePageChange}
      />

      {/* Exit Intent Listener (Only active on client viewport) */}
      <ExitIntentDetector onExitIntent={handleExitIntent} />

      {/* Main Container */}
      <main className="flex-grow">
        {isAdminMode ? (
          /* ADMINISTRATIVE CONSOLE */
          <AdminDashboard
            onRefresh={loadData}
            products={products}
            categories={categories}
            inquiries={inquiries}
            blogs={blogs}
            setProducts={setProducts}
            setInquiries={setInquiries}
            setBlogs={setBlogs}
          />
        ) : (
          /* CORE PUBLIC MULTI-PAGE LAYOUT */
          <div>
            {activePage === 'home' && (
              <div className="space-y-0">
                {/* 1. Hero banner */}
                <Hero
                  onQuoteClick={() => handleTriggerQuote()}
                  onDownloadCatalog={handleCatalogDownload}
                />

                {/* 2. Trust badges */}
                <TrustSection />

                {/* 3. About us */}
                <AboutSection />

                {/* 4. Products collection */}
                <ProductSection
                  products={products}
                  categories={categories}
                  onQuoteClick={handleTriggerQuote}
                  searchQuery={searchQuery}
                />

                {/* 5. Sourcing advantages */}
                <WhyChooseUs />

                {/* 6. International export network */}
                <ExportMap />

                {/* 7. Corporate certs & licenses */}
                <Certifications />

                {/* 8. Export Insights & Trade Intelligence Blog */}
                <BlogSection
                  blogs={blogs}
                  onQuoteClick={handleTriggerQuote}
                />

                {/* 9. Frequently Asked Questions */}
                <FAQSection />
              </div>
            )}

            {activePage === 'about' && <AboutPage />}

            {activePage === 'collections' && (
              <CollectionsPage
                products={products}
                categories={categories}
                onQuoteClick={handleTriggerQuote}
                searchQuery={searchQuery}
              />
            )}

            {activePage === 'faq' && <FAQPage />}

            {activePage === 'contact' && <ContactPage />}

            {activePage === 'more' && (
              <MorePage
                blogs={blogs}
                onQuoteClick={handleTriggerQuote}
              />
            )}

            {activePage === 'profile' && <ProfilePage />}
          </div>
        )}
      </main>

      {/* Certification Badges Trust Ribbon */}
      {!isAdminMode && <CertificationBadges />}

      {/* Footer information bar */}
      <Footer
        onQuoteClick={() => handleTriggerQuote()}
        onAdminToggle={() => setIsAdminMode(!isAdminMode)}
        onPageChange={handlePageChange}
      />

      {/* Sticky Quick-Bar for mobile (only active when not in admin mode) */}
      {!isAdminMode && (
        <StickyCTA
          onQuoteClick={() => handleTriggerQuote()}
          onDownloadCatalog={handleCatalogDownload}
        />
      )}

      {/* CRO Lead Generation Form Popup Modal */}
      <InquiryFormPopup
        isOpen={isQuotePopupOpen}
        onClose={() => setIsQuotePopupOpen(false)}
        prefilledProduct={prefilledProduct}
        leadSource={leadSource}
        onSuccess={handleInquirySuccess}
      />

      {/* Mini CTA float ring (desktop only) */}
      {!isAdminMode && (
        <div className="hidden md:block fixed bottom-6 right-6 z-30 space-y-3">
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/919944823311?text=Hi%20Yalini%20Exim,%20I'm%20interested%20in%20your%20export%20products."
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-emerald-600 hover:bg-emerald-550 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group"
            title="Chat on WhatsApp"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.515 0 10.002-4.493 10.006-10.01.002-2.673-1.04-5.184-2.937-7.084-1.897-1.898-4.413-2.943-7.08-2.944-5.524 0-10.017 4.494-10.02 10.011-.001 1.83.483 3.614 1.4 5.176l-.102.37-1.026 3.743 3.83-1.002.372-.224zm10.614-4.82c-.24-.12-1.42-.7-1.643-.78-.223-.08-.386-.12-.55.12-.163.24-.63.78-.77.94-.14.16-.28.18-.52.06-1.226-.61-2.016-1.08-2.812-2.436-.21-.36.21-.33.6-.11.12.07.24.12.36.18.12.06.18.1.24.22.06.12.03.46-.09.7-.12.24-.55 1.32-.75 1.8-.195.48-.39.41-.53.42-.133.01-.286.01-.44.01-.153 0-.404.06-.615.29-.211.23-.806.78-.806 1.9s.815 2.2 1.025 2.48c.21.28 1.625 2.48 3.935 3.48.55.24 1.15.38 1.76.3.62-.08 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
            </svg>
          </a>
        </div>
      )}

    </div>
  );
}
