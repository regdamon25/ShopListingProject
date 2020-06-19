import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingList, ShoppingListResolved, ShoppingItem } from '../models/shopping-list';
import { ShoppingListDataService } from '../shopping-lists/shopping-list-data.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-shopping-items',
  templateUrl: './shopping-items.component.html',
  styleUrls: ['./shopping-items.component.css']
})
export class ShoppingItemsComponent implements OnInit {

  pageTitle = 'Shopping List Items';
  errorMessage: string;
  shoppingList: ShoppingList | undefined;
  shoppingItems: any = {}; //??
  

  constructor(private shoppingListDataService: ShoppingListDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: ShoppingListResolved =
        this.route.snapshot.data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onShoppingListRetrieved(resolvedData.shoppingList);
      const shoppingListId: string = this.route.snapshot.params['id']
      this.getShoppingItemsForShoppingList(shoppingListId);
    })
    
  }

  getShoppingItemsForShoppingList(id) {
    
    this.shoppingListDataService.getShoppingItemsForShoppingList(id).subscribe({
      next: shoppingItems => {
        this.shoppingItems = shoppingItems
      },
      error: err => this.errorMessage = err
    });
  }

  onShoppingListRetrieved(shoppingList: ShoppingList): void {
    this.shoppingList = shoppingList

    if (this.shoppingList) {
      this.pageTitle = `${this.shoppingList.name} : Shopping Items`;
    } else {
      this.pageTitle = 'No Shopping List Found';
    }
  }

}

