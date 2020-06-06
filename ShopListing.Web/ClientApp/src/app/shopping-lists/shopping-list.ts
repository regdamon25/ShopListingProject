



export interface IShoppingList {
    id: string;
    name: string;
    createdDate: number;
    theme: string;
    shoppingItems: string[];
}

export interface IShoppingListResolved {
    shoppingList: IShoppingList;
    error?: any;
}

