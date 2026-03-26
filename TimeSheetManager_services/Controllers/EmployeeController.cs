using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

using TimeSheetManager_services.Data;

using TimeSheetManager_services.Models;

using System.Text.Json;
 
namespace TimeSheetManager_services.Controllers

{

    [Route("api/[controller]")]

    [ApiController]

    public class EmployeeController : ControllerBase

    {

        private readonly ApplicationDbContext _context;

        // Keep names EXACTLY like the C# Model (No camelCase conversion)

        private readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = null };
 
        public EmployeeController(ApplicationDbContext context)

        {

            _context = context;

        }
 
        [HttpGet("all")]

        public async Task<IActionResult> GetAllEmployees()

        {

            try

            {

                var employees = await _context.Employee.ToListAsync();
 
                Console.WriteLine($"\n--- Fetching {employees.Count} Employees ---");

                foreach (var emp in employees)

                {

                    Console.WriteLine($"Row: {emp.EMP_ID} | {emp.EMP_FIRSTNAME} {emp.EMP_LASTNAME}");

                }
 
                if (employees == null || !employees.Any())

                {

                    return NotFound(new { message = "No employees found." });

                }
 
                return new JsonResult(employees, _jsonOptions);

            }

            catch (Exception ex)

            {

                Console.WriteLine($"Error: {ex.Message}");

                return StatusCode(500, new { message = "Error fetching data", details = ex.Message });

            }

        }
 
        [HttpPost("add")]

        public async Task<IActionResult> AddEmployee([FromBody] Employee model)

        {

            if (model == null) return BadRequest(new { message = "Invalid data" });
 
            try

            {

                model.EMP_ID = 0; // Let SQL Handle Identity

                model.CREATED_AT = DateTime.Now;

                model.UPDATED_AT = DateTime.Now;
 
                _context.Employee.Add(model);

                await _context.SaveChangesAsync();
 
                return Ok(new { message = "Saved!", employeeId = model.EMP_ID });

            }

            catch (Exception ex)

            {

                return StatusCode(500, new { details = ex.Message });

            }

        }

    }

}
 