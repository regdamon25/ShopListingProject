using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopListing.API.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ShoppingLists",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    DateCreated = table.Column<DateTimeOffset>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingLists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShoppingItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    ShoppingListId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShoppingItems_ShoppingLists_ShoppingListId",
                        column: x => x.ShoppingListId,
                        principalTable: "ShoppingLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "ShoppingLists",
                columns: new[] { "Id", "DateCreated", "Name" },
                values: new object[,]
                {
                    { new Guid("d28888e9-2ba9-473a-a40f-e38cb54f9b35"), new DateTimeOffset(new DateTime(2020, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -5, 0, 0, 0)), "Snacky Snacks" },
                    { new Guid("da2fd609-d754-4feb-8acd-c4f9ff13ba96"), new DateTimeOffset(new DateTime(2020, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -5, 0, 0, 0)), "Whats for Dinner" },
                    { new Guid("2902b665-1190-4c70-9915-b9c2d7680450"), new DateTimeOffset(new DateTime(2020, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -5, 0, 0, 0)), "Time for Lunch" },
                    { new Guid("102b566b-ba1f-404c-b2df-e2cde39ade09"), new DateTimeOffset(new DateTime(2020, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -5, 0, 0, 0)), "I Need Some Fruits" },
                    { new Guid("5b3621c0-7b12-4e80-9c8b-3398cba7ee05"), new DateTimeOffset(new DateTime(2020, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -5, 0, 0, 0)), "All About Them Veggies" },
                    { new Guid("2aadd2df-7caf-45ab-9355-7f6332985a87"), new DateTimeOffset(new DateTime(2020, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -5, 0, 0, 0)), "I Could Go for Some Zerts" },
                    { new Guid("2ee49fe3-edf2-4f91-8409-3eb25ce6ca51"), new DateTimeOffset(new DateTime(2020, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -5, 0, 0, 0)), "We Need Some Alcohol" }
                });

            migrationBuilder.InsertData(
                table: "ShoppingItems",
                columns: new[] { "Id", "Name", "Price", "ShoppingListId" },
                values: new object[,]
                {
                    { new Guid("5b1c2b4d-48c7-402a-80c3-cc796ad49c6b"), "Pizza", 9.99m, new Guid("d28888e9-2ba9-473a-a40f-e38cb54f9b35") },
                    { new Guid("d8663e5e-7494-4f81-8739-6e0de1bea7ee"), "Eggs", 2.99m, new Guid("d28888e9-2ba9-473a-a40f-e38cb54f9b35") },
                    { new Guid("d173e20d-159e-4127-9ce9-b0ac2564ad97"), "Cookies", 2.50m, new Guid("da2fd609-d754-4feb-8acd-c4f9ff13ba96") },
                    { new Guid("40ff5488-fdab-45b5-bc3a-14302d59869a"), "Grapes", 7.99m, new Guid("2902b665-1190-4c70-9915-b9c2d7680450") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingItems_ShoppingListId",
                table: "ShoppingItems",
                column: "ShoppingListId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShoppingItems");

            migrationBuilder.DropTable(
                name: "ShoppingLists");
        }
    }
}
