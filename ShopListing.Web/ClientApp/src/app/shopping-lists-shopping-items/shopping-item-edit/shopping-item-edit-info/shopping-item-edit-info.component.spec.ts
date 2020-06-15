import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingItemEditInfoComponent } from './shopping-item-edit-info.component';

describe('ShoppingItemEditInfoComponent', () => {
  let component: ShoppingItemEditInfoComponent;
  let fixture: ComponentFixture<ShoppingItemEditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingItemEditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingItemEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
