import { TestBed } from '@angular/core/testing';

import { SupplyRequestsService } from './supply-requests.service';

describe('SupplyRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplyRequestsService = TestBed.get(SupplyRequestsService);
    expect(service).toBeTruthy();
  });
});
