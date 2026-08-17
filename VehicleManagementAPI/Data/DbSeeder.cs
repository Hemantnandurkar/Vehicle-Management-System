using Microsoft.EntityFrameworkCore;
using VehicleManagementAPI.Helpers;
using VehicleManagementAPI.Models;

namespace VehicleManagementAPI.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            // Auto-apply pending migrations
            if (context.Database.IsSqlServer())
            {
                await context.Database.MigrateAsync();
            }
            else
            {
                await context.Database.EnsureCreatedAsync();
            }

            // Seed Users if none exist
            if (!await context.Users.AnyAsync())
            {
                var admin = new User
                {
                    FullName = "System Administrator",
                    Email = "admin@vms.com",
                    PasswordHash = PasswordHasher.HashPassword("Admin@123"),
                    Role = "Admin",
                    CreatedAt = DateTime.UtcNow
                };

                var user = new User
                {
                    FullName = "John Doe",
                    Email = "user@vms.com",
                    PasswordHash = PasswordHasher.HashPassword("User@123"),
                    Role = "User",
                    CreatedAt = DateTime.UtcNow
                };

                await context.Users.AddRangeAsync(admin, user);
                await context.SaveChangesAsync();
            }

            // Seed Vehicles if none exist
            if (!await context.Vehicles.AnyAsync())
            {
                var sampleVehicles = new List<Vehicle>
                {
                    new Vehicle
                    {
                        VehicleNumber = "MH-12-EV-2024",
                        VehicleName = "Nexon EV Max",
                        Brand = "Tata",
                        Model = "Nexon EV",
                        FuelType = "Electric",
                        RegistrationDate = new DateTime(2024, 1, 15),
                        ManufacturingYear = 2024,
                        OwnerName = "Aarav Sharma",
                        ContactNumber = "9876543210",
                        Status = "Active",
                        CreatedAt = DateTime.UtcNow
                    },
                    new Vehicle
                    {
                        VehicleNumber = "KA-01-TS-9999",
                        VehicleName = "Model 3 Performance",
                        Brand = "Tesla",
                        Model = "Model 3",
                        FuelType = "Electric",
                        RegistrationDate = new DateTime(2023, 6, 20),
                        ManufacturingYear = 2023,
                        OwnerName = "Priya Nair",
                        ContactNumber = "9812345678",
                        Status = "Active",
                        CreatedAt = DateTime.UtcNow
                    },
                    new Vehicle
                    {
                        VehicleNumber = "MH-14-TH-4444",
                        VehicleName = "Thar LX 4x4",
                        Brand = "Mahindra",
                        Model = "Thar",
                        FuelType = "Diesel",
                        RegistrationDate = new DateTime(2022, 11, 10),
                        ManufacturingYear = 2022,
                        OwnerName = "Vikram Singh",
                        ContactNumber = "9765432109",
                        Status = "In Service",
                        CreatedAt = DateTime.UtcNow
                    },
                    new Vehicle
                    {
                        VehicleNumber = "DL-03-TF-1111",
                        VehicleName = "Fortuner Legender",
                        Brand = "Toyota",
                        Model = "Fortuner",
                        FuelType = "Diesel",
                        RegistrationDate = new DateTime(2023, 3, 5),
                        ManufacturingYear = 2023,
                        OwnerName = "Rajesh Gupta",
                        ContactNumber = "9988776655",
                        Status = "Active",
                        CreatedAt = DateTime.UtcNow
                    },
                    new Vehicle
                    {
                        VehicleNumber = "MH-02-CR-8888",
                        VehicleName = "Creta SX(O)",
                        Brand = "Hyundai",
                        Model = "Creta",
                        FuelType = "Petrol",
                        RegistrationDate = new DateTime(2021, 8, 25),
                        ManufacturingYear = 2021,
                        OwnerName = "Neha Verma",
                        ContactNumber = "9123456789",
                        Status = "Inactive",
                        CreatedAt = DateTime.UtcNow
                    }
                };

                await context.Vehicles.AddRangeAsync(sampleVehicles);
                await context.SaveChangesAsync();
            }
        }
    }
}
