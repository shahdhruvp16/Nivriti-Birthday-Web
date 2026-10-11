// Stylized miniature character representing Nivriti.
// Generic, affectionate chibi styling informed by the supplied reference
// (long dark wavy hair, round glasses, cream sweater, light denim, white shoes).
// Gentle idle animation; respects reduced motion via CSS.
import React from 'react';
import './Character.css';

export default function Character({ reduced = false, celebrate = false }) {
  return (
    <div className={`character${reduced ? ' character--still' : ''}${celebrate ? ' character--celebrate' : ''}`}>
      <svg viewBox="0 0 160 220" role="img" aria-label="A little character of Nivriti">
        <ellipse cx="80" cy="208" rx="42" ry="9" className="char-shadow" />

        {/* hair back */}
        <path
          d="M44 70 C 30 110 32 160 42 196 C 54 190 58 150 56 120 C 70 128 92 128 106 120 C 104 152 108 190 120 196 C 130 158 132 110 116 70 Z"
          fill="#1c1b22"
        />

        {/* legs - light denim, seated */}
        <g className="char-legs">
          <path d="M60 150 q-6 30 -4 44 h20 q0 -24 4 -42 Z" fill="#9db8e6" />
          <path d="M80 152 q4 24 4 42 h20 q2 -16 -4 -44 Z" fill="#8aa9df" />
          {/* ripped-knee hints */}
          <path d="M62 176 h12" stroke="#eef3fb" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M86 176 h12" stroke="#dfeaf8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* shoes */}
        <ellipse cx="64" cy="198" rx="13" ry="8" fill="#f4f1ea" />
        <ellipse cx="96" cy="198" rx="13" ry="8" fill="#f4f1ea" />
        <path d="M51 198 h26" stroke="#d6cfc2" strokeWidth="2" />
        <path d="M83 198 h26" stroke="#d6cfc2" strokeWidth="2" />

        {/* body - cream sweater */}
        <g className="char-body">
          <path d="M50 120 q30 -16 60 0 q6 26 2 42 q-32 12 -64 0 q-4 -20 2 -42 Z" fill="#f3ecdd" />
          <path d="M50 120 q30 -16 60 0 q6 26 2 42 q-32 12 -64 0 q-4 -20 2 -42 Z" fill="url(#swShade)" />
          <path d="M80 112 v44" stroke="#e2d8c3" strokeWidth="2" opacity="0.6" />
          {/* arms resting */}
          <path d="M50 122 q-10 20 -4 38 q8 4 14 -2 q-4 -18 2 -34 Z" fill="#efe7d6" />
          <path d="M110 122 q10 20 4 38 q-8 4 -14 -2 q4 -18 -2 -34 Z" fill="#efe7d6" />
        </g>

        {/* neck + head */}
        <rect x="72" y="92" width="16" height="16" rx="6" fill="#e8c3a0" />
        <g className="char-head">
          <ellipse cx="80" cy="74" rx="34" ry="33" fill="#f1cda8" />
          {/* hair front + fringe */}
          <path d="M46 72 C 44 40 60 24 80 24 C 100 24 116 40 114 72 C 108 56 98 50 92 52 C 96 44 86 40 80 40 C 70 40 58 48 54 62 C 52 54 48 58 46 72 Z" fill="#201e26" />
          <path d="M48 66 C 54 54 66 48 72 54 C 66 60 60 70 60 80 C 54 78 50 74 48 66 Z" fill="#2a2730" />
          {/* glasses */}
          <g className="char-glasses" fill="none" stroke="#2a2730" strokeWidth="3">
            <circle cx="67" cy="76" r="11" />
            <circle cx="93" cy="76" r="11" />
            <path d="M78 76 h4" />
            <path d="M56 74 l-7 -2 M104 74 l7 -2" strokeLinecap="round" />
          </g>
          {/* eyes + smile */}
          <circle cx="67" cy="77" r="3.2" fill="#2a2730" />
          <circle cx="93" cy="77" r="3.2" fill="#2a2730" />
          <circle cx="68.2" cy="75.8" r="1" fill="#fff" />
          <circle cx="94.2" cy="75.8" r="1" fill="#fff" />
          <path d="M74 90 q6 5 12 0" stroke="#b5765a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <circle cx="58" cy="86" r="4" fill="#f0a98f" opacity="0.5" />
          <circle cx="102" cy="86" r="4" fill="#f0a98f" opacity="0.5" />
        </g>

        <defs>
          <linearGradient id="swShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#d8ccb2" stopOpacity="0.45" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
