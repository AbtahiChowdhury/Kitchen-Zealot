import { TestBed } from '@angular/core/testing';

import { MenuCartLinkService } from './menu-cart-link.service';

describe('MenuCartLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuCartLinkService = TestBed.get(MenuCartLinkService);
    expect(service).toBeTruthy();
  });
});
