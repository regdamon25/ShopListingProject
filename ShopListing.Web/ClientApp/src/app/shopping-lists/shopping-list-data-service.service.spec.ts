import { TestBed } from '@angular/core/testing';

import { ShoppingListDataService } from './shopping-list-data.service';

describe('ShoppingListDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingListDataService = TestBed.get(ShoppingListDataService);
    expect(service).toBeTruthy();
  });
});
