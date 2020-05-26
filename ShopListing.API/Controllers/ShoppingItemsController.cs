using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopListing.API.Services;
using Microsoft.AspNetCore.Mvc;
using ShopListing.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

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

        [HttpPut("{shoppingItemId}")]

        public IActionResult UpdateShoppingItemForShoppingList(
            Guid shoppingListId,
            Guid shoppingItemId,
            ShoppingItemForUpdateDto shoppingItem)
        {
            if (!_shopListingRepository.ShoppingListExists(shoppingListId))
            {
                return NotFound();
            }

            var shoppingItemForShoppingListFromRepo = _shopListingRepository.GetShoppingItem(shoppingListId, shoppingItemId);

            if (shoppingItemForShoppingListFromRepo == null)
            {
                var shoppingItemToAdd = _mapper.Map<Entities.ShoppingItem>(shoppingItem);
                shoppingItemToAdd.Id = shoppingItemId;

                _shopListingRepository.AddShoppingItem(shoppingListId, shoppingItemToAdd);

                _shopListingRepository.Save();

                var shoppingItemToReturn = _mapper.Map<ShoppingItemDto>(shoppingItemToAdd);

                return CreatedAtRoute("GetShoppingItemForShoppingList",
                new { shoppingListId, shoppingItemId = shoppingItemToReturn.Id },
                shoppingItemToReturn);
            }

            // map the entity to a ShoppingItemForUpdateDto
            // apply the updated field values to that dto
            // map the ShoppingItemForUpdateDto back to an entity
            _mapper.Map(shoppingItem, shoppingItemForShoppingListFromRepo);

            _shopListingRepository.UpdateShoppingItem(shoppingItemForShoppingListFromRepo);

            _shopListingRepository.Save();

            return NoContent();

        }

        [HttpPatch("{shoppingItemId}")]

        public ActionResult PartiallyUpdateShoppingItemForShoppingList(Guid shoppingListId,
            Guid shoppingItemId,
            JsonPatchDocument<ShoppingItemForUpdateDto> patchDocument)
        {
            if (!_shopListingRepository.ShoppingListExists(shoppingListId))
            {
                return NotFound();
            }

            var shoppingItemForShoppingListFromRepo = _shopListingRepository.GetShoppingItem(shoppingListId, shoppingItemId);

            if (shoppingItemForShoppingListFromRepo == null)
            {
                var shoppingItemDto = new ShoppingItemForUpdateDto();
                patchDocument.ApplyTo(shoppingItemDto, ModelState);

                if (!TryValidateModel(shoppingItemDto))
                {
                    return ValidationProblem(ModelState);
                }

                var shoppingItemToAdd = _mapper.Map<Entities.ShoppingItem>(shoppingItemDto);
                shoppingItemToAdd.Id = shoppingItemId;

                _shopListingRepository.AddShoppingItem(shoppingListId, shoppingItemToAdd);
                _shopListingRepository.Save();

                var shoppingItemToReturn = _mapper.Map<ShoppingItemDto>(shoppingItemToAdd);

                return CreatedAtRoute("GetShoppingItemForShoppingList",
                    new { shoppingListId, shoppingItemId = shoppingItemToReturn.Id },
                    shoppingItemToReturn);
            }

            var shoppingItemToPatch = _mapper.Map<ShoppingItemForUpdateDto>(shoppingItemForShoppingListFromRepo);
            // add validation 
            patchDocument.ApplyTo(shoppingItemToPatch, ModelState);

            if (!TryValidateModel(shoppingItemToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(shoppingItemToPatch, shoppingItemForShoppingListFromRepo);

            _shopListingRepository.UpdateShoppingItem(shoppingItemForShoppingListFromRepo);

            _shopListingRepository.Save();

            return NoContent();
        }

        [HttpDelete("{shoppingItemId}")]

        public ActionResult DeleteShoppingItemForShoppingList(Guid shoppingListId, Guid shoppingItemId)
        {
            if(!_shopListingRepository.ShoppingListExists(shoppingListId))
            {
                return NotFound();
            }

            var shoppingItemForSHoppingListFromRepo = _shopListingRepository.GetShoppingItem(shoppingListId, shoppingItemId);

            if(shoppingItemForSHoppingListFromRepo == null)
            {
                return NotFound();
            }

            _shopListingRepository.DeleteShoppingItem(shoppingItemForSHoppingListFromRepo);

            _shopListingRepository.Save();

            return NoContent();
        }


        public override ActionResult ValidationProblem(
            [ActionResultObjectValue] ModelStateDictionary modelStateDictionary)
        {
            var options = HttpContext.RequestServices
                .GetRequiredService<IOptions<ApiBehaviorOptions>>();
            return (ActionResult)options.Value.InvalidModelStateResponseFactory(ControllerContext);
            
        }
    }
}
