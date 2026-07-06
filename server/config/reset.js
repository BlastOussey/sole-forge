import { pool } from './database.js'

const createTables = async () => {
  try {
    // Drop existing tables
    await pool.query(`DROP TABLE IF EXISTS sneakers CASCADE`)

    // Create sneakers table
    await pool.query(`
      CREATE TABLE sneakers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        silhouette VARCHAR(50) NOT NULL,
        colorway VARCHAR(50) NOT NULL,
        sole VARCHAR(50) NOT NULL,
        material VARCHAR(50) NOT NULL,
        lace_color VARCHAR(50) NOT NULL,
        size NUMERIC(4,1) NOT NULL,
        total_price NUMERIC(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Seed with sample sneakers
    await pool.query(`
      INSERT INTO sneakers (name, silhouette, colorway, sole, material, lace_color, size, total_price)
      VALUES
        ('The Midnight Runner', 'Low Top', 'Midnight Black', 'Gum', 'Premium Leather', 'White', 10.5, 185.00),
        ('Cloud Nine', 'High Top', 'Cloud White', 'White Foam', 'Canvas', 'White', 9.0, 155.00),
        ('Ember Wave', 'Mid Top', 'Ember Red', 'Black Rubber', 'Suede', 'Black', 11.0, 175.00)
    `)

    console.log('✅ Tables created and seeded successfully')
    process.exit(0)
  } catch (err) {
    console.error('❌ Error setting up database:', err)
    process.exit(1)
  }
}

createTables()
