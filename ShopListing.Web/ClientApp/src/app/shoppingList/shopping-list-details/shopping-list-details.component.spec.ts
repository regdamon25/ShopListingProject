import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListDetailsComponent } from './shopping-list-details.component';

describe('ShoppingListDetailsComponent', () => {
  let component: ShoppingListDetailsComponent;
  let fixture: ComponentFixture<ShoppingListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
