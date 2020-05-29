import { Component, OnInit } from '@angular/core';
import { IShoppingList } from '../shopping-list';
import { ShoppingListDataService } from '../shopping-list-data-service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  pageTitle = 'Product List';
  // displayedColumns: string[] = ['name', 'theme', 'createdDate', 'id'];
  shoppingLists: IShoppingList[] = [];
  isLoadingResults = true;

  constructor(private shoppingListDataService: ShoppingListDataService) { }
  
  ngOnInit() {
      this.shoppingListDataService.getShoppingLists().subscribe(
          res => {this.shoppingLists = res;
          console.log(this.shoppingLists);
          this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
