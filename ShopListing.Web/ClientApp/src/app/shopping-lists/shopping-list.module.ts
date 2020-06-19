import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListDetailComponent } from './shopping-list-detail/shopping-list-detail.component';
import { ShoppingListEditComponent } from './shopping-list-add/shopping-list-add.component';
import { ShoppingListEditInfoComponent } from './shopping-list-add/shopping-list-add-info.component';
import { ShoppingListResolver } from './shopping-list-resolver';


import { SharedModule } from '../shared/shared.module'
import { ShoppingListEditGuard } from './shopping-list-add/shopping-list-edit.guard';
import { ShoppingItemsComponent } from '../shopping-lists-shopping-items/shopping-items.component';
import { ShoppingItemEditComponent } from '../shopping-lists-shopping-items/shopping-item-edit/shopping-item-edit.component';
import { ShoppingItemEditGuard } from '../shopping-lists-shopping-items/shopping-item-edit/shopping-item-edit.guard';
import { ShoppingItemEditInfoComponent } from '../shopping-lists-shopping-items/shopping-item-edit/shopping-item-edit-info/shopping-item-edit-info.component';
import { ShoppingItemResolver } from '../shopping-lists-shopping-items/shopping-item-resolver';






@NgModule({
  declarations: [ShoppingListComponent, ShoppingListDetailComponent,  ShoppingListEditComponent, ShoppingListEditInfoComponent, ShoppingItemsComponent, ShoppingItemEditComponent, ShoppingItemEditInfoComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShoppingListComponent
      },
      {
        path: ':id',
        component: ShoppingListDetailComponent,
        resolve: { resolvedData: ShoppingListResolver }
      },
      
      {
        path: ':id/edit',
        component: ShoppingListEditComponent,
        canDeactivate: [ShoppingListEditGuard],
        resolve: { resolvedData: ShoppingListResolver},
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: ShoppingListEditInfoComponent },
          
        ]
      },
      {
        path: ':id/shopping-items',
        component: ShoppingItemsComponent,
        resolve: { resolvedData: ShoppingListResolver}
      },
      {
        path: ':id/shopping-items/:itemId/edit-item',
        component: ShoppingItemEditComponent,
        resolve: { resolvedData: ShoppingItemResolver},
        canDeactivate: [ShoppingItemEditGuard],
        children: [
          { path: '',
            redirectTo: 'item-info',
            pathMatch: 'full '
          },
          { path: 'item-info',
           component: ShoppingItemEditInfoComponent
          },
          

        ]
      }
    ]),
  ]
})
export class ShoppingListModule { }
