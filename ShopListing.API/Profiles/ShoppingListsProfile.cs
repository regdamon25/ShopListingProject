using AutoMapper;
using ShopListing.API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopListing.API.Profiles
{
    public class ShoppingListsProfile : Profile
    {
        public ShoppingListsProfile()
        {
            CreateMap<Entities.ShoppingList, Models.ShoppingListDto>()
                .ForMember(
                    dest => dest.CreatedDate,
                    opt => opt.MapFrom(src => src.DateCreated.GetCurrentDate())
                );
            CreateMap<Models.ShoppingListForCreationDto, Entities.ShoppingList>();
        }
    }
}
