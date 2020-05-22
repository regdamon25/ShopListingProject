using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using ShopListing.API.ValidationAttributes;

namespace ShopListing.API.Models
{
    [ShoppingItemNameMustBeDifferentFromDescription(
            ErrorMessage = "Name must be different from category")]
    public class ShoppingItemForCreationDto //: IValidatableObject
    {
        [Required(ErrorMessage = "You should fill out a name")]
        [MaxLength(50, ErrorMessage = "The name shouldn't have more than 50 characters.")]
        public string Name { get; set; }

        
        [MaxLength(50, ErrorMessage = "The category shouldn't have more than 50 characters." )]
        public string Category { get; set; }

        public decimal Price { get; set; }

        // public IEnumerable<ValidationResult> Validate(ValidationContext validation)
        // {
        //     if(Name == Category)
        //     {
        //         yield return new ValidationResult(
        //             "The provided category should be different from the name",
        //             new[] { "ShoppingItemForCreationDto" });
        //     }
        // }
    }
}