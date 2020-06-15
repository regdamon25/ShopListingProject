import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { IShoppingItemResolved, IShoppingItem } from 'src/app/models/shopping-item';






@Component({
  selector: 'app-shopping-item-detail',
  templateUrl: './shopping-item-detail.component.html'
//   styleUrls: ['./shopping-item-detail.component.css']
})
export class ShoppingItemDetailComponent implements OnInit {

  pageTitle = 'Shopping Item Detail';
  errorMessage: string;
  shoppingItem: IShoppingItem | undefined;

  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: IShoppingItemResolved =
        this.route.snapshot.data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onShoppingItemRetrieved(resolvedData.shoppingItem);
    })
  }
    
  
  onShoppingItemRetrieved(shoppingItem: IShoppingItem): void {
    this.shoppingItem = shoppingItem;
    
    if (this.shoppingItem) {
      this.pageTitle = `Shopping Item Detail: ${this.shoppingItem.name}`;
    } else {
      this.pageTitle = 'No Shopping Item Found';
    }
  }
}
