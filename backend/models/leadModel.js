import pool from '../config/db.js'

export const leadModel = {
  // Get all leads for a user with pagination and filters
  findAll: async (userId, page = 1, limit = 100, search = '', status = '', source = '') => {
    const offset = (page - 1) * limit
    let query = `
      SELECT * FROM leads 
      WHERE user_id = $1
    `
    const values = [userId]
    let paramCount = 1

    // Add search filter
    if (search) {
      paramCount++
      query += ` AND (name ILIKE $${paramCount} OR email ILIKE $${paramCount} OR phone ILIKE $${paramCount})`
      values.push(`%${search}%`)
    }

    // Add status filter
    if (status) {
      paramCount++
      query += ` AND status = $${paramCount}`
      values.push(status)
    }

    // Add source filter
    if (source) {
      paramCount++
      query += ` AND source = $${paramCount}`
      values.push(source)
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`
    values.push(limit, offset)

    const result = await pool.query(query, values)

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM leads WHERE user_id = $1'
    const countValues = [userId]
    let countParamCount = 1

    if (search) {
      countParamCount++
      countQuery += ` AND (name ILIKE $${countParamCount} OR email ILIKE $${countParamCount} OR phone ILIKE $${countParamCount})`
      countValues.push(`%${search}%`)
    }

    if (status) {
      countParamCount++
      countQuery += ` AND status = $${countParamCount}`
      countValues.push(status)
    }

    if (source) {
      countParamCount++
      countQuery += ` AND source = $${countParamCount}`
      countValues.push(source)
    }

    const countResult = await pool.query(countQuery, countValues)
    const total = parseInt(countResult.rows[0].count)

    return {
      leads: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  },

  // Find lead by ID
  findById: async (id, userId) => {
    const query = 'SELECT * FROM leads WHERE id = $1 AND user_id = $2'
    const result = await pool.query(query, [id, userId])
    return result.rows[0]
  },

  // Create a new lead
  create: async (userId, leadData) => {
    const { name, email, phone, source, status, notes } = leadData
    const query = `
      INSERT INTO leads (user_id, name, email, phone, source, status, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `
    const values = [userId, name, email || null, phone || null, source, status, notes || null]
    const result = await pool.query(query, values)
    return result.rows[0]
  },

  // Update a lead
  update: async (id, userId, leadData) => {
    const { name, email, phone, source, status, notes } = leadData
    const query = `
      UPDATE leads 
      SET name = $1, email = $2, phone = $3, source = $4, status = $5, notes = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7 AND user_id = $8
      RETURNING *
    `
    const values = [name, email || null, phone || null, source, status, notes || null, id, userId]
    const result = await pool.query(query, values)
    return result.rows[0]
  },

  // Update lead status only
  updateStatus: async (id, userId, status) => {
    const query = `
      UPDATE leads 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND user_id = $3
      RETURNING *
    `
    const result = await pool.query(query, [status, id, userId])
    return result.rows[0]
  },

  // Delete a lead
  delete: async (id, userId) => {
    const query = 'DELETE FROM leads WHERE id = $1 AND user_id = $2 RETURNING *'
    const result = await pool.query(query, [id, userId])
    return result.rows[0]
  }
}