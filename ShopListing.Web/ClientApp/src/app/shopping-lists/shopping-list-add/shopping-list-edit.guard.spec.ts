import { TestBed, async, inject } from '@angular/core/testing';

import { ShoppingListEditGuard } from './shopping-list-edit.guard';

describe('ShoppingListEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingListEditGuard]
    });
  });

  it('should ...', inject([ShoppingListEditGuard], (guard: ShoppingListEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
