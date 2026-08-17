using System.ComponentModel.DataAnnotations;

namespace VehicleManagementAPI.DTOs
{
    public class VehicleResponseDto
    {
        public int VehicleId { get; set; }
        public string VehicleNumber { get; set; } = string.Empty;
        public string VehicleName { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string FuelType { get; set; } = string.Empty;
        public DateTime RegistrationDate { get; set; }
        public int ManufacturingYear { get; set; }
        public string OwnerName { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class CreateVehicleDto
    {
        [Required(ErrorMessage = "Vehicle Number is required.")]
        [StringLength(50)]
        public string VehicleNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Vehicle Name is required.")]
        [StringLength(100)]
        public string VehicleName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Brand is required.")]
        [StringLength(50)]
        public string Brand { get; set; } = string.Empty;

        [Required(ErrorMessage = "Model is required.")]
        [StringLength(50)]
        public string Model { get; set; } = string.Empty;

        [Required(ErrorMessage = "Fuel Type is required.")]
        [StringLength(30)]
        public string FuelType { get; set; } = string.Empty;

        [Required(ErrorMessage = "Registration Date is required.")]
        public DateTime RegistrationDate { get; set; }

        [Required(ErrorMessage = "Manufacturing Year is required.")]
        [Range(1900, 2100, ErrorMessage = "Manufacturing Year must be valid.")]
        public int ManufacturingYear { get; set; }

        [Required(ErrorMessage = "Owner Name is required.")]
        [StringLength(100)]
        public string OwnerName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Contact Number is required.")]
        [StringLength(20)]
        public string ContactNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Status is required.")]
        [StringLength(30)]
        public string Status { get; set; } = "Active";
    }

    public class UpdateVehicleDto
    {
        [Required(ErrorMessage = "Vehicle Number is required.")]
        [StringLength(50)]
        public string VehicleNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Vehicle Name is required.")]
        [StringLength(100)]
        public string VehicleName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Brand is required.")]
        [StringLength(50)]
        public string Brand { get; set; } = string.Empty;

        [Required(ErrorMessage = "Model is required.")]
        [StringLength(50)]
        public string Model { get; set; } = string.Empty;

        [Required(ErrorMessage = "Fuel Type is required.")]
        [StringLength(30)]
        public string FuelType { get; set; } = string.Empty;

        [Required(ErrorMessage = "Registration Date is required.")]
        public DateTime RegistrationDate { get; set; }

        [Required(ErrorMessage = "Manufacturing Year is required.")]
        [Range(1900, 2100, ErrorMessage = "Manufacturing Year must be valid.")]
        public int ManufacturingYear { get; set; }

        [Required(ErrorMessage = "Owner Name is required.")]
        [StringLength(100)]
        public string OwnerName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Contact Number is required.")]
        [StringLength(20)]
        public string ContactNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Status is required.")]
        [StringLength(30)]
        public string Status { get; set; } = "Active";
    }

    public class DashboardStatsDto
    {
        public int TotalVehicles { get; set; }
        public int ActiveVehicles { get; set; }
        public int InServiceVehicles { get; set; }
        public int InactiveVehicles { get; set; }
    }
}
