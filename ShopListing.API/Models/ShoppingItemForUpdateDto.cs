using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopListing.API.ValidationAttributes;
using System.ComponentModel.DataAnnotations;
using ShopListing.API.Entities;

namespace ShopListing.API.Models
{
    public class ShoppingItemForUpdateDto : ShoppingItemForManipulationDto
    {
        [Required(ErrorMessage = "You should fill out a category")]

        public override string Category { get => base.Category; set => base.Category = value; }
    }
}
