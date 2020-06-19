import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/messages/message.service';
import { ShoppingListDataService } from 'src/app/shopping-lists/shopping-list-data.service';
import { ShoppingList, ShoppingItem, ShoppingListResolved, ShoppingItemResolved } from 'src/app/models/shopping-list';





@Component({
  selector: 'app-shopping-item-edit',
  templateUrl: './shopping-item-edit.component.html',
  styleUrls: ['./shopping-item-edit.component.css']
})
export class ShoppingItemEditComponent implements OnInit {

  pageTitle = 'Edit Shopping Item';
  errorMessage: string;
  shoppingList: ShoppingList | undefined;
  originalShoppingItem: ShoppingItem;
  selectedShoppingItem: ShoppingItem;

  private dataIsValid: { [key: string]: boolean } = {};



  get isDirty(): boolean {
    return JSON.stringify(this.originalShoppingItem) !== JSON.stringify(this.selectedShoppingItem);
  }

  get shoppingItem(): ShoppingItem {
    return this.selectedShoppingItem;
  }

  set shoppingItem(value: ShoppingItem) {
    this.selectedShoppingItem = value;

    this.originalShoppingItem = value ? { ...value } : null;
  }


  constructor(private shoppingListDataService: ShoppingListDataService,
    private route: ActivatedRoute, 
    private router: Router,
    private messageService: MessageService) { }


  ngOnInit(): void {
    
    this.route.data.subscribe(data => {
      // this.getShoppingItem();
      const resolvedData: ShoppingItemResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onShoppingItemRetrieved(resolvedData.shoppingItem);
      
    
    });
    
  }

  getShoppingItem(): void{
    const id = this.route.snapshot.params['id'];
    const itemId = this.route.snapshot.params['itemId'];
    this.shoppingListDataService.getShoppingItem(id, itemId).
    subscribe(shoppingItem => this.shoppingItem = shoppingItem )
  }
  

  onShoppingItemRetrieved(shoppingItem: ShoppingItem): void {
    this.shoppingItem = shoppingItem;

    if (!this.shoppingItem) {
      this.pageTitle = 'No Shopping Item found';
    } else {
      if (this.shoppingItem.id === null) {
        this.pageTitle = 'Add Shopping Item';
      } else {
        this.pageTitle = `Edit Shopping Item: ${this.shoppingItem.name}`;
      }
    }
  }

  deleteShoppingItem(): void {
    const id = this.route.snapshot.params['id'];
    if (this.shoppingItem.id === '') {
      //Don't delete, it was never saved.
      this.onSaveComplete(`${this.shoppingItem.name} was deleted`);
    } else {
      if (confirm(`Really delete the item: ${this.shoppingItem.name}?`)) {
        this.shoppingListDataService.deleteShoppingItem(id, this.shoppingItem.id).subscribe({
          next: () => this.onSaveComplete(`${this.shoppingItem.name} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  reset(): void {
    this.dataIsValid = null;
    this.selectedShoppingItem = null;
    this.originalShoppingItem = null;
  }

 

  saveShoppingItem(): void {
    const id = this.route.snapshot.params['id'];
    if (this.isValid()) {
      if(id !== null && this.shoppingItem.id === null) {
        this.shoppingListDataService.addShoppingItemToShoppingList(id, this.shoppingItem).subscribe({
          next: () => this.onSaveComplete(`The new ${this.shoppingItem.name} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.shoppingListDataService.updateShoppingItem(id, this.shoppingItem).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.shoppingItem.name} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.reset();

    // Navigate back to the shopping Item 
    this.router.navigate(['/shopping-lists']);
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    if (this.shoppingItem.name &&
       this.shoppingItem.name.length >=3 &&
       this.shoppingItem.name.length <= 50 &&
      this.shoppingItem.category &&
       this.shoppingItem.category.length >=3 && 
       this.shoppingItem.category.length <=50 &&
        this.shoppingItem.price) {
      this.dataIsValid['item-info'] = true;
    } else {
      this.dataIsValid['item-info'] = false;
    }
  }


}


