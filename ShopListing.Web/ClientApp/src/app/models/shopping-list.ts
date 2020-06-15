import { Guid } from 'guid-typescript';

export class genId {
    public id: Guid;
    constructor() {
        this.id = Guid.create();
    }
}



export interface IShoppingList {
    id: string;
    name: string;
    createdDate: number;
    theme: string;
    shoppingItems: [];
}

export interface IShoppingListResolved {
    shoppingList: IShoppingList;
    error?: any;
}

