import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SneakerPreview from '../components/SneakerPreview.jsx'
import { createSneaker } from '../services/SneakersAPI.js'
import {
  SILHOUETTES, COLORWAYS, SOLES, MATERIALS, LACE_COLORS, SIZES,
  calcPrice, validateCombo
} from '../utilities/sneakerUtils.js'
import './Customize.css'

const DEFAULT = {
  name: '',
  silhouette: 'Low Top',
  colorway: 'Midnight Black',
  sole: 'White Foam',
  material: 'Premium Leather',
  lace_color: 'White',
  size: 10
}

export default function Customize() {
  const [config, setConfig] = useState(DEFAULT)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const price = calcPrice(config)
  const comboError = validateCombo(config)

  const set = (key, val) => {
    setConfig(prev => ({ ...prev, [key]: val }))
    setError(null)
    setSuccess(false)
  }

  const handleSubmit = async () => {
    if (!config.name.trim()) return setError('Give your sneaker a name to save it.')
    if (comboError) return setError(comboError)

    setLoading(true)
    setError(null)
    try {
      await createSneaker({ ...config, total_price: price })
      setSuccess(true)
      setTimeout(() => navigate('/collection'), 1200)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="customize-page">
      <div className="customize-left">
        <div className="page-header">
          <h1 className="page-title">BUILD YOUR PAIR</h1>
          <p className="page-sub">Every option is a decision. Make it yours.</p>
        </div>

        {/* Name */}
        <div className="form-section">
          <label className="section-label">NAME YOUR SNEAKER</label>
          <input
            type="text"
            className="name-input"
            placeholder="e.g. The Midnight Runner"
            value={config.name}
            onChange={e => set('name', e.target.value)}
            maxLength={60}
          />
        </div>

        {/* Silhouette */}
        <div className="form-section">
          <label className="section-label">SILHOUETTE</label>
          <div className="option-grid">
            {SILHOUETTES.map(s => (
              <button
                key={s.value}
                className={`option-btn ${config.silhouette === s.value ? 'selected' : ''}`}
                onClick={() => set('silhouette', s.value)}
              >
                <span className="opt-name">{s.label}</span>
                <span className="opt-price">+${s.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Colorway */}
        <div className="form-section">
          <label className="section-label">COLORWAY</label>
          <div className="color-grid">
            {COLORWAYS.map(c => (
              <button
                key={c.value}
                className={`color-btn ${config.colorway === c.value ? 'selected' : ''}`}
                onClick={() => set('colorway', c.value)}
                title={c.label}
              >
                <span className="color-swatch" style={{ background: c.hex }} />
                <span className="color-name">{c.label}</span>
                {c.price > 0 && <span className="color-price">+${c.price}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Material */}
        <div className="form-section">
          <label className="section-label">UPPER MATERIAL</label>
          <div className="option-grid">
            {MATERIALS.map(m => (
              <button
                key={m.value}
                className={`option-btn ${config.material === m.value ? 'selected' : ''}`}
                onClick={() => set('material', m.value)}
              >
                <span className="opt-name">{m.label}</span>
                <span className="opt-price">+${m.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sole */}
        <div className="form-section">
          <label className="section-label">SOLE</label>
          <div className="option-grid">
            {SOLES.map(s => (
              <button
                key={s.value}
                className={`option-btn ${config.sole === s.value ? 'selected' : ''}`}
                onClick={() => set('sole', s.value)}
              >
                <span className="opt-name">{s.label}</span>
                <span className="opt-price">+${s.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lace Color */}
        <div className="form-section">
          <label className="section-label">LACE COLOR</label>
          <div className="lace-grid">
            {LACE_COLORS.map(l => (
              <button
                key={l.value}
                className={`lace-btn ${config.lace_color === l.value ? 'selected' : ''}`}
                onClick={() => set('lace_color', l.value)}
              >
                <span className="lace-dot" style={{ background: l.hex, border: l.hex === '#f0ede8' ? '1px solid #555' : 'none' }} />
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="form-section">
          <label className="section-label">SIZE (US MEN'S)</label>
          <div className="size-grid">
            {SIZES.map(s => (
              <button
                key={s}
                className={`size-btn ${config.size === s ? 'selected' : ''}`}
                onClick={() => set('size', s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Combo warning */}
        {comboError && (
          <div className="combo-warning">
            <span className="warn-icon">⚠</span>
            {comboError}
          </div>
        )}

        {/* Error */}
        {error && !comboError && (
          <div className="error-banner">{error}</div>
        )}

        {/* Success */}
        {success && (
          <div className="success-banner">✓ Saved! Taking you to your collection…</div>
        )}

        {/* Submit */}
        <div className="submit-row">
          <div className="total-price">
            <span className="price-label">TOTAL</span>
            <span className="price-amount">${price}</span>
          </div>
          <button
            className={`save-btn ${loading ? 'loading' : ''} ${comboError ? 'blocked' : ''}`}
            onClick={handleSubmit}
            disabled={loading || !!comboError}
          >
            {loading ? 'SAVING…' : 'SAVE TO COLLECTION'}
          </button>
        </div>
      </div>

      <div className="customize-right">
        <SneakerPreview
          colorway={config.colorway}
          sole={config.sole}
          material={config.material}
          lace_color={config.lace_color}
          silhouette={config.silhouette}
        />
      </div>
    </div>
  )
}
