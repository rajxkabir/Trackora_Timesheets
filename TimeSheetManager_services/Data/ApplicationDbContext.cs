using Microsoft.EntityFrameworkCore;
using TimeSheetManager_services.Models;

namespace TimeSheetManager_services.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employee { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Team> Teams { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // --- TRIGGER FIXES ---
            // Tell EF Core these tables have triggers so it avoids the 'OUTPUT' clause error
            modelBuilder.Entity<Employee>()
                .ToTable(tb => tb.HasTrigger("trg_emp_code"));

            modelBuilder.Entity<Team>()
                .ToTable(tb => tb.HasTrigger("trg_team_code"));

            modelBuilder.Entity<Project>()
                .ToTable(tb => tb.HasTrigger("trg_proj_code"));


            // --- RELATIONSHIP MAPPINGS ---

            // 1. Explicitly Map the Team <-> Members relationship
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Team)
                .WithMany(t => t.Members)
                .HasForeignKey(e => e.EMP_TEAM_ID)
                .OnDelete(DeleteBehavior.Restrict);

            // 2. Map the Team Lead relationship
            modelBuilder.Entity<Team>()
                .HasOne(t => t.TeamLead)
                .WithMany()
                .HasForeignKey(t => t.team_lead_id)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}