using System;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ShopListing.API.Profiles
{
    public class ShoppingItemProfile : Profile
    {
        public ShoppingItemProfile()
        {
            CreateMap<Entities.ShoppingItem, Models.ShoppingItemDto>();
            CreateMap<Models.ShoppingItemForCreationDto, Entities.ShoppingItem>();
            CreateMap<Models.ShoppingItemForUpdateDto, Entities.ShoppingItem>();
            CreateMap<Entities.ShoppingItem, Models.ShoppingItemForUpdateDto>();
        }
    }
}