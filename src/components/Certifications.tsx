/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, FileCheck, CheckCircle, Scale } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

export default function Certifications() {
  const { lang, t, dir } = useLanguage();

  const certs = lang === 'ar' ? [
    {
      short: "GSTIN",
      name: "تسجيل ضريبة السلع والخدمات",
      desc: "كيان قانوني مسجل بالكامل لضريبة الشركات لدى حكومة الهند لجميع المعاملات التجارية القياسية.",
      num: "الرقم الضريبي: 33AAYCY2020E1Z9",
      icon: <Scale className="w-8 h-8 text-emerald-700" />
    },
    {
      short: "RCMC",
      name: "شهادة التسجيل والعضوية",
      desc: "عضوية رسمية صادرة عن اتحاد منظمات التصدير الهندية (FIEO) كجهة تصدير معترف بها رسمياً.",
      num: "رقم التسجيل: RCMC/FIEO/382092",
      icon: <ShieldCheck className="w-8 h-8 text-emerald-700" />
    },
    {
      short: "SPICES BOARD",
      name: "ترخيص مجلس التوابل الهندي",
      desc: "شهادة وموافقة مجلس التوابل الرسمي التابع لوزارة التجارة والصناعة لتصدير السلع الزراعية والتوابل الهندية.",
      num: "رقم الشهادة: SB/REG/2023/8832",
      icon: <FileCheck className="w-8 h-8 text-emerald-700" />
    },
    {
      short: "IEC",
      name: "كود المستورد والمصدر (حكومة الهند)",
      desc: "ترخيص الاستيراد والتصدير الأساسي واللازم الصادر عن المديرية العامة للتجارة الخارجية (DGFT).",
      num: "رمز IEC: 0716503881",
      icon: <CheckCircle className="w-8 h-8 text-emerald-700" />
    }
  ] : [
    {
      short: "GSTIN",
      name: "Goods and Services Tax Registration",
      desc: "Fully registered corporate legal tax entity with the Government of India for standard commercial transactions.",
      num: "GSTIN: 33AAYCY2020E1Z9",
      icon: <Scale className="w-8 h-8 text-emerald-700" />
    },
    {
      short: "RCMC",
      name: "Registration-cum-Membership Certificate",
      desc: "Official membership registration issued by the Federation of Indian Export Organisations (FIEO) certifying our status as a registered exporter.",
      num: "Reg. No. RCMC/FIEO/382092",
      icon: <ShieldCheck className="w-8 h-8 text-emerald-700" />
    },
    {
      short: "SPICES BOARD",
      name: "Spices Board India Registration",
      desc: "Official government board certificate under Ministry of Commerce & Industry for exporting fine Indian spices & dry commodities.",
      num: "Certificate No. SB/REG/2023/8832",
      icon: <FileCheck className="w-8 h-8 text-emerald-700" />
    },
    {
      short: "IEC",
      name: "Importer-Exporter Code (Govt of India)",
      desc: "Mandatory primary import-export registration issued by the Directorate General of Foreign Trade (DGFT) to legal exporters.",
      num: "IEC Code: 0716503881",
      icon: <CheckCircle className="w-8 h-8 text-emerald-700" />
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-widest text-emerald-700 font-extrabold block">
            {lang === 'ar' ? 'الامتثال والاعتماد القانوني' : 'Compliances & Accreditations'}
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {lang === 'ar' ? 'تراخيص قانونية ومعايير جودة معتمدة حكومياً' : 'Government Certified Quality Standards & Legal Licenses'}
          </h2>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed font-light">
            {lang === 'ar'
              ? 'ياليني إكسيم معتمدة بالكامل من جميع الهيئات التنظيمية والوزارات الهندية المعنية لضمان عمليات تجارية دولية آمنة ومطابقة للقوانين بالكامل.'
              : 'Yalini Exim is fully accredited with all federal and international regulatory agencies to guarantee legally sound and worry-free international trade operations.'
            }
          </p>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-4 rounded"></div>
        </div>

        {/* Certs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((cert, idx) => (
            <div
              key={idx}
              className={`p-6 bg-gray-50/50 border border-gray-100 rounded-2xl flex flex-col justify-between hover:bg-white hover:border-emerald-700/20 hover:shadow-lg transition-all duration-300 ${
                dir === 'rtl' ? 'text-right' : 'text-left'
              }`}
            >
              <div className="space-y-4">
                <div className={`flex items-center justify-between gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className="p-3 bg-emerald-50 rounded-xl w-fit shrink-0">
                    {cert.icon}
                  </div>
                  <span className="text-sm font-black text-emerald-900 tracking-wider">
                    {cert.short}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    {cert.desc}
                  </p>
                </div>
              </div>

              <div className={`pt-4 mt-4 border-t border-gray-100 text-[10px] text-emerald-800 font-mono font-medium ${
                dir === 'rtl' ? 'text-right' : 'text-left'
              }`}>
                {cert.num}
              </div>
            </div>
          ))}
        </div>

        {/* Quality Check banner */}
        <div className={`mt-12 p-6 bg-emerald-950 text-white rounded-2xl border border-emerald-850 flex flex-col sm:flex-row items-center justify-between gap-6 ${
          dir === 'rtl' ? 'sm:flex-row-reverse' : ''
        }`}>
          <div className={`space-y-1 text-center ${dir === 'rtl' ? 'sm:text-right text-right' : 'sm:text-left text-left'}`}>
            <h4 className="font-bold text-sm text-amber-400">{lang === 'ar' ? 'نرحب بجهات التفتيش الخارجية والطرف الثالث' : 'Third-Party Inspections Welcome'}</h4>
            <p className="text-xs text-emerald-100/90 leading-relaxed font-light">
              {lang === 'ar'
                ? <>نحن ننسق مع كبرى شركات التفتيش والتحقق مثل <strong>SGS و Bureau Veritas و Intertek</strong> لفحص المواصفات والكميات بدقة قبل مغادرة الشحنة للموانئ.</>
                : <>We coordinate with leading inspection agencies like <strong>SGS, Bureau Veritas, and Intertek</strong> to certify quantities and specifications prior to port departure.</>
              }
            </p>
          </div>
          <span className="px-4 py-2 bg-emerald-900 border border-emerald-800 rounded-lg text-xs font-bold tracking-wider uppercase shrink-0">
            {lang === 'ar' ? 'تعبئة وتغليف معتمد من SGS' : 'SGS Approved Packing'}
          </span>
        </div>

        {/* Verification Badges Section */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-display text-lg font-bold text-gray-900 tracking-tight">
              {lang === 'ar' ? 'شارات التحقق والتراخيص الرسمية المعتمدة' : 'Official Verification Badges & Trust Seals'}
            </h3>
            <p className="text-xs text-gray-500 mt-1 font-light">
              {lang === 'ar' 
                ? 'مستندات وتراخيص رسمية تم التحقق منها وتوثيقها بالكامل لتسهيل التصدير السلس.' 
                : 'Officially verified and active registration credentials ensuring safe and seamless global trade operations.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Badge 1: GST */}
            <div className="relative group p-6 bg-gradient-to-br from-amber-50/30 to-white border border-amber-200/40 rounded-2xl flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all duration-300">
              <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5">
                <CheckCircle className="w-2.5 h-2.5" />
                <span>Active</span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-amber-600 text-white rounded-full flex items-center justify-center shadow-sm border-4 border-white mb-4 group-hover:scale-105 transition-transform duration-300">
                <Scale className="w-8 h-8" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-800 block">
                {lang === 'ar' ? 'حكومة الهند' : 'GOVERNMENT OF INDIA'}
              </span>
              <h4 className="font-display text-sm font-bold text-gray-900 mt-1">
                {lang === 'ar' ? 'تسجيل ضريبة السلع والخدمات' : 'GST Registration'}
              </h4>
              <p className="text-[10px] text-gray-600 mt-2 font-mono bg-amber-50/50 px-2 py-1 rounded-md border border-amber-100/40">
                GSTIN: 33AAYCY2020E1Z9
              </p>
              <span className="text-[9px] text-emerald-800 font-extrabold mt-3 uppercase tracking-wider">
                {lang === 'ar' ? 'معتمد تجارياً ونشط' : '✓ TAX COMPLIANT'}
              </span>
            </div>

            {/* Badge 2: Spices Board */}
            <div className="relative group p-6 bg-gradient-to-br from-emerald-50/30 to-white border border-emerald-200/40 rounded-2xl flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all duration-300">
              <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5">
                <CheckCircle className="w-2.5 h-2.5" />
                <span>Approved</span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-tr from-emerald-700 to-emerald-800 text-white rounded-full flex items-center justify-center shadow-sm border-4 border-white mb-4 group-hover:scale-105 transition-transform duration-300">
                <FileCheck className="w-8 h-8" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-800 block">
                {lang === 'ar' ? 'مجلس التوابل الهندي' : 'SPICES BOARD INDIA'}
              </span>
              <h4 className="font-display text-sm font-bold text-gray-900 mt-1">
                {lang === 'ar' ? 'مصدّر معتمد ومسجل' : 'Spice Board Approved'}
              </h4>
              <p className="text-[10px] text-gray-600 mt-2 font-mono bg-emerald-50/50 px-2 py-1 rounded-md border border-emerald-100/40">
                Reg No: SB/REG/2023/8832
              </p>
              <span className="text-[9px] text-emerald-800 font-extrabold mt-3 uppercase tracking-wider">
                {lang === 'ar' ? 'ترخيص رسمي معتمد للتصدير' : '✓ LICENSED EXPORTER'}
              </span>
            </div>

            {/* Badge 3: RCMC / FIEO */}
            <div className="relative group p-6 bg-gradient-to-br from-amber-50/20 to-white border border-amber-200/30 rounded-2xl flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all duration-300">
              <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5">
                <CheckCircle className="w-2.5 h-2.5" />
                <span>Certified</span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-amber-600 text-white rounded-full flex items-center justify-center shadow-sm border-4 border-white mb-4 group-hover:scale-105 transition-transform duration-300">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-800 block">
                {lang === 'ar' ? 'اتحاد منظمات التصدير الهندية' : 'FIEO MEMBER'}
              </span>
              <h4 className="font-display text-sm font-bold text-gray-900 mt-1">
                {lang === 'ar' ? 'ترخيص عضوية التصدير RCMC' : 'RCMC Membership'}
              </h4>
              <p className="text-[10px] text-gray-600 mt-2 font-mono bg-amber-50/50 px-2 py-1 rounded-md border border-amber-100/40">
                Reg No: RCMC/FIEO/382092
              </p>
              <span className="text-[9px] text-emerald-800 font-extrabold mt-3 uppercase tracking-wider">
                {lang === 'ar' ? 'رقم عضوية رسمي نشط' : '✓ ACTIVE EXPORTER STATUS'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

