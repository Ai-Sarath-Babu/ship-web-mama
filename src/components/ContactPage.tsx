/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../utils/LanguageContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const { lang, dir } = useLanguage();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    country: '',
    email: '',
    whatsapp: '',
    productRequirement: '',
    quantity: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        leadSource: 'Form',
        date: new Date().toISOString(),
        status: 'Pending'
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSubmittedEmail(formData.email);
        setSuccess(true);
        setFormData({
          companyName: '',
          contactPerson: '',
          country: '',
          email: '',
          whatsapp: '',
          productRequirement: '',
          quantity: '',
          message: ''
        });
      }
    } catch (err) {
      console.error("Error submitting contact form", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-gray-50/50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] uppercase tracking-widest text-emerald-800 font-extrabold block">
            {lang === 'ar' ? "تواصل معنا" : "International Trading Desk"}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {lang === 'ar' ? "ابدأ استشارة الاستيراد اليوم" : "Initiate Sourcing Consultation"}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed font-light">
            {lang === 'ar' 
              ? "مكتب الحسابات الدولية لدينا جاهز لتزويدك بأسعار FOB / CIF، والتفاصيل اللوجستية، وعينات المنتجات الفورية."
              : "Our international trade desk is prepared to provide comprehensive FOB/CIF quotations, bulk logistics setups, and quick samples."}
          </p>
          <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Contact Split Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Columns (4 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className={`space-y-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <h2 className="font-display text-2xl font-bold text-gray-900">
                {lang === 'ar' ? "قنوات الاتصال المباشرة" : "Direct Communications"}
              </h2>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                {lang === 'ar'
                  ? "تواصل مع مكاتب المبيعات واللوجستيات لدينا مباشرة للحصول على استجابات تجارية عاجلة."
                  : "Reach out to our respective sales, quarry booking, and logistics managers through direct commercial lines."}
              </p>
            </div>

            {/* Communication channels with 3D Icons */}
            <div className="space-y-6">
              
              {/* Channel 1: Email */}
              <div className={`flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-xs hover:border-emerald-700/20 hover:shadow-md transition-all duration-300 ${dir === 'rtl' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 text-white flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_8px_-2px_rgba(245,158,11,0.2)] border border-amber-400/10 shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {lang === 'ar' ? "البريد الإلكتروني للعمل" : "Official B2B Email"}
                  </h4>
                  <a href="mailto:prabhu@yaliniexim.com" className="text-sm font-semibold text-gray-900 hover:text-emerald-700 select-all block font-mono">
                    prabhu@yaliniexim.com
                  </a>
                  <p className="text-[10px] text-gray-400 font-light">
                    {lang === 'ar' ? "استجابة رسمية خلال 4-8 ساعات" : "Average response window: 4 to 8 hours"}
                  </p>
                </div>
              </div>

              {/* Channel 2: WhatsApp / Call */}
              <div className={`flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-xs hover:border-emerald-700/20 hover:shadow-md transition-all duration-300 ${dir === 'rtl' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_8px_-2px_rgba(16,185,129,0.2)] border border-emerald-400/10 shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {lang === 'ar' ? "الخط الساخن والواتساب" : "Direct Hotline & WhatsApp"}
                  </h4>
                  <a href="https://wa.me/919944823311" target="_blank" rel="noreferrer" className="text-sm font-semibold text-gray-900 hover:text-emerald-700 select-all block font-mono">
                    +91 99448 23311
                  </a>
                  <p className="text-[10px] text-gray-400 font-light">
                    {lang === 'ar' ? "متاح على مدار الساعة للمسائل اللوجستية العاجلة" : "Available 24/7 for urgent maritime container booking issues"}
                  </p>
                </div>
              </div>

              {/* Channel 3: Address */}
              <div className={`flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-xs hover:border-emerald-700/20 hover:shadow-md transition-all duration-300 ${dir === 'rtl' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_8px_-2px_rgba(245,158,11,0.2)] border border-amber-400/10 shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {lang === 'ar' ? "المقر الرئيسي وعمليات التعبئة" : "Corporate HQ & Packing Grounds"}
                  </h4>
                  <p className="text-xs text-gray-800 leading-relaxed font-light">
                    {lang === 'ar' 
                      ? "ياليني إكسيم، مدوراي، تاميل نادو، الهند."
                      : "Yalini Exim, Madurai, Tamil Nadu, India."}
                  </p>
                  <p className="text-[10px] text-gray-400 font-light">
                    {lang === 'ar' ? "بالقرب من ميناء توتيكورين وميناء تشيناي" : "Proximity: Easy dispatch through Tuticorin and Chennai strategic sea ports"}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Lead Capture Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl space-y-8">
              
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
                      {lang === 'ar' ? "تم إرسال رسالتك بنجاح!" : "Sourcing Request Dispatched"}
                    </h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed font-light">
                      {lang === 'ar'
                        ? "شكرًا لتواصلك معنا. سيقوم أحد مسؤولي اللوجستيات لدينا بإعداد قائمة أسعار أولية FOB/CIF والتواصل معك قريباً."
                        : "Thank you for partnering with Yalini Exim. Our commercial lead analyst is formulating your customized FOB/CIF quotes."}
                    </p>
                  </div>

                  {submittedEmail && (
                    <div className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-4 max-w-md mx-auto space-y-2 text-left shadow-xs">
                      <div className={`flex items-center gap-2 text-emerald-800 ${lang === 'ar' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {lang === 'ar' ? "تأكيد بريد الكتروني تلقائي" : "Automated Receipt Verified"}
                        </span>
                      </div>
                      <p className={`text-[11px] text-gray-600 leading-normal font-light ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                        {lang === 'ar'
                          ? `تم إرسال بريد شكر وتأكيد طلبك إلى بريدك الإلكتروني للعمل: `
                          : `An instant confirmation voucher with full tracking code has been fired to your business inbox: `}
                        <strong className="text-emerald-900 font-mono font-semibold block mt-1 break-all bg-white px-2 py-1 rounded border border-emerald-100">{submittedEmail}</strong>
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className={`space-y-1.5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <h3 className="font-display text-lg font-bold text-gray-900">
                      {lang === 'ar' ? "أرسل متطلبات الشراء الخاصة بك" : "Submit RFQ Information"}
                    </h3>
                    <p className="text-xs text-gray-400 font-light">
                      {lang === 'ar' 
                        ? "املأ هذا النموذج بالتفصيل لمساعدة مكاتبنا على تجميع المواصفات والأسعار الصحيحة بشكل أسرع."
                        : "Fill out the fields to enable our managers to quickly compile appropriate physical specifications."}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">
                        {lang === 'ar' ? "اسم الشركة *" : "Company Name *"}
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800"
                        placeholder="e.g. Al-Futtaim Hotels"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">
                        {lang === 'ar' ? "اسم الشخص المسؤول *" : "Contact Person *"}
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        required
                        value={formData.contactPerson}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800"
                        placeholder="e.g. Prabhu Deva"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">
                        {lang === 'ar' ? "البريد الإلكتروني للعمل *" : "Business Email *"}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800"
                        placeholder="e.g. buyer@hotelchain.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">
                        {lang === 'ar' ? "بلد الوصول والمنفذ *" : "Destination Country & Port *"}
                      </label>
                      <input
                        type="text"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800"
                        placeholder="e.g. Jebel Ali, Dubai UAE"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">
                        {lang === 'ar' ? "المنتج المطلوب ومواصفاته *" : "Requested Commodity *"}
                      </label>
                      <input
                        type="text"
                        name="productRequirement"
                        required
                        value={formData.productRequirement}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800"
                        placeholder="e.g. Ruby Red Granite calibrated slab (20mm)"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">
                        {lang === 'ar' ? "الكمية التقديرية (حاويات أو قطع) *" : "Estimated Volume (FCL/Units) *"}
                      </label>
                      <input
                        type="text"
                        name="quantity"
                        required
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800"
                        placeholder="e.g. 3 x 20ft FCL container loads"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block">
                      {lang === 'ar' ? "تفاصيل إضافية أو تعليمات خاصة" : "Custom Quality Instructions"}
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800"
                      placeholder="Specify size calibrations, edge finishes, desired incoterms (FOB/CIF), or moisture constraints."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-650 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? (lang === 'ar' ? "جاري الإرسال للتسجيل..." : "Transmitting RFQ...") : (lang === 'ar' ? "إرسال طلب التصدير الرسمي" : "Transmit Sourcing RFQ")}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
