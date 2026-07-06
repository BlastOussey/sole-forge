import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllSneakers, deleteSneaker } from '../services/SneakersAPI.js'
import SneakerPreview from '../components/SneakerPreview.jsx'
import './Collection.css'

export default function Collection() {
  const [sneakers, setSneakers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const navigate = useNavigate()

  const fetchSneakers = async () => {
    try {
      setLoading(true)
      const data = await getAllSneakers()
      setSneakers(data)
    } catch (err) {
      setError('Failed to load your collection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSneakers() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Remove this sneaker from your collection?')) return
    setDeletingId(id)
    try {
      await deleteSneaker(id)
      setSneakers(prev => prev.filter(s => s.id !== id))
    } catch (err) {
      alert('Failed to delete sneaker.')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return (
    <div className="collection-page">
      <div className="loading-state">
        <div className="loader" />
        <p>Loading your collection…</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="collection-page">
      <div className="error-state">{error}</div>
    </div>
  )

  return (
    <div className="collection-page">
      <div className="collection-header">
        <div>
          <h1 className="page-title">YOUR COLLECTION</h1>
          <p className="page-sub">{sneakers.length} pair{sneakers.length !== 1 ? 's' : ''} built</p>
        </div>
        <button className="new-btn" onClick={() => navigate('/')}>
          + BUILD NEW PAIR
        </button>
      </div>

      {sneakers.length === 0 ? (
        <div className="empty-state">
          <p className="empty-headline">YOUR COLLECTION IS EMPTY</p>
          <p className="empty-sub">You haven't built any sneakers yet.</p>
          <button className="new-btn" onClick={() => navigate('/')}>BUILD YOUR FIRST PAIR</button>
        </div>
      ) : (
        <div className="sneaker-grid">
          {sneakers.map(sneaker => (
            <div key={sneaker.id} className="sneaker-card">
              <SneakerPreview
                colorway={sneaker.colorway}
                sole={sneaker.sole}
                material={sneaker.material}
                lace_color={sneaker.lace_color}
                silhouette={sneaker.silhouette}
              />
              <div className="card-body">
                <div className="card-top">
                  <h2 className="card-name">{sneaker.name}</h2>
                  <span className="card-price">${Number(sneaker.total_price).toFixed(0)}</span>
                </div>

                <div className="card-details">
                  <DetailRow label="Silhouette" value={sneaker.silhouette} />
                  <DetailRow label="Colorway" value={sneaker.colorway} />
                  <DetailRow label="Material" value={sneaker.material} />
                  <DetailRow label="Sole" value={sneaker.sole} />
                  <DetailRow label="Laces" value={sneaker.lace_color} />
                  <DetailRow label="Size" value={`US ${sneaker.size}`} />
                </div>

                <div className="card-actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit/${sneaker.id}`)}
                  >
                    EDIT
                  </button>
                  <button
                    className={`delete-btn ${deletingId === sneaker.id ? 'deleting' : ''}`}
                    onClick={() => handleDelete(sneaker.id)}
                    disabled={deletingId === sneaker.id}
                  >
                    {deletingId === sneaker.id ? 'REMOVING…' : 'DELETE'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  )
}
