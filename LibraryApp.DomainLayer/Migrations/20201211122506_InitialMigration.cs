using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryApp.DomainLayer.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Author = table.Column<string>(nullable: true),
                    Publisher = table.Column<string>(nullable: true),
                    DateOfPublication = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Author", "DateOfPublication", "Publisher", "Title" },
                values: new object[] { new Guid("0faee6ac-1772-4bbe-9990-a7d9a22dd559"), "Mario Rozic", new DateTime(1982, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Skolska knjiga", null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Books");
        }
    }
}
