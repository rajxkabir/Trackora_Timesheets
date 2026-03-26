using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeSheetManager_services.Models
{
    public class Employee
    {
        [Key]
        public int EMP_ID { get; set; }
        public string? EMP_CODE { get; set; }
        public int? EMP_MGR_NO { get; set; }
        public string? EMP_ROLE { get; set; }
        public required string EMP_GMAIL { get; set; }
        public required string EMP_PHONE { get; set; }
        public string? EMP_FIRSTNAME { get; set; }
        public string? EMP_LASTNAME { get; set; }
        public int? EMP_TEAM_ID { get; set; }
        public int? EMP_PROJECT_ID { get; set; }
        public DateTime? EMP_HIREDATE { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal EMP_SALARY { get; set; }

        public string? EMP_STATUS { get; set; } = "ACTIVE";
        public DateTime? EMP_EXIT_DATE { get; set; }
        public string? EMP_ALT_PHONE { get; set; }
        public string? EMP_ADDRESS { get; set; }
        public string? EMP_CITY { get; set; }
        public string? EMP_STATE { get; set; }
        public string? EMP_COUNTRY { get; set; }
        public string? EMP_AADHAR { get; set; }
        public string? EMP_PAN { get; set; }
        public DateTime CREATED_AT { get; set; } = DateTime.Now;
        public DateTime UPDATED_AT { get; set; } = DateTime.Now;
        public string? EMP_PASSWORD { get; set; }
        public DateTime? EMP_LAST_LOGIN { get; set; }
        public string? EMP_WORK_MODE { get; set; }
        public string? EMP_SHIFT { get; set; }

    }
}