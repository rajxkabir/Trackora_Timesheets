    using global::TimeSheetManager_services.Models;
    using Microsoft.EntityFrameworkCore;

    namespace TimeSheetManager_services.Data
    {
        public class ApplicationDbContext : DbContext
        {
            public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
                : base(options)
            {
            }

            // This links your C# 'Employee' class to the 'Employees' table in SQL
            public DbSet<Employee> Employee { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Employee>()
                .ToTable(tb => tb.HasTrigger("SomeTriggerName"));
            // "SomeTriggerName" can be anything; it just lets EF know a trigger exists.
        }
    }
    }

