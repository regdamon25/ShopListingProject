import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListItemsComponent } from './shopping-list-items.component';

describe('ShoppingListItemsComponent', () => {
  let component: ShoppingListItemsComponent;
  let fixture: ComponentFixture<ShoppingListItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
