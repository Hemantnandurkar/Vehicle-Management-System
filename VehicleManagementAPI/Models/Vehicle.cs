using System.ComponentModel.DataAnnotations;

namespace VehicleManagementAPI.Models
{
    public class Vehicle
    {
        [Key]
        public int VehicleId { get; set; }

        [Required]
        [StringLength(50)]
        public string VehicleNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string VehicleName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Brand { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Model { get; set; } = string.Empty;

        [Required]
        [StringLength(30)]
        public string FuelType { get; set; } = string.Empty; // Petrol, Diesel, CNG, Electric, Hybrid

        [Required]
        public DateTime RegistrationDate { get; set; }

        [Required]
        public int ManufacturingYear { get; set; }

        [Required]
        [StringLength(100)]
        public string OwnerName { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string ContactNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(30)]
        public string Status { get; set; } = "Active"; // Active, In Service, Inactive

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
