import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { ShoppingListDataService } from './shopping-list-data-service.service';
import { IShoppingListResolved } from './shopping-list';
import { Guid } from 'guid-typescript';


@Injectable({
    providedIn: 'root'
})

export class ShoppingListResolver implements Resolve<IShoppingListResolved> {

    constructor(private shoppingListDataService: ShoppingListDataService) { }


    

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<IShoppingListResolved> {
            const id = route.paramMap.get('id');
            if (+id) {
              const message = `Shopping List id was not a number: ${id}`;
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