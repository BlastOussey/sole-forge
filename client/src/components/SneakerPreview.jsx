import './SneakerPreview.css'

export default function SneakerPreview({ colorway, sole, material, lace_color, silhouette }) {
  // Map values to visual properties
  const upperColor = getUpperColor(colorway)
  const soleColor = getSoleColor(sole)
  const laceCol = getLaceColor(lace_color)
  const upperTexture = getTexture(material)
  const silhouetteHeight = getSilhouetteHeight(silhouette)

  return (
    <div className="preview-wrapper">
      <div className="preview-label">LIVE PREVIEW</div>
      <svg
        viewBox="0 0 420 220"
        xmlns="http://www.w3.org/2000/svg"
        className="sneaker-svg"
        aria-label={`Custom sneaker preview`}
      >
        {/* ── Defs ── */}
        <defs>
          <linearGradient id="upperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={upperColor} stopOpacity="1" />
            <stop offset="100%" stopColor={shadeColor(upperColor, -30)} stopOpacity="1" />
          </linearGradient>
          <linearGradient id="soleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={soleColor} />
            <stop offset="100%" stopColor={shadeColor(soleColor, -25)} />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* ── Ground shadow ── */}
        <ellipse cx="210" cy="210" rx="155" ry="12" fill="#000" opacity="0.3" />

        {/* ── Sole ── */}
        <path
          d={`M 60 ${170 + silhouetteHeight} Q 80 ${190 + silhouetteHeight} 210 ${192 + silhouetteHeight} Q 340 ${194 + silhouetteHeight} 370 ${178 + silhouetteHeight} L 360 ${165 + silhouetteHeight} Q 320 ${172 + silhouetteHeight} 210 ${170 + silhouetteHeight} Q 100 ${168 + silhouetteHeight} 68 ${158 + silhouetteHeight} Z`}
          fill="url(#soleGrad)"
          stroke={shadeColor(soleColor, -40)}
          strokeWidth="1"
        />

        {/* ── Midsole ── */}
        <path
          d={`M 68 ${158 + silhouetteHeight} Q 100 ${168 + silhouetteHeight} 210 ${170 + silhouetteHeight} Q 320 ${172 + silhouetteHeight} 360 ${165 + silhouetteHeight} L 355 ${152 + silhouetteHeight} Q 315 ${160 + silhouetteHeight} 210 ${158 + silhouetteHeight} Q 105 ${156 + silhouetteHeight} 72 ${148 + silhouetteHeight} Z`}
          fill={soleColor}
          opacity="0.9"
        />

        {/* ── Upper body ── */}
        <path
          d={`M 72 ${148 + silhouetteHeight} Q 105 ${156 + silhouetteHeight} 210 ${158 + silhouetteHeight} Q 315 ${160 + silhouetteHeight} 355 ${152 + silhouetteHeight}
              L 340 ${90 + silhouetteHeight} Q 300 ${110 + silhouetteHeight} 260 ${108 + silhouetteHeight}
              L 240 ${60 + silhouetteHeight} Q 210 ${50 + silhouetteHeight} 180 ${58 + silhouetteHeight}
              L 140 ${88 + silhouetteHeight} Q 110 ${102 + silhouetteHeight} 90 ${100 + silhouetteHeight}
              L 72 ${148 + silhouetteHeight} Z`}
          fill="url(#upperGrad)"
          filter="url(#shadow)"
        />

        {/* ── Toe box ── */}
        <path
          d={`M 72 ${148 + silhouetteHeight} Q 75 ${120 + silhouetteHeight} 90 ${100 + silhouetteHeight}
              Q 80 ${115 + silhouetteHeight} 78 ${148 + silhouetteHeight} Z`}
          fill={shadeColor(upperColor, -15)}
          opacity="0.6"
        />

        {/* ── Swoosh / logo stripe ── */}
        <path
          d={`M 130 ${130 + silhouetteHeight} Q 180 ${108 + silhouetteHeight} 300 ${118 + silhouetteHeight} Q 280 ${128 + silhouetteHeight} 130 ${142 + silhouetteHeight} Z`}
          fill={shadeColor(upperColor, 40)}
          opacity="0.35"
        />

        {/* ── Texture overlay (suede/leather dots) ── */}
        {upperTexture === 'suede' && (
          <path
            d={`M 72 ${148 + silhouetteHeight} Q 105 ${156 + silhouetteHeight} 210 ${158 + silhouetteHeight} Q 315 ${160 + silhouetteHeight} 355 ${152 + silhouetteHeight}
                L 340 ${90 + silhouetteHeight} Q 300 ${110 + silhouetteHeight} 260 ${108 + silhouetteHeight}
                L 240 ${60 + silhouetteHeight} Q 210 ${50 + silhouetteHeight} 180 ${58 + silhouetteHeight}
                L 140 ${88 + silhouetteHeight} Q 110 ${102 + silhouetteHeight} 90 ${100 + silhouetteHeight}
                L 72 ${148 + silhouetteHeight} Z`}
            fill="none"
            stroke={shadeColor(upperColor, -10)}
            strokeWidth="0.5"
            strokeDasharray="3 4"
            opacity="0.4"
          />
        )}

        {/* ── High top ankle collar ── */}
        {silhouette === 'High Top' && (
          <path
            d={`M 180 ${58 + silhouetteHeight} Q 210 ${50 + silhouetteHeight} 240 ${60 + silhouetteHeight}
                L 240 ${20 + silhouetteHeight} Q 210 ${10 + silhouetteHeight} 180 ${20 + silhouetteHeight} Z`}
            fill="url(#upperGrad)"
            stroke={shadeColor(upperColor, -20)}
            strokeWidth="1"
          />
        )}

        {/* ── Lace holes ── */}
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i}>
            <circle cx={190 + i * 22} cy={92 + silhouetteHeight - i * 3} r="3.5" fill={shadeColor(upperColor, -30)} />
            <circle cx={190 + i * 22} cy={92 + silhouetteHeight - i * 3} r="2" fill={shadeColor(upperColor, -50)} />
          </g>
        ))}

        {/* ── Laces ── */}
        {[0, 1, 2, 3].map(i => (
          <path
            key={i}
            d={`M ${192 + i * 22} ${91 + silhouetteHeight - i * 3} Q ${203 + i * 22} ${86 + silhouetteHeight - i * 3} ${212 + i * 22} ${89 + silhouetteHeight - (i + 1) * 3}`}
            stroke={laceCol}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        ))}

        {/* ── Heel tab ── */}
        <rect
          x="330"
          y={88 + silhouetteHeight}
          width="14"
          height="22"
          rx="4"
          fill={shadeColor(upperColor, 30)}
          opacity="0.7"
        />

        {/* ── Tongue ── */}
        <path
          d={`M 195 ${95 + silhouetteHeight} Q 210 ${75 + silhouetteHeight} 225 ${95 + silhouetteHeight} Q 215 ${105 + silhouetteHeight} 195 ${105 + silhouetteHeight} Z`}
          fill={shadeColor(upperColor, 10)}
          opacity="0.8"
        />

        {/* ── Patent leather shine ── */}
        {upperTexture === 'patent' && (
          <path
            d={`M 100 ${110 + silhouetteHeight} Q 130 ${90 + silhouetteHeight} 180 ${88 + silhouetteHeight} Q 160 ${100 + silhouetteHeight} 110 ${125 + silhouetteHeight} Z`}
            fill="white"
            opacity="0.18"
          />
        )}
      </svg>

      <div className="preview-specs">
        <span className="spec-tag">{silhouette}</span>
        <span className="spec-tag">{colorway}</span>
        <span className="spec-tag">{material}</span>
      </div>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────
