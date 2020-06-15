import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListDataService } from '../shopping-list-data.service';
import { IShoppingList } from '../../models/shopping-list';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  pageTitle = 'Shopping Lists';
  
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredShoppingLists = this.listFilter ? this.performFilter(this.listFilter) : this.shoppingLists;
  }

  filteredShoppingLists: IShoppingList[] = [];
  shoppingLists: IShoppingList[] = [];

  constructor(private shoppingListDataService: ShoppingListDataService, private route: ActivatedRoute) { }

  
  ngOnInit(): void {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

    this.shoppingListDataService.getShoppingLists().subscribe({
      next: shoppingLists => {
        this.shoppingLists = shoppingLists;
      },
      error: err => this.errorMessage = err
    });
  }

  performFilter(filterBy: string): IShoppingList[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.shoppingLists.filter((shoppingList: IShoppingList) => 
    shoppingList.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}
