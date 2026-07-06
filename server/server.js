import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sneakerRouter from './routes/sneakers.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/sneakers', sneakerRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sole Forge API is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
