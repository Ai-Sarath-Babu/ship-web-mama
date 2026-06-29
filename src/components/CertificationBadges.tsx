import React from 'react';
import { ShieldCheck, Award, FileCheck, CheckCircle } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

export default function CertificationBadges() {
  const { lang, dir } = useLanguage();

  const badges = [
    {
      label: "RCMC FIEO",
      title: lang === 'ar' ? 'مصدر مسجل RCMC' : 'RCMC Registered Exporter',
      subtitle: lang === 'ar' ? 'اتحاد منظمات التصدير الهندية' : 'Federation of Indian Export Organisations',
      id: "RCMC/FIEO/382092",
      icon: <ShieldCheck className="w-6 h-6 text-amber-500 animate-pulse" />
    },
    {
      label: "SPICE BOARD",
      title: lang === 'ar' ? 'مجلس التوابل الهندي' : 'Spice Board of India Authorized',
      subtitle: lang === 'ar' ? 'وزارة التجارة والصناعة' : 'Ministry of Commerce & Industry',
      id: "SB/REG/2023/8832",
      icon: <Award className="w-6 h-6 text-amber-500" />
    },
    {
      label: "GST REGISTERED",
      title: lang === 'ar' ? 'مسجل ضريبياً GSTIN' : 'GSTIN Tax Registered',
      subtitle: lang === 'ar' ? 'حكومة الهند القانونية' : 'Government of India Corporate Tax',
      id: "33AAYCY2020E1Z9",
      icon: <FileCheck className="w-6 h-6 text-amber-500" />
    },
    {
      label: "IEC LICENSED",
      title: lang === 'ar' ? 'مرخص كود التصدير IEC' : 'IEC Licensed Exporter',
      subtitle: lang === 'ar' ? 'المديرية العامة للتجارة الخارجية' : 'Directorate General of Foreign Trade',
      id: "0716503881",
      icon: <CheckCircle className="w-6 h-6 text-amber-500" />
    }
  ];

  return (
    <div className="bg-gradient-to-b from-emerald-950 to-emerald-980 py-8 border-t border-b border-emerald-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,160,23,0.05),transparent_60%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6">
          <p className="text-[10px] uppercase tracking-widest text-amber-400 font-black">
            {lang === 'ar' ? 'مؤشرات الموثوقية والامتثال الدولي المعتمد' : 'Verified Trade Compliances & Credential Indicators'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`p-4 bg-emerald-900/30 border border-emerald-800/60 rounded-xl flex items-center gap-4 transition-all hover:border-amber-500/30 hover:bg-emerald-900/50 ${
                dir === 'rtl' ? 'flex-row-reverse text-right' : 'text-left'
              }`}
            >
              <div className="p-2.5 bg-emerald-950 rounded-lg border border-emerald-800/80 shrink-0">
                {badge.icon}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-black tracking-widest text-emerald-400 block uppercase">
                  {badge.label}
                </span>
                <h4 className="font-display text-xs font-bold text-white mt-0.5 truncate">
                  {badge.title}
                </h4>
                <p className="text-[10px] text-emerald-100/60 truncate font-light">
                  {badge.subtitle}
                </p>
                <span className="inline-block mt-1 px-1.5 py-0.5 bg-emerald-950 text-[9px] font-mono text-amber-400 border border-emerald-800 rounded">
                  {badge.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
