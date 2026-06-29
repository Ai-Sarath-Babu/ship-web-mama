/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { 
  Search, ShieldCheck, MapPin, Anchor, Navigation, 
  Calendar, CheckCircle, Package, Truck, Compass, Info, ArrowRight, UserCheck, AlertTriangle
} from 'lucide-react';

interface Log {
  date: string;
  message: string;
}

interface Shipment {
  invoiceId: string;
  clientName: string;
  product: string;
  quantity: string;
  originPort: string;
  destinationPort: string;
  shippingLine: string;
  vesselName: string;
  containerNo: string;
  status: string;
  progress: number;
  eta: string;
  logs: Log[];
}

export default function ProfilePage() {
  const { lang, dir } = useLanguage();
  const [invoiceId, setInvoiceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);

  // Suggested invoices for easier testing
  const suggestions = ['YAL-2026-101', 'YAL-2026-102', 'YAL-2026-103'];

  const handleTrack = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError('');
    setShipment(null);

    try {
      const res = await fetch(`/api/shipments/${id.toUpperCase().trim()}`);
      if (res.ok) {
        const data = await res.json();
        setShipment(data);
      } else {
        setError(
          lang === 'ar'
            ? 'لم يتم العثور على شحنة بهذا الرقم. يرجى التحقق من الفاتورة وإعادة المحاولة.'
            : 'No shipment found with this ID. Please double-check your Invoice ID and try again.'
        );
      }
    } catch (err) {
      setError(
        lang === 'ar'
          ? 'خطأ في الاتصال بالخادم. يرجى المحاولة لاحقاً.'
          : 'Server connection error. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrack(invoiceId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
      case 'Customs Cleared':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'In Transit':
      case 'Ocean Transit':
        return 'bg-yellow-50 text-yellow-850 border-yellow-200';
      case 'Loading at Port':
      case 'Port Transit':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const steps = [
    { labelEn: 'Confirmed', labelAr: 'مؤكد' },
    { labelEn: 'QA Checked', labelAr: 'فحص الجودة' },
    { labelEn: 'Port Loaded', labelAr: 'تم الشحن' },
    { labelEn: 'In Transit', labelAr: 'قيد العبور' },
    { labelEn: 'Arrived Port', labelAr: 'وصل الميناء' },
    { labelEn: 'Delivered', labelAr: 'تم التسليم' }
  ];

  const getActiveStepIndex = (progress: number) => {
    if (progress >= 100) return 5;
    if (progress >= 80) return 4;
    if (progress >= 60) return 3;
    if (progress >= 40) return 2;
    if (progress >= 20) return 1;
    return 0;
  };

  const activeStep = shipment ? getActiveStepIndex(shipment.progress) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir={dir}>
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-[11px] uppercase tracking-widest text-emerald-700 font-extrabold block">
          {lang === 'ar' ? 'بوابة العملاء والمستوردين' : 'B2B Client Portal'}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
          {lang === 'ar' ? 'تتبع حالة الشحنات الدولية' : 'International Shipment Tracker'}
        </h1>
        <p className="text-sm text-gray-600 font-light leading-relaxed">
          {lang === 'ar' 
            ? 'تتبع حاوياتك وشحناتك البحرية مباشرة من موانئ الهند الاستراتيجية (ميناء تشيناي / ميناء موندرا) إلى ميناء الوصول الخاص بك.'
            : 'Monitor your ocean freight shipments and container status in real-time from India\'s strategic export ports to your destination.'}
        </p>
        <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded"></div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Tracking Search Form Panel */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl shadow-md p-6 space-y-6">
          <div className="space-y-1.5 text-left">
            <h3 className="text-sm font-bold text-gray-900 font-display flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'ar' ? 'البحث بالفاتورة' : 'Search by Invoice'}</span>
            </h3>
            <p className="text-xs text-gray-500">
              {lang === 'ar' 
                ? 'أدخل رقم الفاتورة التصديرية (موجود في مستند Proforma Invoice).'
                : 'Enter your export invoice reference key to pull full container parameters.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold block text-left">
                {lang === 'ar' ? 'رقم الفاتورة التصديرية' : 'Export Invoice ID'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={invoiceId}
                  onChange={(e) => setInvoiceId(e.target.value)}
                  placeholder="e.g. YAL-2026-101"
                  className="w-full pl-3 pr-10 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all font-mono uppercase"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-emerald-700 hover:bg-emerald-650 text-white rounded-lg cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {error && (
              <div className="flex gap-2 p-3 bg-red-50 text-red-800 border border-red-100 rounded-xl text-xs leading-normal">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="text-left">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-650 disabled:bg-gray-400 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
            >
              {loading ? (lang === 'ar' ? 'جاري الاسترجاع...' : 'Fetching tracking data...') : (lang === 'ar' ? 'استعلام عن الشحنة' : 'Track Current Status')}
            </button>
          </form>

          {/* Sourcing Suggestions */}
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold block text-left">
              {lang === 'ar' ? 'الفواتير النشطة للتجربة' : 'Demo Active Invoices'}
            </span>
            <div className="flex flex-wrap gap-2 justify-start">
              {suggestions.map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setInvoiceId(id);
                    handleTrack(id);
                  }}
                  className="px-2.5 py-1 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-900 border border-gray-200 hover:border-emerald-200 rounded-lg text-[11px] font-mono font-medium transition-all cursor-pointer"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50/60 rounded-xl p-4 space-y-2 text-left border border-emerald-100/50">
            <h4 className="text-[11px] font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'ar' ? 'بوابة B2B آمنة' : 'Secure Trade Gateway'}</span>
            </h4>
            <p className="text-[11px] text-gray-600 leading-normal font-light">
              {lang === 'ar'
                ? 'لوجستيات معتمدة من الجمارك والوزارات الحكومية الهندية ومجلس التصدير FIEO.'
                : 'Seaworthy tracking parameters updated directly from Indian customs logs and port dispatch systems.'}
            </p>
          </div>
        </div>

        {/* Right Live Status Display */}
        <div className="lg:col-span-8 space-y-6">
          {shipment ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-md overflow-hidden animate-scaleUp">
              
              {/* Shipment Header Banner */}
              <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 px-6 py-5 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-left space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-200 font-bold block font-mono">
                    {lang === 'ar' ? 'العميل الموثق B2B' : 'Verified B2B Consignee'}
                  </span>
                  <h3 className="text-lg font-bold font-display leading-tight">{shipment.clientName}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-100">
                    <span className="font-mono bg-emerald-950/40 px-2 py-0.5 rounded text-amber-400 font-bold">{shipment.invoiceId}</span>
                    <span>•</span>
                    <span>{shipment.product}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right space-y-1 shrink-0">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-200 font-bold block">
                    {lang === 'ar' ? 'حالة الشحنة الحالية' : 'Current Vessel Status'}
                  </span>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(shipment.status)}`}>
                    {shipment.status}
                  </span>
                </div>
              </div>

              {/* Graphical Multi-step Progress Bar */}
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="relative">
                  {/* Background Line */}
                  <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 -z-0"></div>
                  {/* Active Color Line */}
                  <div 
                    className="absolute top-4 left-4 h-1 bg-emerald-600 transition-all duration-500 -z-0"
                    style={{ 
                      width: `calc(${shipment.progress}% - 2rem)`,
                      right: dir === 'rtl' ? 'auto' : undefined,
                    }}
                  ></div>

                  {/* Steps Icons */}
                  <div className="relative flex justify-between items-center z-10">
                    {steps.map((step, idx) => {
                      const isCompleted = idx <= activeStep;
                      const isCurrent = idx === activeStep;
                      return (
                        <div key={idx} className="flex flex-col items-center">
                          <div 
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                              isCompleted 
                                ? 'bg-emerald-700 text-white border-2 border-emerald-600 shadow'
                                : 'bg-white text-gray-400 border-2 border-gray-200'
                            } ${isCurrent ? 'ring-4 ring-emerald-100 scale-110' : ''}`}
                          >
                            {idx === 0 && <Package className="w-4 h-4" />}
                            {idx === 1 && <UserCheck className="w-4 h-4" />}
                            {idx === 2 && <Anchor className="w-4 h-4" />}
                            {idx === 3 && <Navigation className="w-4 h-4" />}
                            {idx === 4 && <Truck className="w-4 h-4" />}
                            {idx === 5 && <CheckCircle className="w-4 h-4" />}
                          </div>
                          <span className={`text-[10px] mt-1.5 font-bold tracking-tight ${isCurrent ? 'text-emerald-900 font-extrabold' : 'text-gray-400'}`}>
                            {lang === 'ar' ? step.labelAr : step.labelEn}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Logistics Parameters Grid */}
              <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 gap-5 text-left border-b border-gray-100">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider font-extrabold block">
                    {lang === 'ar' ? 'ميناء الشحن (الهند)' : 'Port of Loading'}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{shipment.originPort}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider font-extrabold block">
                    {lang === 'ar' ? 'ميناء الوصول' : 'Port of Discharge'}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{shipment.destinationPort}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider font-extrabold block">
                    {lang === 'ar' ? 'موعد الوصول المتوقع (ETA)' : 'Estimated Arrival (ETA)'}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
                    <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{shipment.eta}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider font-extrabold block">
                    {lang === 'ar' ? 'الخط الملاحي السفينة' : 'Shipping Carrier / Vessel'}
                  </span>
                  <div className="text-xs text-gray-800 leading-normal font-light">
                    <span className="font-bold block text-gray-950">{shipment.shippingLine}</span>
                    <span className="text-[11px] italic text-gray-500">{shipment.vesselName}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider font-extrabold block">
                    {lang === 'ar' ? 'رقم الحاوية' : 'Container Reference'}
                  </span>
                  <div className="text-xs text-gray-800 font-mono font-bold">
                    {shipment.containerNo}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider font-extrabold block">
                    {lang === 'ar' ? 'الكمية الإجمالية' : 'Total Shipment Cargo'}
                  </span>
                  <div className="text-xs text-gray-800 font-semibold">
                    {shipment.quantity}
                  </div>
                </div>
              </div>

              {/* Tracking Status History Log */}
              <div className="p-6 text-left space-y-4">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                  <Info className="w-4 h-4 text-emerald-700" />
                  <span>{lang === 'ar' ? 'سجل تتبع الشحنة المفصل' : 'Detailed Tracking Logs'}</span>
                </h4>

                <div className="relative pl-4 border-l-2 border-emerald-50 space-y-5">
                  {shipment.logs.map((log, idx) => {
                    const isLatest = idx === shipment.logs.length - 1;
                    return (
                      <div key={idx} className="relative">
                        {/* Dot indicator */}
                        <div className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border ${
                          isLatest 
                            ? 'bg-emerald-600 ring-4 ring-emerald-100 border-white' 
                            : 'bg-gray-300 border-white'
                        }`}></div>

                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono font-bold text-gray-400 block">{log.date}</span>
                          <p className={`text-xs ${isLatest ? 'text-gray-950 font-semibold' : 'text-gray-600 font-light'}`}>
                            {log.message}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            /* Empty State Panel */
            <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-10 text-center flex flex-col items-center justify-center space-y-4 h-full min-h-[400px]">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Compass className="w-8 h-8 text-emerald-700 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div className="space-y-1.5 max-w-sm mx-auto">
                <h3 className="text-lg font-bold text-gray-900 font-display">
                  {lang === 'ar' ? 'بوابة التتبع في انتظار إدخال الفاتورة' : 'Tracking Desk Idle'}
                </h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  {lang === 'ar' 
                    ? 'الرجاء إدخال رمز الفاتورة في النموذج الجانبي أو النقر على أحد أرقام الفواتير التجريبية لتحميل بيانات تتبع الحاويات الحية.'
                    : 'Please submit your invoice key in the left console or click any demo key above to test live shipping container parameters.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
