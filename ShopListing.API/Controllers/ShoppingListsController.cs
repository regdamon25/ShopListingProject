using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopListing.API.Services;
using ShopListing.API.Models;
using AutoMapper;

namespace ShopListing.API.Controllers
{
    [ApiController]
    [Route("api/shoppingLists")]

    public class ShoppingListsController : ControllerBase
    {
        private readonly IShopListingRepository _shopListingRepository;
        private readonly IMapper _mapper;

        public ShoppingListsController(IShopListingRepository shopListingRepository, IMapper mapper)
        {
            _shopListingRepository = shopListingRepository ??
                throw new ArgumentNullException(nameof(shopListingRepository));
            _mapper = mapper ??
                throw new ArgumentNullException(nameof(mapper));
        }
        
        [HttpGet()]
        [HttpHead]

        public ActionResult<IEnumerable<ShoppingListDto>> GetShoppingLists(string theme, string searchQuery)
        {
            var shoppingListsFromRepo = _shopListingRepository.GetShoppingLists(theme, searchQuery);
            return Ok(_mapper.Map<IEnumerable<ShoppingListDto>>(shoppingListsFromRepo));
        }

        [HttpGet("{shoppingListId}")]
        public IActionResult GetShoppingList(Guid shoppingListId)
        {
            var shoppingListFromRepo = _shopListingRepository.GetShoppingList(shoppingListId);

            if(shoppingListFromRepo == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<IEnumerable<ShoppingListDto>>(shoppingListFromRepo));
        }
    }
}
