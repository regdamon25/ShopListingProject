import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingListEditComponent } from './shopping-list-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListEditGuard implements CanDeactivate<ShoppingListEditComponent> {
  canDeactivate(
    component: ShoppingListEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

      if (component.isDirty) {
        const shoppingListName = component.shoppingList.name || 'New Shopping List';
        return confirm(`Navigate away and lose all changes to ${shoppingListName}?`);
      }
    return true;
  }
  
}
