using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeSheetManager_services.Models
{
    [Table("Projects")]
    public class Project
    {
        [Key]
        public int Id { get; set; }

        public string? PROJECT_CODE { get; set; }

        [Required]
        [StringLength(150)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        [StringLength(150)]
        public string ClientName { get; set; } = string.Empty;

        [StringLength(150)]
        public string? ClientEmail { get; set; }

        public string? TechStack { get; set; }

        public string? Requirements { get; set; }

        [Required]
        [StringLength(10)]
        // Low, Medium, High, Critical
        public string Priority { get; set; } = "Medium";

        [Required]
        [StringLength(20)]
        // Pending, InProgress, OnHold, Completed, Cancelled
        public string Status { get; set; } = "Pending";

        [Column(TypeName = "decimal(12,2)")]
        public decimal Budget { get; set; }

        [Range(0, 100)]
        public int Progress { get; set; } = 0;

        [Required]
        public DateTime PlannedStartDate { get; set; }

        [Required]
        public DateTime PlannedEndDate { get; set; }

        public DateTime? ActualStartDate { get; set; }

        public DateTime? ActualEndDate { get; set; }

        // --- Foreign Keys ---

        public int? TeamId { get; set; }

        [ForeignKey("TeamId")]
        public Team? Team { get; set; }

        [Required]
        public int CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public int? UpdatedBy { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}