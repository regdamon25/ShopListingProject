using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopListing.API.ValidationAttributes;
using System.ComponentModel.DataAnnotations;

namespace ShopListing.API.Models
{
    [ShoppingItemNameMustBeDifferentFromDescription(
            ErrorMessage = "Name must be different from category")]
    public abstract class ShoppingItemForManipulationDto
    {
        [Required(ErrorMessage = "You should fill out a name")]
        [MaxLength(50, ErrorMessage = "The name shouldn't have more than 50 characters.")]
        public string Name { get; set; }


        [MaxLength(50, ErrorMessage = "The category shouldn't have more than 50 characters.")]
        public virtual string Category { get; set; }

        public decimal Price { get; set; }
    }
}
