import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { IShoppingList, IShoppingListResolved } from '../../models/shopping-list';



@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.css']
})
export class ShoppingListDetailComponent implements OnInit {

  pageTitle = 'Shopping List Detail';
  errorMessage: string;
  shoppingList: IShoppingList | undefined;

  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: IShoppingListResolved =
        this.route.snapshot.data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onShoppingListRetrieved(resolvedData.shoppingList);
    })
  }
    
  
  onShoppingListRetrieved(shoppingList: IShoppingList): void {
    this.shoppingList = shoppingList;
    
    if (this.shoppingList) {
      this.pageTitle = `Shopping List Detail: ${this.shoppingList.name}`;
    } else {
      this.pageTitle = 'No Shopping List Found';
    }
  }
}
