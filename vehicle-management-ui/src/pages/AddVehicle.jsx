import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { vehicleService } from '../services/vehicleService';

const AddVehicle = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicleNumber: '',
    vehicleName: '',
    brand: '',
    model: '',
    fuelType: 'Petrol',
    registrationDate: new Date().toISOString().split('T')[0],
    manufacturingYear: new Date().getFullYear(),
    ownerName: '',
    contactNumber: '',
    status: 'Active',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      setLoading(true);
      const payload = {
        ...formData,
        registrationDate: new Date(formData.registrationDate).toISOString(),
        manufacturingYear: parseInt(formData.manufacturingYear, 10),
      };
      await vehicleService.create(payload);
      navigate('/vehicles');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create vehicle. Check duplicate vehicle number.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <Link to="/vehicles" className="back-link">← Back to Vehicles</Link>
          <h2>Add New Vehicle ➕</h2>
          <p>Create a new vehicle record in the system database (Admin Access)</p>
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
                placeholder="e.g. MH-12-AB-1234"
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
                placeholder="e.g. Nexon EV Max"
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
                placeholder="e.g. Tata, Tesla, Mahindra"
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
                placeholder="e.g. Nexon, Model 3, Thar"
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
                placeholder="e.g. Aarav Sharma"
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
                placeholder="e.g. 9876543210"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <Link to="/vehicles" className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving Vehicle...' : '➕ Add Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
