import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SneakerPreview from '../components/SneakerPreview.jsx'
import { getSneaker, updateSneaker } from '../services/SneakersAPI.js'
import {
  SILHOUETTES, COLORWAYS, SOLES, MATERIALS, LACE_COLORS, SIZES,
  calcPrice, validateCombo
} from '../utilities/sneakerUtils.js'
import './Customize.css'
import './EditSneaker.css'

export default function EditSneaker() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSneaker(id)
        setConfig({
          name: data.name,
          silhouette: data.silhouette,
          colorway: data.colorway,
          sole: data.sole,
          material: data.material,
          lace_color: data.lace_color,
          size: Number(data.size)
        })
      } catch (err) {
        setError('Could not load sneaker.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const set = (key, val) => {
    setConfig(prev => ({ ...prev, [key]: val }))
    setError(null)
    setSuccess(false)
  }

  const handleSave = async () => {
    if (!config.name.trim()) return setError('Sneaker needs a name.')
    const comboError = validateCombo(config)
    if (comboError) return setError(comboError)

    setSaving(true)
    setError(null)
    try {
      await updateSneaker(id, { ...config, total_price: calcPrice(config) })
      setSuccess(true)
      setTimeout(() => navigate('/collection'), 1200)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="customize-page">
      <div className="loading-edit">
        <div className="loader" />
        <p>Loading sneaker…</p>
      </div>
    </div>
  )

  if (!config) return (
    <div className="customize-page">
      <p style={{ color: 'var(--mid-grey)', padding: '2rem' }}>{error || 'Sneaker not found.'}</p>
    </div>
  )

  const price = calcPrice(config)
  const comboError = validateCombo(config)

  return (
    <div className="customize-page">
      <div className="customize-left">
        <div className="page-header">
          <div className="edit-breadcrumb" onClick={() => navigate('/collection')}>
            ← COLLECTION
          </div>
          <h1 className="page-title">EDIT PAIR</h1>
          <p className="page-sub">Adjust any option and save changes.</p>
        </div>

        <div className="form-section">
          <label className="section-label">NAME</label>
          <input
            type="text"
            className="name-input"
            value={config.name}
            onChange={e => set('name', e.target.value)}
            maxLength={60}
          />
        </div>

        <div className="form-section">
          <label className="section-label">SILHOUETTE</label>
          <div className="option-grid">
            {SILHOUETTES.map(s => (
              <button key={s.value} className={`option-btn ${config.silhouette === s.value ? 'selected' : ''}`} onClick={() => set('silhouette', s.value)}>
                <span className="opt-name">{s.label}</span>
                <span className="opt-price">+${s.price}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="section-label">COLORWAY</label>
          <div className="color-grid">
            {COLORWAYS.map(c => (
              <button key={c.value} className={`color-btn ${config.colorway === c.value ? 'selected' : ''}`} onClick={() => set('colorway', c.value)}>
                <span className="color-swatch" style={{ background: c.hex }} />
                <span className="color-name">{c.label}</span>
                {c.price > 0 && <span className="color-price">+${c.price}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="section-label">UPPER MATERIAL</label>
          <div className="option-grid">
            {MATERIALS.map(m => (
              <button key={m.value} className={`option-btn ${config.material === m.value ? 'selected' : ''}`} onClick={() => set('material', m.value)}>
                <span className="opt-name">{m.label}</span>
                <span className="opt-price">+${m.price}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="section-label">SOLE</label>
          <div className="option-grid">
            {SOLES.map(s => (
              <button key={s.value} className={`option-btn ${config.sole === s.value ? 'selected' : ''}`} onClick={() => set('sole', s.value)}>
                <span className="opt-name">{s.label}</span>
                <span className="opt-price">+${s.price}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="section-label">LACE COLOR</label>
          <div className="lace-grid">
            {LACE_COLORS.map(l => (
              <button key={l.value} className={`lace-btn ${config.lace_color === l.value ? 'selected' : ''}`} onClick={() => set('lace_color', l.value)}>
                <span className="lace-dot" style={{ background: l.hex, border: l.hex === '#f0ede8' ? '1px solid #555' : 'none' }} />
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="section-label">SIZE (US MEN'S)</label>
          <div className="size-grid">
            {SIZES.map(s => (
              <button key={s} className={`size-btn ${config.size === s ? 'selected' : ''}`} onClick={() => set('size', s)}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {comboError && (
          <div className="combo-warning">
            <span className="warn-icon">⚠</span>
            {comboError}
          </div>
        )}

        {error && !comboError && <div className="error-banner">{error}</div>}
        {success && <div className="success-banner">✓ Updated! Going back to collection…</div>}

        <div className="submit-row">
          <div className="total-price">
            <span className="price-label">TOTAL</span>
            <span className="price-amount">${price}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="cancel-btn" onClick={() => navigate('/collection')}>CANCEL</button>
            <button
              className={`save-btn ${saving ? 'loading' : ''} ${comboError ? 'blocked' : ''}`}
              onClick={handleSave}
              disabled={saving || !!comboError}
            >
              {saving ? 'SAVING…' : 'SAVE CHANGES'}
            </button>
          </div>
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
