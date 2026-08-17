using VehicleManagementAPI.DTOs;

namespace VehicleManagementAPI.Services
{
    public interface IVehicleService
    {
        Task<IEnumerable<VehicleResponseDto>> GetAllVehiclesAsync();
        Task<VehicleResponseDto> GetVehicleByIdAsync(int id);
        Task<VehicleResponseDto> GetVehicleByNumberAsync(string vehicleNumber);
        Task<IEnumerable<VehicleResponseDto>> GetActiveVehiclesAsync();
        Task<IEnumerable<VehicleResponseDto>> GetVehiclesByBrandAsync(string brand);
        Task<VehicleResponseDto> CreateVehicleAsync(CreateVehicleDto createDto);
        Task<VehicleResponseDto> UpdateVehicleAsync(int id, UpdateVehicleDto updateDto);
        Task DeleteVehicleAsync(int id);
        Task<DashboardStatsDto> GetDashboardStatsAsync();
    }
}
