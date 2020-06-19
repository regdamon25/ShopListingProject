import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ShoppingListDataService } from '../shopping-list-data.service';
import { ShoppingList, ShoppingListResolved } from '../../models/shopping-list';
import { MessageService } from 'src/app/messages/message.service';


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  pageTitle = 'Edit Shopping List';
  errorMessage: string;

  private dataIsValid: { [key: string]: boolean } = {};
  
  

  get isDirty(): boolean {
    return JSON.stringify(this.originalShoppingList) !== JSON.stringify(this.currentShoppingList);
  }
  
  private currentShoppingList: ShoppingList;
  private originalShoppingList: ShoppingList;
  

  get shoppingList(): ShoppingList {
    return this.currentShoppingList;
  }

  set shoppingList(value: ShoppingList) {
    this.currentShoppingList = value;

    this.originalShoppingList = value ? { ...value } : null;
  }
  
  constructor(private shoppingListDataService: ShoppingListDataService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: ShoppingListResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onShoppingListRetrieved(resolvedData.shoppingList);
    });
  }

  onShoppingListRetrieved(shoppingList: ShoppingList): void {
    this.shoppingList = shoppingList;

    if (!this.shoppingList) {
      this.pageTitle = 'No shoppingList found';
    } else {
      if (this.shoppingList.id === null) {
        this.pageTitle = 'Add Shopping List';
      } else {
        this.pageTitle = `Edit Shopping List: ${this.shoppingList.name}`;
      }
    }
  }

  deleteShoppingList(): void {
    if (this.shoppingList.id === '') {
      //Don't delete, it was never saved.
      this.onSaveComplete(`${this.shoppingList.name} was deleted`);
    } else {
      if (confirm(`Really delete the Shopping List: ${this.shoppingList.name}?`)) {
        this.shoppingListDataService.deleteShoppingList(this.shoppingList.id).subscribe({
          next: () => this.onSaveComplete(`${this.shoppingList.name} was deleted`),
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
    this.currentShoppingList = null;
    this.originalShoppingList = null;
  }

  saveShoppingList(): void{
    
    if (this.isValid()) {
      if(this.shoppingList.id === null) {
        this.shoppingListDataService.addShoppingList(this.shoppingList).subscribe({
          next: () => this.onSaveComplete(`The new ${this.shoppingList.name} was saved`),
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

    // Navigate back to the shopping list 
    this.router.navigate(['/shopping-lists']);
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    if(this.shoppingList.name && 
      this.shoppingList.name.length >=3 &&
      this.shoppingList.name.length <=50 &&
      this.shoppingList.theme && 
      this.shoppingList.theme.length >=3 && 
      this.shoppingList.theme.length <=50) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }
  }

}


