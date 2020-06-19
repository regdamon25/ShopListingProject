import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ShoppingList } from '../../models/shopping-list'

@Component({
  selector: 'app-shopping-list-add-info',
  templateUrl: './shopping-list-add-info.component.html',
  styleUrls: ['./shopping-list-add-info.component.css']
})
export class ShoppingListEditInfoComponent implements OnInit {
  @ViewChild(NgForm, {static: false}) shoppingListForm: NgForm;

  errorMessage: string;
  shoppingList: ShoppingList;

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
