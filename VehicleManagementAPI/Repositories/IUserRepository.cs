using VehicleManagementAPI.Models;

namespace VehicleManagementAPI.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(int id);
        Task<User?> GetByEmailAsync(string email);
        Task<bool> EmailExistsAsync(string email);
        Task<User> AddAsync(User user);
    }
}
