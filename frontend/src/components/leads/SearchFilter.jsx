import { useState } from 'react'
import { LEAD_STATUSES, LEAD_SOURCES } from '../../utils/constants'

const SearchFilter = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState('')

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleStatusChange = (e) => {
    const value = e.target.value
    setStatusFilter(value)
    onFilterChange({ status: value, source: sourceFilter })
  }

  const handleSourceChange = (e) => {
    const value = e.target.value
    setSourceFilter(value)
    onFilterChange({ status: statusFilter, source: value })
  }

  const handleReset = () => {
    setSearchTerm('')
    setStatusFilter('')
    setSourceFilter('')
    onSearch('')
    onFilterChange({ status: '', source: '' })
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              <option value="">All Statuses</option>
              {LEAD_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={sourceFilter}
              onChange={handleSourceChange}
            >
              <option value="">All Sources</option>
              {LEAD_SOURCES.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-1">
            <button className="btn btn-outline-secondary w-100" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchFilter