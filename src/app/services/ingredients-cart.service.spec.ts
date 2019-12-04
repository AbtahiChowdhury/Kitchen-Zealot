import { TestBed } from '@angular/core/testing';

import { IngredientsCartService } from './ingredients-cart.service';

describe('IngredientsCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngredientsCartService = TestBed.get(IngredientsCartService);
    expect(service).toBeTruthy();
  });
});
