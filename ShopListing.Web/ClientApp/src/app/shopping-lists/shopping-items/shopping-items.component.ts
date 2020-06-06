import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IShoppingItem } from '../shopping-item';
import { IShoppingList, IShoppingListResolved } from '../shopping-list';
import { ShoppingListDataService } from '../shopping-list-data-service.service';

@Component({
  selector: 'app-shopping-items',
  templateUrl: './shopping-items.component.html',
  styleUrls: ['./shopping-items.component.css']
})
export class ShoppingItemsComponent implements OnInit {

  pageTitle = 'Shopping List Items';
  errorMessage: string;
  shoppingList: IShoppingList | undefined;
  shoppingItems: IShoppingItem[] = [];

  constructor(private shoppingListDataService: ShoppingListDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: IShoppingListResolved =
        this.route.snapshot.data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onShoppingListRetrieved(resolvedData.shoppingList);
      this.getShoppingItemsForShoppingList(this.route.snapshot.params['id']);
    })
  }

  getShoppingItemsForShoppingList(id){
  this.shoppingListDataService.getShoppingItemsForShoppingList(id).subscribe({
    next: shoppingItems => {
      this.shoppingItems = shoppingItems
    },
    error: err => this.errorMessage = err
  });
}

onShoppingListRetrieved(shoppingList: IShoppingList): void {
  this.shoppingList = shoppingList;
  
  if (this.shoppingList) {
    this.pageTitle = `Shopping List Items: ${this.shoppingList.name}`;
  } else {
    this.pageTitle = 'No Shopping List Found';
  }
}


}
