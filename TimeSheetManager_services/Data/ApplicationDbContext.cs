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
            // Always call the base method first
            base.OnModelCreating(modelBuilder);

            // 1. Explicitly Map the Team <-> Members relationship
            // This stops EF from looking for the non-existent 'Teamid' column
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