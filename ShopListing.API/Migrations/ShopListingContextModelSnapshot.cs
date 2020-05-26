﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ShopListing.API.DataAccess;

namespace ShopListing.API.Migrations
{
    [DbContext(typeof(ShopListingContext))]
    partial class ShopListingContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ShopListing.API.Entities.ShoppingItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<Guid>("ShoppingListId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("ShoppingListId");

                    b.ToTable("ShoppingItems");

                    b.HasData(
                        new
                        {
                            Id = new Guid("5b1c2b4d-48c7-402a-80c3-cc796ad49c6b"),
                            Category = "Italian Food",
                            Name = "Pizza",
                            Price = 9.99m,
                            ShoppingListId = new Guid("d28888e9-2ba9-473a-a40f-e38cb54f9b35")
                        },
                        new
                        {
                            Id = new Guid("d8663e5e-7494-4f81-8739-6e0de1bea7ee"),
                            Category = "Dairy",
                            Name = "Eggs",
                            Price = 2.99m,
                            ShoppingListId = new Guid("d28888e9-2ba9-473a-a40f-e38cb54f9b35")
                        },
                        new
                        {
                            Id = new Guid("d173e20d-159e-4127-9ce9-b0ac2564ad97"),
                            Category = "Pastry",
                            Name = "Cookies",
                            Price = 2.50m,
                            ShoppingListId = new Guid("da2fd609-d754-4feb-8acd-c4f9ff13ba96")
                        },
                        new
                        {
                            Id = new Guid("40ff5488-fdab-45b5-bc3a-14302d59869a"),
                            Category = "Fruit",
                            Name = "Grapes",
                            Price = 7.99m,
                            ShoppingListId = new Guid("2902b665-1190-4c70-9915-b9c2d7680450")
                        });
                });

            modelBuilder.Entity("ShopListing.API.Entities.ShoppingList", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTimeOffset>("DateCreated")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("Theme")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("ShoppingLists");

                    b.HasData(
                        new
                        {
                            Id = new Guid("d28888e9-2ba9-473a-a40f-e38cb54f9b35"),
                            DateCreated = new DateTimeOffset(new DateTime(2020, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -5, 0, 0, 0)),
                            Name = "Snacky Snacks",
                            Theme = "Snacks"
                        },
                        new
                        {
                            Id = new Guid("da2fd609-d754-4feb-8acd-c4f9ff13ba96"),
                            DateCreated = new DateTimeOffset(new DateTime(2020, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -5, 0, 0, 0)),
                            Name = "Whats for Dinner",
                            Theme = "Dinner"
                        },
                        new
                        {
                            Id = new Guid("2902b665-1190-4c70-9915-b9c2d7680450"),
                            DateCreated = new DateTimeOffset(new DateTime(2020, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -5, 0, 0, 0)),
                            Name = "Time for Lunch",
                            Theme = "Lunch"
                        },
                        new
                        {
                            Id = new Guid("102b566b-ba1f-404c-b2df-e2cde39ade09"),
                            DateCreated = new DateTimeOffset(new DateTime(2020, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -5, 0, 0, 0)),
                            Name = "I Need Some Fruits",
                            Theme = "Healthy"
                        },
                        new
                        {
                            Id = new Guid("5b3621c0-7b12-4e80-9c8b-3398cba7ee05"),
                            DateCreated = new DateTimeOffset(new DateTime(2020, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -5, 0, 0, 0)),
                            Name = "All About Them Veggies",
                            Theme = "Healthy"
                        },
                        new
                        {
                            Id = new Guid("2aadd2df-7caf-45ab-9355-7f6332985a87"),
                            DateCreated = new DateTimeOffset(new DateTime(2020, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -5, 0, 0, 0)),
                            Name = "I Could Go for Some Zerts",
                            Theme = "Dessert"
                        },
                        new
                        {
                            Id = new Guid("2ee49fe3-edf2-4f91-8409-3eb25ce6ca51"),
                            DateCreated = new DateTimeOffset(new DateTime(2020, 5, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -5, 0, 0, 0)),
                            Name = "We Need Some Alcohol",
                            Theme = "Wines and Spirits"
                        });
                });

            modelBuilder.Entity("ShopListing.API.Entities.ShoppingItem", b =>
                {
                    b.HasOne("ShopListing.API.Entities.ShoppingList", "ShoppingList")
                        .WithMany("ShoppingItems")
                        .HasForeignKey("ShoppingListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
