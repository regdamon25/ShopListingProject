import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { ShoppingListDataService } from '../shopping-lists/shopping-list-data.service';
import {ShoppingListResolved, ShoppingItemResolved, ShoppingItem } from '../models/shopping-list';




@Injectable({
    providedIn: 'root'
})

export class ShoppingItemResolver implements Resolve<ShoppingItemResolved> {

    constructor(private shoppingListDataService: ShoppingListDataService) { }


    

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<ShoppingItemResolved> {
            const id = route.paramMap.get('id');
            const itemId = route.paramMap.get('itemId');
            if (id !=='' && !itemId) {
              const message = `Shopping Item id was not a string: ${itemId}`;
              console.error(message);
              return of({ shoppingItem: null, error: message });
            }
    
            

        return this.shoppingListDataService.getShoppingItem(id,itemId)
            .pipe(
                map(shoppingItem => ({ shoppingItem: shoppingItem })),
                catchError(error => {
                    const message = `Retrieval error: ${error}`;
                    console.error(message);
                    return of({ shoppingItem: null, error: message });
                })
            );
    }
}