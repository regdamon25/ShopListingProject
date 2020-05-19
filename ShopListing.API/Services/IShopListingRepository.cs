using System;
using System.Collections.Generic;
using ShopListing.API.Entities;
using System.Linq;
using System.Threading.Tasks;
using ShopListing.API.ResourceParameters;

namespace ShopListing.API.Services
{
    public interface IShopListingRepository
    {
        IEnumerable<ShoppingItem> GetShoppingItems(Guid shoppingListId);

        ShoppingItem GetShoppingItem(Guid shoppingListId, Guid shoppingItemId);

        void AddShoppingItem(Guid shoppingListId, ShoppingItem shoppingItem);

        void UpdateShoppingItem(ShoppingItem shoppingItem);

        void DeleteShoppingItem(ShoppingItem shoppingItem);

        IEnumerable<ShoppingList> GetShoppingLists();

        ShoppingList GetShoppingList(Guid shoppingListId);
        IEnumerable<ShoppingList> GetShoppingLists(ShoppingListResourceParameters shoppingListResourceParameters);

        IEnumerable<ShoppingList> GetShoppingLists(IEnumerable<Guid> shoppingListIds);

        void AddShoppingList(ShoppingList shoppingList);

        void DeleteShoppingList(ShoppingList shoppingList);

        void UpdateShoppingList(ShoppingList shoppingList);

        bool ShoppingListExists(Guid shoppingListId);

        bool Save();
    }
}
