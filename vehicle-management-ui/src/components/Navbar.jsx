import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logoutUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/dashboard" className="nav-brand">
          <span className="brand-icon">🚗</span>
          <span className="brand-text">Vehicle<span className="brand-highlight">Hub</span></span>
          <span className="badge-academic">CDAC Project</span>
        </Link>

        {user && (
          <div className="nav-links">
            <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>
              📊 Dashboard
            </Link>
            <Link to="/vehicles" className={`nav-item ${isActive('/vehicles')}`}>
              🚘 Vehicles
            </Link>
            {isAdmin && (
              <Link to="/vehicles/add" className={`nav-item nav-btn-add ${isActive('/vehicles/add')}`}>
                ➕ Add Vehicle
              </Link>
            )}
          </div>
        )}

        <div className="nav-right">
          {user ? (
            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className={`user-role-badge ${user.role === 'Admin' ? 'role-admin' : 'role-user'}`}>
                  {user.role}
                </span>
              </div>
              <button onClick={handleLogout} className="btn-logout" title="Logout">
                🚪 Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-secondary">Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
