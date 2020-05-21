using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopListing.API.Models
{
    public class ShoppingItemForCreationDto
    {
        public string Name { get; set; }

        public decimal Price { get; set; }
    }
}