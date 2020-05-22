using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopListing.API.Migrations
{
    public partial class addednewshoppingItemproperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "ShoppingItems",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "ShoppingItems",
                keyColumn: "Id",
                keyValue: new Guid("40ff5488-fdab-45b5-bc3a-14302d59869a"),
                column: "Category",
                value: "Fruit");

            migrationBuilder.UpdateData(
                table: "ShoppingItems",
                keyColumn: "Id",
                keyValue: new Guid("5b1c2b4d-48c7-402a-80c3-cc796ad49c6b"),
                column: "Category",
                value: "Italian Food");

            migrationBuilder.UpdateData(
                table: "ShoppingItems",
                keyColumn: "Id",
                keyValue: new Guid("d173e20d-159e-4127-9ce9-b0ac2564ad97"),
                column: "Category",
                value: "Pastry");

            migrationBuilder.UpdateData(
                table: "ShoppingItems",
                keyColumn: "Id",
                keyValue: new Guid("d8663e5e-7494-4f81-8739-6e0de1bea7ee"),
                column: "Category",
                value: "Dairy");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "ShoppingItems");
        }
    }
}
