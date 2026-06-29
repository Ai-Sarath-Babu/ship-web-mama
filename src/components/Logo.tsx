/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from '../utils/LanguageContext';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'light' | 'dark' | 'color';
}

export default function Logo({ className = 'h-10', showText = true, variant = 'color' }: LogoProps) {
  const { lang } = useLanguage();
  // Colors matching the uploaded corporate logo:
  // Teal/Cyan body: #00A7D4 -> emerald-600 / cyan-500
  // Orange containers: #FF7E3D -> orange-500
  // Text Indigo: #2E3192 -> blue-600 / indigo-900

  const tealColor = '#00A7D4';
  const orangeColor = '#FF7E3D';
  const textColor = variant === 'light' ? '#FFFFFF' : '#2E3192';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Scalable SVG Graphic */}
      <svg
        viewBox="0 0 500 500"
        className="h-full w-auto shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Circular Background (optional light glow) */}
        <circle cx="250" cy="250" r="230" fill="#F8FAFC" className="hidden" />

        {/* SHIP GRAPHIC CONTAINER */}
        <g transform="translate(10, 10)">
          
          {/* Water lines/base */}
          <path
            d="M 110 244 C 200 247, 300 247, 390 240 M 130 248 C 220 250, 280 250, 370 245"
            stroke={tealColor}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Ship Main Hull (Teal/Cyan) */}
          <path
            d="M 120 244 
               C 150 244, 160 240, 170 230 
               L 170 205
               L 178 205
               L 178 220
               L 186 220
               L 186 198
               L 194 198
               L 194 212
               C 210 206, 220 206, 230 215 
               L 310 180 
               C 335 168, 350 148, 360 142
               C 345 185, 345 205, 365 228
               C 340 234, 250 241, 120 244 Z"
            fill={tealColor}
          />

          {/* Cabin Details (White highlights) */}
          <rect x="202" y="202" width="22" height="10" fill="#FFFFFF" rx="1" transform="skewY(-12)" />
          <line x1="206" y1="206" x2="206" y2="210" stroke={tealColor} strokeWidth="1.5" />
          <line x1="212" y1="206" x2="212" y2="210" stroke={tealColor} strokeWidth="1.5" />
          <line x1="218" y1="206" x2="218" y2="210" stroke={tealColor} strokeWidth="1.5" />

          {/* Containers Stack (Orange) with perspectived columns */}
          {/* Row 1 Lower & Row 2 Upper */}
          <g transform="translate(10, -5) skewY(-12)">
            {/* Column 1 (Left) */}
            <rect x="235" y="210" width="18" height="24" fill={orangeColor} rx="1" />
            <rect x="235" y="238" width="18" height="24" fill={orangeColor} rx="1" />
            
            {/* Column 2 (Middle) */}
            <rect x="256" y="210" width="18" height="24" fill={orangeColor} rx="1" />
            <rect x="256" y="238" width="18" height="24" fill={orangeColor} rx="1" />

            {/* Column 3 (Right) */}
            <rect x="277" y="210" width="18" height="24" fill={orangeColor} rx="1" />
            <rect x="277" y="238" width="18" height="24" fill={orangeColor} rx="1" />

            {/* Accent division lines inside container boxes for texture */}
            <line x1="244" y1="210" x2="244" y2="262" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
            <line x1="265" y1="210" x2="265" y2="262" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
            <line x1="286" y1="210" x2="286" y2="262" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
          </g>

          {/* Decorative Cabin Smoke */}
          <line x1="174" y1="195" x2="174" y2="182" stroke={tealColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          <line x1="182" y1="190" x2="182" y2="175" stroke={tealColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

        </g>
      </svg>

      {/* Text Brand Name */}
      {showText && (
        <div className="flex flex-col justify-center">
          <span
            className="block font-cursive text-2xl font-bold tracking-wide leading-none transition-colors"
            style={{ color: textColor }}
          >
            Yalini Exim
          </span>
          <span className={`text-[9px] uppercase tracking-[0.15em] font-semibold mt-0.5 ${
            variant === 'light' ? 'text-emerald-200/90' : 'text-emerald-700'
          }`}>
            {lang === 'ar' ? 'شريك التجارة العالمي' : 'Global Trading Partner'}
          </span>
        </div>
      )}
    </div>
  );
}
