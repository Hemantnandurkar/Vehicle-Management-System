import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="loading-spinner-page"><div className="spinner"></div></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="forbidden-container">
        <h2>⚠️ Access Denied</h2>
        <p>You do not have Administrator permissions to access this page.</p>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
