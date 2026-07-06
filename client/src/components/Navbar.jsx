import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-sole">SOLE</span>
        <span className="brand-forge">FORGE</span>
      </Link>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
          BUILD
        </Link>
        <Link to="/collection" className={`nav-link ${pathname === '/collection' ? 'active' : ''}`}>
          COLLECTION
        </Link>
      </div>
    </nav>
  )
}
