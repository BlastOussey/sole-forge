// ─── Options Config ───────────────────────────────────────────────
export const SILHOUETTES = [
  { value: 'Low Top', label: 'Low Top', price: 100 },
  { value: 'Mid Top', label: 'Mid Top', price: 120 },
  { value: 'High Top', label: 'High Top', price: 140 }
]

export const COLORWAYS = [
  { value: 'Midnight Black', label: 'Midnight Black', hex: '#1a1a1a', price: 0 },
  { value: 'Cloud White', label: 'Cloud White', hex: '#f0ede8', price: 0 },
  { value: 'Ember Red', label: 'Ember Red', hex: '#cc2200', price: 10 },
  { value: 'Ocean Blue', label: 'Ocean Blue', hex: '#1a4f8a', price: 10 },
  { value: 'Forest Green', label: 'Forest Green', hex: '#1e4d2b', price: 10 },
  { value: 'Desert Sand', label: 'Desert Sand', hex: '#c4a882', price: 15 },
  { value: 'Neon Volt', label: 'Neon Volt', hex: '#c8ff00', price: 20 }
]

export const SOLES = [
  { value: 'White Foam', label: 'White Foam', price: 20 },
  { value: 'Gum', label: 'Gum', price: 25 },
  { value: 'Black Rubber', label: 'Black Rubber', price: 20 },
  { value: 'Translucent', label: 'Translucent', price: 35 }
]

export const MATERIALS = [
  { value: 'Canvas', label: 'Canvas', price: 15 },
  { value: 'Premium Leather', label: 'Premium Leather', price: 40 },
  { value: 'Suede', label: 'Suede', price: 30 },
  { value: 'Mesh', label: 'Mesh', price: 20 },
  { value: 'Patent Leather', label: 'Patent Leather', price: 50 }
]

export const LACE_COLORS = [
  { value: 'White', label: 'White', hex: '#f0ede8', price: 0 },
  { value: 'Black', label: 'Black', hex: '#1a1a1a', price: 0 },
  { value: 'Red', label: 'Red', hex: '#cc2200', price: 5 },
  { value: 'Volt', label: 'Volt', hex: '#c8ff00', price: 5 },
  { value: 'Royal Blue', label: 'Royal Blue', hex: '#2255cc', price: 5 }
]

export const SIZES = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13]

// ─── Price Calculator ─────────────────────────────────────────────
export const calcPrice = ({ silhouette, colorway, sole, material, lace_color }) => {
  const sil = SILHOUETTES.find(s => s.value === silhouette)?.price || 0
  const col = COLORWAYS.find(c => c.value === colorway)?.price || 0
  const sol = SOLES.find(s => s.value === sole)?.price || 0
  const mat = MATERIALS.find(m => m.value === material)?.price || 0
  const lac = LACE_COLORS.find(l => l.value === lace_color)?.price || 0
  return sil + col + sol + mat + lac
}

// ─── Client-side Validation ───────────────────────────────────────
export const validateCombo = ({ silhouette, colorway, sole, material }) => {
  if (material === 'Canvas' && sole === 'Gum') {
    return 'Canvas uppers are not compatible with Gum soles — the adhesive bond fails under flex. Try Foam or Rubber sole.'
  }
  if (silhouette === 'High Top' && material === 'Mesh') {
    return 'Mesh uppers don\'t provide enough ankle support for High Tops. Choose Leather, Suede, or Canvas.'
  }
  if (colorway === 'Cloud White' && sole === 'Black Rubber') {
    return 'Cloud White + Black Rubber sole clashes too hard. Try White Foam or Gum sole instead.'
  }
  return null
}

// ─── Colorway hex lookup ──────────────────────────────────────────
export const getColorwayHex = (value) => {
  return COLORWAYS.find(c => c.value === value)?.hex || '#888'
}

export const getLaceHex = (value) => {
  return LACE_COLORS.find(l => l.value === value)?.hex || '#888'
}
