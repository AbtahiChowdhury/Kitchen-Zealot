import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBidsComponent } from './pending-bids.component';

describe('PendingBidsComponent', () => {
  let component: PendingBidsComponent;
  let fixture: ComponentFixture<PendingBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
