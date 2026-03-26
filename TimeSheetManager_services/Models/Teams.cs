using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeSheetManager_services.Models
{
	[Table("Teams")]
	public class Team
	{
		[Key]
		public int id { get; set; }

		public string? TEAM_CODE { get; set; }

		[Required]
		[StringLength(150)]
		public string team_name { get; set; } = string.Empty;

		public string? description { get; set; }

		public int? team_lead_id { get; set; }

		[Range(1, int.MaxValue, ErrorMessage = "Max members must be greater than 0")]
		public int max_members { get; set; }

		[Required]
		public string status { get; set; } = "ACTIVE";

		[Required]
		public int created_by { get; set; }

		public DateTime created_at { get; set; } = DateTime.Now;

		public int? updated_by { get; set; }

		public DateTime updated_at { get; set; } = DateTime.Now;

		// --- Navigation Properties ---

		// Link for the Single Team Lead
		[ForeignKey("team_lead_id")]
		public virtual Employee? TeamLead { get; set; }

		// FIX: Explicitly link to the "Team" property in Employee.cs
		// This stops EF from looking for 'Teamid' in SQL
		[InverseProperty("Team")]
		public virtual ICollection<Employee>? Members { get; set; }
	}
}