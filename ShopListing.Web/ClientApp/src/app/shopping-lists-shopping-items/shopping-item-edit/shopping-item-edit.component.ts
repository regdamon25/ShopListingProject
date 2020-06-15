import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IShoppingItem, IShoppingItemResolved } from '../../models/shopping-Item';
import { MessageService } from 'src/app/messages/message.service';
import { ShoppingListDataService } from 'src/app/shopping-lists/shopping-list-data.service';




@Component({
  selector: 'app-shopping-item-edit',
  templateUrl: './shopping-item-edit.component.html',
  styleUrls: ['./shopping-item-edit.component.css']
})
export class ShoppingItemEditComponent implements OnInit {

  pageTitle = 'Edit Shopping Item';
  errorMessage: string;
  originalShoppingItem: IShoppingItem;
  selectedShoppingItem: IShoppingItem;

  private dataIsValid: { [key: string]: boolean } = {};
  
  

  get isDirty(): boolean {
    return JSON.stringify(this.originalShoppingItem) !== JSON.stringify(this.selectedShoppingItem);
  }

  get shoppingItem(): IShoppingItem {
    return this.selectedShoppingItem;
  }

  set shoppingItem(value: IShoppingItem) {
    this.selectedShoppingItem = value;

    this.originalShoppingItem = value ? { ...value } : null;
  }

 
  constructor(private shoppingItemDataService: ShoppingListDataService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService){ }


  ngOnInit(): void{
    this.route.data.subscribe(data => {
      const resolvedData: IShoppingItemResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onShoppingItemRetrieved(resolvedData.shoppingItem);
    const shoppingListId: string = this.route.snapshot.params['id'];
    const shoppingItemId: string = this.route.snapshot.params['itemId'];
    this.getShoppingItemForShoppingList(shoppingListId, shoppingItemId);
  });
}

  onShoppingItemRetrieved(shoppingItem: IShoppingItem): void {
    this.selectedShoppingItem = shoppingItem;

    if (!this.selectedShoppingItem) {
      this.pageTitle = 'No shoppingItem found';
    } else {
      if (this.selectedShoppingItem.id === '') {
        this.pageTitle = 'Add Shopping Item';
      } else {
        this.pageTitle = `Edit Shopping Item: ${this.selectedShoppingItem.name}`;
      }
    }
  }
  
  getShoppingItemForShoppingList(id, itemId) {  
    this.shoppingItemDataService.getShoppingItemForShoppingList(id, itemId).subscribe({
      next: selectedShoppingItem => {
        this.selectedShoppingItem = selectedShoppingItem
      },
      error: err => this.errorMessage = err
    });
  }

  reset(): void {
    this.dataIsValid = null;
    this.selectedShoppingItem = null;
    this.originalShoppingItem = null;
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.reset();

    // Navigate back to the shopping Item 
    this.router.navigate(['/shopping-Items']);
  }
  
  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    if(this.selectedShoppingItem.name && this.selectedShoppingItem.name.length >=3 &&
      this.selectedShoppingItem.category) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }
  }


}


