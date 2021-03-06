using AutoMapper;
using ShopListing.API.Models;
using ShopListing.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopListing.API.Helpers;

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

        [HttpGet("({ids})", Name = "GetShoppingListCollection")]
        [EnableCors("AllowOrigin")]

        public IActionResult GetShoppingListCollection(
            [FromRoute]
            [ModelBinder(BinderType = typeof(ArrayModelBinder))] IEnumerable<Guid> ids)
        {
            if (ids == null)
            {
                return BadRequest();
            }

            var shoppingListEntities = _shopListingRepository.GetShoppingLists(ids);

            if (ids.Count() != shoppingListEntities.Count())
            {
                return NotFound();
            }

            var shoppingListsToReturn = _mapper.Map<IEnumerable<ShoppingListDto>>(shoppingListEntities);

            return Ok(shoppingListsToReturn);
        }


        [HttpPost]
        [EnableCors("AllowOrigin")]

        public ActionResult<IEnumerable<ShoppingListDto>> CreateShoppingListCollection(
            IEnumerable<ShoppingListForCreationDto> shoppingListCollection)
        {
            var shoppingListEntities = _mapper.Map<IEnumerable<Entities.ShoppingList>>(shoppingListCollection);

            foreach (var shoppingList in shoppingListEntities)
            {
                _shopListingRepository.AddShoppingList(shoppingList);
            }

            _shopListingRepository.Save();

            var shoppingListCollectionToReturn = _mapper.Map<IEnumerable<ShoppingListDto>>(shoppingListEntities);
            var idsAsString = string.Join(",", shoppingListCollectionToReturn.Select(sl => sl.Id));

            return CreatedAtRoute("GetShoppingListCollection",
                new { ids = idsAsString },
                shoppingListCollectionToReturn);
        }
    }
}