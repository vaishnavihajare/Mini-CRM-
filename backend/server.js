import express from 'express'
import cors from 'cors'
import { config } from './config/config.js'
import pool from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import leadRoutes from './routes/leadRoutes.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection failed:', err)
  } else {
    console.log('✅ Database connected at:', res.rows[0].now)
  }
})

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mini CRM API is running',
    version: '1.0.0'
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/leads', leadRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port} in ${config.nodeEnv} mode`)
})