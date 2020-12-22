using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryApp.DomainLayer.Migrations
{
    public partial class AddLendedToBookModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsLended",
                table: "Books",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsLended",
                table: "Books");
        }
    }
}
