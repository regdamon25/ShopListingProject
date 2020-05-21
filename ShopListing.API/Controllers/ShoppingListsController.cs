using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopListing.API.Services;
using ShopListing.API.Models;
using AutoMapper;
using ShopListing.API.ResourceParameters;

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

        public ActionResult<IEnumerable<ShoppingListDto>> GetShoppingLists(
            [FromQuery] ShoppingListResourceParameters shoppingListResourceParameters)
        {
            var shoppingListsFromRepo = _shopListingRepository.GetShoppingLists(shoppingListResourceParameters);
            return Ok(_mapper.Map<IEnumerable<ShoppingListDto>>(shoppingListsFromRepo));
        }

        [HttpGet("{shoppingListId}", Name = "GetShoppingList")]
        public IActionResult GetShoppingList(Guid shoppingListId)
        {
            var shoppingListFromRepo = _shopListingRepository.GetShoppingList(shoppingListId);

            if(shoppingListFromRepo == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ShoppingListDto>(shoppingListFromRepo));
        }

        [HttpPost]

        public ActionResult<ShoppingListDto> CreateShoppingList(ShoppingListForCreationDto shoppingList)
        {
            var shoppingListEntity = _mapper.Map<Entities.ShoppingList>(shoppingList);

            _shopListingRepository.AddShoppingList(shoppingListEntity);
            _shopListingRepository.Save();

            var shoppingListToReturn = _mapper.Map<ShoppingListDto>(shoppingListEntity);
            return CreatedAtRoute("GetShoppingList",
                new { shoppingListId = shoppingListToReturn.Id },
                shoppingListToReturn);
        }

        [HttpOptions]

        public IActionResult GetShoppingListOptions()
        {
            Response.Headers.Add("Allow", "GET,OPTIONS,POST");
            return Ok();
        }
    }
}
