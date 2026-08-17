import React from 'react';

const StatCard = ({ title, value, icon, colorClass, subtitle }) => {
  return (
    <div className={`stat-card ${colorClass}`}>
      <div className="stat-card-header">
        <span className="stat-icon">{icon}</span>
        <span className="stat-title">{title}</span>
      </div>
      <div className="stat-value">{value}</div>
      {subtitle && <div className="stat-subtitle">{subtitle}</div>}
    </div>
  );
};

export default StatCard;
