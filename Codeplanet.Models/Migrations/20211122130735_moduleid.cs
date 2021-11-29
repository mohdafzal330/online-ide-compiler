using Microsoft.EntityFrameworkCore.Migrations;

namespace Codeplanet.Models.Migrations
{
    public partial class moduleid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "FkModuleId",
                table: "CDTopics",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FkModuleId",
                table: "CDTopics");
        }
    }
}
