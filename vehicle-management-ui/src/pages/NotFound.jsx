import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page-container animate-fade-in text-center">
      <div className="empty-card glass-panel margin-auto max-w-500">
        <h1 className="error-code">404</h1>
        <h2>Page Not Found 🔍</h2>
        <p>The page or resource you are looking for does not exist.</p>
        <Link to="/dashboard" className="btn-primary">
          🏠 Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
