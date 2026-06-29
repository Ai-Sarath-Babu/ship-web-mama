/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Plane, Ship, Clock, Compass, Anchor, X, TrendingUp, BarChart2, 
  Sparkles, Search, Navigation, Info, ShieldCheck, Award, MapPin, 
  Thermometer, Wind, AlertCircle, ArrowRight, HelpCircle, FileText,
  Activity, ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

export default function ExportMap() {
  const { lang, t, dir } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'stone' | 'ceramics' | 'textiles'>('all');
  const [selectedShipment, setSelectedShipment] = useState<string | null>('YE-2026-UK402');
  const [trackerSearch, setTrackerSearch] = useState<string>('');
  const [trackerError, setTrackerError] = useState<string | null>(null);

  // Freight Estimator Tool state
  const [estOrigin, setEstOrigin] = useState<string>('Chennai');
  const [estDestination, setEstDestination] = useState<string>('UK');
  const [estProduct, setEstProduct] = useState<string>('granite');
  const [estVolume, setEstVolume] = useState<string>('20ft-fcl');

  // Country specifications & export statistics
  const countryStats = {
    UK: {
      id: "UK",
      cx: 380,
      cy: 110,
      name: lang === 'ar' ? "المملكة المتحدة" : "United Kingdom",
      flag: "🇬🇧",
      volume: lang === 'ar' ? "18,400 طن متري / سنوياً" : "18,400 Metric Tons / Year",
      containers: lang === 'ar' ? "140+ حاوية كاملة (FCL) شهرياً" : "140+ FCL Containers / Month",
      transit: lang === 'ar' ? "18-22 يوماً" : "18-22 Days",
      port: lang === 'ar' ? "ميناء فيليكستو / ميناء لندن" : "Port of Felixstowe / Port of London",
      standards: "UKCA, CE, ISO 9001:2015",
      growthTrend: lang === 'ar' ? "+14.2% نمو سنوي" : "+14.2% YoY Growth",
      totalRecentVolume: lang === 'ar' ? "4,600 طن متري (الربع الأخير)" : "4,600 MT (Recent Quarter)",
      demands: [
        { label: lang === 'ar' ? "جرانيت وبلاط طبيعي" : "Premium Granite & Natural Stone", pct: 55, cat: 'stone' },
        { label: lang === 'ar' ? "أدوات مائدة وفخاريات المطاعم" : "Restaurant Crockeries & Tableware", pct: 30, cat: 'ceramics' },
        { label: lang === 'ar' ? "مفارش ومناشف طاولات المائدة" : "Dining Linens & Textiles", pct: 15, cat: 'textiles' },
      ],
      hotProducts: lang === 'ar' 
        ? ["جرانيت أسود مطلق مصقول", "أوعية تقديم بورسلين فاخرة", "أطقم سكاكين ستانلس ثقيلة"]
        : ["Absolute Black Polished Granite", "Porcelain Royal Bowls", "Heavy Duty Stainless Cutleries"],
      recentShipments: [
        { date: "2026-06-18", vessel: "Marseille Pride", cargo: lang === 'ar' ? "جرانيت أسود مطلق" : "Absolute Black Granite", qty: "22.5T" },
        { date: "2026-06-02", vessel: "London Express", cargo: lang === 'ar' ? "فخاريات المطاعم" : "Restaurant Crockeries", qty: "18.2T" },
        { date: "2026-05-14", vessel: "Atlantic Titan", cargo: lang === 'ar' ? "مناشف طاولة من الكتان" : "Linen Table Runners", qty: "6.4T" }
      ]
    },
    Singapore: {
      id: "Singapore",
      cx: 600,
      cy: 240,
      name: lang === 'ar' ? "سنغافورة" : "Singapore",
      flag: "🇸🇬",
      volume: lang === 'ar' ? "12,600 طن متري / سنوياً" : "12,600 Metric Tons / Year",
      containers: lang === 'ar' ? "95+ حاوية كاملة (FCL) شهرياً" : "95+ FCL Containers / Month",
      transit: lang === 'ar' ? "5-7 أيام" : "5-7 Days",
      port: lang === 'ar' ? "ميناء سنغافورة (PSA)" : "Port of Singapore (PSA)",
      standards: "SFA Approved, ISO 14001:2015",
      growthTrend: lang === 'ar' ? "+8.5% نمو سنوي" : "+8.5% YoY Growth",
      totalRecentVolume: lang === 'ar' ? "3,150 طن متري (الربع الأخير)" : "3,150 MT (Recent Quarter)",
      demands: [
        { label: lang === 'ar' ? "أدوات المائدة وفخاريات المطاعم" : "Restaurant Crockeries & Tableware", pct: 50, cat: 'ceramics' },
        { label: lang === 'ar' ? "مفارش ومناشف طاولات المائدة" : "Dining Linens & Textiles", pct: 35, cat: 'textiles' },
        { label: lang === 'ar' ? "جرانيت وبلاط طبيعي" : "Premium Granite & Natural Stone", pct: 15, cat: 'stone' },
      ],
      hotProducts: lang === 'ar'
        ? ["مفارش طاولة جاكار الدمشقية", "أوعية شوربة الفخار المصقول", "ألواح جرانيت عاجي ريفي"]
        : ["Jacquard Damask Tablecloths", "Glazed Porcelain Soup Pots", "Ivory Fantasy Granite Slabs"],
      recentShipments: [
        { date: "2026-06-23", vessel: "Singapore Voyager", cargo: lang === 'ar' ? "بورسلين ملكي مطلي" : "Fine Royal Porcelain", qty: "12.4T" },
        { date: "2026-06-08", vessel: "Merlion Star", cargo: lang === 'ar' ? "مفارش طاولة الدمشق" : "Damask Tablecloths", qty: "9.8T" },
        { date: "2026-05-20", vessel: "Temasek Wave", cargo: lang === 'ar' ? "جرانيت عاجي ريفي" : "Ivory Granite Slabs", qty: "24.0T" }
      ]
    },
    NZ: {
      id: "NZ",
      cx: 720,
      cy: 320,
      name: lang === 'ar' ? "نيوزيلندا" : "New Zealand",
      flag: "🇳🇿",
      volume: lang === 'ar' ? "9,200 طن متري / سنوياً" : "9,200 Metric Tons / Year",
      containers: lang === 'ar' ? "75+ حاوية كاملة (FCL) شهرياً" : "75+ FCL Containers / Month",
      transit: lang === 'ar' ? "16-20 يوماً" : "16-20 Days",
      port: lang === 'ar' ? "ميناء أوكلاند / تاورانجا" : "Port of Auckland / Tauranga",
      standards: "MPI Biosecurity Compliant, ISO 9001",
      growthTrend: lang === 'ar' ? "+6.1% نمو سنوي" : "+6.1% YoY Growth",
      totalRecentVolume: lang === 'ar' ? "2,300 طن متري (الربع الأخير)" : "2,300 MT (Recent Quarter)",
      demands: [
        { label: lang === 'ar' ? "جرانيت وبلاط طبيعي" : "Premium Granite & Natural Stone", pct: 60, cat: 'stone' },
        { label: lang === 'ar' ? "أدوات مائدة وفخاريات المطاعم" : "Restaurant Crockeries & Tableware", pct: 25, cat: 'ceramics' },
        { label: lang === 'ar' ? "مفارش ومناشف طاولات المائدة" : "Dining Linens & Textiles", pct: 15, cat: 'textiles' },
      ],
      hotProducts: lang === 'ar'
        ? ["جرانيت بني الغابة المعالج", "صحون عشاء بورسلين كلاسيكية", "مفارش طاولة مطرزة يدوياً"]
        : ["Forest Brown Leathered Granite", "Classic White Dinner Plates", "Hand-loomed Cotton Runners"],
      recentShipments: [
        { date: "2026-06-12", vessel: "Southern Empress", cargo: lang === 'ar' ? "جرانيت بني الغابة" : "Forest Brown Granite", qty: "24.1T" },
        { date: "2026-05-25", vessel: "Pacific Rover", cargo: lang === 'ar' ? "صحون عشاء سيراميك" : "Ceramic Dinner Plates", qty: "11.5T" }
      ]
    },
    Canada: {
      id: "Canada",
      cx: 150,
      cy: 100,
      name: lang === 'ar' ? "كندا" : "Canada",
      flag: "🇨🇦",
      volume: lang === 'ar' ? "15,800 طن متري / سنوياً" : "15,800 Metric Tons / Year",
      containers: lang === 'ar' ? "120+ حاوية كاملة (FCL) شهرياً" : "120+ FCL Containers / Month",
      transit: lang === 'ar' ? "25-30 يوماً" : "25-30 Days",
      port: lang === 'ar' ? "ميناء فانكوفر / ميناء مونتريال" : "Port of Vancouver / Port of Montreal",
      standards: "CSA Certified, CIFA Inspected, ISO 9001",
      growthTrend: lang === 'ar' ? "+11.3% نمو سنوي" : "+11.3% YoY Growth",
      totalRecentVolume: lang === 'ar' ? "3,950 طن متري (الربع الأخير)" : "3,950 MT (Recent Quarter)",
      demands: [
        { label: lang === 'ar' ? "جرانيت وبلاط طبيعي" : "Premium Granite & Natural Stone", pct: 45, cat: 'stone' },
        { label: lang === 'ar' ? "مفارش ومناشف طاولات المائدة" : "Dining Linens & Textiles", pct: 35, cat: 'textiles' },
        { label: lang === 'ar' ? "أدوات مائدة وفخاريات المطاعم" : "Restaurant Crockeries & Tableware", pct: 20, cat: 'ceramics' },
      ],
      hotProducts: lang === 'ar'
        ? ["ألواح رخام أخضر راجستاني", "مفارش قطنية مضادة للبقع", "أكواب قهوة إسبريسو مقواة"]
        : ["Rajasthan Green Marble Slabs", "Stain-Resistant Cotton Tablecloths", "Heavy Rimmed Espresso Cups"],
      recentShipments: [
        { date: "2026-06-10", vessel: "Pacific Horizon", cargo: lang === 'ar' ? "مفارش قطنية مضادة للبقع" : "Stain-Resistant Linens", qty: "8.9T" },
        { date: "2026-05-29", vessel: "Maple Navigator", cargo: lang === 'ar' ? "ألواح رخام أخضر" : "Rajasthan Marble Slabs", qty: "23.4T" }
      ]
    },
    USA: {
      id: "USA",
      cx: 190,
      cy: 120,
      name: lang === 'ar' ? "الولايات المتحدة" : "United States",
      flag: "🇺🇸",
      volume: lang === 'ar' ? "24,800 طن متري / سنوياً" : "24,800 Metric Tons / Year",
      containers: lang === 'ar' ? "185+ حاوية كاملة (FCL) شهرياً" : "185+ FCL Containers / Month",
      transit: lang === 'ar' ? "24-28 يوماً" : "24-28 Days",
      port: lang === 'ar' ? "ميناء نيويورك / هيوستن" : "Port of New York / Houston",
      standards: "FDA Regulated, ASTM Specifications",
      growthTrend: lang === 'ar' ? "+18.4% نمو سنوي" : "+18.4% YoY Growth",
      totalRecentVolume: lang === 'ar' ? "6,200 طن متري (الربع الأخير)" : "6,200 MT (Recent Quarter)",
      demands: [
        { label: lang === 'ar' ? "جرانيت وبلاط طبيعي" : "Premium Granite & Natural Stone", pct: 65, cat: 'stone' },
        { label: lang === 'ar' ? "مفارش ومناشف طاولات المائدة" : "Dining Linens & Textiles", pct: 20, cat: 'textiles' },
        { label: lang === 'ar' ? "أدوات مائدة وفخاريات المطاعم" : "Restaurant Crockeries & Tableware", pct: 15, cat: 'ceramics' },
      ],
      hotProducts: lang === 'ar'
        ? ["ألواح جرانيت أسود ممتازة", "مفارش كلاسيكية جاكار", "صحون فخار متينة للمطاعم"]
        : ["Absolute Black Premium Slabs", "Classic Jacquard Runners", "High-Fired Stoneware Plates"],
      recentShipments: [
        { date: "2026-06-20", vessel: "Atlantic Titan", cargo: lang === 'ar' ? "ألواح جرانيت أسود" : "Premium Granite Slabs", qty: "24.5T" },
        { date: "2026-06-05", vessel: "Liberty Star", cargo: lang === 'ar' ? "صحون فخار متينة" : "High-Fired Stoneware", qty: "16.8T" },
        { date: "2026-05-18", vessel: "Express Breeze", cargo: lang === 'ar' ? "أغطية طاولة من الكتان" : "Linen Napkins & Cloths", qty: "7.2T" }
      ]
    },
    Australia: {
      id: "Australia",
      cx: 690,
      cy: 310,
      name: lang === 'ar' ? "أستراليا" : "Australia",
      flag: "🇦🇺",
      volume: lang === 'ar' ? "14,200 طن متري / سنوياً" : "14,200 Metric Tons / Year",
      containers: lang === 'ar' ? "110+ حاوية كاملة (FCL) شهرياً" : "110+ FCL Containers / Month",
      transit: lang === 'ar' ? "14-18 يوماً" : "14-18 Days",
      port: lang === 'ar' ? "ميناء سيدني / ملبورن" : "Port of Sydney / Melbourne",
      standards: "AS/NZS Standards, ISPM-15 Wood Rules",
      growthTrend: lang === 'ar' ? "+9.7% نمو سنوي" : "+9.7% YoY Growth",
      totalRecentVolume: lang === 'ar' ? "3,550 طن متري (الربع الأخير)" : "3,550 MT (Recent Quarter)",
      demands: [
        { label: lang === 'ar' ? "جرانيت وبلاط طبيعي" : "Premium Granite & Natural Stone", pct: 40, cat: 'stone' },
        { label: lang === 'ar' ? "أدوات مائدة وفخاريات المطاعم" : "Restaurant Crockeries & Tableware", pct: 35, cat: 'ceramics' },
        { label: lang === 'ar' ? "مفارش ومناشف طاولات المائدة" : "Dining Linens & Textiles", pct: 25, cat: 'textiles' },
      ],
      hotProducts: lang === 'ar'
        ? ["ألواح جرانيت بني مصقولة", "صحون كوبيه بورسلين", "مناديل مائدة مطرزة بالهيمستيتش"]
        : ["Tan Brown Polished Slabs", "Porcelain Coupe Plates", "Linen Hemstitch Napkins"],
      recentShipments: [
        { date: "2026-06-15", vessel: "Oceania Raider", cargo: lang === 'ar' ? "جرانيت بني مصقول" : "Polished Granite Slabs", qty: "22.8T" },
        { date: "2026-06-01", vessel: "Sydney Express", cargo: lang === 'ar' ? "صحون بورسلين" : "Porcelain Dinnerware", qty: "13.4T" }
      ]
    },
    UAE: {
      id: "UAE",
      cx: 490,
      cy: 190,
      name: lang === 'ar' ? "الإمارات العربية المتحدة" : "United Arab Emirates",
      flag: "🇦🇪",
      volume: lang === 'ar' ? "21,500 طن متري / سنوياً" : "21,500 Metric Tons / Year",
      containers: lang === 'ar' ? "160+ حاوية كاملة (FCL) شهرياً" : "160+ FCL Containers / Month",
      transit: lang === 'ar' ? "3-4 أيام" : "3-4 Days",
      port: lang === 'ar' ? "ميناء جبل علي، دبي" : "Jebel Ali Port, Dubai",
      standards: "ESMA Standard, GCC Compliance",
      growthTrend: lang === 'ar' ? "+22.1% نمو سنوي" : "+22.1% YoY Growth",
      totalRecentVolume: lang === 'ar' ? "5,370 طن متري (الربع الأخير)" : "5,370 MT (Recent Quarter)",
      demands: [
        { label: lang === 'ar' ? "أدوات مائدة وفخاريات المطاعم" : "Restaurant Crockeries & Tableware", pct: 45, cat: 'ceramics' },
        { label: lang === 'ar' ? "جرانيت وبلاط طبيعي" : "Premium Granite & Natural Stone", pct: 35, cat: 'stone' },
        { label: lang === 'ar' ? "مفارش ومناشف طاولات المائدة" : "Dining Linens & Textiles", pct: 20, cat: 'textiles' },
      ],
      hotProducts: lang === 'ar'
        ? ["أطقم عشاء بورسلين ذهبية ملكية", "ألواح جرانيت أبيض إمبراطوري", "مفارش طاولة فاخرة للمآدب"]
        : ["Royal Gold Dinner Sets", "Imperial White Granite", "Luxury Damask Banqueting Cloths"],
      recentShipments: [
        { date: "2026-06-25", vessel: "Gulf Horizon", cargo: lang === 'ar' ? "أطقم عشاء بورسلين فاخرة" : "Royal Dinnerware Sets", qty: "15.6T" },
        { date: "2026-06-11", vessel: "Desert Falcon", cargo: lang === 'ar' ? "جرانيت أبيض إمبراطوري" : "Imperial White Granite", qty: "24.8T" }
      ]
    },
    Germany: {
      id: "Germany",
      cx: 410,
      cy: 100,
      name: lang === 'ar' ? "ألمانيا" : "Germany",
      flag: "🇩🇪",
      volume: lang === 'ar' ? "11,800 طن متري / سنوياً" : "11,800 Metric Tons / Year",
      containers: lang === 'ar' ? "90+ حاوية كاملة (FCL) شهرياً" : "90+ FCL Containers / Month",
      transit: lang === 'ar' ? "20-24 يوماً" : "20-24 Days",
      port: lang === 'ar' ? "ميناء هامبورغ" : "Port of Hamburg",
      standards: "CE Certified, BfR Food Grade",
      growthTrend: lang === 'ar' ? "+5.4% نمو سنوي" : "+5.4% YoY Growth",
      totalRecentVolume: lang === 'ar' ? "2,950 طن متري (الربع الأخير)" : "2,950 MT (Recent Quarter)",
      demands: [
        { label: lang === 'ar' ? "جرانيت وبلاط طبيعي" : "Premium Granite & Natural Stone", pct: 50, cat: 'stone' },
        { label: lang === 'ar' ? "مفارش ومناشف طاولات المائدة" : "Dining Linens & Textiles", pct: 30, cat: 'textiles' },
        { label: lang === 'ar' ? "أدوات مائدة وفخاريات المطاعم" : "Restaurant Crockeries & Tableware", pct: 20, cat: 'ceramics' },
      ],
      hotProducts: lang === 'ar'
        ? ["جرانيت فيسكونت أبيض جلدي", "أغطية طاولة قطنية عضوية", "أكواب اسبريسو أوروبية متينة"]
        : ["Viscount White Leathered Granite", "Eco-friendly Organic Linens", "Fine Durable Coffee Cups"],
      recentShipments: [
        { date: "2026-06-14", vessel: "Hamburg Express", cargo: lang === 'ar' ? "جرانيت فيسكونت أبيض" : "Viscount White Granite", qty: "23.1T" },
        { date: "2026-05-30", vessel: "Rhine Trader", cargo: lang === 'ar' ? "أغطية طاولة قطنية" : "Organic Cotton Linens", qty: "6.9T" }
      ]
    }
  };

  // Active maritime shipments telemetry
  const shipmentsData = [
    {
      id: "YE-2026-UK402",
      vessel: "Marseille Pride",
      route: lang === 'ar' ? "تشيناي (IN) ➔ لندن (UK)" : "Chennai (IN) ➔ London (UK)",
      destination: "UK",
      progress: 68,
      cargo: lang === 'ar' ? "حاوية جرانيت أسود مطلق مصقول (22.5 طن)" : "40ft Container - Absolute Black Polished Granite (22.5T)",
      category: "stone",
      coordinates: "35.2° N, 14.8° E (Mediterranean Sea)",
      speed: "18.2 kts",
      heading: "285° WNW",
      weather: lang === 'ar' ? "مشمس، رياح خفيفة 12 عقدة" : "Clear, Wind 12 kts, 24°C",
      status: lang === 'ar' ? "شحن نشط - في الوقت المحدد" : "Active Transit - On Schedule",
      departure: "2026-06-15",
      eta: "2026-07-04",
      pathPoints: { x0: 540, y0: 200, x1: 460, y1: 140, x2: 380, y2: 110 } // Beziers
    },
    {
      id: "YE-2026-SG105",
      vessel: "Singapore Voyager",
      route: lang === 'ar' ? "توتيكورين (IN) ➔ سنغافورة PSA" : "Tuticorin (IN) ➔ Singapore PSA",
      destination: "Singapore",
      progress: 92,
      cargo: lang === 'ar' ? "حاوية أدوات مائدة خزفية وبورسلين ملكي" : "20ft Container - Fine Glazed Porcelain Ware (12.4T)",
      category: "ceramics",
      coordinates: "2.4° N, 101.9° E (Strait of Malacca)",
      speed: "19.5 kts",
      heading: "115° SE",
      weather: lang === 'ar' ? "مطر خفيف، رياح 8 عقدة" : "Light Rain, Wind 8 kts, 28°C",
      status: lang === 'ar' ? "اقتراب من المياه الإقليمية للميناء" : "Inbound Port Clearance Pending",
      departure: "2026-06-23",
      eta: "2026-06-30",
      pathPoints: { x0: 540, y0: 200, x1: 570, y1: 220, x2: 600, y2: 240 }
    },
    {
      id: "YE-2026-CA229",
      vessel: "Pacific Horizon",
      route: lang === 'ar' ? "موندرا (IN) ➔ فانكوفر (CA)" : "Mundra (IN) ➔ Vancouver (CA)",
      destination: "Canada",
      progress: 41,
      cargo: lang === 'ar' ? "حاوية مفارش قطنية فاخرة ومفارش طاولة الدمشق" : "40ft HC Container - Damask & Cotton Tablecloths (8.9T)",
      category: "textiles",
      coordinates: "38.5° N, -155.2° W (North Pacific)",
      speed: "16.8 kts",
      heading: "082° E",
      weather: lang === 'ar' ? "أمواج متوسطة، رياح 22 عقدة" : "Moderate Swell, Wind 22 kts, 14°C",
      status: lang === 'ar' ? "عبور المحيط الهادئ" : "Pacific Crossing - Cruising",
      departure: "2026-06-10",
      eta: "2026-07-12",
      pathPoints: { x0: 540, y0: 200, x1: 345, y1: 130, x2: 150, y2: 100 }
    },
    {
      id: "YE-2026-NZ338",
      vessel: "Southern Empress",
      route: lang === 'ar' ? "تشيناي (IN) ➔ تاورانجا (NZ)" : "Chennai (IN) ➔ Tauranga (NZ)",
      destination: "NZ",
      progress: 79,
      cargo: lang === 'ar' ? "بلاط جرانيت بني الغابة المعالج" : "40ft Container - Forest Brown Leathered Granite (24.1T)",
      category: "stone",
      coordinates: "-32.4° S, 158.1° E (Tasman Sea)",
      speed: "17.4 kts",
      heading: "135° SE",
      weather: lang === 'ar' ? "رياح خفيفة، أمواج هادئة" : "Calm Swell, Wind 10 kts, 18°C",
      status: lang === 'ar' ? "عبور بحر تسمان نشط" : "Tasman Sea Crossing - On Track",
      departure: "2026-06-12",
      eta: "2026-07-03",
      pathPoints: { x0: 540, y0: 200, x1: 640, y1: 270, x2: 720, y2: 320 }
    }
  ];

  const handleSearchTracker = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSearch = trackerSearch.trim().toUpperCase();
    if (!cleanSearch) return;

    const matched = shipmentsData.find(s => s.id.includes(cleanSearch) || s.vessel.toUpperCase().includes(cleanSearch));
    if (matched) {
      setSelectedShipment(matched.id);
      setTrackerError(null);
    } else {
      setTrackerError(lang === 'ar' ? "لم يتم العثور على شحنة بهذا الرقم. جرب: YE-2026-UK402" : "No active container found. Try: YE-2026-UK402");
    }
  };

  const getActiveShipmentObject = () => {
    return shipmentsData.find(s => s.id === selectedShipment) || shipmentsData[0];
  };

  // Helper function to calculate Quadratic Bezier points for placement of the dynamic vessel
  const getBezierXY = (x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, t: number) => {
    const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * x1 + t * t * x2;
    const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * y1 + t * t * y2;
    return { x, y };
  };

  // Calculate estimated metrics based on estimator form selection
  const getEstimatorResult = () => {
    let transit = "18-22 Days";
    let docs = ["Commercial Invoice", "Bill of Lading", "Packing List", "Certificate of Origin"];
    let recommendSize = "20ft Heavy Duty FCL";
    let portFee = "FOB Quote Available";

    if (estDestination === 'Singapore') {
      transit = "5-7 Days";
      recommendSize = estProduct === 'granite' ? "20ft Heavy FCL" : "40ft High-Cube FCL";
      docs.push("SFA Clearance Declaration");
    } else if (estDestination === 'UK') {
      transit = "18-22 Days via Suez";
      recommendSize = estProduct === 'granite' ? "20ft Heavy FCL (Max Weight)" : "40ft High Cube";
      docs.push("CE/UKCA Declaration", "Fumigation Certificate");
    } else if (estDestination === 'Canada') {
      transit = "25-30 Days via Pacific";
      recommendSize = estProduct === 'granite' ? "20ft FCL (Tri-Axle Chassis)" : "40ft FCL";
      docs.push("CIFA Inspection Cert", "Wood Packaging Declaration");
    } else if (estDestination === 'NZ') {
      transit = "16-20 Days via Tasman";
      recommendSize = estProduct === 'granite' ? "20ft Heavy FCL" : "40ft High-Cube";
      docs.push("MPI Biosecurity Declaration", "Fumigation Certificate");
    } else if (estDestination === 'USA') {
      transit = "24-28 Days via Atlantic";
      recommendSize = estProduct === 'granite' ? "20ft FCL with Tri-Axle Chassis" : "40ft High-Cube FCL";
      docs.push("FDA Registration", "Lacey Act Filing", "ISF-10 Declaration");
    } else if (estDestination === 'Australia') {
      transit = "14-18 Days";
      recommendSize = estProduct === 'granite' ? "20ft Heavy FCL" : "40ft Standard FCL";
      docs.push("AS/NZS Compliance Cert", "AQIS Biosecurity Seal", "Fumigation Certificate");
    } else if (estDestination === 'UAE') {
      transit = "3-4 Days Express";
      recommendSize = "20ft or 40ft Dry Van Container";
      docs.push("ESMA Standard Registration", "Chamber legalized COO");
    } else if (estDestination === 'Germany') {
      transit = "20-24 Days via Gibraltar";
      recommendSize = estProduct === 'granite' ? "20ft Heavy FCL" : "40ft Standard Container";
      docs.push("CE Conformity", "BfR Food Safe Declaration");
    }

    return { transit, docs, recommendSize, portFee };
  };

  const estResult = getEstimatorResult();

  return (
    <section id="export-network" className="py-16 sm:py-24 bg-gray-50/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-widest text-emerald-700 font-extrabold block">
            {lang === 'ar' ? 'ممرات التجارة العالمية والطلب الفعلي' : 'Global Trade Corridors & Real-time Demand'}
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {lang === 'ar' ? 'شبكة شحن تفاعلية حية ومقاييس الطلب العالمي' : 'Interactive Sourcing Corridors & Live Shipments'}
          </h2>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed font-light">
            {lang === 'ar'
              ? 'تتبع حاويات الجرانيت، السيراميك، والمنسوجات التابعة لنا عبر البحار في الوقت الفعلي. قم بتقدير جداول الشحن وموانئ التحميل وشهادات التصدير الإقليمية لكل من القارات.'
              : 'Track our outbound granite, crockeries, and luxury linen shipments across international waters in real-time. Dynamically estimate shipping timetables, loading port logistics, and customs parameters.'
            }
          </p>
          <div className="w-12 h-1 bg-emerald-700 mx-auto mt-4 rounded"></div>
        </div>

        {/* Global Loading Ports Quick-cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          <div className={`p-6 bg-white border border-gray-150 rounded-2xl shadow-sm hover:border-emerald-700/20 transition-all ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="p-2 bg-emerald-50 text-emerald-800 rounded-xl">
                <Anchor className="w-5 h-5 stroke-[2]" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Hub Port South</h4>
                <h3 className="font-display text-base font-bold text-gray-900">Chennai & Tuticorin</h3>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              {lang === 'ar' 
                ? "قنوات تصدير رئيسية للجرانيت الجنوبي عالي الصلابة، أدوات المائدة من السيراميك الفاخر، ومفارش المائدة القطنية المنسوجة يدوياً."
                : "Primary outbound gateway for southern absolute granite, premium glazed porcelain dinnerware, and high-quality combed cotton table linens."
              }
            </p>
          </div>

          <div className={`p-6 bg-white border border-gray-150 rounded-2xl shadow-sm hover:border-emerald-700/20 transition-all ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="p-2 bg-emerald-50 text-emerald-800 rounded-xl">
                <Compass className="w-5 h-5 stroke-[2]" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Hub Port West</h4>
                <h3 className="font-display text-base font-bold text-gray-900">Mundra & Nhava Sheva</h3>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              {lang === 'ar'
                ? "قنوات رئيسية لجرانيت راجستان وأحجار الكوارتز، والمستلزمات الفندقية ومصنوعات المطابخ المعدنية الثقيلة."
                : "Preferred dispatch routes for Northern mineral slabs, Makrana marbles, stainless steel kitchenware, and industrial restaurant items."
              }
            </p>
          </div>

          <div className={`p-6 bg-emerald-900 text-white border border-transparent rounded-2xl shadow-md ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="p-2 bg-emerald-800 text-amber-400 rounded-xl">
                <ShieldCheck className="w-5 h-5 stroke-[2]" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-emerald-200/60 uppercase tracking-widest leading-none">Standards Guaranteed</h4>
                <h3 className="font-display text-base font-bold text-white">{lang === 'ar' ? 'اعتماد وجودة معترف بها' : 'Certified Safe Cargo'}</h3>
              </div>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed font-light">
              {lang === 'ar'
                ? "نحن نضمن توافق الشحنات مع معايير الجمارك الصارمة، بما في ذلك التبخير، والشهادات البيئية والمخبرية الفورية لمنع التأخير."
                : "All shipments pre-cleared by dedicated customs brokers. Wood pallets are fully heat-treated/ISPM-15 compliant with instant certification."
              }
            </p>
          </div>

        </div>

        {/* Dashboard Frame */}
        <div className="bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-800 rounded-3xl p-4 sm:p-8 shadow-lg space-y-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.03),transparent_45%)]"></div>

          {/* Controls Bar */}
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-gray-100 dark:border-slate-800 pb-6">
            <div className="space-y-1 text-left">
              <span className="text-[10px] uppercase tracking-widest text-emerald-800 dark:text-amber-400 font-extrabold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                {lang === 'ar' ? 'الشبكة الملاحية التفاعلية ثنائية القطب' : 'Live Interactive Global Demand Map'}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {lang === 'ar' ? 'تتبع مسارات الشحن ومستوى الطلب' : 'Explore Sourcing Demands & Active Vessels'}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-light max-w-xl">
                {lang === 'ar'
                  ? "قم بتصفية الخريطة لعرض ممرات الطلب المخصصة أو تتبع حركة السفن النشطة حالياً عبر المحيطات المفتوحة."
                  : "Toggle category filters to illuminate regional demand indices, or select active shipments on the side tab to animate real-time transit telemetry."
                }
              </p>
            </div>

            {/* Category Heatmap Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => { setActiveCategory('all'); setSelectedCountry(null); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-emerald-800 border-emerald-900 text-white shadow-xs'
                    : 'bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 border-gray-200 text-gray-600 dark:text-gray-300'
                }`}
              >
                {lang === 'ar' ? 'الكل (العام)' : 'Show All Routes'}
              </button>
              <button
                type="button"
                onClick={() => { setActiveCategory('stone'); setSelectedCountry(null); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === 'stone'
                    ? 'bg-amber-600 border-amber-700 text-white shadow-xs'
                    : 'bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 border-gray-200 text-gray-600 dark:text-gray-300'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                {lang === 'ar' ? 'الجرانيت والأحجار' : 'Granite & Stones'}
              </button>
              <button
                type="button"
                onClick={() => { setActiveCategory('ceramics'); setSelectedCountry(null); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === 'ceramics'
                    ? 'bg-emerald-700 border-emerald-800 text-white shadow-xs'
                    : 'bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 border-gray-200 text-gray-600 dark:text-gray-300'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-300"></div>
                {lang === 'ar' ? 'الخزف والفخاريات' : 'Restaurant Crockeries'}
              </button>
              <button
                type="button"
                onClick={() => { setActiveCategory('textiles'); setSelectedCountry(null); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === 'textiles'
                    ? 'bg-amber-500 border-amber-600 text-emerald-950 shadow-xs font-bold'
                    : 'bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 border-gray-200 text-gray-600 dark:text-gray-300'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-amber-300 animate-pulse"></div>
                {lang === 'ar' ? 'المنسوجات والمفارش' : 'Luxury Linens'}
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Map Column (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-[16/10] sm:aspect-[20/10] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center p-1.5">
                
                {/* SVG Map Backplane */}
                <svg className="absolute inset-0 w-full h-full text-slate-800/15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-dark" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                    
                    {/* Glowing gradients for categories */}
                    <linearGradient id="route-all" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#84cc16" stopOpacity="0.2" />
                    </linearGradient>

                    <linearGradient id="route-stone" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#eab308" stopOpacity="0.2" />
                    </linearGradient>

                    <linearGradient id="route-ceramics" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
                    </linearGradient>

                    <linearGradient id="route-textiles" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#fef08a" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-dark)" />
                </svg>

                {/* SVG Interactive Elements */}
                <svg className="w-full h-full select-none" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                  
                  {/* Abstract continent guides for geographic aesthetic */}
                  <g fill="#1e293b" fillOpacity="0.25" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,4" className="pointer-events-none">
                    {/* North America approximation */}
                    <path d="M 50 60 L 180 40 L 220 120 L 140 180 Z" />
                    {/* Europe & North Asia */}
                    <path d="M 330 60 L 460 50 L 500 120 L 380 150 Z" />
                    {/* Southern Asia */}
                    <path d="M 480 160 L 580 180 L 620 230 L 510 240 Z" />
                    {/* Australia & Oceania */}
                    <path d="M 660 280 L 750 290 L 760 350 L 680 340 Z" />
                  </g>

                  {/* Bezier Trade Routes */}
                  
                  {/* India to UK Route */}
                  <path
                    d="M 540 200 Q 460 140 380 110"
                    fill="none"
                    stroke={
                      activeCategory === 'stone' ? 'url(#route-stone)' : 
                      activeCategory === 'ceramics' ? 'url(#route-ceramics)' : 
                      activeCategory === 'textiles' ? 'url(#route-textiles)' : 'url(#route-all)'
                    }
                    strokeWidth={activeCategory === 'all' || activeCategory === 'stone' || activeCategory === 'ceramics' ? '2.5' : '1'}
                    strokeDasharray="5,5"
                    className="transition-all"
                    style={{ animation: 'dash 1.3s linear infinite' }}
                  />

                  {/* India to Canada Route */}
                  <path
                    d="M 540 200 Q 345 130 150 100"
                    fill="none"
                    stroke={
                      activeCategory === 'stone' ? 'url(#route-stone)' : 
                      activeCategory === 'ceramics' ? 'url(#route-ceramics)' : 
                      activeCategory === 'textiles' ? 'url(#route-textiles)' : 'url(#route-all)'
                    }
                    strokeWidth={activeCategory === 'all' || activeCategory === 'stone' || activeCategory === 'textiles' ? '2.5' : '1'}
                    strokeDasharray="5,5"
                    className="transition-all"
                    style={{ animation: 'dash 1.6s linear infinite' }}
                  />

                  {/* India to Singapore Route */}
                  <path
                    d="M 540 200 Q 570 220 600 240"
                    fill="none"
                    stroke={
                      activeCategory === 'stone' ? 'url(#route-stone)' : 
                      activeCategory === 'ceramics' ? 'url(#route-ceramics)' : 
                      activeCategory === 'textiles' ? 'url(#route-textiles)' : 'url(#route-all)'
                    }
                    strokeWidth={activeCategory === 'all' || activeCategory === 'ceramics' || activeCategory === 'textiles' ? '2.5' : '1'}
                    strokeDasharray="5,5"
                    className="transition-all"
                    style={{ animation: 'dash 0.8s linear infinite' }}
                  />

                  {/* India to NZ Route */}
                  <path
                    d="M 540 200 Q 640 270 720 320"
                    fill="none"
                    stroke={
                      activeCategory === 'stone' ? 'url(#route-stone)' : 
                      activeCategory === 'ceramics' ? 'url(#route-ceramics)' : 
                      activeCategory === 'textiles' ? 'url(#route-textiles)' : 'url(#route-all)'
                    }
                    strokeWidth={activeCategory === 'all' || activeCategory === 'stone' ? '2.5' : '1'}
                    strokeDasharray="5,5"
                    className="transition-all"
                    style={{ animation: 'dash 2s linear infinite' }}
                  />

                  {/* India to USA Route */}
                  <path
                    d="M 540 200 Q 365 160 190 120"
                    fill="none"
                    stroke={
                      activeCategory === 'stone' ? 'url(#route-stone)' : 
                      activeCategory === 'ceramics' ? 'url(#route-ceramics)' : 
                      activeCategory === 'textiles' ? 'url(#route-textiles)' : 'url(#route-all)'
                    }
                    strokeWidth={activeCategory === 'all' || activeCategory === 'stone' || activeCategory === 'textiles' ? '2.5' : '1'}
                    strokeDasharray="5,5"
                    className="transition-all"
                    style={{ animation: 'dash 1.8s linear infinite' }}
                  />

                  {/* India to Australia Route */}
                  <path
                    d="M 540 200 Q 615 255 690 310"
                    fill="none"
                    stroke={
                      activeCategory === 'stone' ? 'url(#route-stone)' : 
                      activeCategory === 'ceramics' ? 'url(#route-ceramics)' : 
                      activeCategory === 'textiles' ? 'url(#route-textiles)' : 'url(#route-all)'
                    }
                    strokeWidth={activeCategory === 'all' || activeCategory === 'ceramics' || activeCategory === 'stone' ? '2.5' : '1'}
                    strokeDasharray="5,5"
                    className="transition-all"
                    style={{ animation: 'dash 1.4s linear infinite' }}
                  />

                  {/* India to UAE Route */}
                  <path
                    d="M 540 200 Q 515 195 490 190"
                    fill="none"
                    stroke={
                      activeCategory === 'stone' ? 'url(#route-stone)' : 
                      activeCategory === 'ceramics' ? 'url(#route-ceramics)' : 
                      activeCategory === 'textiles' ? 'url(#route-textiles)' : 'url(#route-all)'
                    }
                    strokeWidth={activeCategory === 'all' || activeCategory === 'ceramics' || activeCategory === 'stone' || activeCategory === 'textiles' ? '2.5' : '1'}
                    strokeDasharray="5,5"
                    className="transition-all"
                    style={{ animation: 'dash 0.6s linear infinite' }}
                  />

                  {/* India to Germany Route */}
                  <path
                    d="M 540 200 Q 475 140 410 100"
                    fill="none"
                    stroke={
                      activeCategory === 'stone' ? 'url(#route-stone)' : 
                      activeCategory === 'ceramics' ? 'url(#route-ceramics)' : 
                      activeCategory === 'textiles' ? 'url(#route-textiles)' : 'url(#route-all)'
                    }
                    strokeWidth={activeCategory === 'all' || activeCategory === 'stone' || activeCategory === 'textiles' ? '2.5' : '1'}
                    strokeDasharray="5,5"
                    className="transition-all"
                    style={{ animation: 'dash 1.2s linear infinite' }}
                  />

                  {/* Dynamic pulsing vessel based on selected shipment */}
                  {(() => {
                    const activeShip = getActiveShipmentObject();
                    if (!activeShip) return null;
                    const tVal = activeShip.progress / 100;
                    const p = activeShip.pathPoints;
                    const currentPos = getBezierXY(p.x0, p.y0, p.x1, p.y1, p.x2, p.y2, tVal);

                    // Choose colors based on category
                    const dotColor = 
                      activeShip.category === 'stone' ? '#f59e0b' : 
                      activeShip.category === 'ceramics' ? '#10b981' : '#eab308';

                    return (
                      <g className="transition-all duration-700">
                        {/* Outer expanding radar pulse */}
                        <circle cx={currentPos.x} cy={currentPos.y} r="18" fill={dotColor} fillOpacity="0.1" className="animate-ping" style={{ animationDuration: '2s' }} />
                        <circle cx={currentPos.x} cy={currentPos.y} r="10" fill={dotColor} fillOpacity="0.2" className="animate-pulse" />
                        <circle cx={currentPos.x} cy={currentPos.y} r="5" fill={dotColor} />
                        
                        {/* Dynamic Ship Identifier Flag */}
                        <g transform={`translate(${currentPos.x - 25}, ${currentPos.y - 28})`}>
                          <rect width="50" height="15" rx="4" fill="#0f172a" stroke={dotColor} strokeWidth="1" />
                          <text x="25" y="10" fill="#ffffff" fontSize="7" fontWeight="extrabold" textAnchor="middle" fontFamily="sans-serif">
                            {activeShip.vessel.split(' ')[0]}
                          </text>
                        </g>
                        
                        {/* Compass Line indicating route vector */}
                        <line x1={currentPos.x} y1={currentPos.y} x2={currentPos.x + 15} y2={currentPos.y - 15} stroke={dotColor} strokeWidth="0.8" strokeDasharray="1,2" />
                      </g>
                    );
                  })()}

                  {/* INDIA HUB ORIGIN (Chennai Port) */}
                  <g className="cursor-default">
                    <circle cx="540" cy="200" r="16" fill="#10b981" fillOpacity="0.15" className="animate-ping" style={{ animationDuration: '3s' }} />
                    <circle cx="540" cy="200" r="8" fill="#10b981" fillOpacity="0.3" className="animate-pulse" />
                    <circle cx="540" cy="200" r="5" fill="#10b981" />
                    {/* Hub Tag */}
                    <rect x="522" y="170" width="36" height="16" rx="4" fill="#047857" stroke="#34d399" strokeWidth="1" />
                    <text x="540" y="181" fill="#ffffff" fontSize="7" fontWeight="black" textAnchor="middle" fontFamily="monospace">
                      IN-HUB
                    </text>
                  </g>

                  {/* UK Destination Marker */}
                  <motion.g 
                    className="cursor-pointer group" 
                    onClick={() => setSelectedCountry(countryStats.UK)}
                    onMouseEnter={() => setHoveredCountry(countryStats.UK)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    style={{ originX: "380px", originY: "110px" }}
                  >
                    {/* Enlarged touch hit-area for touchscreens */}
                    <circle cx="380" cy="110" r="32" fill="transparent" pointerEvents="all" />
                    {activeCategory === 'stone' || activeCategory === 'all' || activeCategory === 'ceramics' ? (
                      <motion.circle 
                        cx="380" 
                        cy="110" 
                        r="22" 
                        fill="#f59e0b" 
                        initial={{ opacity: 0.1, scale: 0.8 }}
                        animate={{ opacity: [0.1, 0.35, 0.1], scale: [0.8, 1.25, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    ) : null}
                    <circle cx="380" cy="110" r="10" fill="#f59e0b" fillOpacity="0.2" className="group-hover:fill-opacity-40 transition-all" />
                    <circle cx="380" cy="110" r="4.5" fill="#f59e0b" className="group-hover:scale-125 transition-transform" />
                    {/* Tag label */}
                    <g transform="translate(355, 75)">
                      <rect width="50" height="20" rx="6" fill="#1e293b" stroke={activeCategory === 'stone' ? '#f59e0b' : '#475569'} strokeWidth="1" className="shadow-md" />
                      <text x="25" y="12" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                        🇬🇧 {lang === 'ar' ? "بريطانيا" : "UK"}
                      </text>
                    </g>
                  </motion.g>

                  {/* Singapore Destination Marker */}
                  <motion.g 
                    className="cursor-pointer group" 
                    onClick={() => setSelectedCountry(countryStats.Singapore)}
                    onMouseEnter={() => setHoveredCountry(countryStats.Singapore)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    style={{ originX: "600px", originY: "240px" }}
                  >
                    {/* Enlarged touch hit-area for touchscreens */}
                    <circle cx="600" cy="240" r="32" fill="transparent" pointerEvents="all" />
                    {activeCategory === 'ceramics' || activeCategory === 'all' || activeCategory === 'textiles' ? (
                      <motion.circle 
                        cx="600" 
                        cy="240" 
                        r="22" 
                        fill="#10b981" 
                        initial={{ opacity: 0.1, scale: 0.8 }}
                        animate={{ opacity: [0.1, 0.35, 0.1], scale: [0.8, 1.25, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    ) : null}
                    <circle cx="600" cy="240" r="10" fill="#10b981" fillOpacity="0.2" className="group-hover:fill-opacity-40 transition-all" />
                    <circle cx="600" cy="240" r="4.5" fill="#10b981" className="group-hover:scale-125 transition-transform" />
                    {/* Tag label */}
                    <g transform="translate(575, 252)">
                      <rect width="50" height="20" rx="6" fill="#1e293b" stroke={activeCategory === 'ceramics' ? '#10b981' : '#475569'} strokeWidth="1" className="shadow-md" />
                      <text x="25" y="12" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                        🇸🇬 {lang === 'ar' ? "سنغافورة" : "SG"}
                      </text>
                    </g>
                  </motion.g>

                  {/* Canada Destination Marker */}
                  <motion.g 
                    className="cursor-pointer group" 
                    onClick={() => setSelectedCountry(countryStats.Canada)}
                    onMouseEnter={() => setHoveredCountry(countryStats.Canada)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    style={{ originX: "150px", originY: "100px" }}
                  >
                    {/* Enlarged touch hit-area for touchscreens */}
                    <circle cx="150" cy="100" r="32" fill="transparent" pointerEvents="all" />
                    {activeCategory === 'textiles' || activeCategory === 'all' || activeCategory === 'stone' ? (
                      <motion.circle 
                        cx="150" 
                        cy="100" 
                        r="22" 
                        fill="#eab308" 
                        initial={{ opacity: 0.1, scale: 0.8 }}
                        animate={{ opacity: [0.1, 0.35, 0.1], scale: [0.8, 1.25, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    ) : null}
                    <circle cx="150" cy="100" r="10" fill="#eab308" fillOpacity="0.2" className="group-hover:fill-opacity-40 transition-all" />
                    <circle cx="150" cy="100" r="4.5" fill="#eab308" className="group-hover:scale-125 transition-transform" />
                    {/* Tag label */}
                    <g transform="translate(125, 65)">
                      <rect width="50" height="20" rx="6" fill="#1e293b" stroke={activeCategory === 'textiles' ? '#fbbf24' : '#475569'} strokeWidth="1" className="shadow-md" />
                      <text x="25" y="12" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                        🇨🇦 {lang === 'ar' ? "كندا" : "CA"}
                      </text>
                    </g>
                  </motion.g>

                  {/* New Zealand Destination Marker */}
                  <motion.g 
                    className="cursor-pointer group" 
                    onClick={() => setSelectedCountry(countryStats.NZ)}
                    onMouseEnter={() => setHoveredCountry(countryStats.NZ)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    style={{ originX: "720px", originY: "320px" }}
                  >
                    {/* Enlarged touch hit-area for touchscreens */}
                    <circle cx="720" cy="320" r="32" fill="transparent" pointerEvents="all" />
                    {activeCategory === 'stone' || activeCategory === 'all' ? (
                      <motion.circle 
                        cx="720" 
                        cy="320" 
                        r="22" 
                        fill="#f59e0b" 
                        initial={{ opacity: 0.1, scale: 0.8 }}
                        animate={{ opacity: [0.1, 0.35, 0.1], scale: [0.8, 1.25, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    ) : null}
                    <circle cx="720" cy="320" r="10" fill="#f59e0b" fillOpacity="0.2" className="group-hover:fill-opacity-40 transition-all" />
                    <circle cx="720" cy="320" r="4.5" fill="#f59e0b" className="group-hover:scale-125 transition-transform" />
                    {/* Tag label */}
                    <g transform="translate(695, 282)">
                      <rect width="50" height="20" rx="6" fill="#1e293b" stroke={activeCategory === 'stone' ? '#f59e0b' : '#475569'} strokeWidth="1" className="shadow-md" />
                      <text x="25" y="12" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                        🇳🇿 {lang === 'ar' ? "نيوزيلندا" : "NZ"}
                      </text>
                    </g>
                  </motion.g>

                  {/* USA Destination Marker */}
                  <motion.g 
                    className="cursor-pointer group" 
                    onClick={() => setSelectedCountry(countryStats.USA)}
                    onMouseEnter={() => setHoveredCountry(countryStats.USA)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    style={{ originX: "190px", originY: "120px" }}
                  >
                    {/* Enlarged touch hit-area for touchscreens */}
                    <circle cx="190" cy="120" r="32" fill="transparent" pointerEvents="all" />
                    {activeCategory === 'stone' || activeCategory === 'textiles' || activeCategory === 'all' ? (
                      <motion.circle 
                        cx="190" 
                        cy="120" 
                        r="22" 
                        fill="#eab308" 
                        initial={{ opacity: 0.1, scale: 0.8 }}
                        animate={{ opacity: [0.1, 0.35, 0.1], scale: [0.8, 1.25, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    ) : null}
                    <circle cx="190" cy="120" r="10" fill="#eab308" fillOpacity="0.2" className="group-hover:fill-opacity-40 transition-all" />
                    <circle cx="190" cy="120" r="4.5" fill="#eab308" className="group-hover:scale-125 transition-transform" />
                    {/* Tag label */}
                    <g transform="translate(165, 85)">
                      <rect width="50" height="20" rx="6" fill="#1e293b" stroke={activeCategory === 'stone' ? '#f59e0b' : activeCategory === 'textiles' ? '#eab308' : '#475569'} strokeWidth="1" className="shadow-md" />
                      <text x="25" y="12" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                        🇺🇸 {lang === 'ar' ? "أمريكا" : "USA"}
                      </text>
                    </g>
                  </motion.g>

                  {/* Australia Destination Marker */}
                  <motion.g 
                    className="cursor-pointer group" 
                    onClick={() => setSelectedCountry(countryStats.Australia)}
                    onMouseEnter={() => setHoveredCountry(countryStats.Australia)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    style={{ originX: "690px", originY: "310px" }}
                  >
                    {/* Enlarged touch hit-area for touchscreens */}
                    <circle cx="690" cy="310" r="32" fill="transparent" pointerEvents="all" />
                    {activeCategory === 'stone' || activeCategory === 'ceramics' || activeCategory === 'all' ? (
                      <motion.circle 
                        cx="690" 
                        cy="310" 
                        r="22" 
                        fill="#f59e0b" 
                        initial={{ opacity: 0.1, scale: 0.8 }}
                        animate={{ opacity: [0.1, 0.35, 0.1], scale: [0.8, 1.25, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    ) : null}
                    <circle cx="690" cy="310" r="10" fill="#f59e0b" fillOpacity="0.2" className="group-hover:fill-opacity-40 transition-all" />
                    <circle cx="690" cy="310" r="4.5" fill="#f59e0b" className="group-hover:scale-125 transition-transform" />
                    {/* Tag label */}
                    <g transform="translate(665, 272)">
                      <rect width="50" height="20" rx="6" fill="#1e293b" stroke={activeCategory === 'stone' ? '#f59e0b' : activeCategory === 'ceramics' ? '#10b981' : '#475569'} strokeWidth="1" className="shadow-md" />
                      <text x="25" y="12" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                        🇦🇺 {lang === 'ar' ? "أستراليا" : "AUS"}
                      </text>
                    </g>
                  </motion.g>

                  {/* UAE Destination Marker */}
                  <motion.g 
                    className="cursor-pointer group" 
                    onClick={() => setSelectedCountry(countryStats.UAE)}
                    onMouseEnter={() => setHoveredCountry(countryStats.UAE)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    style={{ originX: "490px", originY: "190px" }}
                  >
                    {/* Enlarged touch hit-area for touchscreens */}
                    <circle cx="490" cy="190" r="32" fill="transparent" pointerEvents="all" />
                    {activeCategory === 'ceramics' || activeCategory === 'stone' || activeCategory === 'all' ? (
                      <motion.circle 
                        cx="490" 
                        cy="190" 
                        r="22" 
                        fill="#10b981" 
                        initial={{ opacity: 0.1, scale: 0.8 }}
                        animate={{ opacity: [0.1, 0.35, 0.1], scale: [0.8, 1.25, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    ) : null}
                    <circle cx="490" cy="190" r="10" fill="#10b981" fillOpacity="0.2" className="group-hover:fill-opacity-40 transition-all" />
                    <circle cx="490" cy="190" r="4.5" fill="#10b981" className="group-hover:scale-125 transition-transform" />
                    {/* Tag label */}
                    <g transform="translate(465, 155)">
                      <rect width="50" height="20" rx="6" fill="#1e293b" stroke={activeCategory === 'ceramics' ? '#10b981' : activeCategory === 'stone' ? '#f59e0b' : '#475569'} strokeWidth="1" className="shadow-md" />
                      <text x="25" y="12" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                        🇦🇪 {lang === 'ar' ? "الإمارات" : "UAE"}
                      </text>
                    </g>
                  </motion.g>

                  {/* Germany Destination Marker */}
                  <motion.g 
                    className="cursor-pointer group" 
                    onClick={() => setSelectedCountry(countryStats.Germany)}
                    onMouseEnter={() => setHoveredCountry(countryStats.Germany)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    style={{ originX: "410px", originY: "100px" }}
                  >
                    {/* Enlarged touch hit-area for touchscreens */}
                    <circle cx="410" cy="100" r="32" fill="transparent" pointerEvents="all" />
                    {activeCategory === 'stone' || activeCategory === 'textiles' || activeCategory === 'all' ? (
                      <motion.circle 
                        cx="410" 
                        cy="100" 
                        r="22" 
                        fill="#10b981" 
                        initial={{ opacity: 0.1, scale: 0.8 }}
                        animate={{ opacity: [0.1, 0.35, 0.1], scale: [0.8, 1.25, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    ) : null}
                    <circle cx="410" cy="100" r="10" fill="#10b981" fillOpacity="0.2" className="group-hover:fill-opacity-40 transition-all" />
                    <circle cx="410" cy="100" r="4.5" fill="#10b981" className="group-hover:scale-125 transition-transform" />
                    {/* Tag label */}
                    <g transform="translate(385, 65)">
                      <rect width="50" height="20" rx="6" fill="#1e293b" stroke={activeCategory === 'stone' ? '#f59e0b' : activeCategory === 'textiles' ? '#fbbf24' : '#475569'} strokeWidth="1" className="shadow-md" />
                      <text x="25" y="12" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                        🇩🇪 {lang === 'ar' ? "ألمانيا" : "GER"}
                      </text>
                    </g>
                  </motion.g>

                </svg>

                {/* Map Bottom Status Overlays */}
                <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 text-[10px] text-emerald-400 px-3 py-1.5 rounded-lg flex items-center gap-2 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-mono">GPS Marine Feeds: Connected</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-900/90 border border-slate-800 text-[10px] text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-sm">
                  <Info className="w-3.5 h-3.5 text-amber-500" />
                  <span>Click markers for local demand metrics</span>
                </div>

                {/* Floating Interactive Tooltip */}
                <AnimatePresence>
                  {hoveredCountry && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute',
                        left: `${(hoveredCountry.cx / 800) * 100}%`,
                        top: `${(hoveredCountry.cy / 400) * 100}%`,
                        transform: hoveredCountry.cx > 650 
                          ? 'translate(-80%, -125%)' 
                          : hoveredCountry.cx < 150 
                          ? 'translate(-20%, -125%)' 
                          : 'translate(-50%, -125%)',
                      }}
                      className="z-40 pointer-events-none min-w-[220px] bg-slate-950/95 border border-slate-700/60 rounded-xl shadow-2xl p-3 text-left text-white backdrop-blur-md"
                    >
                      {/* Arrow point */}
                      <div 
                        className="absolute bottom-0 w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-slate-950/95 translate-y-full"
                        style={{
                          left: hoveredCountry.cx > 650 
                            ? '80%' 
                            : hoveredCountry.cx < 150 
                            ? '20%' 
                            : '50%',
                          transform: 'translateX(-50%)'
                        }}
                      ></div>
                      
                      <div className="flex items-center gap-2 border-b border-slate-800 pb-1.5 mb-1.5">
                        <span className="text-xl animate-bounce" style={{ animationDuration: '3s' }} role="img" aria-label={hoveredCountry.name}>
                          {hoveredCountry.flag}
                        </span>
                        <div className="text-left">
                          <h5 className="font-display font-black text-xs text-amber-400 leading-tight">{hoveredCountry.name}</h5>
                          <span className="text-[8px] text-gray-400 font-medium block leading-none">{hoveredCountry.port.split(' / ')[0].split('،')[0]}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-[10px]">
                        <div className="flex justify-between items-center text-gray-400">
                          <span>{lang === 'ar' ? 'حجم الاستيراد السنوي' : 'Annual Volume'}</span>
                          <span className="font-bold text-white">{hoveredCountry.volume.split(' / ')[0]}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-400">
                          <span>{lang === 'ar' ? 'معدل الحاويات' : 'Monthly FCL'}</span>
                          <span className="font-mono text-emerald-400 font-bold">{hoveredCountry.containers.split(' ')[0]}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-400">
                          <span>{lang === 'ar' ? 'اتجاه النمو السنوي' : 'YoY Growth'}</span>
                          <span className="font-bold text-emerald-500">{hoveredCountry.growthTrend}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-400 border-t border-slate-800/80 pt-1.5 mt-1.5">
                          <span>{lang === 'ar' ? 'الطلب الأساسي' : 'Primary Demand'}</span>
                          <span className="text-amber-400 font-semibold text-[9px] truncate max-w-[110px]">
                            {hoveredCountry.demands[0].label.split(' & ')[0].split(' وبلاط ')[0]}
                          </span>
                        </div>
                      </div>
                      <div className="text-[8px] text-slate-500 text-center mt-2 border-t border-slate-850 pt-1 font-medium italic">
                        {lang === 'ar' ? 'انقر للمؤشرات والواردات التفصيلية' : 'Click for complete regional statistics'}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Selected Shipment Summary Banner */}
              {(() => {
                const s = getActiveShipmentObject();
                if (!s) return null;
                return (
                  <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fadeIn">
                    <div className="space-y-1.5 text-left">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[10px] rounded uppercase font-mono">
                          {s.id}
                        </span>
                        <h4 className="font-display font-bold text-sm text-slate-100 flex items-center gap-1">
                          <Ship className="w-4 h-4 text-emerald-500" />
                          <span>M/V {s.vessel}</span>
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 leading-tight">
                        <strong>Cargo description:</strong> {s.cargo}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-[11px] text-gray-400">
                        <div>
                          <span className="block text-[9px] text-gray-500 uppercase font-bold">Maritime Coordinates</span>
                          <span className="font-mono text-emerald-400">{s.coordinates}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-gray-500 uppercase font-bold">Oceanic Speed</span>
                          <span className="font-mono text-white">{s.speed} ({s.heading})</span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-gray-500 uppercase font-bold">Climate System</span>
                          <span className="text-slate-200 font-sans">{s.weather}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-gray-500 uppercase font-bold">Calculated ETA</span>
                          <span className="font-mono text-amber-400">{s.eta}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-auto shrink-0 space-y-2 text-left md:text-right">
                      <span className="text-[10px] text-gray-400 uppercase font-extrabold block">Route Progress</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${s.progress}%` }}></div>
                        </div>
                        <span className="font-mono font-bold text-sm text-emerald-400">{s.progress}%</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded block text-center md:text-right font-medium">
                        {s.status}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Sidebar Columns (lg:col-span-4) - Shipment list & Quick Estimator */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              
              {/* Box 1: Vessel Shipments List */}
              <div className="bg-gray-50/50 dark:bg-slate-900/20 border border-gray-150 dark:border-slate-800 rounded-2xl p-5 space-y-4 text-left flex-1">
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-sm text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-emerald-700" />
                    <span>{lang === 'ar' ? 'أسطول السفن النشط (قيد النقل)' : 'Active Export Shipments'}</span>
                  </h4>
                  <p className="text-[11px] text-gray-500">Select any shipment vessel to project its live navigation path and marine status.</p>
                </div>

                {/* Tracker Search Bar */}
                <form onSubmit={handleSearchTracker} className="relative">
                  <input
                    type="text"
                    value={trackerSearch}
                    onChange={(e) => setTrackerSearch(e.target.value)}
                    placeholder={lang === 'ar' ? "مثال: UK402 أو SG105" : "Search Container or Vessel..."}
                    className="w-full pl-3 pr-10 py-1.5 text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none font-sans font-medium"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg cursor-pointer transition-colors border-0"
                  >
                    <Search className="w-3 h-3" />
                  </button>
                </form>
                {trackerError && (
                  <p className="text-[10px] text-red-600 dark:text-red-400 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{trackerError}</span>
                  </p>
                )}

                {/* Shipping Cards list */}
                <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
                  {shipmentsData.map((ship) => {
                    const isSelected = selectedShipment === ship.id;
                    const catColors: Record<string, string> = {
                      stone: 'bg-amber-500 text-amber-950',
                      ceramics: 'bg-emerald-700 text-emerald-50',
                      textiles: 'bg-yellow-500 text-emerald-950'
                    };
                    return (
                      <button
                        key={ship.id}
                        type="button"
                        onClick={() => { setSelectedShipment(ship.id); setTrackerError(null); }}
                        className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer block ${
                          isSelected
                            ? 'bg-white dark:bg-slate-900 border-emerald-700 shadow-sm ring-1 ring-emerald-700/30'
                            : 'bg-white/40 dark:bg-slate-950/20 hover:bg-white border-gray-150 dark:border-slate-800/80 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-display font-bold text-xs text-gray-950 dark:text-white">
                            M/V {ship.vessel}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase font-mono ${catColors[ship.category] || 'bg-gray-100'}`}>
                            {ship.category}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
                          <span className="truncate max-w-[150px]">{ship.route}</span>
                          <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">
                            {ship.progress}%
                          </span>
                        </div>
                        {/* Progress line */}
                        <div className="w-full bg-gray-150 dark:bg-slate-800 h-1 mt-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-600 h-full" style={{ width: `${ship.progress}%` }}></div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Box 2: Port-to-Port Freight Estimator */}
              <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl p-5 space-y-4 text-left">
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-sm text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart2 className="w-4 h-4 text-emerald-700" />
                    <span>{lang === 'ar' ? 'حاسبة النقل البحري الفورية (FOB / CIF)' : 'Outbound Logistics Estimator'}</span>
                  </h4>
                  <p className="text-[11px] text-gray-500">Calculate average marine transit, required certificates, and recommended packaging parameters.</p>
                </div>

                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wide text-gray-500 font-extrabold block">Target Destination</label>
                      <select
                        value={estDestination}
                        onChange={(e) => setEstDestination(e.target.value)}
                        className="w-full p-2 text-xs bg-gray-50 dark:bg-slate-950 border border-gray-150 dark:border-slate-800 rounded-xl focus:outline-none"
                      >
                        <option value="UK">🇬🇧 London / Felixstowe</option>
                        <option value="Singapore">🇸🇬 Singapore PSA</option>
                        <option value="Canada">🇨🇦 Vancouver Port</option>
                        <option value="NZ">🇳🇿 Auckland / Tauranga</option>
                        <option value="USA">🇺🇸 New York / Houston</option>
                        <option value="Australia">🇦🇺 Sydney / Melbourne</option>
                        <option value="UAE">🇦🇪 Dubai Jebel Ali</option>
                        <option value="Germany">🇩🇪 Hamburg Port</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wide text-gray-500 font-extrabold block">Product Family</label>
                      <select
                        value={estProduct}
                        onChange={(e) => setEstProduct(e.target.value)}
                        className="w-full p-2 text-xs bg-gray-50 dark:bg-slate-950 border border-gray-150 dark:border-slate-800 rounded-xl focus:outline-none"
                      >
                        <option value="granite">Premium Granite Slabs</option>
                        <option value="ceramics">Glazed Tableware</option>
                        <option value="textiles">Fine Table Linens</option>
                      </select>
                    </div>
                  </div>

                  {/* Calculations Result Output */}
                  <div className="bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/30 p-3 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-gray-500">Estimated Transit:</span>
                      <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-700" />
                        {estResult.transit}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-gray-500">Recommended Container:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{estResult.recommendSize}</span>
                    </div>

                    <div className="space-y-1 pt-1.5 border-t border-emerald-100/30">
                      <span className="text-[9px] uppercase font-bold text-gray-500 block">Required Customs Filing Papers:</span>
                      <div className="flex flex-wrap gap-1">
                        {estResult.docs.map((doc, idx) => (
                          <span key={idx} className="bg-white dark:bg-slate-950 border border-emerald-100 dark:border-slate-800 text-[9px] px-1.5 py-0.5 rounded text-gray-600 dark:text-emerald-300">
                            ✓ {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Direct pre-filled quotation trigger button */}
                  <a
                    href="#contact-desk"
                    onClick={() => {
                      const subjectElem = document.getElementById('inquiry-subject') as HTMLInputElement;
                      const msgElem = document.getElementById('inquiry-message') as HTMLTextAreaElement;
                      if (subjectElem) {
                        subjectElem.value = `Export Quotation Request: FOB/CIF shipping to ${estDestination} port`;
                      }
                      if (msgElem) {
                        msgElem.value = `Hello Yalini Exim export coordinator, we would like to request an official pricing & freight quote for:\n- Destination Port: ${estDestination}\n- Product Family: ${estProduct}\n- Shipping Unit: ${estResult.recommendSize}\n- Sourcing requirements: please contact us back.`;
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer border-0"
                  >
                    <span>Request FOB/CIF Freight Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* CSS Keyframe animations injected inline for moving marine dashes */}
        <style>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -30;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

      </div>

      {/* Country Statistics Detail Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-emerald-950/80 backdrop-blur-sm animate-fadeIn pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))]" dir={dir}>
          <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 rounded-2xl md:rounded-3xl max-w-lg w-full max-h-[88vh] sm:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800 relative">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-emerald-950 text-white relative shrink-0 pt-[calc(1.25rem+env(safe-area-inset-top))]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_40%)]"></div>
              <button
                type="button"
                onClick={() => setSelectedCountry(null)}
                className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} bg-emerald-900/80 hover:bg-emerald-800 text-white p-2 rounded-full cursor-pointer transition-colors z-10 border-0`}
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="relative z-10 flex items-center gap-3">
                <span className="text-3xl sm:text-4xl" role="img" aria-label={selectedCountry.name}>
                  {selectedCountry.flag}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-amber-400 font-bold block text-left truncate">
                    {lang === 'ar' ? 'مؤشرات الطلب والاستيراد الإقليمية' : 'Regional Sourcing Metrics'}
                  </span>
                  <h3 className="font-display text-lg sm:text-2xl font-extrabold text-white text-left truncate leading-tight">
                    {selectedCountry.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 scrollbar-thin">
              
              {/* Sourcing volumes & Growth Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="bg-gray-50 dark:bg-slate-950/40 border border-gray-150 dark:border-slate-800 p-3.5 rounded-xl space-y-1 text-left">
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider font-bold block">{lang === 'ar' ? 'حجم الاستيراد السنوي' : 'Annual Sourced'}</span>
                  <div className="text-xs font-black text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{selectedCountry.volume.split(' / ')[0]}</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-slate-950/40 border border-gray-150 dark:border-slate-800 p-3.5 rounded-xl space-y-1 text-left">
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider font-bold block">{lang === 'ar' ? 'الحاويات شهرياً' : 'Containers/Mo'}</span>
                  <div className="text-xs font-black text-gray-900 dark:text-white flex items-center gap-1">
                    <Ship className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{selectedCountry.containers.split(' ')[0]}</span>
                  </div>
                </div>
                <div className="bg-emerald-50/35 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/30 p-3.5 rounded-xl space-y-1 text-left">
                  <span className="text-[9px] text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-bold block">{lang === 'ar' ? 'اتجاه النمو' : 'Import Growth'}</span>
                  <div className="text-xs font-black text-emerald-800 dark:text-emerald-400 flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{selectedCountry.growthTrend}</span>
                  </div>
                </div>
                <div className="bg-amber-50/30 dark:bg-amber-950/5 border border-amber-100/40 dark:border-amber-900/10 p-3.5 rounded-xl space-y-1 text-left">
                  <span className="text-[9px] text-amber-700 dark:text-amber-400 uppercase tracking-wider font-bold block">{lang === 'ar' ? 'إجمالي الصادرات مؤخراً' : 'Recent Total Volume'}</span>
                  <div className="text-xs font-black text-amber-800 dark:text-amber-400 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{selectedCountry.totalRecentVolume}</span>
                  </div>
                </div>
              </div>

              {/* Categorized Demands */}
              <div className="space-y-3 text-left">
                <h4 className="text-xs font-bold text-emerald-850 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-emerald-700" />
                  <span>{lang === 'ar' ? 'توزيع نسبة الطلب حسب الفئة' : 'Localized Demand Percentages'}</span>
                </h4>
                <div className="space-y-3">
                  {selectedCountry.demands.map((item: any, i: number) => {
                    const barColor = 
                      item.cat === 'stone' ? 'bg-amber-500' : 
                      item.cat === 'ceramics' ? 'bg-emerald-600' : 'bg-yellow-500';
                    return (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                          <span className="font-mono text-emerald-800 dark:text-amber-400 font-bold">{item.pct}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full ${barColor} rounded-full`} style={{ width: `${item.pct}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Details table */}
              <div className="bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/30 p-4 rounded-xl space-y-2.5 text-left text-xs">
                <div className="flex justify-between items-center border-b border-emerald-100/30 dark:border-emerald-900/20 pb-2">
                  <span className="text-gray-500 dark:text-gray-400">{lang === 'ar' ? 'موانئ الاستقبال الرئيسية' : 'Primary Receiving Sea Ports'}</span>
                  <span className="font-bold text-emerald-900 dark:text-emerald-300">{selectedCountry.port}</span>
                </div>
                <div className="flex justify-between items-center border-b border-emerald-100/30 dark:border-emerald-900/20 pb-2">
                  <span className="text-gray-500 dark:text-gray-400">{lang === 'ar' ? 'متوسط ​​مدة العبور' : 'Average Transit Duration'}</span>
                  <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{selectedCountry.transit}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">{lang === 'ar' ? 'الشهادات والمواصفات المعتمدة' : 'Regional Compliance Standards'}</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{selectedCountry.standards}</span>
                </div>
              </div>

              {/* Fast Selling Products */}
              <div className="space-y-2 text-left">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">{lang === 'ar' ? 'أبرز المنتجات المطلوبة في هذه المنطقة' : 'Trending Sourced Products'}</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCountry.hotProducts.map((p: string, i: number) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[10px] text-emerald-900 bg-emerald-50 dark:text-amber-400 dark:bg-amber-400/5 border border-emerald-100 dark:border-amber-400/10 px-2.5 py-1 rounded-lg font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{p}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Exports History */}
              <div className="space-y-3 text-left border-t border-gray-100 dark:border-slate-800 pt-5">
                <h4 className="text-xs font-bold text-emerald-850 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>{lang === 'ar' ? 'سجل الصادرات الأخير للمنطقة' : 'Recent Export Shipments Log'}</span>
                </h4>
                <div className="overflow-hidden border border-gray-150 dark:border-slate-800 rounded-xl">
                  <table className="min-w-full divide-y divide-gray-150 dark:divide-slate-800 text-left text-[11px]">
                    <thead className="bg-gray-50 dark:bg-slate-950/60 font-semibold text-gray-500">
                      <tr>
                        <th className="px-3 py-2 font-bold">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                        <th className="px-3 py-2 font-bold">{lang === 'ar' ? 'السفينة' : 'Vessel'}</th>
                        <th className="px-3 py-2 font-bold">{lang === 'ar' ? 'الشحنة' : 'Cargo'}</th>
                        <th className="px-3 py-2 font-bold text-right">{lang === 'ar' ? 'الكمية' : 'Qty'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-slate-800 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300">
                      {(selectedCountry.recentShipments || [
                        { date: "2026-06-12", vessel: "Marseille Pride", cargo: "Granite Slabs", qty: "22.5T" },
                        { date: "2026-05-28", vessel: "Asia Star", cargo: "Porcelain Ware", qty: "14.8T" }
                      ]).map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-slate-950/20">
                          <td className="px-3 py-2 font-mono text-gray-500">{item.date}</td>
                          <td className="px-3 py-2 font-medium">{item.vessel}</td>
                          <td className="px-3 py-2 truncate max-w-[120px]">{item.cargo}</td>
                          <td className="px-3 py-2 text-right font-mono text-emerald-800 dark:text-emerald-400 font-bold">{item.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-950/20 flex justify-end shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={() => setSelectedCountry(null)}
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl cursor-pointer border-0"
              >
                {lang === 'ar' ? 'إغلاق النافذة' : 'Close Details'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
