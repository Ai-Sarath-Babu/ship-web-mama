/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../utils/LanguageContext';
import { ShieldCheck, Award, Users, Building, Target, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const { lang, dir } = useLanguage();

  const stats = [
    { value: "2023", label: lang === 'ar' ? "سنة التأسيس" : "Year Established" },
    { value: "25+", label: lang === 'ar' ? "البلدان التي نخدمها" : "Countries Served" },
    { value: "15,000+", label: lang === 'ar' ? "الأطنان المصدرة سنوياً" : "Annual Tons Exported" },
    { value: "100%", label: lang === 'ar' ? "نسبة رضا العملاء B2B" : "B2B Client Satisfaction" },
  ];

  const values = [
    {
      title: lang === 'ar' ? "النزاهة والشفافية" : "Integrity & Transparency",
      description: lang === 'ar' 
        ? "نحن ندعم كل صفقة بتعامل تجاري صريح وتحديثات مستمرة للوجستيات وتقارير جودة حقيقية."
        : "We back every shipment with clear trade dealings, constant logistical updates, and authentic quality reports.",
      icon: ShieldCheck,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: lang === 'ar' ? "معايير جودة صارمة" : "Uncompromising Quality",
      description: lang === 'ar' 
        ? "جميع المنتجات تخضع لفحوصات مادية واختبارات كيميائية ومواصفات دقيقة قبل شحنها من الموانئ."
        : "All products undergo physical checks, lab testing, and precise specification compliance audits before departure.",
      icon: Award,
      color: "from-amber-500 to-amber-700"
    },
    {
      title: lang === 'ar' ? "نهج يركز على العميل" : "Client-Centric Sourcing",
      description: lang === 'ar' 
        ? "نقوم بتخصيص كميات التعبئة واللوجستيات والحلول المالية والشحن البحري لتناسب ميزانيتك."
        : "We tailor packaging configurations, private labeling, logistics, and incoterms to align with your balance sheet.",
      icon: Target,
      color: "from-emerald-500 to-emerald-700"
    }
  ];

  return (
    <div className="py-12 sm:py-20 bg-gray-50/50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] uppercase tracking-widest text-emerald-800 font-extrabold block">
            {lang === 'ar' ? "معلومات عن ياليني إكسيم" : "Corporate Overview"}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {lang === 'ar' ? "شريكك الموثوق في التصدير الهندي" : "Your Direct Gateway to Indian Commodities"}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed font-light">
            {lang === 'ar' 
              ? "نحن نربط المشترين العالميين بالمحاجر والمصانع المعتمدة مباشرة لتقديم جودة ممتازة بدون وسطاء."
              : "We bridge the gap between elite international purchasers and top-tier Indian mills and quarries directly, ensuring absolute grade compliance."}
          </p>
          <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Vision & Mission Split Panel */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className={`space-y-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
                {lang === 'ar' ? "صناعة التميز في التوريد العالمي" : "Our Commitment to B2B Sourcing"}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                {lang === 'ar' 
                  ? "تأسست ياليني إكسيم على ركائز الكفاءة المهنية والامتثال اللوجستي الكامل. نحن لا نعمل كمجرد وسطاء؛ بل نحن شركاء تصنيع وتوريد نمتلك قنوات مباشرة مع محاجر الجرانيت والرخام ومصانع الأواني الخزفية والمنسوجات في الهند."
                  : "Yalini Exim was engineered on pillars of strict technical compliance and seamless cargo handling. We function not merely as brokers, but as active sourcing operators. We maintain deep relationships and joint partnerships with regional tile manufacturers, looms, and heavy quarries."}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                {lang === 'ar' 
                  ? "هدفنا هو تمكين مديري المشتروات والمقاولين والمستوردين من الحصول على مواصفات دقيقة وحزم مطابقة بأفضل الأسعار الممكنة مع تسليم FOB أو CIF مضمون بمستندات تصدير قانونية كاملة."
                  : "Our daily operational target is to simplify complex cross-border purchasing. By providing certified laboratory results and custom loading supervisions, we protect global commercial assets from standard transit delays and spec drift."}
              </p>
            </div>

            {/* List of guarantees */}
            <div className="space-y-3">
              {[
                lang === 'ar' ? "فحص مستقل كامل قبل الشحن (SGS)" : "Full third-party inspections welcome (SGS/Intertek)",
                lang === 'ar' ? "تخليص جمركي وأوراق تصدير خالية من الأخطاء" : "Error-free customs filing and complete documentation pack",
                lang === 'ar' ? "مواصفات سمك وحجم مطابقة بدقة" : "Calibrated slab dimensions and certified glaze parameters"
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center gap-2.5 text-xs text-gray-700 font-medium ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Visual with 3D feel frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-700 to-amber-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-35 transition duration-1000"></div>
            <div className="relative bg-white p-2 rounded-2xl border border-gray-100 shadow-xl overflow-hidden aspect-video sm:aspect-square">
              <img 
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80" 
                alt="B2B Sourcing Excellence" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Corporate Metrics Blocks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center space-y-1 hover:border-emerald-700/20 transition-all hover:shadow-md"
            >
              <div className="text-2xl sm:text-4xl font-extrabold text-emerald-800 font-mono tracking-tight">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Standout Values with 3D Icons */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
              {lang === 'ar' ? "قيمنا الأساسية للتبادل التجاري" : "Our Core Operational Pillars"}
            </h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              {lang === 'ar' 
                ? "المبادئ التوجيهية التي تضمن نجاح صفقات عملائنا حول العالم."
                : "The guiding standards that protect client interests and solidify long-term corporate supply lines."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, idx) => {
              const IconComp = v.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 space-y-5 flex flex-col items-center text-center hover:border-emerald-700/20 group"
                >
                  {/* Elegant 3D Styled Icon Container */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} text-white flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_6px_12px_-2px_rgba(4,47,31,0.2),0_3px_6px_-3px_rgba(0,0,0,0.3)] border border-emerald-400/10 transform group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-300`}>
                    <IconComp className="w-6 h-6 text-white" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-display text-base font-bold text-gray-900">{v.title}</h4>
                    <p className="text-xs text-gray-600 font-light leading-relaxed">{v.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Compliance Cert Card */}
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-emerald-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,160,23,0.1),transparent_50%)]"></div>
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block">
                {lang === 'ar' ? "شريك تصدير مسجل ومعتمد" : "Licensed & Certified Exporter"}
              </span>
              <h3 className="font-display text-xl sm:text-3xl font-bold tracking-tight">
                {lang === 'ar' ? "متوافقون تماماً مع متطلبات الاستيراد العالمية" : "Ready for Commercial Compliance Audits"}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-light leading-relaxed max-w-2xl">
                {lang === 'ar'
                  ? "تحمل شركتنا ترخيص المستورد والمصدر (IEC) الصادر من وزارة التجارة الهندية، مع تراخيص الهيئة العامة للسلع لضمان شحنات قانونية خالية من المشاكل."
                  : "We hold native Indian Importer-Exporter Code (IEC) clearances, FIEO (Federation of Indian Export Organisations) certification, and relative ceramic board enrollments to clear shipments cleanly through customs."}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="px-6 py-4 bg-emerald-900/60 border border-emerald-800 rounded-2xl text-center shadow-inner space-y-1">
                <Building className="w-8 h-8 text-amber-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-white uppercase tracking-wider">DGFT REGISTERED</div>
                <div className="text-[10px] text-emerald-200/80 font-mono">CODE: 3323010373</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
