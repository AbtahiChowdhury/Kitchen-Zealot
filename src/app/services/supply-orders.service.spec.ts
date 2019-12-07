import { TestBed } from '@angular/core/testing';

import { SupplyOrdersService } from './supply-orders.service';

describe('SupplyOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplyOrdersService = TestBed.get(SupplyOrdersService);
    expect(service).toBeTruthy();
  });
});
