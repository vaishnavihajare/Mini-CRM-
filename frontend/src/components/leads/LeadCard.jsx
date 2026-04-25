import { useDrag } from 'react-dnd'

const LeadCard = ({ lead, onEdit, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'LEAD',
    item: { id: lead.id, currentStatus: lead.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  return (
    <div
      ref={drag}
      className="card mb-3 shadow-sm"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move'
      }}
    >
      <div className="card-body">
        <h6 className="card-title fw-bold">{lead.name}</h6>
        
        {lead.email && (
          <p className="card-text mb-1">
            <small className="text-muted">
              <i className="bi bi-envelope me-1"></i>
              {lead.email}
            </small>
          </p>
        )}
        
        {lead.phone && (
          <p className="card-text mb-1">
            <small className="text-muted">
              <i className="bi bi-telephone me-1"></i>
              {lead.phone}
            </small>
          </p>
        )}
        
        <p className="card-text mb-2">
          <span className="badge bg-info">{lead.source}</span>
        </p>
        
        {lead.notes && (
          <p className="card-text">
            <small className="text-muted">{lead.notes}</small>
          </p>
        )}
        
        <div className="d-flex gap-2 mt-3">
          <button
            className="btn btn-sm btn-outline-primary flex-fill"
            onClick={() => onEdit(lead)}
          >
            <i className="bi bi-pencil me-1"></i>
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger flex-fill"
            onClick={() => onDelete(lead.id)}
          >
            <i className="bi bi-trash me-1"></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default LeadCard