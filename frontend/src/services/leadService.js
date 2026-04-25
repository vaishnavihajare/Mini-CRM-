import api from './api'

export const leadService = {
  getAllLeads: async (page = 1, limit = 100, search = '', status = '', source = '') => {
    const params = { page, limit }
    if (search) params.search = search
    if (status) params.status = status
    if (source) params.source = source
    
    const response = await api.get('/leads', { params })
    return response.data
  },

  getLeadById: async (id) => {
    const response = await api.get(`/leads/${id}`)
    return response.data
  },

  createLead: async (leadData) => {
    const response = await api.post('/leads', leadData)
    return response.data
  },

  updateLead: async (id, leadData) => {
    const response = await api.put(`/leads/${id}`, leadData)
    return response.data
  },

  deleteLead: async (id) => {
    const response = await api.delete(`/leads/${id}`)
    return response.data
  },

  updateLeadStatus: async (id, status) => {
    const response = await api.patch(`/leads/${id}/status`, { status })
    return response.data
  }
}