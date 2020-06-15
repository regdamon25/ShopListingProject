import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IShoppingItem } from 'src/app/models/shopping-item';

@Component({
  selector: 'app-shopping-item-edit-info',
  templateUrl: './shopping-item-edit-info.component.html',
  styleUrls: ['./shopping-item-edit-info.component.css']
})
export class ShoppingItemEditInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) shoppingItemForm: NgForm;


  errorMessage: string;
  
  shoppingItem: IShoppingItem;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      if(this.shoppingItemForm) {
        this.shoppingItemForm.reset();
      }

      this.shoppingItem = data['resolvedData'].shoppingItem;
    });
  }

  

}
