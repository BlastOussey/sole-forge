const BASE_URL = '/api/sneakers'

export const getAllSneakers = async () => {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Failed to fetch sneakers')
  return res.json()
}

export const getSneaker = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error('Failed to fetch sneaker')
  return res.json()
}

export const createSneaker = async (sneakerData) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sneakerData)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to create sneaker')
  return data
}

export const updateSneaker = async (id, sneakerData) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sneakerData)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to update sneaker')
  return data
}

export const deleteSneaker = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete sneaker')
  return res.json()
}
