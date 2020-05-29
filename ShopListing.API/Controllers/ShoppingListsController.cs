using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopListing.API.Services;
using ShopListing.API.Models;
using Microsoft.AspNetCore.Cors;
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
        [EnableCors("AllowOrigin")]

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
        [EnableCors("AllowOrigin")]

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
        [EnableCors("AllowOrigin")]

        public IActionResult GetShoppingListOptions()
        {
            Response.Headers.Add("Allow", "GET,OPTIONS,POST");
            return Ok();
        }

        [HttpDelete("{shoppingListId}")]

        public ActionResult DeleteShoppingList(Guid shoppingListId)
        {
            var shoppingListFromRepo = _shopListingRepository.GetShoppingList(shoppingListId);

            if(shoppingListFromRepo == null)
            {
                return NotFound();
            }

            _shopListingRepository.DeleteShoppingList(shoppingListFromRepo);

            _shopListingRepository.Save();

            return NoContent();

        }
    }
}
