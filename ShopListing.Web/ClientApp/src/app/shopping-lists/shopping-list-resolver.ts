import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { ShoppingListDataService } from './shopping-list-data.service';
import { ShoppingListResolved } from '../models/shopping-list';



@Injectable({
    providedIn: 'root'
})

export class ShoppingListResolver implements Resolve<ShoppingListResolved> {

    constructor(private shoppingListDataService: ShoppingListDataService) { }


    

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<ShoppingListResolved> {
            const id = route.paramMap.get('id');
            if (+id) {
              const message = `Shopping List id was not a string: ${id}`;
              console.error(message);
              return of({ shoppingList: null, error: message });
            }
    
            

        return this.shoppingListDataService.getShoppingList(id)
            .pipe(
                map(shoppingList => ({ shoppingList: shoppingList })),
                catchError(error => {
                    const message = `Retrieval error: ${error}`;
                    console.error(message);
                    return of({ shoppingList: null, error: message });
                })
            );
    }
}