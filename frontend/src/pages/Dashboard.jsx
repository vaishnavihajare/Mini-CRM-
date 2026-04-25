import { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Navbar from '../components/common/Navbar'
import SearchFilter from '../components/leads/SearchFilter'
import KanbanColumn from '../components/leads/KanbanColumn'
import LeadForm from '../components/leads/LeadForm'
import Loader from '../components/common/Loader'
import ErrorMessage from '../components/common/ErrorMessage'
import { leadService } from '../services/leadService'
import { LEAD_STATUSES } from '../utils/constants'

const Dashboard = () => {
  const [leads, setLeads] = useState([])
  const [filteredLeads, setFilteredLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingLead, setEditingLead] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ status: '', source: '' })
  const [updatingLeadId, setUpdatingLeadId] = useState(null)

  useEffect(() => {
    fetchLeads()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [leads, searchTerm, filters])

  const fetchLeads = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await leadService.getAllLeads()
      setLeads(data.leads || data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let result = [...leads]

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (lead) =>
          lead.name?.toLowerCase().includes(term) ||
          lead.email?.toLowerCase().includes(term) ||
          lead.phone?.toLowerCase().includes(term)
      )
    }

    // Status filter
    if (filters.status) {
      result = result.filter((lead) => lead.status === filters.status)
    }

    // Source filter
    if (filters.source) {
      result = result.filter((lead) => lead.source === filters.source)
    }

    setFilteredLeads(result)
  }

  const handleCreateLead = async (leadData) => {
    try {
      await leadService.createLead(leadData)
      await fetchLeads()
      setShowForm(false)
    } catch (err) {
      throw err
    }
  }

  const handleUpdateLead = async (leadData) => {
    try {
      await leadService.updateLead(editingLead.id, leadData)
      await fetchLeads()
      setEditingLead(null)
      setShowForm(false)
    } catch (err) {
      throw err
    }
  }

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) {
      return
    }

    try {
      await leadService.deleteLead(id)
      await fetchLeads()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete lead')
    }
  }

  const handleEditClick = (lead) => {
    setEditingLead(lead)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingLead(null)
  }

  // Handle drag and drop
  const handleDropLead = async (leadId, newStatus) => {
    setUpdatingLeadId(leadId)

    // Optimistic update
    const oldLeads = [...leads]
    const updatedLeads = leads.map((lead) =>
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    )
    setLeads(updatedLeads)

    try {
      await leadService.updateLeadStatus(leadId, newStatus)
      // Success - the optimistic update is already applied
    } catch (err) {
      // Revert on error
      setLeads(oldLeads)
      alert(err.response?.data?.message || 'Failed to update lead status')
    } finally {
      setUpdatingLeadId(null)
    }
  }

  const getLeadsByStatus = (status) => {
    return filteredLeads.filter((lead) => lead.status === status)
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <Loader message="Loading your leads..." />
        </div>
      </>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-0">Lead Management Dashboard</h2>
            <small className="text-muted">Drag and drop leads between columns to update status</small>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add New Lead'}
          </button>
        </div>

        {error && <ErrorMessage message={error} onRetry={fetchLeads} />}

        {updatingLeadId && (
          <div className="alert alert-info d-flex align-items-center" role="alert">
            <span className="spinner-border spinner-border-sm me-2"></span>
            Updating lead status...
          </div>
        )}

        {showForm && (
          <div className="mb-4">
            <LeadForm
              lead={editingLead}
              onSubmit={editingLead ? handleUpdateLead : handleCreateLead}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        <SearchFilter onSearch={setSearchTerm} onFilterChange={setFilters} />

        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-3">
          {LEAD_STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              leads={getLeadsByStatus(status)}
              onEdit={handleEditClick}
              onDelete={handleDeleteLead}
              onDropLead={handleDropLead}
            />
          ))}
        </div>

        {filteredLeads.length === 0 && !loading && (
          <div className="text-center py-5">
            <h4 className="text-muted">No leads found</h4>
            <p className="text-muted">
              {leads.length === 0
                ? 'Create your first lead to get started!'
                : 'Try adjusting your search or filters'}
            </p>
          </div>
        )}
      </div>
    </DndProvider>
  )
}

export default Dashboard