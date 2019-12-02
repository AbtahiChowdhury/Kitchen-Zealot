import { TestBed } from '@angular/core/testing';

import { BlacklistService } from './blacklist.service';

describe('BlacklistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlacklistService = TestBed.get(BlacklistService);
    expect(service).toBeTruthy();
  });
});
