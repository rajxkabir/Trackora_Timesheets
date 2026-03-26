using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TimeSheetManager_services.Data;

var builder = WebApplication.CreateBuilder(args);

// ============================================================
// 1. REGISTER SERVICES (Dependency Injection)
// ============================================================

// Add Controllers and FORCE PascalCase JSON (Preserves EMP_FIRSTNAME)
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // This stops .NET from changing "EMP_ID" to "emp_Id"
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure SQL Server Database Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Define CORS Policy for React (Vite uses 5173 by default)
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()); // Added for potential future Auth/Cookies
});

var app = builder.Build();

// ============================================================
// 2. CONFIGURE MIDDLEWARE (The Request Pipeline)
// ============================================================

// CRITICAL: CORS must be at the very top of the pipeline 
// to handle browser "Pre-flight" OPTIONS requests correctly.
app.UseCors("AllowReactApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        // Makes the base URL (localhost:5289/) open Swagger automatically
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();

// UseRouting must come BEFORE Authorization
app.UseRouting();

app.UseAuthorization();

// Map your EmployeeController routes
app.MapControllers();

app.Run();