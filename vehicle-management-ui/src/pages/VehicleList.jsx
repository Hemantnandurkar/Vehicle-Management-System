import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { vehicleService } from '../services/vehicleService';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from '../components/ConfirmModal';

const VehicleList = () => {
  const { isAdmin } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Filters & Search
  const [searchNumber, setSearchNumber] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  useEffect(() => {
    loadAllVehicles();
  }, []);

  const loadAllVehicles = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await vehicleService.getAll();
      setVehicles(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch vehicles from database API.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchNumber.trim()) {
      loadAllVehicles();
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccessMsg('');
      const vehicle = await vehicleService.searchByNumber(searchNumber.trim());
      setVehicles([vehicle]);
      setSuccessMsg(`Found vehicle: ${vehicle.vehicleNumber}`);
    } catch (err) {
      setVehicles([]);
      setError(err.response?.data?.message || `No vehicle found with registration number '${searchNumber}'.`);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandChange = async (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setSearchNumber('');

    if (!brand) {
      loadAllVehicles();
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await vehicleService.getByBrand(brand);
      setVehicles(data);
    } catch (err) {
      console.error(err);
      setError(`Failed to filter vehicles for brand '${brand}'.`);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearchNumber('');
    setSelectedBrand('');
    setSelectedStatus('');
    setSelectedFuel('');
    setSuccessMsg('');
    loadAllVehicles();
  };

  const openDeleteModal = (vehicle) => {
    setVehicleToDelete(vehicle);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!vehicleToDelete) return;
    try {
      await vehicleService.delete(vehicleToDelete.vehicleId);
      setSuccessMsg(`Vehicle '${vehicleToDelete.vehicleNumber}' deleted successfully.`);
      setVehicles(vehicles.filter((v) => v.vehicleId !== vehicleToDelete.vehicleId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete vehicle.');
    } finally {
      setDeleteModalOpen(false);
      setVehicleToDelete(null);
    }
  };

  // Client-side filtering for status and fuel combined with server results
  const filteredVehicles = vehicles.filter((v) => {
    const matchStatus = !selectedStatus || v.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchFuel = !selectedFuel || v.fuelType.toLowerCase() === selectedFuel.toLowerCase();
    return matchStatus && matchFuel;
  });

  const uniqueBrands = Array.from(new Set(vehicles.map((v) => v.brand))).filter(Boolean);

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h2>Vehicle Directory 🚗</h2>
          <p>View, search, and manage registered vehicles in the system</p>
        </div>
        {isAdmin && (
          <Link to="/vehicles/add" className="btn-primary">
            ➕ Add New Vehicle
          </Link>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {/* Search & Filter Toolbar */}
      <div className="toolbar-panel glass-panel">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by Vehicle Number (e.g. MH-12-EV-2024)..."
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-secondary">
            Search API
          </button>
        </form>

        <div className="filters-group">
          <select value={selectedBrand} onChange={handleBrandChange}>
            <option value="">All Brands (API Filter)</option>
            {uniqueBrands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="In Service">In Service</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select value={selectedFuel} onChange={(e) => setSelectedFuel(e.target.value)}>
            <option value="">All Fuel Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <button onClick={handleResetFilters} className="btn-reset" title="Reset Filters">
            ↺ Reset
          </button>
        </div>
      </div>

      {/* Vehicle Grid Table */}
      {loading ? (
        <div className="loading-spinner-page">
          <div className="spinner"></div>
          <p>Fetching vehicle records...</p>
        </div>
      ) : filteredVehicles.length === 0 ? (
        <div className="empty-card glass-panel">
          <h3>🚫 No Vehicles Found</h3>
          <p>No vehicle records matched your search/filter criteria.</p>
          <button onClick={handleResetFilters} className="btn-primary">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="table-card glass-panel">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Vehicle No.</th>
                  <th>Vehicle Name</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Fuel Type</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th>Owner Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((v) => (
                  <tr key={v.vehicleId}>
                    <td>
                      <span className="vehicle-num-badge">{v.vehicleNumber}</span>
                    </td>
                    <td><strong>{v.vehicleName}</strong></td>
                    <td>{v.brand}</td>
                    <td>{v.model}</td>
                    <td>
                      <span className={`fuel-badge fuel-${v.fuelType.toLowerCase()}`}>
                        {v.fuelType}
                      </span>
                    </td>
                    <td>{v.manufacturingYear}</td>
                    <td>
                      <span className={`status-badge status-${v.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {v.status}
                      </span>
                    </td>
                    <td>{v.ownerName}</td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/vehicles/${v.vehicleId}`} className="btn-table-action btn-view">
                          View
                        </Link>
                        {isAdmin && (
                          <>
                            <Link to={`/vehicles/edit/${v.vehicleId}`} className="btn-table-action btn-edit">
                              Edit
                            </Link>
                            <button
                              onClick={() => openDeleteModal(v)}
                              className="btn-table-action btn-delete"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Confirm Vehicle Deletion"
        message={`Are you sure you want to permanently delete vehicle '${vehicleToDelete?.vehicleNumber}' (${vehicleToDelete?.vehicleName})? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default VehicleList;
