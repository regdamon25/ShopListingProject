using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopListing.API.Services;
using Microsoft.AspNetCore.Mvc;
using ShopListing.API.Models;
using AutoMapper;

namespace ShopListing.API.Controllers
{
    [ApiController]
    [Route("api/shoppingLists/{shoppingListId}/shoppingItems")]

    public class ShoppingItemsController : ControllerBase
    {
        private readonly IShopListingRepository _shopListingRepository;
        private readonly IMapper _mapper;

        public ShoppingItemsController(IShopListingRepository shopListingRepository, IMapper mapper)
        {
            _shopListingRepository = shopListingRepository ??
                throw new ArgumentNullException(nameof(shopListingRepository));
            _mapper = mapper;
        }

        [HttpGet]

        public IActionResult GetShoppingItems(Guid shoppingListId)
        {
            if (!_shopListingRepository.ShoppingListExists(shoppingListId))
            {
                return NotFound();
            }

            var shoppingItemsForShoppingListFromRepo = _shopListingRepository.GetShoppingItems(shoppingListId);
            return Ok(shoppingItemsForShoppingListFromRepo);
        }

        [HttpGet("{shoppingItemId}", Name = "GetShoppingItemForShoppingList")]
        public IActionResult GetShoppingItemForShoppingList(Guid shoppingListId, Guid shoppingItemId)
        {
            if (!_shopListingRepository.ShoppingListExists(shoppingListId))
            {
                return NotFound();
            }

            var shoppingItemForShoppingListFromRepo = _shopListingRepository.GetShoppingItem(shoppingListId, shoppingItemId);

            if (shoppingItemForShoppingListFromRepo == null)
            {
                return NotFound();
            }

            return Ok(shoppingItemForShoppingListFromRepo);
        }

        [HttpPost]

        public ActionResult<ShoppingItemDto> CreateShoppingItemForShoppingList(
            Guid shoppingListId, ShoppingItemForCreationDto shoppingItem)
        {
            if (!_shopListingRepository.ShoppingListExists(shoppingListId))
            {
                return NotFound();
            }

            var shoppingItemEntity = _mapper.Map<Entities.ShoppingItem>(shoppingItem);
            _shopListingRepository.AddShoppingItem(shoppingListId, shoppingItemEntity);
            _shopListingRepository.Save();

            var shoppingItemToReturn = _mapper.Map<ShoppingItemDto>(shoppingItemEntity);
            return CreatedAtRoute("GetShoppingItemForShoppingList",
            new { shoppingListId = shoppingListId, shoppingItemId = shoppingItemToReturn.Id },
            shoppingItemToReturn);

        }
    }
}
