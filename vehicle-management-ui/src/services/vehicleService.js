import api from './api';

export const vehicleService = {
  getAll: async () => {
    const response = await api.get('/vehicles');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },

  create: async (vehicleData) => {
    const response = await api.post('/vehicles', vehicleData);
    return response.data;
  },

  update: async (id, vehicleData) => {
    const response = await api.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  },

  searchByNumber: async (vehicleNumber) => {
    const response = await api.get(`/vehicles/search?vehicleNumber=${encodeURIComponent(vehicleNumber)}`);
    return response.data;
  },

  getActiveVehicles: async () => {
    const response = await api.get('/vehicles/active');
    return response.data;
  },

  getByBrand: async (brand) => {
    const response = await api.get(`/vehicles/brand/${encodeURIComponent(brand)}`);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get('/vehicles/dashboard-stats');
    return response.data;
  },
};
