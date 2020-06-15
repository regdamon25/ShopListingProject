using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopListing.API.Models
{
    public class ShoppingListForCreationDto
    {
        public string Name {get; set;}

        public DateTime DateCreated {get; set;}

        public string Theme { get; set;}

        public ICollection<ShoppingItemForCreationDto> ShoppingItems { get; set; } = new List<ShoppingItemForCreationDto>();
    }
}