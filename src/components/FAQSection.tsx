/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filterQuery, setFilterQuery] = useState('');
  const { lang, t, dir } = useLanguage();

  const faqs = lang === 'ar' ? [
    {
      q: "ما هي المنتجات وأدوات المائدة الصديقة للبيئة؟",
      a: "هي أطباق وأكواب وأوعية وصواني وحاويات طعام صديقة للبيئة مصنوعة من ألياف نباتية طبيعية ومتجددة بنسبة 100٪. على عكس البلاستيك أحادي الاستخدام التقليدي أو البوليسترين الذي يستمر لقرون، فإن هذه العناصر تتحلل بشكل طبيعي إلى مواد عضوية غير ضارة."
    },
    {
      q: "ما هي أدوات المائدة المصنوعة من تفل قصب السكر (Bagasse)؟",
      a: "يتم تصنيع أدوات مائدة تفل قصب السكر من تفل قصب السكر - وهو لب قصب السكر المتبقي بعد استخراج السكر. هذه المواد خفيفة الوزن ومعقمة ويتم كبسها تحت ضغط وحرارة عالية لتتحول إلى أطباق أو علب طعام مقاومة للماء والزيت وآمنة للاستخدام في الميكروويف والمجمد."
    },
    {
      q: "هل تصدرون منتجات السلع الاستهلاكية (FMCG) وأدوات المائدة ومواد البناء؟",
      a: "نعم، نحن نصدر تشكيلة واسعة من أدوات المائدة والبورسلين، الأوعية، مفارش الطاولات، السكاكين، الجرانيت الأحمر وجرانيت بلاك جالاكسي والرخام الطبيعي لعملائنا في دول الخليج (مثل الإمارات والسعودية) والعالم مع الالتزام بالاشتراطات المحلية والملصقات الثنائية."
    },
    {
      q: "ما هي كميات الطلب الدنيا (MOQ)؟",
      a: "نظراً لأن شحن البضائع البحرية يحمل رسوم حجز حاويات ثابتة، فإن كمية الطلب القياسية لدينا عادة هي حاوية كاملة (FCL) من المنتجات المختلطة، أو كميات محددة لكل صنف (مثلاً 50,000 وحدة لأدوات تفل قصب السكر أو 5-10 أطنان مترية للجرانيت والرخام والأغذية). تواصل معنا لمناقشة الطلبات التجريبية."
    },
    {
      q: "هل تتوفر خدمات التصنيع وتسمية المنتجات للعلامات الخاصة (Private Label)؟",
      a: "بالتأكيد! نوفر تغطية كاملة لطباعة شعار علامتك التجارية الخاصة على أطباق تفل قصب السكر ومفارش المائدة، أو تصميم قوالب وأبعاد خاصة بالعملاء بجودة عالية وضمان الجودة الصارم."
    },
    {
      q: "ما هي الدول التي تقومون بالتصدير إليها بانتظام؟",
      a: "نقوم بالتصدير والخدمة بشكل نشط إلى دولة الإمارات العربية المتحدة، المملكة العربية السعودية، سلطنة عمان، قطر، الكويت، سنغافورة، نيوزيلندا، كندا، والمملكة المتحدة."
    },
    {
      q: "هل تقدمون مستندات وأوراق التصدير الكاملة؟",
      a: "نعم بالكامل. ندير ونوفر المجموعة القانونية الكاملة لمستندات التصدير بما في ذلك: الفواتير التجارية، قوائم التعبئة التفصيلية، بوليصة الشحن البحري، شهادة المنشأ المعتمدة، الشهادات الصحية النباتية، وفحص الجودة SGS والبيانات الجمركية."
    },
    {
      q: "ما هي خيارات وشروط الشحن المتوفرة؟",
      a: "نوفر خيارات شحن قياسية متعددة: FOB (تسليم على ظهر السفينة) من موانئ تشيناي أو موندرا الهندية؛ CIF (تكلفة التأمين والشحن) مباشرة إلى ميناء التفريغ الخاص بك؛ أو CFR (التكلفة والشحن)."
    }
  ] : [
    {
      q: "What are biodegradable dining ware products?",
      a: "Biodegradable dining ware products are eco-friendly plates, cups, bowls, trays, and food containers made from 100% natural, renewable plant fibers. Unlike traditional single-use plastics or polystyrene which persist for centuries, these items decompose naturally into harmless organic matter, leaving zero carbon residue behind."
    },
    {
      q: "What is sugarcane bagasse tableware?",
      a: "Sugarcane bagasse tableware is crafted from 'bagasse' - the sugarcane fiber pulp remaining after sugar extraction. This dry, fibrous material is clean, sanitized, high-pressure molded into plates or food boxes. It is water and oil-resistant, microwavable, freezer safe, and fully compostable in standard commercial setups within 60 to 90 days."
    },
    {
      q: "Are corn starch products compostable?",
      a: "Yes. Our corn starch dining ware is made from natural corn starch PLA biopolymer. They are fully biodegradable and compostable. They are designed to stand high durability, holding foods up to 100°C without cracking, and naturally dissolve into non-toxic soil nutrients in optimal humidity conditions."
    },
    {
      q: "Can you export FMCG products worldwide?",
      a: "Yes, we export a wide catalog of premium Indian FMCG products, spices, grocery products, and personal care essentials globally. We ensure all products carry correct local-market labeling, bilingual translations if required, and comply with target nation food/health regulatory rules (e.g. FDA, SFDA, EU Standards)."
    },
    {
      q: "What are the minimum order quantities (MOQ)?",
      a: "Because B2B maritime export carries fixed container booking charges, our standard minimum order quantity is typically 1 Full Container Load (FCL) of mixed products, or specific volume targets per item (e.g., 50,000 units for sugarcane tableware, 5-10 Metric Tons for dry groceries). Contact our support team to discuss trial container shipments."
    },
    {
      q: "Do you provide private labeling and OEM support?",
      a: "Absolutely! We provide comprehensive private label and original equipment manufacturing (OEM) support. We can custom emboss your brand logo onto bagasse plates, print your corporate graphics on takeout PP container lids, or package premium spices/rice under your house brand name."
    },
    {
      q: "Which countries do you export to?",
      a: "We actively export and deliver shipments to the UAE, Saudi Arabia, Oman, Qatar, Kuwait, Singapore, Malaysia, Australia, the United Kingdom, USA, Canada, various European ports, and East/South Africa."
    },
    {
      q: "Can you provide export documentation?",
      a: "Yes. We manage and provide the entire legal suite of export documentations including: commercial invoices, detailed packing lists, ocean Bill of Lading, Certificate of Origin (including COO under free-trade agreements), Phytosanitary certificates, SGS quality analysis, and customs shipping bills."
    },
    {
      q: "Do you offer custom packaging?",
      a: "Yes. We can offer custom sizing, custom compartment divisions (e.g., 2, 3, or 5 compartment sugarcane trays), shrink-wrapped packs for retail shelves, and heavy-duty double-wall master corrugated cartons printed with your logistics barcodes."
    },
    {
      q: "What are your shipping options?",
      a: "We offer multiple standard international trade shipping arrangements: FOB (Free On Board) from Chennai, Cochin, or Mundra ports; CIF (Cost, Insurance & Freight) directly to your designated discharge harbor; CFR (Cost and Freight); and EXW (Ex Works) from our storage warehouses."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(filterQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-16 sm:py-24 bg-gray-50/50 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-widest text-emerald-700 font-extrabold block">
            {lang === 'ar' ? 'مركز المعرفة والجمارك المعتمد AEO' : 'AEO / GEO Knowledge Center'}
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-gray-900 tracking-tight">
            {lang === 'ar' ? 'الأسئلة الشائعة والاستفسارات' : 'Frequently Asked Questions'}
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-4 rounded"></div>
        </div>

        {/* Search FAQ */}
        <div className="mb-8 relative max-w-lg mx-auto">
          <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'right-3' : 'left-3'} flex items-center pointer-events-none`}>
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            id="faq-search"
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث في الأسئلة أو الأجوبة...' : 'Search questions or answers...'}
            className={`w-full py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-all text-gray-800 shadow-sm ${
              dir === 'rtl' ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
            }`}
          />
        </div>

        {/* FAQs Accordion */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 max-w-md mx-auto">
            <p className="text-sm text-gray-500">{lang === 'ar' ? 'لم يتم العثور على أي نتائج مطابقة.' : 'No matching questions found.'}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  id={`faq-item-${idx}`}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm transition-all duration-250"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className={`w-full flex items-center justify-between gap-4 p-5 font-display font-semibold text-sm sm:text-base text-gray-900 hover:bg-emerald-50/10 cursor-pointer ${
                      dir === 'rtl' ? 'text-right flex-row-reverse' : 'text-left'
                    }`}
                  >
                    <span className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className={`px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 border-t border-gray-50 leading-relaxed font-light bg-gray-50/20 ${
                      dir === 'rtl' ? 'text-right' : 'text-left'
                    }`}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

