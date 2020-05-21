using AutoMapper;
using ShopListing.API.Models;
using ShopListing.API.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopListing.API.Controllers
{
    [ApiController]
    [Route("api/shoppingListcollections")]
    public class ShoppingListCollectionsController : ControllerBase
    {
        private readonly IShopListingRepository _shopListingRepository;
        private readonly IMapper _mapper;

        public ShoppingListCollectionsController(IShopListingRepository shopListingRepository, IMapper mapper)
        {
            _shopListingRepository = shopListingRepository ??
               throw new ArgumentNullException(nameof(shopListingRepository));
            _mapper = mapper ??
                throw new ArgumentNullException(nameof(mapper));
        }

        [HttpPost]

        public ActionResult<IEnumerable<ShoppingListDto>> CreateShoppingListCollection(
            IEnumerable<ShoppingListForCreationDto> shoppingListCollection)
        {
            var shoppingListEntities = _mapper.Map<IEnumerable<Entities.ShoppingList>>(shoppingListCollection);

            foreach (var shoppingList in shoppingListEntities)
            {
                _shopListingRepository.AddShoppingList(shoppingList);
            }

            _shopListingRepository.Save();

            return Ok();
        }
    }
}