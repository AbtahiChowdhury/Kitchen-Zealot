import { TestBed } from '@angular/core/testing';

import { AddNewAuthService } from './add-new-auth.service';

describe('AddNewAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddNewAuthService = TestBed.get(AddNewAuthService);
    expect(service).toBeTruthy();
  });
});
