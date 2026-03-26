using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text.Json;
using System.Text.Json.Serialization; // Required for ReferenceHandler
using System.Threading.Tasks;
using TimeSheetManager_services.Data;
using TimeSheetManager_services.Models;

namespace TimeSheetManager_services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // --- FIX: Added ReferenceHandler.IgnoreCycles ---
        private readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = null,
            ReferenceHandler = ReferenceHandler.IgnoreCycles,
            WriteIndented = true
        };

        public TeamController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllTeams()
        {
            try
            {
                // Fetching teams and including the TeamLead details
                var teams = await _context.Teams
                    .Include(t => t.TeamLead)
                    .ToListAsync();

                if (teams == null || !teams.Any())
                {
                    return NotFound(new { message = "No teams found." });
                }

                return new JsonResult(teams, _jsonOptions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching teams", details = ex.Message });
            }
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddTeam([FromBody] Team model)
        {
            if (model == null) return BadRequest(new { message = "Invalid team data" });

            try
            {
                model.id = 0;
                model.created_at = DateTime.Now;
                model.updated_at = DateTime.Now;

                _context.Teams.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Team Created!", teamId = model.id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { details = ex.Message });
            }
        }
    }
}