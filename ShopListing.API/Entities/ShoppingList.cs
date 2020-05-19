using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ShopListing.API.Entities
{
    public class ShoppingList
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        public DateTimeOffset DateCreated { get; set; }

        [Required]
        [MaxLength(50)]
        public string Theme { get; set; }

        public ICollection<ShoppingItem> ShoppingItems { get; set; } = new List<ShoppingItem>();
    }
}
