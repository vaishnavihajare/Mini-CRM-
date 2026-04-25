import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/dashboard">
          🎯 Mini CRM
        </a>
        <div className="d-flex align-items-center">
          <span className="text-white me-3">
            Welcome, <strong>{user?.name}</strong>
          </span>
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar