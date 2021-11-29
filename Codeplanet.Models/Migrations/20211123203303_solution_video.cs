using Microsoft.EntityFrameworkCore.Migrations;

namespace Codeplanet.Models.Migrations
{
    public partial class solution_video : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SolutionVideo",
                table: "CDProblems",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SolutionVideo",
                table: "CDProblems");
        }
    }
}
