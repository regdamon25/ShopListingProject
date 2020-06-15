using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopListing.API.Models
{
    public class ShoppingListDto
    {
        public Guid Id { get; set; }
        
        
        public string Name { get; set; }

        
        public string CreatedDate { get; set; }

        public string Theme { get; set; }

    }
}