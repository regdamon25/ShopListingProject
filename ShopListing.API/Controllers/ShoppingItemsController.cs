using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopListing.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ShopListing.API.Controllers
{
    [ApiController]
    [Route("api/shoppingLists/{shoppingListId}/shoppingItems")]

    public class ShoppingItemsController : ControllerBase
    {
        private readonly IShopListingRepository _shopListingRepository;

        public ShoppingItemsController(IShopListingRepository shopListingRepository)
        {
            _shopListingRepository = shopListingRepository ??
                throw new ArgumentNullException(nameof(shopListingRepository));
        }

        [HttpGet]

        public IActionResult GetShoppingItems(Guid shoppingListId)
        {
            if (! _shopListingRepository.ShoppingListExists(shoppingListId))
            {
                return NotFound();
            }

            var shoppingItemsForShoppingListFromRepo = _shopListingRepository.GetShoppingItems(shoppingListId);
            return Ok(shoppingItemsForShoppingListFromRepo);
        }

        [HttpGet("{shoppingItemId}", Name = "GetShoppingItemForShoppingList")]
        public IActionResult GetShoppingItemForShoppingList(Guid shoppingListId, Guid shoppingItemId)
        {
            if(!_shopListingRepository.ShoppingListExists(shoppingListId))
            {
                return NotFound();
            }

            var shoppingItemForShoppingListFromRepo = _shopListingRepository.GetShoppingItem(shoppingListId, shoppingItemId);

            if(shoppingItemForShoppingListFromRepo == null)
            {
                return NotFound();
            }

            return Ok(shoppingItemForShoppingListFromRepo);
        }
    }
}
