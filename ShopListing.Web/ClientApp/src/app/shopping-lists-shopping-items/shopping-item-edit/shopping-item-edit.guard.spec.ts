import { TestBed, async, inject } from '@angular/core/testing';

import { ShoppingItemEditGuard } from './shopping-item-edit.guard';

describe('ShoppingItemEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingItemEditGuard]
    });
  });

  it('should ...', inject([ShoppingItemEditGuard], (guard: ShoppingItemEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
