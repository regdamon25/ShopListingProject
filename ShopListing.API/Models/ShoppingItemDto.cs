using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ShopListing.API.Models
{
    public class ShoppingItemDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public decimal Price { get; set; }

        public Guid ShoppingListId { get; set; }
    }
}