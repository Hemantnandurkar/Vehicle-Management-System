using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleManagementAPI.DTOs;
using VehicleManagementAPI.Services;

namespace VehicleManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Protected endpoint: requires valid JWT
    public class VehiclesController : ControllerBase
    {
        private readonly IVehicleService _vehicleService;

        public VehiclesController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        /// <summary>
        /// Get all vehicles
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<IEnumerable<VehicleResponseDto>>> GetAll()
        {
            var vehicles = await _vehicleService.GetAllVehiclesAsync();
            return Ok(vehicles);
        }

        /// <summary>
        /// Get vehicle by ID
        /// </summary>
        [HttpGet("{id:int}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<VehicleResponseDto>> GetById(int id)
        {
            var vehicle = await _vehicleService.GetVehicleByIdAsync(id);
            return Ok(vehicle);
        }

        /// <summary>
        /// Add a new vehicle (Admin only)
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VehicleResponseDto>> Create([FromBody] CreateVehicleDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var created = await _vehicleService.CreateVehicleAsync(createDto);
            return CreatedAtAction(nameof(GetById), new { id = created.VehicleId }, created);
        }

        /// <summary>
        /// Update an existing vehicle (Admin only)
        /// </summary>
        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VehicleResponseDto>> Update(int id, [FromBody] UpdateVehicleDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updated = await _vehicleService.UpdateVehicleAsync(id, updateDto);
            return Ok(updated);
        }

        /// <summary>
        /// Delete a vehicle (Admin only)
        /// </summary>
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _vehicleService.DeleteVehicleAsync(id);
            return NoContent();
        }

        /// <summary>
        /// Search vehicle by Vehicle Number
        /// GET /api/vehicles/search?vehicleNumber=
        /// </summary>
        [HttpGet("search")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<VehicleResponseDto>> SearchByVehicleNumber([FromQuery] string vehicleNumber)
        {
            var vehicle = await _vehicleService.GetVehicleByNumberAsync(vehicleNumber);
            return Ok(vehicle);
        }

        /// <summary>
        /// Get all Active vehicles
        /// GET /api/vehicles/active
        /// </summary>
        [HttpGet("active")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<IEnumerable<VehicleResponseDto>>> GetActiveVehicles()
        {
            var activeVehicles = await _vehicleService.GetActiveVehiclesAsync();
            return Ok(activeVehicles);
        }

        /// <summary>
        /// Get vehicles by Brand
        /// GET /api/vehicles/brand/{brand}
        /// </summary>
        [HttpGet("brand/{brand}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<IEnumerable<VehicleResponseDto>>> GetByBrand(string brand)
        {
            var vehicles = await _vehicleService.GetVehiclesByBrandAsync(brand);
            return Ok(vehicles);
        }

        /// <summary>
        /// Get Dashboard stats (Total, Active, In Service, Inactive)
        /// GET /api/vehicles/dashboard-stats
        /// </summary>
        [HttpGet("dashboard-stats")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<DashboardStatsDto>> GetDashboardStats()
        {
            var stats = await _vehicleService.GetDashboardStatsAsync();
            return Ok(stats);
        }
    }
}
