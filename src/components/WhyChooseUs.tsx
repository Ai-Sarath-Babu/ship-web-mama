/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle, Sparkles, Shield, Compass, FileText, Anchor, Layers, Fingerprint } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

export default function WhyChooseUs() {
  const { lang, t, dir } = useLanguage();

  const points = lang === 'ar' ? [
    {
      icon: <Compass className="w-5 h-5 text-blue-400" />,
      title: "شريك تصدير موثوق",
      description: "تاريخ حافل ومثبت من شحنات B2B الناجحة مع تتبع لوجستي كامل وشفافية من الميناء إلى الميناء."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-blue-400" />,
      title: "أسعار تنافسية للغاية",
      description: "تعاقدات واتفاقيات مباشرة مع المصانع والمطاحن والمحاجر الأساسية لتقليل هوامش الوسطاء والأسعار."
    },
    {
      icon: <Shield className="w-5 h-5 text-blue-400" />,
      title: "فحص ومراقبة الجودة",
      description: "عمليات فحص مادية متعددة لدرجات الرطوبة، الأبعاد، المعايرة الدقيقة، واشتراطات التعبئة."
    },
    {
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      title: "قدرات توريد ضخمة",
      description: "مستودعات جافة واسعة ومرافق تعبئة متطورة تلبي احتياجات الطلبات الكبيرة دون أي تأخير."
    },
    {
      icon: <FileText className="w-5 h-5 text-blue-400" />,
      title: "مستندات تصدير كاملة",
      description: "إعداد شهادات المنشأ، الشهادات الصحية النباتية، فواتير الشحن، وغيرها من المستندات بدقة متناهية."
    },
    {
      icon: <Anchor className="w-5 h-5 text-blue-400" />,
      title: "خطوط شحن دولية",
      description: "عقود شحن مع كبرى الخطوط العالمية (Maersk, CMA CGM, MSC) لضمان أقل تكلفة شحن بحري."
    },
    {
      icon: <Fingerprint className="w-5 h-5 text-blue-400" />,
      title: "قوالب ومواصفات مخصصة (OEM)",
      description: "تطوير أبعاد وتصميمات ومواصفات خاصة للمنتجات الورقية، أدوات المائدة، ومستلزمات الضيافة."
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-blue-400" />,
      title: "علامة تجارية خاصة",
      description: "خدمات تغليف مخصصة وطباعة الصناديق الكرتونية الرئيسية التي تحمل علامتك وشعارك التجاري مباشرة."
    }
  ] : [
    {
      icon: <Compass className="w-5 h-5 text-blue-400" />,
      title: "Reliable Export Partner",
      description: "Proven history of successful B2B shipments with transparent logistics and port-to-port visibility."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-blue-400" />,
      title: "Competitive Pricing",
      description: "Direct tie-ups with original manufacturers and quarry sites keep cost basis minimal."
    },
    {
      icon: <Shield className="w-5 h-5 text-blue-400" />,
      title: "Quality Inspection",
      description: "Multiple inspections of moisture levels, grain dimensions, calibrating, and pack limits."
    },
    {
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      title: "Bulk Supply Capacity",
      description: "Spacious dry warehouses and packaging plants can support large volume schedules without lag."
    },
    {
      icon: <FileText className="w-5 h-5 text-blue-400" />,
      title: "Export Documentation",
      description: "Phytosanitary, Certificate of Origin, Form-A, clean Bills of Lading prepared flawlessly."
    },
    {
      icon: <Anchor className="w-5 h-5 text-blue-400" />,
      title: "International Shipping",
      description: "Freight contracts with major lines like Maersk, CMA CGM, MSC for lowest oceanic shipping rates."
    },
    {
      icon: <Fingerprint className="w-5 h-5 text-blue-400" />,
      title: "OEM & Custom Molds",
      description: "Develop unique shapes or specifications for sugarcane dining ware or plastic containers."
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-blue-400" />,
      title: "Private Label Services",
      description: "In-Mold Labeling (IML) and custom master box printing featuring your direct brand assets."
    }
  ];

  return (
    <section id="why-choose-us" className="py-16 sm:py-24 bg-emerald-950 text-white scroll-mt-20 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.08),transparent_40%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-widest text-blue-400 font-extrabold block">
            {t.whyChooseUsBadge}
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.whyChooseUsTitle}
          </h2>
          <div className="w-12 h-1 bg-blue-500 mx-auto mt-4 rounded"></div>
        </div>

        {/* 4x2 Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className={`flex flex-col space-y-3 p-6 bg-emerald-900/40 border border-emerald-800/40 rounded-xl hover:bg-emerald-900/60 hover:border-blue-500/20 transition-all duration-300 shadow-sm ${
                dir === 'rtl' ? 'text-right items-end' : 'text-left items-start'
              }`}
            >
              <div className="p-2.5 bg-emerald-900 text-blue-400 rounded-lg w-fit">
                {pt.icon}
              </div>
              <h3 className="text-base font-bold font-display text-white">{pt.title}</h3>
              <p className={`text-xs text-emerald-100/80 leading-relaxed font-light ${
                dir === 'rtl' ? 'text-right' : 'text-left'
              }`}>{pt.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

