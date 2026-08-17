using VehicleManagementAPI.DTOs;
using VehicleManagementAPI.Helpers;
using VehicleManagementAPI.Models;
using VehicleManagementAPI.Repositories;

namespace VehicleManagementAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtHelper _jwtHelper;

        public AuthService(IUserRepository userRepository, IJwtHelper jwtHelper)
        {
            _userRepository = userRepository;
            _jwtHelper = jwtHelper;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            if (await _userRepository.EmailExistsAsync(registerDto.Email))
            {
                throw new InvalidOperationException("Email address is already registered.");
            }

            var user = new User
            {
                FullName = registerDto.FullName.Trim(),
                Email = registerDto.Email.Trim().ToLower(),
                PasswordHash = PasswordHasher.HashPassword(registerDto.Password),
                Role = "User", // Default registered users get "User" role
                CreatedAt = DateTime.UtcNow
            };

            var createdUser = await _userRepository.AddAsync(user);
            var token = _jwtHelper.GenerateToken(createdUser);

            return new AuthResponseDto
            {
                Token = token,
                UserId = createdUser.Id,
                Name = createdUser.FullName,
                Email = createdUser.Email,
                Role = createdUser.Role
            };
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userRepository.GetByEmailAsync(loginDto.Email);
            if (user == null || !PasswordHasher.VerifyPassword(loginDto.Password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Invalid email or password.");
            }

            var token = _jwtHelper.GenerateToken(user);

            return new AuthResponseDto
            {
                Token = token,
                UserId = user.Id,
                Name = user.FullName,
                Email = user.Email,
                Role = user.Role
            };
        }
    }
}
