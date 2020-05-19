using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopListing.API.Entities;
using ShopListing.API.DataAccess;


namespace ShopListing.API.Services
{
    public class ShopListingRepository : IShopListingRepository, IDisposable
    {
        private readonly ShopListingContext _context;

        public ShopListingRepository(ShopListingContext context )
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public void AddShoppingItem(Guid shoppingListId, ShoppingItem shoppingItem)
        {
            if (shoppingListId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(shoppingListId));
            }

            if (shoppingItem == null)
            {
                throw new ArgumentNullException(nameof(ShoppingItem));
            }
            // always set the shoppingListId to the passed-in shoppingListId
            shoppingItem.ShoppingListId = shoppingListId;
            _context.ShoppingItems.Add(shoppingItem); 
        }   

        public void DeleteShoppingItem(ShoppingItem shoppingItem)
        {
            _context.ShoppingItems.Remove(shoppingItem);
        }

        public ShoppingItem GetShoppingItem(Guid shoppingListId, Guid shoppingItemId)
        {
            if (shoppingListId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(shoppingListId));
            }

            if (shoppingItemId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(shoppingItemId));
            }

            return _context.ShoppingItems
              .Where(s => s.ShoppingListId == shoppingListId && s.Id == shoppingItemId).FirstOrDefault();
        }

        public IEnumerable<ShoppingItem> GetShoppingItems(Guid shoppingListId)
        {
            if (shoppingListId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(shoppingListId));
            }

            return _context.ShoppingItems
                .Where(s => s.ShoppingListId == shoppingListId)
                .OrderBy(s => s.Name).ToList();
        }

        public void UpdateShoppingItem(ShoppingItem shoppingItem)
        {

        }

        public void AddShoppingList(ShoppingList shoppingList)
        {
            if (shoppingList == null)
            {
                throw new ArgumentNullException(nameof(shoppingList));
            }

            //the repository fills the id (instead of using identity columns)
            shoppingList.Id = Guid.NewGuid();

            foreach (var shoppingItem in shoppingList.ShoppingItems)
            {
                shoppingItem.Id = Guid.NewGuid();
            }

            _context.ShoppingLists.Add(shoppingList);
        }

        public bool ShoppingListExists(Guid shoppingListId)
        {
            if (shoppingListId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(shoppingListId));
            }

            return _context.ShoppingLists.Any(sl => sl.Id == shoppingListId);
        }

        public void DeleteShoppingList(ShoppingList shoppingList)
        {
            if (shoppingList == null)
            {
                throw new ArgumentNullException(nameof(shoppingList));
            }

            _context.ShoppingLists.Remove(shoppingList);
        }
        
        public ShoppingList GetShoppingList(Guid shoppingListId)
        {
            if (shoppingListId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(shoppingListId));
            }

            return _context.ShoppingLists.FirstOrDefault(sl => sl.Id == shoppingListId);
        }

        public IEnumerable<ShoppingList> GetShoppingLists()
        {
            return _context.ShoppingLists.ToList<ShoppingList>();
        }

        public IEnumerable<ShoppingList> GetShoppingLists(string theme, string searchQuery)
        {
            if(string.IsNullOrWhiteSpace(theme) && string.IsNullOrWhiteSpace(searchQuery))
            {
                return GetShoppingLists();
            }

            var collection = _context.ShoppingLists as IQueryable<ShoppingList>;

            if(!string.IsNullOrWhiteSpace(theme))
            {
                theme = theme.Trim();
                collection = collection.Where(sl => sl.Theme == theme);
            }

            if(!string.IsNullOrWhiteSpace(searchQuery))
            {
                searchQuery = searchQuery.Trim();
                collection = collection.Where(sl => sl.Theme.Contains(searchQuery)
                || sl.Name.Contains(searchQuery));
            }

            return collection.ToList();
        }
         
        public IEnumerable<ShoppingList> GetShoppingLists(IEnumerable<Guid> shoppingListIds)
        {
            if (shoppingListIds == null)
            {
                throw new ArgumentNullException(nameof(shoppingListIds));
            }

            return _context.ShoppingLists.Where(sl => shoppingListIds.Contains(sl.Id))
                .OrderBy(sl => sl.Name)
                .ToList();
        }

        public void UpdateShoppingList(ShoppingList shoppingList)
        {
            // no code in this implementation
        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
               // dispose resources when needed
            }
        }
    }
}
