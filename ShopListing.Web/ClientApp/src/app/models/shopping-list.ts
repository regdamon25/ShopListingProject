
export class ShoppingList {
    id: string;
    name: string;
    createdDate: Date = new Date();
    theme: string;
    shoppingItems: Array<ShoppingItem> = new Array<ShoppingItem>();
}

export class ShoppingItem {
    id: string;
    name: string;
    category: string;
    price: number;
    shoppingListId: string;
}

export class ShoppingListResolved {
    shoppingList: ShoppingList;
    error?: any;
}

export class ShoppingItemResolved {
    shoppingItem: ShoppingItem;
    error?: any;
}