function getUpperColor(colorway) {
  const map = {
    'Midnight Black': '#1a1a1a',
    'Cloud White': '#f0ede8',
    'Ember Red': '#cc2200',
    'Ocean Blue': '#1a4f8a',
    'Forest Green': '#1e4d2b',
    'Desert Sand': '#c4a882',
    'Neon Volt': '#b8e800'
  }
  return map[colorway] || '#888'
}

function getSoleColor(sole) {
  const map = {
    'White Foam': '#e8e5df',
    'Gum': '#c4a460',
    'Black Rubber': '#1a1a1a',
    'Translucent': 'rgba(200,220,255,0.7)'
  }
  return map[sole] || '#ccc'
}

function getLaceColor(lace) {
  const map = {
    'White': '#f0ede8',
    'Black': '#1a1a1a',
    'Red': '#cc2200',
    'Volt': '#c8ff00',
    'Royal Blue': '#2255cc'
  }
  return map[lace] || '#fff'
}

function getTexture(material) {
  if (material === 'Suede') return 'suede'
  if (material === 'Patent Leather') return 'patent'
  return 'smooth'
}

function getSilhouetteHeight(sil) {
  if (sil === 'High Top') return -30
  if (sil === 'Mid Top') return -10
  return 0
}

function shadeColor(color, amount) {
  if (color.startsWith('rgba')) return color
  let hex = color.replace('#', '')
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
  const num = parseInt(hex, 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount))
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
