import { useState, useEffect } from 'react'
import { LEAD_STATUSES, LEAD_SOURCES } from '../../utils/constants'
import { validateLeadForm } from '../../utils/validation'

const LeadForm = ({ lead, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: '',
    status: 'New',
    notes: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        source: lead.source || '',
        status: lead.status || 'New',
        notes: lead.notes || ''
      })
    }
  }, [lead])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validateLeadForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setFormData({
        name: '',
        email: '',
        phone: '',
        source: '',
        status: 'New',
        notes: ''
      })
      setErrors({})
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to save lead' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">{lead ? 'Edit Lead' : 'Create New Lead'}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="alert alert-danger">{errors.submit}</div>
          )}
          {errors.contact && (
            <div className="alert alert-warning">{errors.contact}</div>
          )}

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter lead name"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="text"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1234567890"
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="source" className="form-label">
                Source <span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${errors.source ? 'is-invalid' : ''}`}
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
              >
                <option value="">Select source</option>
                {LEAD_SOURCES.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
              {errors.source && <div className="invalid-feedback">{errors.source}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="status" className="form-label">
                Status <span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {LEAD_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && <div className="invalid-feedback">{errors.status}</div>}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="notes" className="form-label">Notes</label>
            <textarea
              className="form-control"
              id="notes"
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional notes..."
            ></textarea>
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary flex-fill"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Saving...
                </>
              ) : (
                <>{lead ? 'Update Lead' : 'Create Lead'}</>
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary flex-fill"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LeadForm