/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, Mail, Globe, CheckCircle2, User, Phone, Layers, MessageSquare, Calculator, Scale, Calendar, Anchor, DollarSign } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

interface InquiryFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct?: string;
  leadSource?: 'Form' | 'ExitIntent' | 'Catalog' | 'WhatsApp';
  onSuccess: () => void;
}

export default function InquiryFormPopup({
  isOpen,
  onClose,
  prefilledProduct = '',
  leadSource = 'Form',
  onSuccess,
}: InquiryFormPopupProps) {
  const { lang, dir } = useLanguage();

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    country: '',
    email: '',
    whatsapp: '',
    productRequirement: '',
    quantity: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Interactive Shipping Calculator States
  const [showCalc, setShowCalc] = useState(false);
  const [calcType, setCalcType] = useState<'granite' | 'fmcg'>('granite');
  const [calcWeight, setCalcWeight] = useState<number>(25); // Metric Tons
  const [calcVolume, setCalcVolume] = useState<number>(30); // Cubic Meters (CBM)
  const [calcDest, setCalcDest] = useState<string>('UAE');
  const [appliedCalc, setAppliedCalc] = useState(false);

  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({ ...prev, productRequirement: prefilledProduct }));
    }
  }, [prefilledProduct, isOpen]);

  // Destination Zones Config for Shipping Cost Estimates
  const destZones = [
    { code: 'UAE', nameEn: 'UAE (Jebel Ali Port)', nameAr: 'الإمارات (ميناء جبل علي)', transit: '4-6 days', rate20: 800, rate40: 1400 },
    { code: 'UK', nameEn: 'United Kingdom (Felixstowe Port)', nameAr: 'المملكة المتحدة (ميناء فليكسستو)', transit: '18-22 days', rate20: 1800, rate40: 3200 },
    { code: 'SG', nameEn: 'Singapore (Port of Singapore)', nameAr: 'سنغافورة (ميناء سنغافورة)', transit: '6-8 days', rate20: 600, rate40: 1100 },
    { code: 'CA', nameEn: 'Canada (Port of Montreal)', nameAr: 'كندا (ميناء مونتريال)', transit: '25-30 days', rate20: 2800, rate40: 4800 },
    { code: 'AU', nameEn: 'Australia (Port of Sydney)', nameAr: 'أستراليا (ميناء سيدني)', transit: '20-25 days', rate20: 2200, rate40: 3900 },
  ];

  const selectedZone = destZones.find(z => z.code === calcDest) || destZones[0];

  let containerDesc = '';
  let oceanFreight = 0;
  let portFees = 0;
  let surcharge = 0;

  if (calcType === 'granite') {
    // Heavy natural stone: Max 25 Metric Tons per 20ft container (standard shipping regulations)
    const num20ft = Math.ceil(calcWeight / 25) || 1;
    containerDesc = `${num20ft} x 20ft FCL Container${num20ft > 1 ? 's' : ''}`;
    oceanFreight = num20ft * selectedZone.rate20;
    portFees = num20ft * 350; // Local THC, documentation & port handling
    surcharge = num20ft * 150; // Heavy lift surcharge & timber crate fumigation
  } else {
    // Volumetric FMCG: 20ft fits ~28 CBM, 40ft High Cube fits ~68 CBM
    let num20ft = 0;
    let num40ft = 0;
    let remainingVolume = calcVolume;

    num40ft = Math.floor(remainingVolume / 68);
    remainingVolume = remainingVolume % 68;
    if (remainingVolume > 28) {
      num40ft += 1;
    } else if (remainingVolume > 0) {
      num20ft += 1;
    }

    if (num20ft === 0 && num40ft === 0) num20ft = 1;

    const descParts = [];
    if (num20ft > 0) descParts.push(`${num20ft} x 20ft FCL`);
    if (num40ft > 0) descParts.push(`${num40ft} x 40ft HC`);
    containerDesc = descParts.join(' + ');

    oceanFreight = (num20ft * selectedZone.rate20) + (num40ft * selectedZone.rate40);
    portFees = (num20ft + num40ft) * 350;
    surcharge = (num20ft + num40ft) * 100; // Phytosanitary & cargo lashing
  }

  const totalShippingEstimate = oceanFreight + portFees + surcharge;

  const handleApplyCalc = () => {
    const cargoDetails = calcType === 'granite' 
      ? `${calcWeight} Metric Tons` 
      : `${calcVolume} CBM Volume`;

    setFormData(prev => ({
      ...prev,
      quantity: `${cargoDetails} (${containerDesc})`,
      country: lang === 'ar' ? selectedZone.nameAr : selectedZone.nameEn,
      productRequirement: prev.productRequirement || (calcType === 'granite' ? 'Premium Granite/Marble Slabs' : 'Fine Porcelain & FMCG Tableware'),
      message: `${prev.message}\n---\n[Ocean Freight Cost Estimate Applied]\nDestination: ${selectedZone.nameEn}\nCargo: ${cargoDetails}\nContainers: ${containerDesc}\nEstimated Ocean Freight: $${oceanFreight} USD\nPort Handling: $${portFees} USD\nExport Surcharges: $${surcharge} USD\nTotal Estimated CIF Surcharges: $${totalShippingEstimate} USD\nEstimated Transit Time: ${selectedZone.transit}\n---`.trim()
    }));

    setAppliedCalc(true);
    setTimeout(() => setAppliedCalc(false), 2000);
    setShowCalc(false);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.country) {
      setError(lang === 'ar' ? 'يرجى ملء جميع الحقول الإلزامية.' : 'Please fill in all mandatory fields.');
      return;
    }

    setLoading(true);
    setError('');
    const emailToConfirm = formData.email;
    setSubmittedEmail(emailToConfirm);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          leadSource,
        }),
      });

      if (!response.ok) {
        throw new Error(
          lang === 'ar'
            ? 'فشل إرسال طلب التصدير. يرجى المحاولة مرة أخرى.'
            : 'Failed to submit export inquiry. Please try again.'
        );
      }

      setSuccess(true);
      setFormData({
        companyName: '',
        contactPerson: '',
        country: '',
        email: '',
        whatsapp: '',
        productRequirement: '',
        quantity: '',
        message: '',
      });
      setTimeout(() => {
        setSuccess(false);
        setSubmittedEmail('');
        onSuccess();
        onClose();
      }, 4500);
    } catch (err: any) {
      setError(err.message || (lang === 'ar' ? 'خطأ في الاتصال بالخادم.' : 'Server connection error.'));
    } finally {
      setLoading(false);
    }
  };

  const padClass = dir === 'rtl' ? 'pl-3 pr-9 text-right' : 'pl-9 pr-3 text-left';
  const iconPlacementClass = dir === 'rtl' ? 'right-3' : 'left-3';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-emerald-950/80 backdrop-blur-sm animate-fadeIn pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))]">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-100 relative overflow-hidden max-h-[88vh] sm:max-h-[85vh] flex flex-col">
        
        {/* Design Header */}
        <div className={`bg-emerald-900 px-6 py-5 text-white relative shrink-0 pt-[calc(1.25rem+env(safe-area-inset-top))] ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <button
            onClick={onClose}
            className={`absolute top-4 text-emerald-100 hover:text-white cursor-pointer border-0 bg-transparent ${dir === 'rtl' ? 'left-4' : 'right-4'}`}
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h3 className="font-display text-lg font-bold leading-none">
            {lang === 'ar' ? (
              leadSource === 'ExitIntent' ? 'هل تبحث عن أسعار تصدير بالجملة؟' : 'طلب عرض سعر تصدير (FOB / CIF)'
            ) : (
              leadSource === 'ExitIntent' ? 'Need Bulk Export Pricing?' : 'Request FOB / CIF Export Quotation'
            )}
          </h3>
          <p className="text-xs text-emerald-200 mt-1.5 font-light leading-normal">
            {lang === 'ar'
              ? 'أسعار مباشرة من المصنع. دعم تجاري مخصص ومباشر. شحنات مفحوصة ومؤمنة بالكامل.'
              : 'Direct manufacturer quotes. Direct trade assistance. Pre-inspected shipping routes.'
            }
          </p>
        </div>

        {/* Form Body / Success message (Scrollable) */}
        <div className="flex-grow overflow-y-auto p-5 sm:p-6 scrollbar-thin">
          {success ? (
            <div className="text-center py-6 space-y-5 animate-scaleUp">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-xl font-bold text-gray-900">
                  {lang === 'ar' ? 'تم إرسال طلبكم بنجاح!' : 'Inquiry Submitted Successfully!'}
                </h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed font-light">
                  {lang === 'ar'
                    ? 'شكرًا لتواصلكم مع ياليني إكسيم. سيقوم مكتب الحسابات الدولية لدينا بدراسة مواصفات طلبكم والرد عليكم بالتفصيل خلال 4-12 ساعة.'
                    : 'Thank you for reaching out to Yalini Exim. Our international accounts desk will analyze your product specs and reply within 4-12 hours.'
                  }
                </p>
              </div>

              {/* Automated Email Confirmation Badge */}
              {submittedEmail && (
                <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-4 max-w-md mx-auto space-y-2 text-left shadow-xs">
                  <div className={`flex items-center gap-2 text-emerald-800 ${lang === 'ar' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {lang === 'ar' ? 'تم إرسال تأكيد تلقائي!' : 'Automated Email Confirmation Sent!'}
                    </span>
                  </div>
                  <p className={`text-[11px] text-gray-600 leading-normal font-light ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {lang === 'ar'
                      ? `تم إرسال رسالة شكر وتأكيد لطلبك بنجاح إلى البريد الإلكتروني للعمل الخاص بك: `
                      : `A "Thank you for your interest" confirmation email has been dispatched to your business email: `}
                    <strong className="text-emerald-900 font-mono font-semibold select-all block mt-1 break-all bg-white px-2 py-1 rounded border border-emerald-100">{submittedEmail}</strong>
                  </p>
                  <p className={`text-[9px] text-emerald-700/80 italic ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {lang === 'ar'
                      ? 'ℹ️ يرجى التحقق من صندوق البريد الوارد أو مجلد الرسائل غير المرغوب فيها (Spam).'
                      : 'ℹ️ Please check your Inbox or Spam folder if you do not receive it in a few moments.'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-800 text-xs p-3 rounded-lg border border-red-100 font-medium">
                  {error}
                </div>
              )}

              {/* Grid 1: Company & Person */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`text-[10px] uppercase tracking-wide text-gray-500 font-bold block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    {lang === 'ar' ? 'اسم الشركة' : 'Company Name'} <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 flex items-center pointer-events-none ${iconPlacementClass}`}>
                      <User className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      id="input-company"
                      type="text"
                      required
                      placeholder={lang === 'ar' ? 'مثال: شركة الخليج للتجارة' : 'e.g. Euro Foodpack GmbH'}
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className={`w-full py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800 ${padClass}`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className={`text-[10px] uppercase tracking-wide text-gray-500 font-bold block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    {lang === 'ar' ? 'الشخص المسؤول' : 'Contact Person'} <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 flex items-center pointer-events-none ${iconPlacementClass}`}>
                      <User className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      id="input-person"
                      type="text"
                      required
                      placeholder={lang === 'ar' ? 'مثال: محمد أحمد' : 'e.g. Hans Müller'}
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className={`w-full py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800 ${padClass}`}
                    />
                  </div>
                </div>
              </div>

              {/* Grid 2: Destination Country & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`text-[10px] uppercase tracking-wide text-gray-500 font-bold block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    {lang === 'ar' ? 'بلد الوجهة والميناء' : 'Destination Country'} <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 flex items-center pointer-events-none ${iconPlacementClass}`}>
                      <Globe className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      id="input-country"
                      type="text"
                      required
                      placeholder={lang === 'ar' ? 'مثال: دبي، الإمارات' : 'e.g. UAE, Germany'}
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className={`w-full py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800 ${padClass}`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className={`text-[10px] uppercase tracking-wide text-gray-500 font-bold block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    {lang === 'ar' ? 'البريد الإلكتروني للعمل' : 'Business Email'} <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 flex items-center pointer-events-none ${iconPlacementClass}`}>
                      <Mail className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      id="input-email"
                      type="email"
                      required
                      placeholder={lang === 'ar' ? 'buyer@company.com' : 'e.g. buyer@eurofoodpack.de'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800 ${padClass}`}
                    />
                  </div>
                </div>
              </div>

              {/* Grid 3: WhatsApp Number */}
              <div className="space-y-1">
                <label className={`text-[10px] uppercase tracking-wide text-gray-500 font-bold block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {lang === 'ar' ? 'رقم الواتساب (مع رمز الدولة)' : 'WhatsApp Number (with Country Code)'}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 flex items-center pointer-events-none ${iconPlacementClass}`}>
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <input
                    id="input-whatsapp"
                    type="text"
                    placeholder={lang === 'ar' ? 'مثال: +971 50 1234567' : 'e.g. +49 176 5551234'}
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className={`w-full py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800 ${padClass}`}
                  />
                </div>
              </div>

              {/* Quick Interactive Shipping Calculator Button */}
              <div className="bg-emerald-55/40 dark:bg-emerald-950/25 border border-emerald-100 dark:border-emerald-900/40 rounded-xl p-3 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3 text-left">
                  <div className="space-y-0.5">
                    <h4 className="text-[11px] font-bold text-emerald-950 dark:text-emerald-100 flex items-center gap-1.5 font-display">
                      <Calculator className="w-3.5 h-3.5 text-emerald-750 dark:text-emerald-400" />
                      <span>{lang === 'ar' ? 'حاسبة الشحن البحري التفاعلية للطلبات الكبيرة' : 'B2B Bulk Shipping Cost Calculator'}</span>
                    </h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-light">
                      {lang === 'ar' 
                        ? 'احسب عدد الحاويات، وقت العبور والرسوم التقريبية لمينائك.'
                        : 'Estimate ocean container layouts, freight rates, and transit times.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCalc(!showCalc)}
                    className="px-2.5 py-1 bg-emerald-800 text-white dark:bg-emerald-700 dark:hover:bg-emerald-600 hover:bg-emerald-750 rounded text-[10px] font-extrabold cursor-pointer select-none transition-colors shrink-0 border-0"
                  >
                    {showCalc ? (lang === 'ar' ? 'إخفاء الحاسبة' : 'Hide') : (lang === 'ar' ? 'فتح الحاسبة' : 'Open')}
                  </button>
                </div>

                {showCalc && (
                  <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-lg p-3 space-y-3.5 text-left animate-fadeIn">
                    
                    {/* Cargo Type Choice */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcType('granite')}
                        className={`flex-1 py-1 px-2.5 rounded text-[10px] font-extrabold border transition-all cursor-pointer text-center ${
                          calcType === 'granite'
                            ? 'bg-emerald-950 text-white border-emerald-950 dark:bg-emerald-800 dark:border-emerald-800'
                            : 'bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700'
                        }`}
                      >
                        {lang === 'ar' ? 'أحجار وجرانيت (بالوزن)' : 'Granite & Marble (Weight)'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcType('fmcg')}
                        className={`flex-1 py-1 px-2.5 rounded text-[10px] font-extrabold border transition-all cursor-pointer text-center ${
                          calcType === 'fmcg'
                            ? 'bg-emerald-950 text-white border-emerald-950 dark:bg-emerald-800 dark:border-emerald-800'
                            : 'bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700'
                        }`}
                      >
                        {lang === 'ar' ? 'أدوات مائدة وبياضات (بالحجم)' : 'Tableware & FMCG (Volume)'}
                      </button>
                    </div>

                    {/* Weight or Volume Slider */}
                    {calcType === 'granite' ? (
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-gray-500 font-bold flex items-center gap-1">
                            <Scale className="w-3 h-3 text-emerald-750" />
                            <span>{lang === 'ar' ? 'الوزن الإجمالي المطلوب (أطنان)' : 'Cargo Weight (Metric Tons)'}</span>
                          </span>
                          <span className="font-mono font-extrabold text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">{calcWeight} Tons</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="150"
                          step="1"
                          value={calcWeight}
                          onChange={(e) => setCalcWeight(Number(e.target.value))}
                          className="w-full accent-emerald-800 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                        />
                        <p className="text-[9px] text-gray-400 font-light">
                          {lang === 'ar' 
                            ? 'الحد الأقصى الآمن للحاوية الواحدة 20 قدم هو 25 طناً مترياً بموجب لوائح الشحن البحري.'
                            : 'Standard safety limits enforce max 25 Metric Tons per 20ft container to prevent axle overloading.'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-gray-500 font-bold flex items-center gap-1">
                            <Layers className="w-3 h-3 text-emerald-750" />
                            <span>{lang === 'ar' ? 'الحجم الإجمالي المطلوب (CBM)' : 'Cargo Volume (Cubic Meters / CBM)'}</span>
                          </span>
                          <span className="font-mono font-extrabold text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">{calcVolume} CBM</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="300"
                          step="1"
                          value={calcVolume}
                          onChange={(e) => setCalcVolume(Number(e.target.value))}
                          className="w-full accent-emerald-800 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                        />
                        <p className="text-[9px] text-gray-400 font-light">
                          {lang === 'ar'
                            ? 'سعة الحاوية 20 قدم تقريباً 28 CBM، والحاوية 40 قدم High Cube تقريباً 68 CBM.'
                            : '20ft FCL accommodates ~28 CBM; 40ft HC accommodates ~68 CBM with standard pallet layouts.'}
                        </p>
                      </div>
                    )}

                    {/* Destination Selection */}
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold block">
                        {lang === 'ar' ? 'ميناء الوجهة الإقليمي' : 'Regional Destination Port'}
                      </label>
                      <select
                        value={calcDest}
                        onChange={(e) => setCalcDest(e.target.value)}
                        className="w-full py-1 px-2 text-[11px] bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-slate-700 rounded focus:outline-none"
                      >
                        {destZones.map((z) => (
                          <option key={z.code} value={z.code}>
                            {lang === 'ar' ? z.nameAr : z.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Calculations Display Results */}
                    <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-2.5 space-y-2 border border-gray-100 dark:border-slate-800">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-gray-500 font-bold flex items-center gap-1">
                          <Anchor className="w-3 h-3 text-emerald-750" />
                          <span>{lang === 'ar' ? 'ترتيب الحاويات المقترح' : 'Container Configuration'}</span>
                        </span>
                        <span className="font-mono font-bold text-gray-950 dark:text-white">{containerDesc}</span>
                      </div>

                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-gray-500 font-bold flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-emerald-750" />
                          <span>{lang === 'ar' ? 'أجور الشحن البحري الأساسية' : 'Estimated Ocean Freight'}</span>
                        </span>
                        <span className="font-mono font-bold text-gray-950 dark:text-white">${oceanFreight} USD</span>
                      </div>

                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-gray-550 font-bold flex items-center gap-1 font-mono text-[9px]">
                          THC / Doc Fees
                        </span>
                        <span className="font-mono text-gray-550 dark:text-gray-400">${portFees} USD</span>
                      </div>

                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-gray-550 font-bold flex items-center gap-1">
                          {lang === 'ar' ? 'رسوم التعبئة والتعقيم والتأمين' : 'Surcharges (Fumigation/Packing)'}
                        </span>
                        <span className="font-mono text-gray-550 dark:text-gray-400">${surcharge} USD</span>
                      </div>

                      <div className="pt-2 border-t border-dashed border-gray-200 dark:border-slate-700 flex justify-between items-center text-[11px] font-extrabold text-emerald-950 dark:text-emerald-450">
                        <span>{lang === 'ar' ? 'إجمالي تقدير الشحن CIF' : 'Total Estimated Shipping'}</span>
                        <span className="font-mono text-sm">${totalShippingEstimate} USD</span>
                      </div>

                      <div className="flex justify-between items-center text-[9px] text-gray-400 italic pt-0.5">
                        <span>{lang === 'ar' ? 'مدة العبور التقريبية' : 'Approx. Transit Time'}</span>
                        <span>{selectedZone.transit}</span>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <button
                      type="button"
                      onClick={handleApplyCalc}
                      className="w-full py-1.5 bg-emerald-800 hover:bg-emerald-750 text-white font-extrabold text-[10px] rounded shadow-sm transition-colors cursor-pointer text-center border-0"
                    >
                      {lang === 'ar' ? 'تطبيق تقديرات الشحن على الطلب' : 'Apply Shipping Estimate to Form'}
                    </button>
                  </div>
                )}

                {appliedCalc && (
                  <div className="bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40 text-[10px] p-2 rounded text-center font-bold animate-bounce">
                    {lang === 'ar' ? '✓ تم تطبيق تقديرات الشحن وتعبئة حقول الكمية والميناء والرسائل!' : '✓ Shipping calculations applied! Quantity, destination country, and logs pre-filled!'}
                  </div>
                )}
              </div>

              {/* Grid 4: Product Requirement & Estimated Quantity */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`text-[10px] uppercase tracking-wide text-gray-500 font-bold block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    {lang === 'ar' ? 'المنتج والمواصفات' : 'Product Requirement'} <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 flex items-center pointer-events-none ${iconPlacementClass}`}>
                      <Layers className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      id="input-product"
                      type="text"
                      required
                      placeholder={lang === 'ar' ? 'أدوات مائدة، جرانيت، إلخ' : 'e.g. Sugarcane Plates 10"'}
                      value={formData.productRequirement}
                      onChange={(e) => setFormData({ ...formData, productRequirement: e.target.value })}
                      className={`w-full py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800 ${padClass}`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className={`text-[10px] uppercase tracking-wide text-gray-500 font-bold block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    {lang === 'ar' ? 'الكمية المطلوبة (حاوية / أطنان)' : 'Estimated Quantity'}
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 flex items-center pointer-events-none ${iconPlacementClass}`}>
                      <Layers className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      id="input-quantity"
                      type="text"
                      placeholder={lang === 'ar' ? 'مثال: حاوية كاملة 1 FCL' : 'e.g. 100,000 Pcs or 1 FCL Container'}
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className={`w-full py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800 ${padClass}`}
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className={`text-[10px] uppercase tracking-wide text-gray-500 font-bold block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {lang === 'ar' ? 'شروط التصدير وملاحظات الشحن أو التعبئة والتغليف' : 'Detailed Specifications or Destination Port Notes'}
                </label>
                <div className="relative">
                  <div className={`absolute top-2 flex items-start pointer-events-none ${iconPlacementClass}`}>
                    <MessageSquare className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <textarea
                    id="input-message"
                    rows={3}
                    placeholder={
                      lang === 'ar'
                        ? 'يرجى كتابة شروط الشحن المطلوبة (مثال: CIF دبي)، التغليف المخصص، التفاوتات المسموح بها، إلخ...'
                        : 'Describe size tolerances, custom packaging, requested trade terms (e.g. CIF London), etc...'
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-800 ${
                      dir === 'rtl' ? 'pl-3 pr-9 text-right' : 'pl-9 pr-3 text-left'
                    }`}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className={`pt-4 border-t border-gray-50 flex items-center justify-between gap-4 ${
                dir === 'rtl' ? 'flex-row-reverse' : ''
              }`}>
                <span className={`flex items-center gap-1 text-[10px] text-emerald-800 font-semibold uppercase tracking-wider ${
                  dir === 'rtl' ? 'flex-row-reverse' : ''
                }`}>
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>{lang === 'ar' ? 'بوابة B2B آمنة ومعتمدة' : 'Verified B2B Gateway'}</span>
                </span>

                <button
                  id="submit-lead-btn"
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-650 text-white font-bold text-xs rounded-lg transition-all shadow cursor-pointer disabled:opacity-50"
                >
                  {loading ? (lang === 'ar' ? 'جاري التقديم...' : 'Submitting Quote...') : (lang === 'ar' ? 'إرسال الطلب' : 'Submit Inquiry')}
                  <Send className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

