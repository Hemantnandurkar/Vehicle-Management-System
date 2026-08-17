using VehicleManagementAPI.DTOs;
using VehicleManagementAPI.Models;
using VehicleManagementAPI.Repositories;

namespace VehicleManagementAPI.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _vehicleRepository;

        public VehicleService(IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public async Task<IEnumerable<VehicleResponseDto>> GetAllVehiclesAsync()
        {
            var vehicles = await _vehicleRepository.GetAllAsync();
            return vehicles.Select(MapToResponseDto);
        }

        public async Task<VehicleResponseDto> GetVehicleByIdAsync(int id)
        {
            var vehicle = await _vehicleRepository.GetByIdAsync(id);
            if (vehicle == null)
            {
                throw new KeyNotFoundException($"Vehicle with ID {id} was not found.");
            }
            return MapToResponseDto(vehicle);
        }

        public async Task<VehicleResponseDto> GetVehicleByNumberAsync(string vehicleNumber)
        {
            if (string.IsNullOrWhiteSpace(vehicleNumber))
            {
                throw new ArgumentException("Vehicle number search term cannot be empty.");
            }

            var vehicle = await _vehicleRepository.GetByVehicleNumberAsync(vehicleNumber.Trim());
            if (vehicle == null)
            {
                throw new KeyNotFoundException($"Vehicle with number '{vehicleNumber}' was not found.");
            }
            return MapToResponseDto(vehicle);
        }

        public async Task<IEnumerable<VehicleResponseDto>> GetActiveVehiclesAsync()
        {
            var vehicles = await _vehicleRepository.GetActiveVehiclesAsync();
            return vehicles.Select(MapToResponseDto);
        }

        public async Task<IEnumerable<VehicleResponseDto>> GetVehiclesByBrandAsync(string brand)
        {
            if (string.IsNullOrWhiteSpace(brand))
            {
                throw new ArgumentException("Brand parameter cannot be empty.");
            }

            var vehicles = await _vehicleRepository.GetByBrandAsync(brand.Trim());
            return vehicles.Select(MapToResponseDto);
        }

        public async Task<VehicleResponseDto> CreateVehicleAsync(CreateVehicleDto createDto)
        {
            if (await _vehicleRepository.VehicleNumberExistsAsync(createDto.VehicleNumber.Trim()))
            {
                throw new InvalidOperationException($"Vehicle number '{createDto.VehicleNumber}' already exists.");
            }

            var vehicle = new Vehicle
            {
                VehicleNumber = createDto.VehicleNumber.Trim().ToUpper(),
                VehicleName = createDto.VehicleName.Trim(),
                Brand = createDto.Brand.Trim(),
                Model = createDto.Model.Trim(),
                FuelType = createDto.FuelType.Trim(),
                RegistrationDate = createDto.RegistrationDate,
                ManufacturingYear = createDto.ManufacturingYear,
                OwnerName = createDto.OwnerName.Trim(),
                ContactNumber = createDto.ContactNumber.Trim(),
                Status = createDto.Status.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            var created = await _vehicleRepository.AddAsync(vehicle);
            return MapToResponseDto(created);
        }

        public async Task<VehicleResponseDto> UpdateVehicleAsync(int id, UpdateVehicleDto updateDto)
        {
            var existing = await _vehicleRepository.GetByIdAsync(id);
            if (existing == null)
            {
                throw new KeyNotFoundException($"Vehicle with ID {id} was not found.");
            }

            if (await _vehicleRepository.VehicleNumberExistsAsync(updateDto.VehicleNumber.Trim(), id))
            {
                throw new InvalidOperationException($"Vehicle number '{updateDto.VehicleNumber}' is already registered to another vehicle.");
            }

            existing.VehicleNumber = updateDto.VehicleNumber.Trim().ToUpper();
            existing.VehicleName = updateDto.VehicleName.Trim();
            existing.Brand = updateDto.Brand.Trim();
            existing.Model = updateDto.Model.Trim();
            existing.FuelType = updateDto.FuelType.Trim();
            existing.RegistrationDate = updateDto.RegistrationDate;
            existing.ManufacturingYear = updateDto.ManufacturingYear;
            existing.OwnerName = updateDto.OwnerName.Trim();
            existing.ContactNumber = updateDto.ContactNumber.Trim();
            existing.Status = updateDto.Status.Trim();

            await _vehicleRepository.UpdateAsync(existing);
            return MapToResponseDto(existing);
        }

        public async Task DeleteVehicleAsync(int id)
        {
            var existing = await _vehicleRepository.GetByIdAsync(id);
            if (existing == null)
            {
                throw new KeyNotFoundException($"Vehicle with ID {id} was not found.");
            }
            await _vehicleRepository.DeleteAsync(existing);
        }

        public async Task<DashboardStatsDto> GetDashboardStatsAsync()
        {
            var total = await _vehicleRepository.GetTotalCountAsync();
            var active = await _vehicleRepository.GetCountByStatusAsync("Active");
            var inService = await _vehicleRepository.GetCountByStatusAsync("In Service");
            var inactive = await _vehicleRepository.GetCountByStatusAsync("Inactive");

            return new DashboardStatsDto
            {
                TotalVehicles = total,
                ActiveVehicles = active,
                InServiceVehicles = inService,
                InactiveVehicles = inactive
            };
        }

        private static VehicleResponseDto MapToResponseDto(Vehicle vehicle)
        {
            return new VehicleResponseDto
            {
                VehicleId = vehicle.VehicleId,
                VehicleNumber = vehicle.VehicleNumber,
                VehicleName = vehicle.VehicleName,
                Brand = vehicle.Brand,
                Model = vehicle.Model,
                FuelType = vehicle.FuelType,
                RegistrationDate = vehicle.RegistrationDate,
                ManufacturingYear = vehicle.ManufacturingYear,
                OwnerName = vehicle.OwnerName,
                ContactNumber = vehicle.ContactNumber,
                Status = vehicle.Status,
                CreatedAt = vehicle.CreatedAt
            };
        }
    }
}
