import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingItemEditComponent } from './shopping-item-edit.component';

describe('ShoppingItemEditComponent', () => {
  let component: ShoppingItemEditComponent;
  let fixture: ComponentFixture<ShoppingItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
