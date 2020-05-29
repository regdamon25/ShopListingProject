import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpHeaders } from '@angular/common/http';
import { IShoppingList } from '../shopping-list';
import { ShoppingListDataService } from '../shopping-list-data-service';
import { IShoppingItem } from "../shopping-item";

@Component({
  selector: 'app-shopping-list-details',
  templateUrl: './shopping-list-details.component.html',
  styleUrls: ['./shopping-list-details.component.css']
})
export class ShoppingListDetailsComponent implements OnInit {

  pageTitle = "Shopping List Details";
  errorMessage: '';
  shoppingList: IShoppingList = {
    id: null,
    name: '',
    createdDate: null,
    theme: '',
    shoppingItems: []
  };
  shoppingItems: IShoppingItem[] = [];
  isLoadingResults = true;
  constructor(private shoppingListDataService: ShoppingListDataService, private route: ActivatedRoute) { }



  ngOnInit() {
    this.getShoppingListDetails(this.route.snapshot.params['id']);
    
  }


  getShoppingListDetails(id) {
    this.shoppingListDataService.getShoppingListDetails(id).subscribe(
      data => {
        this.shoppingList = data;
        console.log(this.shoppingList);
        this.isLoadingResults = false;
      });
  }

  
}
