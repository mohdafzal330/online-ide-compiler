using Microsoft.EntityFrameworkCore.Migrations;

namespace Codeplanet.Models.Migrations
{
    public partial class default_script_column : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DefaultScript",
                table: "CDProblems",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DefaultScript",
                table: "CDProblems");
        }
    }
}
