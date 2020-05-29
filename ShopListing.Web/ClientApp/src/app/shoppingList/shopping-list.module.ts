import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingListDetailsComponent } from "./shopping-list-details/shopping-list-details.component";
import { ShoppingListItemsComponent } from "./shopping-list-items/shopping-list-items.component";
import { ShoppingListAddComponent } from './shopping-list-add/shopping-list-add.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { SharedModule } from "../shared/shared/shared.module";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'shopping-list',
                component: ShoppingListComponent
            },
            {
                path: 'shopping-list-details/:id',
                component: ShoppingListDetailsComponent,
                data: {pageTitle: 'Shopping List Details'}
            },
            {
                path: 'shopping-list-items/:id',
                component: ShoppingListItemsComponent,
                data: {pageTitle: 'Shopping Items'}

            },
            {
                path: 'shopping-list-add',
                component: ShoppingListAddComponent,
                data: { title: 'Add Supplier' }
            },
            {
                path: 'supplier-edit/:id',
                component: ShoppingListEditComponent,
                data: { title: 'Edit Supplier' }
            },
        ]),
        SharedModule
    ],
    declarations: [
        ShoppingListComponent,
        ShoppingListDetailsComponent,
        ShoppingListAddComponent,
        ShoppingListEditComponent,
        ShoppingListItemsComponent
    ]
})
export class ShoppingListModule {
}
