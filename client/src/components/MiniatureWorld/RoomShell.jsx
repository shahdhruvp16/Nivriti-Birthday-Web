// Static diorama shell for the miniature world: night sky, cozy room with an
// isometric floor, window + moon, bed, desk, bookshelf, warm lamps, plants,
// a garden extension, and the little perfume boutique. Drawn as one cohesive
// SVG (viewBox 0 0 1000 820). Interactive objects are overlaid separately.
import React from 'react';

export default function RoomShell() {
  return (
    <svg
      className="room-shell"
      viewBox="0 0 1000 820"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#caa06a" />
          <stop offset="100%" stopColor="#9c7446" />
        </linearGradient>
        <linearGradient id="floorR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b78a56" />
          <stop offset="100%" stopColor="#8c663b" />
        </linearGradient>
        <linearGradient id="wallBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2742" />
          <stop offset="100%" stopColor="#243457" />
        </linearGradient>
        <linearGradient id="wallSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#16213a" />
          <stop offset="100%" stopColor="#1e2d4c" />
        </linearGradient>
        <radialGradient id="moon" cx="40%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#fff6e2" />
          <stop offset="100%" stopColor="#f0d9a2" />
        </radialGradient>
        <radialGradient id="windowSky" cx="50%" cy="30%" r="90%">
          <stop offset="0%" stopColor="#2a3b63" />
          <stop offset="100%" stopColor="#0e1830" />
        </radialGradient>
        <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,198,109,0.55)" />
          <stop offset="100%" stopColor="rgba(255,198,109,0)" />
        </radialGradient>
        <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4e7a44" />
          <stop offset="100%" stopColor="#38602f" />
        </linearGradient>
      </defs>

      {/* ---- walls ---- */}
      <polygon points="150,70 500,150 500,560 150,470" fill="url(#wallSide)" />
      <polygon points="500,150 850,70 850,470 500,560" fill="url(#wallBack)" />
      {/* wall skirting */}
      <polygon points="150,470 500,560 500,585 150,495" fill="#101a30" opacity="0.6" />
      <polygon points="500,560 850,470 850,495 500,585" fill="#0c1428" opacity="0.6" />

      {/* ---- round window + moon + stars ---- */}
      <g>
        <circle cx="675" cy="210" r="86" fill="url(#windowSky)" stroke="#30456f" strokeWidth="6" />
        <circle cx="648" cy="188" r="34" fill="url(#moon)" />
        <circle cx="662" cy="180" r="7" fill="#e3cb97" opacity="0.5" />
        <circle cx="640" cy="202" r="5" fill="#e3cb97" opacity="0.4" />
        {[[700, 170], [720, 230], [660, 250], [625, 160], [705, 205]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.2" fill="#f7f0e5" opacity="0.85" />
        ))}
        <line x1="675" y1="124" x2="675" y2="296" stroke="#30456f" strokeWidth="3" opacity="0.6" />
        <line x1="589" y1="210" x2="761" y2="210" stroke="#30456f" strokeWidth="3" opacity="0.6" />
      </g>

      {/* string lights along back wall */}
      <path d="M300 150 Q 400 205 500 182" fill="none" stroke="#3b4b6e" strokeWidth="2" />
      {[320, 360, 400, 440, 480].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={168 + (i === 2 ? 18 : i === 1 || i === 3 ? 10 : 0)} r="4.5" fill="#ffc66d" className="twinkle-lamp" />
        </g>
      ))}

      {/* ---- floor (isometric diamond) ---- */}
      <polygon points="500,560 150,470 500,820 500,560" fill="url(#floor)" />
      <polygon points="500,560 850,470 500,820 500,560" fill="url(#floorR)" />
      {/* plank seams */}
      <g stroke="#86603a" strokeWidth="2" opacity="0.5">
        <line x1="300" y1="515" x2="430" y2="690" />
        <line x1="400" y1="540" x2="470" y2="745" />
        <line x1="700" y1="515" x2="560" y2="690" />
        <line x1="600" y1="540" x2="535" y2="745" />
      </g>

      {/* rug */}
      <polygon points="500,610 360,575 500,715 640,575" fill="#7a3b4e" opacity="0.9" />
      <polygon points="500,628 395,600 500,692 605,600" fill="none" stroke="#e8b85a" strokeWidth="3" opacity="0.7" />

      {/* ---- bed (back-left) ---- */}
      <g>
        <polygon points="205,430 320,460 320,510 205,480" fill="#2d3a58" />
        <polygon points="205,430 265,415 380,445 320,460" fill="#39496e" />
        <polygon points="320,460 380,445 380,495 320,510" fill="#2a3550" />
        {/* mattress + blanket */}
        <polygon points="212,432 268,418 372,447 318,462" fill="#efe7d6" />
        <polygon points="300,452 372,447 372,470 318,478" fill="#c98aa0" />
        {/* pillow */}
        <polygon points="222,432 250,425 282,434 254,443" fill="#fbf6ec" />
      </g>

      {/* ---- desk + bookshelf (back-right) ---- */}
      <g>
        {/* bookshelf on back wall */}
        <polygon points="690,300 790,278 790,430 690,452" fill="#5a3f28" />
        <polygon points="690,300 790,278 790,290 690,312" fill="#6d4e33" />
        {[328, 362, 396].map((y, r) => (
          <polygon key={r} points={`696,${y} 784,${y - 20} 784,${y - 12} 696,${y + 8}`} fill="#4a331f" />
        ))}
        {[[700, 318, '#c9505f'], [712, 316, '#5c80c0'], [724, 314, '#e8b85a'], [736, 312, '#6b9c4e'], [748, 310, '#d08a4a']].map(
          ([x, y, c], i) => (
            <rect key={i} x={x} y={y - 22} width="7" height="22" fill={c} />
          )
        )}
      </g>

      {/* potted plants */}
      <g>
        <path d="M250 540 q-16 -46 -4 -70 q10 22 6 70 Z" fill="#4e7a44" />
        <path d="M250 540 q16 -40 30 -56 q-6 26 -22 58 Z" fill="#5c8c4f" />
        <path d="M234 538 h36 l-6 26 h-24 Z" fill="#b4603a" />
      </g>
      <g>
        <path d="M778 540 q14 -40 4 -64 q-10 20 -8 64 Z" fill="#4e7a44" />
        <path d="M778 540 q-14 -36 -28 -50 q6 24 20 52 Z" fill="#5c8c4f" />
        <path d="M760 538 h36 l-6 26 h-24 Z" fill="#b4603a" />
      </g>

      {/* ---- garden extension (front-left) with blue finial posts ---- */}
      <g>
        <polygon points="150,470 150,560 360,650 360,575" fill="url(#grass)" opacity="0.95" />
        {[[180, 505], [250, 545], [320, 585]].map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 7} y={y - 46} width="14" height="46" rx="3" fill="#8a6a44" />
            <path d={`M${x} ${y - 70} q11 10 0 24 q-11 -14 0 -24 Z`} fill="#7599d6" />
            <circle cx={x} cy={y - 70} r="4" fill="#9db8e6" />
          </g>
        ))}
        {[[200, 548, '#f0a9c0'], [275, 585, '#e8b85a'], [230, 610, '#9db8e6']].map(([x, y, c], i) => (
          <circle key={`f${i}`} cx={x} cy={y} r="7" fill={c} />
        ))}
      </g>

      {/* warm floor lamp (front-right of room) */}
      <g>
        <ellipse cx="840" cy="430" rx="120" ry="90" fill="url(#lampGlow)" className="lamp-glow" />
        <rect x="836" y="360" width="8" height="90" fill="#5a452c" />
        <path d="M812 360 h56 l-12 -36 h-32 Z" fill="#ffd98a" />
        <path d="M812 360 h56 l-12 -36 h-32 Z" fill="url(#lampGlow)" opacity="0.8" />
        <ellipse cx="840" cy="452" rx="20" ry="7" fill="#3a2e1c" />
      </g>
    </svg>
  );
}
