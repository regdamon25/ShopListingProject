import { Guid } from "guid-typescript";

export interface IShoppingItem {
    id: Guid,
    name: string,
    category: string,
    price: number,
    shoppingListId: number
}