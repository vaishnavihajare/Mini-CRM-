import { leadModel } from '../models/leadModel.js'

export const leadController = {
  // Get all leads
  getAllLeads: async (req, res, next) => {
    try {
      const { page = 1, limit = 100, search = '', status = '', source = '' } = req.query
      
      const result = await leadModel.findAll(
        req.userId,
        parseInt(page),
        parseInt(limit),
        search,
        status,
        source
      )

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },

  // Get single lead
  getLeadById: async (req, res, next) => {
    try {
      const { id } = req.params
      const lead = await leadModel.findById(id, req.userId)

      if (!lead) {
        return res.status(404).json({ message: 'Lead not found' })
      }

      res.status(200).json({ lead })
    } catch (error) {
      next(error)
    }
  },

  // Create new lead
  createLead: async (req, res, next) => {
    try {
      const lead = await leadModel.create(req.userId, req.body)

      res.status(201).json({
        message: 'Lead created successfully',
        lead
      })
    } catch (error) {
      next(error)
    }
  },

  // Update lead
  updateLead: async (req, res, next) => {
    try {
      const { id } = req.params
      
      // Check if lead exists
      const existingLead = await leadModel.findById(id, req.userId)
      if (!existingLead) {
        return res.status(404).json({ message: 'Lead not found' })
      }

      const lead = await leadModel.update(id, req.userId, req.body)

      res.status(200).json({
        message: 'Lead updated successfully',
        lead
      })
    } catch (error) {
      next(error)
    }
  },

  // Update lead status
  updateLeadStatus: async (req, res, next) => {
    try {
      const { id } = req.params
      const { status } = req.body

      if (!status) {
        return res.status(400).json({ message: 'Status is required' })
      }

      // Check if lead exists
      const existingLead = await leadModel.findById(id, req.userId)
      if (!existingLead) {
        return res.status(404).json({ message: 'Lead not found' })
      }

      const lead = await leadModel.updateStatus(id, req.userId, status)

      res.status(200).json({
        message: 'Lead status updated successfully',
        lead
      })
    } catch (error) {
      next(error)
    }
  },

  // Delete lead
  deleteLead: async (req, res, next) => {
    try {
      const { id } = req.params

      const lead = await leadModel.delete(id, req.userId)

      if (!lead) {
        return res.status(404).json({ message: 'Lead not found' })
      }

      res.status(200).json({
        message: 'Lead deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}