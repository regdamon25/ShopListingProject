using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Http;
using ShopListing.API.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShopListing.API.DataAccess
{
    public class ShopListingContext : DbContext
    {
        public ShopListingContext(DbContextOptions<ShopListingContext> options)
            : base(options)
        {
        }

        public DbSet<ShoppingList> ShoppingLists { get; set; }
        public DbSet<ShoppingItem> ShoppingItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ShoppingList>().HasData(
                new ShoppingList()
                {
                    Id = Guid.Parse("d28888e9-2ba9-473a-a40f-e38cb54f9b35"),
                    Name = "Snacky Snacks",
                    DateCreated = new DateTime(2020, 5, 16),
                    Theme = "Snacks"
                },


                new ShoppingList()
                {
                    Id = Guid.Parse("da2fd609-d754-4feb-8acd-c4f9ff13ba96"),
                    Name = "Whats for Dinner",
                    DateCreated = new DateTime(2020, 5, 16),
                    Theme = "Dinner"

                },

                new ShoppingList()
                {
                    Id = Guid.Parse("2902b665-1190-4c70-9915-b9c2d7680450"),
                    Name = "Time for Lunch",
                    DateCreated = new DateTime(2020, 5, 16),
                    Theme = "Lunch"

                },

                new ShoppingList()
                {
                    Id = Guid.Parse("102b566b-ba1f-404c-b2df-e2cde39ade09"),
                    Name = "I Need Some Fruits",
                    DateCreated = new DateTime(2020, 5, 16),
                    Theme = "Healthy"

                },

                new ShoppingList()
                {
                    Id = Guid.Parse("5b3621c0-7b12-4e80-9c8b-3398cba7ee05"),
                    Name = "All About Them Veggies",
                    DateCreated = new DateTime(2020, 5, 16),
                    Theme = "Healthy"

                },

                new ShoppingList()
                {
                    Id = Guid.Parse("2aadd2df-7caf-45ab-9355-7f6332985a87"),
                    Name = "I Could Go for Some Zerts",
                    DateCreated = new DateTime(2020, 5, 16),
                    Theme = "Dessert"

                },

                new ShoppingList()
                {
                    Id = Guid.Parse("2ee49fe3-edf2-4f91-8409-3eb25ce6ca51"),
                    Name = "We Need Some Alcohol",
                    DateCreated = new DateTime(2020, 5, 16),
                    Theme = "Wines and Spirits"

                }
                );

            modelBuilder.Entity<ShoppingItem>().HasData(
                new ShoppingItem
                {
                    Id = Guid.Parse("5b1c2b4d-48c7-402a-80c3-cc796ad49c6b"),
                    ShoppingListId = Guid.Parse("d28888e9-2ba9-473a-a40f-e38cb54f9b35"),
                    Name = "Pizza",
                    Price = 9.99M,
                },


                new ShoppingItem
                {
                    Id = Guid.Parse("d8663e5e-7494-4f81-8739-6e0de1bea7ee"),
                    ShoppingListId = Guid.Parse("d28888e9-2ba9-473a-a40f-e38cb54f9b35"),
                    Name = "Eggs",
                    Price = 2.99M,
                },

                new ShoppingItem
                {
                    Id = Guid.Parse("d173e20d-159e-4127-9ce9-b0ac2564ad97"),
                    ShoppingListId = Guid.Parse("da2fd609-d754-4feb-8acd-c4f9ff13ba96"),
                    Name = "Cookies",
                    Price = 2.50M,
                },

                new ShoppingItem
                {
                    Id = Guid.Parse("40ff5488-fdab-45b5-bc3a-14302d59869a"),
                    ShoppingListId = Guid.Parse("2902b665-1190-4c70-9915-b9c2d7680450"),
                    Name = "Grapes",
                    Price = 7.99M,
                }


                );
            base.OnModelCreating(modelBuilder);
        }
    }
}
    
