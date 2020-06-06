import { TestBed } from '@angular/core/testing';

import { ShoppingListDataServiceService } from './shopping-list-data-service.service';

describe('ShoppingListDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingListDataServiceService = TestBed.get(ShoppingListDataServiceService);
    expect(service).toBeTruthy();
  });
});
