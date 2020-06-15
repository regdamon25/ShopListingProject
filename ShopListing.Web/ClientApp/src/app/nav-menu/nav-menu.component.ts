import { Component } from '@angular/core';
import { slideInAnimation } from '../app.animation';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  animations: [slideInAnimation]
})
export class NavMenuComponent {
  isExpanded = false;
  pageTitle = 'The ShopListing App'

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
