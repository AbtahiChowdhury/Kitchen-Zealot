import { TestBed } from '@angular/core/testing';

import { ManagerGuardService } from './manager-guard.service';

describe('ManagerGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagerGuardService = TestBed.get(ManagerGuardService);
    expect(service).toBeTruthy();
  });
});
