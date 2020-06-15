import { Component } from '@angular/core';
import { slideInAnimation } from '../app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [slideInAnimation]
})
export class HomeComponent {
  public pageTitle = 'home';
}
