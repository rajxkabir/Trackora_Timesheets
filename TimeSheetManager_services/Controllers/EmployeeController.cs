using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeSheetManager_services.Data;
using TimeSheetManager_services.Models;

namespace TimeSheetManager_services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees()
        {
            try
            {
                // Fetch all employees from the database
                var employees = await _context.Employee.ToListAsync();

                if (employees == null || !employees.Any())
                {
                    return NotFound(new { message = "No employees found." });
                }

                return Ok(employees);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving employees: {ex.Message}");
                return StatusCode(500, new
                {
                    message = "Internal server error while fetching employees.",
                    details = ex.Message
                });
            }
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddEmployee([FromBody] Employee model)
        {
            if (model == null)
            {
                return BadRequest(new { message = "Invalid employee data." });
            }

            try
            {
                // --- MANDATORY OVERRIDES ---
                // Ensure the database handles the ID (Identity 5001,1)
                model.EMP_ID = 0;

                // Set default values if not provided by the frontend
                model.CREATED_AT = DateTime.Now;
                model.UPDATED_AT = DateTime.Now;
                model.EMP_STATUS = string.IsNullOrEmpty(model.EMP_STATUS) ? "ACTIVE" : model.EMP_STATUS;

                // 1. Stage the data
                _context.Employee.Add(model);

                // 2. Push to SQL Server
                await _context.SaveChangesAsync();

                Console.WriteLine($"Successfully saved: {model.EMP_FIRSTNAME} (ID: {model.EMP_ID})");

                return Ok(new
                {
                    message = "Employee added successfully!",
                    employeeId = model.EMP_ID
                });
            }
            catch (DbUpdateException ex)
            {
                // Catching specific SQL errors (Duplicates, Constraint violations)
                var sqlError = ex.InnerException?.Message ?? ex.Message;
                Console.WriteLine($"DB Conflict: {sqlError}");
                return Conflict(new
                {
                    message = "Database error. Check for duplicate Email or Phone.",
                    details = sqlError
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Fatal Error: {ex.Message}");
                return StatusCode(500, new
                {
                    message = "Internal server error.",
                    details = ex.Message
                });
            }
        }
    }
}