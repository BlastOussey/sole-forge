import { pool } from '../config/database.js'

// Validation rules for impossible combinations
const IMPOSSIBLE_COMBOS = [
  {
    condition: (body) => body.material === 'Canvas' && body.sole === 'Gum',
    message: 'Canvas uppers are not compatible with Gum soles — the adhesive bond fails under flex. Choose Foam or Rubber sole instead.'
  },
  {
    condition: (body) => body.silhouette === 'High Top' && body.material === 'Mesh',
    message: 'Mesh uppers don\'t provide enough ankle support for High Top builds. Choose Leather, Suede, or Canvas for High Tops.'
  },
  {
    condition: (body) => body.colorway === 'Cloud White' && body.sole === 'Black Rubber',
    message: 'Cloud White colorway doesn\'t pair with Black Rubber soles — stark contrast breaks the clean aesthetic. Try White Foam or Gum sole.'
  }
]

// GET all sneakers
export const getAllSneakers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM sneakers ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch sneakers' })
  }
}

// GET single sneaker
export const getSneaker = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM sneakers WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sneaker not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch sneaker' })
  }
}

// POST create sneaker
export const createSneaker = async (req, res) => {
  try {
    const { name, silhouette, colorway, sole, material, lace_color, size, total_price } = req.body

    // Check for impossible combos
    for (const rule of IMPOSSIBLE_COMBOS) {
      if (rule.condition(req.body)) {
        return res.status(400).json({ error: rule.message })
      }
    }

    if (!name || !silhouette || !colorway || !sole || !material || !lace_color || !size) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const result = await pool.query(
      `INSERT INTO sneakers (name, silhouette, colorway, sole, material, lace_color, size, total_price)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, silhouette, colorway, sole, material, lace_color, size, total_price]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create sneaker' })
  }
}

// PUT update sneaker
export const updateSneaker = async (req, res) => {
  try {
    const { id } = req.params
    const { name, silhouette, colorway, sole, material, lace_color, size, total_price } = req.body

    // Check for impossible combos
    for (const rule of IMPOSSIBLE_COMBOS) {
      if (rule.condition(req.body)) {
        return res.status(400).json({ error: rule.message })
      }
    }

    const result = await pool.query(
      `UPDATE sneakers SET name=$1, silhouette=$2, colorway=$3, sole=$4, material=$5,
       lace_color=$6, size=$7, total_price=$8 WHERE id=$9 RETURNING *`,
      [name, silhouette, colorway, sole, material, lace_color, size, total_price, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sneaker not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update sneaker' })
  }
}

// DELETE sneaker
export const deleteSneaker = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM sneakers WHERE id=$1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sneaker not found' })
    }
    res.json({ message: 'Sneaker deleted', sneaker: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete sneaker' })
  }
}
