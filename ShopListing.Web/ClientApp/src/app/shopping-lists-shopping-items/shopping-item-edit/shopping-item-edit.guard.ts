import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingItemEditComponent } from './shopping-item-edit.component';

@Injectable({
  providedIn: 'root'
})

export class ShoppingItemEditGuard implements CanDeactivate<ShoppingItemEditComponent> {
  canDeactivate(
    component: ShoppingItemEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

      if (component.isDirty) {
        const shoppingItemName = component.shoppingItem.name || 'New Shopping Item';
        return confirm(`Navigate away and lose all changes to ${shoppingItemName}?`);
      }
    return true;
  }
  
}