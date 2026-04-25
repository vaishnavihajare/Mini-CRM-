import { useDrop } from 'react-dnd'
import LeadCard from './LeadCard'

const KanbanColumn = ({ status, leads, onEdit, onDelete, onDropLead }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'LEAD',
    drop: (item) => {
      if (item.currentStatus !== status) {
        onDropLead(item.id, status)
      }
    },
    canDrop: (item) => item.currentStatus !== status,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  const getColumnColor = (status) => {
    switch (status) {
      case 'New':
        return 'primary'
      case 'Contacted':
        return 'info'
      case 'Qualified':
        return 'warning'
      case 'Won':
        return 'success'
      case 'Lost':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  const getDropStyle = () => {
    if (isOver && canDrop) {
      return {
        backgroundColor: '#e3f2fd',
        border: '2px dashed #2196f3'
      }
    }
    if (canDrop) {
      return {
        border: '2px dashed #ddd'
      }
    }
    return {}
  }

  return (
    <div className="col">
      <div className={`card border-${getColumnColor(status)}`}>
        <div className={`card-header bg-${getColumnColor(status)} text-white`}>
          <h5 className="mb-0">
            {status} <span className="badge bg-light text-dark">{leads.length}</span>
          </h5>
        </div>
        <div
          ref={drop}
          className="card-body"
          style={{
            minHeight: '500px',
            maxHeight: '70vh',
            overflowY: 'auto',
            transition: 'all 0.3s ease',
            ...getDropStyle()
          }}
        >
          {leads.length === 0 ? (
            <p className="text-muted text-center mt-4">
              {isOver && canDrop ? 'Drop here' : 'No leads'}
            </p>
          ) : (
            leads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default KanbanColumn