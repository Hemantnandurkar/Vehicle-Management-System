using VehicleManagementAPI.Models;

namespace VehicleManagementAPI.Repositories
{
    public interface IVehicleRepository
    {
        Task<IEnumerable<Vehicle>> GetAllAsync();
        Task<Vehicle?> GetByIdAsync(int id);
        Task<Vehicle?> GetByVehicleNumberAsync(string vehicleNumber);
        Task<IEnumerable<Vehicle>> GetActiveVehiclesAsync();
        Task<IEnumerable<Vehicle>> GetByBrandAsync(string brand);
        Task<bool> VehicleNumberExistsAsync(string vehicleNumber, int? excludeId = null);
        Task<Vehicle> AddAsync(Vehicle vehicle);
        Task UpdateAsync(Vehicle vehicle);
        Task DeleteAsync(Vehicle vehicle);
        Task<int> GetTotalCountAsync();
        Task<int> GetCountByStatusAsync(string status);
    }
}
