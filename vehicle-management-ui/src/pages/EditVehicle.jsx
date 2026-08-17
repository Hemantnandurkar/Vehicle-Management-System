import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { vehicleService } from '../services/vehicleService';

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicleNumber: '',
    vehicleName: '',
    brand: '',
    model: '',
    fuelType: 'Petrol',
    registrationDate: '',
    manufacturingYear: new Date().getFullYear(),
    ownerName: '',
    contactNumber: '',
    status: 'Active',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVehicleData();
  }, [id]);

  const fetchVehicleData = async () => {
    try {
      setLoading(true);
      setError('');
      const vehicle = await vehicleService.getById(id);
      const formattedDate = vehicle.registrationDate
        ? new Date(vehicle.registrationDate).toISOString().split('T')[0]
        : '';

      setFormData({
        vehicleNumber: vehicle.vehicleNumber || '',
        vehicleName: vehicle.vehicleName || '',
        brand: vehicle.brand || '',
        model: vehicle.model || '',
        fuelType: vehicle.fuelType || 'Petrol',
        registrationDate: formattedDate,
        manufacturingYear: vehicle.manufacturingYear || new Date().getFullYear(),
        ownerName: vehicle.ownerName || '',
        contactNumber: vehicle.contactNumber || '',
        status: vehicle.status || 'Active',
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load vehicle data for editing.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !formData.vehicleNumber.trim() ||
      !formData.vehicleName.trim() ||
      !formData.brand.trim() ||
      !formData.model.trim() ||
      !formData.ownerName.trim() ||
      !formData.contactNumber.trim()
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...formData,
        registrationDate: new Date(formData.registrationDate).toISOString(),
        manufacturingYear: parseInt(formData.manufacturingYear, 10),
      };
      await vehicleService.update(id, payload);
      navigate(`/vehicles/${id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update vehicle details.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner-page">
        <div className="spinner"></div>
        <p>Loading vehicle information...</p>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <Link to={`/vehicles/${id}`} className="back-link">← Back to Details</Link>
          <h2>Edit Vehicle #{id} ✏️</h2>
          <p>Update vehicle details in the database</p>
        </div>
      </div>

      <div className="form-card glass-panel">
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="crud-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="vehicleNumber">Vehicle Number (Unique) *</label>
              <input
                id="vehicleNumber"
                name="vehicleNumber"
                type="text"
                value={formData.vehicleNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="vehicleName">Vehicle Name *</label>
              <input
                id="vehicleName"
                name="vehicleName"
                type="text"
                value={formData.vehicleName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="brand">Brand *</label>
              <input
                id="brand"
                name="brand"
                type="text"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model *</label>
              <input
                id="model"
                name="model"
                type="text"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fuelType">Fuel Type *</label>
              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                required
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Operational Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Active">Active</option>
                <option value="In Service">In Service</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="registrationDate">Registration Date *</label>
              <input
                id="registrationDate"
                name="registrationDate"
                type="date"
                value={formData.registrationDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="manufacturingYear">Manufacturing Year *</label>
              <input
                id="manufacturingYear"
                name="manufacturingYear"
                type="number"
                min="1900"
                max="2100"
                value={formData.manufacturingYear}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ownerName">Owner Name *</label>
              <input
                id="ownerName"
                name="ownerName"
                type="text"
                value={formData.ownerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number *</label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="text"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <Link to={`/vehicles/${id}`} className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving Changes...' : '💾 Update Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicle;
