export interface IShoppingItem {
    id: string;
    name: string;
    category: string;
    price: number;
    shoppingListId: string;
}

export interface IShoppingItemResolved {
    shoppingItem: IShoppingItem,
    error?: any;
}