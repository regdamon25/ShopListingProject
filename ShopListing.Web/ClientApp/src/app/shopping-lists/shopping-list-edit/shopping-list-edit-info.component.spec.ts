import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListEditInfoComponent } from './shopping-list-edit-info.component';

describe('ShoppingListEditInfoComponent', () => {
  let component: ShoppingListEditInfoComponent;
  let fixture: ComponentFixture<ShoppingListEditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListEditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
