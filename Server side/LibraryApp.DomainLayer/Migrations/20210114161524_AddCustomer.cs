using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryApp.DomainLayer.Migrations
{
    public partial class AddCustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "LenderId",
                table: "Books",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    CardNumber = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("0faee6ac-1772-4bbe-9990-a7d9a22dd559"),
                column: "Title",
                value: "Uspavanka za Radmilu M");

            migrationBuilder.InsertData(
                table: "Customer",
                columns: new[] { "Id", "CardNumber", "Email", "FirstName", "LastName" },
                values: new object[] { new Guid("1c758f4b-e740-403b-a425-a01c4a798d42"), null, "markomarkovic@gmail.com", "Marko", "Markovic" });

            migrationBuilder.CreateIndex(
                name: "IX_Books_LenderId",
                table: "Books",
                column: "LenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Customer_LenderId",
                table: "Books",
                column: "LenderId",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Customer_LenderId",
                table: "Books");

            migrationBuilder.DropTable(
                name: "Customer");

            migrationBuilder.DropIndex(
                name: "IX_Books_LenderId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "LenderId",
                table: "Books");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("0faee6ac-1772-4bbe-9990-a7d9a22dd559"),
                column: "Title",
                value: null);
        }
    }
}
