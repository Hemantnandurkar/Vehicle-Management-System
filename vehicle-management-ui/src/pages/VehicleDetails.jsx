import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { vehicleService } from '../services/vehicleService';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from '../components/ConfirmModal';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchVehicleDetails();
  }, [id]);

  const fetchVehicleDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await vehicleService.getById(id);
      setVehicle(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Vehicle with ID ${id} not found.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await vehicleService.delete(id);
      navigate('/vehicles');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete vehicle.');
      setDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner-page">
        <div className="spinner"></div>
        <p>Loading vehicle details...</p>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="page-container animate-fade-in">
        <div className="empty-card glass-panel">
          <h2>⚠️ Vehicle Not Found</h2>
          <p>{error || 'The requested vehicle record could not be loaded.'}</p>
          <Link to="/vehicles" className="btn-primary">
            ← Return to Vehicle List
          </Link>
        </div>
      </div>
    );
  }

  const formattedRegDate = new Date(vehicle.registrationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedCreated = new Date(vehicle.createdAt).toLocaleString();

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <Link to="/vehicles" className="back-link">← Back to Vehicles</Link>
          <h2>{vehicle.vehicleName}</h2>
          <p className="subtitle-badge">Registration: <strong>{vehicle.vehicleNumber}</strong></p>
        </div>
        {isAdmin && (
          <div className="header-actions">
            <Link to={`/vehicles/edit/${vehicle.vehicleId}`} className="btn-secondary">
              ✏️ Edit Vehicle
            </Link>
            <button onClick={() => setDeleteModalOpen(true)} className="btn-danger">
              🗑️ Delete Vehicle
            </button>
          </div>
        )}
      </div>

      <div className="details-grid">
        {/* Specifications Card */}
        <div className="detail-card glass-panel">
          <h3>🏎️ Vehicle Specifications</h3>
          <div className="spec-list">
            <div className="spec-item">
              <span className="spec-label">Vehicle ID</span>
              <span className="spec-val">#{vehicle.vehicleId}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Registration Number</span>
              <span className="spec-val vehicle-num-badge">{vehicle.vehicleNumber}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Brand</span>
              <span className="spec-val">{vehicle.brand}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Model</span>
              <span className="spec-val">{vehicle.model}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Fuel Type</span>
              <span className="spec-val">
                <span className={`fuel-badge fuel-${vehicle.fuelType.toLowerCase()}`}>
                  {vehicle.fuelType}
                </span>
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Manufacturing Year</span>
              <span className="spec-val">{vehicle.manufacturingYear}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Operational Status</span>
              <span className="spec-val">
                <span className={`status-badge status-${vehicle.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {vehicle.status}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Ownership & Registration Card */}
        <div className="detail-card glass-panel">
          <h3>👤 Ownership & Registration</h3>
          <div className="spec-list">
            <div className="spec-item">
              <span className="spec-label">Owner Full Name</span>
              <span className="spec-val"><strong>{vehicle.ownerName}</strong></span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Contact Number</span>
              <span className="spec-val">{vehicle.contactNumber}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Registration Date</span>
              <span className="spec-val">{formattedRegDate}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">System Record Date</span>
              <span className="spec-val">{formattedCreated}</span>
            </div>
          </div>

          <div className="card-note">
            <p>💡 Verified record retrieved directly via ASP.NET Core 8 Web API backend.</p>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Vehicle Confirmation"
        message={`Are you sure you want to delete '${vehicle.vehicleNumber}' (${vehicle.vehicleName})?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default VehicleDetails;
