import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IShoppingList } from '../../models/shopping-list'

@Component({
  selector: 'app-shopping-list-edit-info',
  templateUrl: './shopping-list-edit-info.component.html',
  styleUrls: ['./shopping-list-edit-info.component.css']
})
export class ShoppingListEditInfoComponent implements OnInit {
  @ViewChild(NgForm, {static: false}) shoppingListForm: NgForm;

  errorMessage: string;
  shoppingList: IShoppingList;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      if (this.shoppingListForm) {
        this.shoppingListForm.reset();
      }

      this.shoppingList = data['resolvedData'].shoppingList;
    });
  }

}
