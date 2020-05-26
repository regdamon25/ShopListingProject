using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ShopListing.API.Entities
{
    public class ShoppingItem
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        
        [MaxLength(50)]
        public string Category { get; set; }

        [Required]
        public decimal Price { get; set; }

        [ForeignKey("ShoppingListId")]
        public ShoppingList ShoppingList { get; set; }

        public Guid ShoppingListId { get; set; }
    }
}
