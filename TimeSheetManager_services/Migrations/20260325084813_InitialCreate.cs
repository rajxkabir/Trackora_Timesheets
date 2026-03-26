using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeSheetManager_services.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // We have commented out the CreateTable logic because 
            // the table 'EMPLOYEE' already exists in the database.
            /*
            migrationBuilder.CreateTable(
                name: "EMPLOYEE",
                ...
            );
            */
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // In the future, if you want to delete the table, 
            // this command would be here.
            migrationBuilder.DropTable(
                name: "EMPLOYEE");
        }
    }
}