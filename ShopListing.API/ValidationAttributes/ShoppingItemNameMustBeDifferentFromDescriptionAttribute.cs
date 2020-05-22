using System.ComponentModel.DataAnnotations;
using ShopListing.API.Models;

namespace ShopListing.API.ValidationAttributes
{
    public class ShoppingItemNameMustBeDifferentFromDescriptionAttribute: ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var shoppingItem = (ShoppingItemForCreationDto)validationContext.ObjectInstance;

            if(shoppingItem.Name == shoppingItem.Category)
            {
                return new ValidationResult(
                    ErrorMessage,
                    new[] { nameof(ShoppingItemForCreationDto) });
                
            }

            return ValidationResult.Success;
        } 
    }
}