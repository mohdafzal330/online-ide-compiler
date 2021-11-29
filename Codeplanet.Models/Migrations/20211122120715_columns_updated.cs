using Microsoft.EntityFrameworkCore.Migrations;

namespace Codeplanet.Models.Migrations
{
    public partial class columns_updated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "FkSampleTestCaseId",
                table: "CDProblems",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<long>(
                name: "FkModuleId",
                table: "CDProblems",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "FkTopicId",
                table: "CDProblems",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FkModuleId",
                table: "CDProblems");

            migrationBuilder.DropColumn(
                name: "FkTopicId",
                table: "CDProblems");

            migrationBuilder.AlterColumn<int>(
                name: "FkSampleTestCaseId",
                table: "CDProblems",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");
        }
    }
}
