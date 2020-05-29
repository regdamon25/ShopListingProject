import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IShoppingList } from '../shopping-list';
import { ShoppingListDataService } from '../shopping-list-data-service';
import { IShoppingItem } from "../shopping-item";

@Component({
  selector: 'app-shopping-list-items',
  templateUrl: './shopping-list-items.component.html',
  styleUrls: ['./shopping-list-items.component.css']
})
export class ShoppingListItemsComponent implements OnInit {
 
  pageTitle = "Shopping List Items";
  errorMessage: '';
  displayedColumns: string[] = ['name', 'category', 'price'];
  data: IShoppingItem[] = [];
  isLoadingResults = true;
  constructor(private shoppingListDataService: ShoppingListDataService, private route: ActivatedRoute) { }

  // ngOnInit() {
  //   this.getShoppingItemsForShoppingList(this.route.snapshot.params['id']);
  // }

  

    ngOnInit() {
      this.getShoppingItemsForShoppingList(this.route.snapshot.params['id']);
    }

    getShoppingItemsForShoppingList(id){
    this.shoppingListDataService.getShoppingItemsForShoppingList(id)
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    }

    // getShoppingItemsForShoppingList(shoppingListId){
    //   this.shoppingListDataService.getShoppingItemsForShoppingList(shoppingListId).subscribe(
    //     data => {
    //       this.shoppingItems = data;
    //       console.log(this.shoppingItems);
    //       this.isLoadingResults = false;
    //     });
    //   }

}
