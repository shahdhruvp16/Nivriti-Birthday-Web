// Interactive object sprites for the miniature world.
// Each is a self-contained inline SVG using the project palette. Animation is
// driven by CSS classes (see MiniatureWorld.css) and respects reduced motion.
import React from 'react';

export function Sunflower() {
  const petals = Array.from({ length: 12 });
  return (
    <svg viewBox="0 0 120 160" className="spr spr--sunflower" role="img" aria-label="Sunflower">
      <ellipse cx="60" cy="150" rx="26" ry="6" className="spr-shadow" />
      <path d="M60 150 C 56 110 56 92 60 74" stroke="#4f7a3a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M60 120 C 44 112 36 104 34 92 C 50 92 58 102 60 116 Z" fill="#5c8c43" />
      <path d="M60 104 C 76 98 84 90 86 80 C 70 80 62 88 60 100 Z" fill="#6b9c4e" />
      <g className="sunflower-head">
        {petals.map((_, i) => (
          <ellipse
            key={i}
            cx="60"
            cy="30"
            rx="9"
            ry="20"
            fill="#f0b73f"
            transform={`rotate(${i * 30} 60 48)`}
          />
        ))}
        {petals.map((_, i) => (
          <ellipse
            key={`b${i}`}
            cx="60"
            cy="36"
            rx="7"
            ry="15"
            fill="#e8a52c"
            transform={`rotate(${i * 30 + 15} 60 48)`}
          />
        ))}
        <circle cx="60" cy="48" r="17" fill="#5b3a1e" />
        <circle cx="60" cy="48" r="17" fill="url(#sfCore)" />
      </g>
      <defs>
        <radialGradient id="sfCore" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#7a4f24" />
          <stop offset="100%" stopColor="#3f2713" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function EvilEye() {
  return (
    <svg viewBox="0 0 120 150" className="spr spr--evileye" role="img" aria-label="Evil eye charm">
      <ellipse cx="60" cy="142" rx="20" ry="5" className="spr-shadow" />
      <line x1="60" y1="18" x2="60" y2="40" stroke="#9db8e6" strokeWidth="2" />
      <g className="evileye-bob">
        <circle cx="60" cy="80" r="40" fill="#2a4f8f" />
        <circle cx="60" cy="80" r="40" fill="url(#eeOuter)" />
        <circle cx="60" cy="80" r="29" fill="#f7f0e5" />
        <circle cx="60" cy="80" r="19" fill="#7599d6" />
        <circle cx="60" cy="80" r="19" fill="url(#eeMid)" />
        <circle cx="60" cy="80" r="9" fill="#0f2240" />
        <circle cx="54" cy="73" r="4" fill="#f7f0e5" opacity="0.9" />
      </g>
      <defs>
        <radialGradient id="eeOuter" cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#3f67ad" />
          <stop offset="100%" stopColor="#17315c" />
        </radialGradient>
        <radialGradient id="eeMid" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#9db8e6" />
          <stop offset="100%" stopColor="#5c80c0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function Earphones() {
  return (
    <svg viewBox="0 0 120 120" className="spr spr--earphones" role="img" aria-label="Earphones case">
      <ellipse cx="60" cy="104" rx="30" ry="7" className="spr-shadow" />
      <g className="earphones-lid">
        <rect x="34" y="40" width="52" height="20" rx="9" fill="#dfe7f2" />
        <rect x="34" y="40" width="52" height="20" rx="9" fill="url(#epTop)" />
      </g>
      <rect x="34" y="54" width="52" height="46" rx="12" fill="#f1f4fa" />
      <rect x="34" y="54" width="52" height="46" rx="12" fill="url(#epBody)" />
      <circle cx="60" cy="90" r="3.4" className="earphones-led" fill="#8ad17f" />
      <ellipse cx="49" cy="70" rx="6" ry="9" fill="#c5d0e2" />
      <ellipse cx="71" cy="70" rx="6" ry="9" fill="#c5d0e2" />
      <defs>
        <linearGradient id="epBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d7deea" />
        </linearGradient>
        <linearGradient id="epTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eef2f8" />
          <stop offset="100%" stopColor="#c9d3e3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Charger() {
  return (
    <svg viewBox="0 0 120 120" className="spr spr--charger" role="img" aria-label="Charger">
      <ellipse cx="60" cy="108" rx="26" ry="6" className="spr-shadow" />
      <rect x="40" y="54" width="40" height="40" rx="10" fill="#f1f4fa" />
      <rect x="40" y="54" width="40" height="40" rx="10" fill="url(#chBody)" />
      <rect x="54" y="40" width="5" height="16" rx="2" fill="#b9c4d6" />
      <rect x="62" y="40" width="5" height="16" rx="2" fill="#b9c4d6" />
      <g className="charger-bolt">
        <path d="M62 62 L52 78 H60 L57 90 L70 72 H61 Z" fill="#ffc66d" stroke="#e8b85a" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
      <defs>
        <linearGradient id="chBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d4dce8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Chocolates() {
  return (
    <svg viewBox="0 0 130 120" className="spr spr--chocolates" role="img" aria-label="Box of chocolates">
      <ellipse cx="65" cy="106" rx="40" ry="8" className="spr-shadow" />
      <g className="choc-lid">
        <rect x="24" y="34" width="82" height="22" rx="6" fill="#8a2f52" />
        <rect x="24" y="34" width="82" height="22" rx="6" fill="url(#chocLid)" />
        <path d="M65 34 l6 -10 M65 34 l-6 -10" stroke="#e8b85a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="65" cy="22" r="4" fill="#e8b85a" />
      </g>
      <rect x="26" y="52" width="78" height="46" rx="7" fill="#6d2742" />
      <rect x="30" y="56" width="70" height="38" rx="4" fill="#f2e6d6" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <circle key={`${r}${c}`} cx={42 + c * 23} cy={64 + r * 12} r="6.5" fill={(r + c) % 2 ? '#5a3620' : '#7a4a2a'} />
        ))
      )}
      <defs>
        <linearGradient id="chocLid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a63d63" />
          <stop offset="100%" stopColor="#7a2947" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LetterEnvelope() {
  return (
    <svg viewBox="0 0 140 110" className="spr spr--letter" role="img" aria-label="Sealed letter">
      <ellipse cx="70" cy="100" rx="44" ry="8" className="spr-shadow" />
      <rect x="22" y="34" width="96" height="62" rx="7" fill="#f3ead8" />
      <rect x="22" y="34" width="96" height="62" rx="7" fill="url(#envBody)" />
      <path d="M22 40 L70 74 L118 40" fill="none" stroke="#d8c6a3" strokeWidth="3" />
      <path d="M22 40 L70 70 L118 40 L118 41 L70 72 L22 41 Z" fill="#e5d6b8" />
      <circle cx="70" cy="60" r="12" className="letter-seal" fill="#b23c4e" />
      <circle cx="70" cy="60" r="12" className="letter-seal" fill="url(#seal)" />
      <path d="M66 56 l8 8 M74 56 l-8 8" stroke="#f3ead8" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7f0e5" />
          <stop offset="100%" stopColor="#e6d7bb" />
        </linearGradient>
        <radialGradient id="seal" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#c9505f" />
          <stop offset="100%" stopColor="#8f2b3a" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function Tiramisu({ small = false }) {
  return (
    <svg viewBox="0 0 130 120" className={`spr spr--tiramisu${small ? ' spr--sm' : ''}`} role="img" aria-label="Tiramisu">
      <ellipse cx="65" cy="104" rx="38" ry="8" className="spr-shadow" />
      <path d="M30 70 h70 l-6 26 a4 4 0 0 1 -4 3 h-50 a4 4 0 0 1 -4 -3 Z" fill="#efe3cf" />
      <rect x="28" y="60" width="74" height="14" rx="4" fill="#5a3a22" />
      <rect x="28" y="60" width="74" height="14" rx="4" fill="url(#tiraCocoa)" />
      <rect x="30" y="52" width="70" height="12" rx="4" fill="#f3e7d2" />
      <rect x="32" y="46" width="66" height="10" rx="4" fill="#6b4428" />
      <rect x="34" y="40" width="62" height="9" rx="4" fill="#f6ecd9" />
      {[40, 54, 68, 82].map((x) => (
        <circle key={x} cx={x} cy="40" r="2.4" fill="#5a3a22" opacity="0.5" />
      ))}
      <ellipse cx="86" cy="42" rx="5" ry="4" fill="#c0304a" className="tira-berry" />
      <defs>
        <linearGradient id="tiraCocoa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6e4729" />
          <stop offset="100%" stopColor="#432a17" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PerfumeBottle({ signature = false, label = 'N°14' }) {
  return (
    <svg viewBox="0 0 90 150" className={`spr spr--perfume${signature ? ' spr--signature' : ''}`} role="img" aria-label={`Perfume ${label}`}>
      <ellipse cx="45" cy="142" rx="22" ry="6" className="spr-shadow" />
      <rect x="38" y="16" width="14" height="12" rx="2" fill="#d9c38a" />
      <rect x="40" y="28" width="10" height="10" fill="#b9a06a" />
      <path d="M26 44 q19 -10 38 0 l3 72 a10 10 0 0 1 -10 10 h-24 a10 10 0 0 1 -10 -10 Z" fill="#9db8e6" opacity="0.55" />
      <path d="M26 44 q19 -10 38 0 l3 72 a10 10 0 0 1 -10 10 h-24 a10 10 0 0 1 -10 -10 Z" fill="url(#pfGlass)" />
      <rect x="33" y="78" width="24" height="30" rx="4" fill="#f7f0e5" opacity="0.92" />
      <text x="45" y="90" textAnchor="middle" fontFamily="serif" fontSize="8" fill="#8a2f52">{label}</text>
      <text x="45" y="100" textAnchor="middle" fontFamily="serif" fontSize="4.5" fill="#6d2742">PARFUM</text>
      <path d="M30 50 q15 -7 30 0 l1 20 q-16 -7 -32 0 Z" fill="#ffffff" opacity="0.25" />
      <defs>
        <linearGradient id="pfGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bcd0f0" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#7599d6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4f6fb0" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GiftBox() {
  return (
    <svg viewBox="0 0 120 120" className="spr spr--gift" role="img" aria-label="Gift box">
      <ellipse cx="60" cy="104" rx="36" ry="7" className="spr-shadow" />
      <rect x="30" y="54" width="60" height="46" rx="4" fill="#2a3550" />
      <rect x="30" y="44" width="60" height="16" rx="4" fill="#36446a" />
      <rect x="54" y="44" width="12" height="56" fill="#e8b85a" />
      <path d="M60 44 C 44 30 36 44 60 46 C 84 44 76 30 60 44 Z" fill="#f0cd86" />
      <circle cx="60" cy="45" r="4" fill="#e8b85a" />
    </svg>
  );
}

export function QuestionTerminal() {
  return (
    <svg viewBox="0 0 70 90" className="spr spr--qmark" role="img" aria-label="Hidden note">
      <ellipse cx="35" cy="82" rx="16" ry="4" className="spr-shadow" />
      <rect x="14" y="26" width="42" height="34" rx="5" fill="#0f1830" stroke="#7599d6" strokeWidth="1.5" />
      <text x="35" y="50" textAnchor="middle" fontFamily="monospace" fontSize="22" fill="#e8b85a" className="qmark-char">?</text>
      <rect x="30" y="60" width="10" height="12" fill="#1b2740" />
      <rect x="22" y="72" width="26" height="5" rx="2" fill="#1b2740" />
    </svg>
  );
}

