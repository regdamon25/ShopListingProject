using System.ComponentModel.DataAnnotations;
using ShopListing.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopListing.API.ValidationAttributes
{
    public class ShoppingItemNameMustBeDifferentFromDescriptionAttribute: ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var shoppingItem = (ShoppingItemForManipulationDto)validationContext.ObjectInstance;

            if(shoppingItem.Name == shoppingItem.Category)
            {
                return new ValidationResult(
                    ErrorMessage,
                    new[] { nameof(ShoppingItemForManipulationDto) });
                
            }

            return ValidationResult.Success;
        } 
    }
}