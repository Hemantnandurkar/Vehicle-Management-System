import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { vehicleService } from '../services/vehicleService';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeVehicles: 0,
    inServiceVehicles: 0,
    inactiveVehicles: 0,
  });
  const [activeList, setActiveList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const [statsData, activeData] = await Promise.all([
        vehicleService.getDashboardStats(),
        vehicleService.getActiveVehicles(),
      ]);
      setStats(statsData);
      setActiveList(activeData);
    } catch (err) {
      console.error(err);
      setError('Failed to load live dashboard statistics from database.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner-page">
        <div className="spinner"></div>
        <p>Loading database dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h2>System Overview 📊</h2>
          <p className="welcome-sub">
            Welcome back, <strong>{user?.name}</strong> ({user?.role})
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={fetchDashboardData}>
            🔄 Refresh Data
          </button>
          {isAdmin && (
            <Link to="/vehicles/add" className="btn-primary">
              ➕ Add New Vehicle
            </Link>
          )}
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="stats-grid">
        <StatCard
          title="Total Vehicles"
          value={stats.totalVehicles}
          icon="🚘"
          colorClass="stat-total"
          subtitle="Registered in database"
        />
        <StatCard
          title="Active Vehicles"
          value={stats.activeVehicles}
          icon="🟢"
          colorClass="stat-active"
          subtitle="Currently operational"
        />
        <StatCard
          title="In Service"
          value={stats.inServiceVehicles}
          icon="🛠️"
          colorClass="stat-service"
          subtitle="Maintenance / repair"
        />
        <StatCard
          title="Inactive"
          value={stats.inactiveVehicles}
          icon="🔴"
          colorClass="stat-inactive"
          subtitle="Decommissioned / idle"
        />
      </div>

      <div className="dashboard-sections">
        <div className="section-card glass-panel">
          <div className="section-header">
            <h3>⚡ Active Fleet Quick View</h3>
            <Link to="/vehicles" className="link-more">View All Vehicles →</Link>
          </div>

          {activeList.length === 0 ? (
            <p className="empty-state">No active vehicles currently found.</p>
          ) : (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Vehicle No.</th>
                    <th>Name</th>
                    <th>Brand & Model</th>
                    <th>Fuel</th>
                    <th>Owner</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeList.slice(0, 5).map((v) => (
                    <tr key={v.vehicleId}>
                      <td><span className="vehicle-num-badge">{v.vehicleNumber}</span></td>
                      <td><strong>{v.vehicleName}</strong></td>
                      <td>{v.brand} {v.model}</td>
                      <td><span className={`fuel-badge fuel-${v.fuelType.toLowerCase()}`}>{v.fuelType}</span></td>
                      <td>{v.ownerName}</td>
                      <td>
                        <Link to={`/vehicles/${v.vehicleId}`} className="btn-table-action btn-view">
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
