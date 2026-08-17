using Microsoft.EntityFrameworkCore;
using VehicleManagementAPI.Data;
using VehicleManagementAPI.Models;

namespace VehicleManagementAPI.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly ApplicationDbContext _context;

        public VehicleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Vehicle>> GetAllAsync()
        {
            return await _context.Vehicles
                .OrderByDescending(v => v.CreatedAt)
                .ToListAsync();
        }

        public async Task<Vehicle?> GetByIdAsync(int id)
        {
            return await _context.Vehicles.FindAsync(id);
        }

        public async Task<Vehicle?> GetByVehicleNumberAsync(string vehicleNumber)
        {
            return await _context.Vehicles
                .FirstOrDefaultAsync(v => v.VehicleNumber.ToLower() == vehicleNumber.ToLower());
        }

        public async Task<IEnumerable<Vehicle>> GetActiveVehiclesAsync()
        {
            return await _context.Vehicles
                .Where(v => v.Status.ToLower() == "active")
                .OrderByDescending(v => v.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Vehicle>> GetByBrandAsync(string brand)
        {
            return await _context.Vehicles
                .Where(v => v.Brand.ToLower() == brand.ToLower())
                .OrderByDescending(v => v.CreatedAt)
                .ToListAsync();
        }

        public async Task<bool> VehicleNumberExistsAsync(string vehicleNumber, int? excludeId = null)
        {
            var query = _context.Vehicles.AsQueryable();
            if (excludeId.HasValue)
            {
                query = query.Where(v => v.VehicleId != excludeId.Value);
            }
            return await query.AnyAsync(v => v.VehicleNumber.ToLower() == vehicleNumber.ToLower());
        }

        public async Task<Vehicle> AddAsync(Vehicle vehicle)
        {
            await _context.Vehicles.AddAsync(vehicle);
            await _context.SaveChangesAsync();
            return vehicle;
        }

        public async Task UpdateAsync(Vehicle vehicle)
        {
            _context.Vehicles.Update(vehicle);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Vehicle vehicle)
        {
            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();
        }

        public async Task<int> GetTotalCountAsync()
        {
            return await _context.Vehicles.CountAsync();
        }

        public async Task<int> GetCountByStatusAsync(string status)
        {
            return await _context.Vehicles
                .CountAsync(v => v.Status.ToLower() == status.ToLower());
        }
    }
}
