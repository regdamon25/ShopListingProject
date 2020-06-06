import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListDetailComponent } from './shopping-list-detail/shopping-list-detail.component';

import { SharedModule } from './shared/shared/shared.module'
import { ShoppingListResolver } from './shopping-list-resolver';
import { ShoppingItemsComponent } from './shopping-items/shopping-items.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit/shopping-list-edit.component';





@NgModule({
  declarations: [ShoppingListComponent, ShoppingListDetailComponent, ShoppingItemsComponent, ShoppingListEditComponent],
  imports: [

    RouterModule.forChild([
      {
        path: 'shopping-lists',
        component: ShoppingListComponent
      },
      {
        path: 'shopping-lists/:id',
        component: ShoppingListDetailComponent,
        resolve: { resolvedData: ShoppingListResolver }
      },
      {
        path: 'shopping-lists/:id/edit',
        component: ShoppingListEditComponent,
        resolve: { resolvedData: ShoppingListResolver}
      },
      {
        path: 'shopping-lists/:id/shopping-items',
        component: ShoppingItemsComponent,
        resolve: { resolvedData: ShoppingListResolver }
      }
    ]),
    SharedModule

  ]
})
export class ShoppingListModule { }
