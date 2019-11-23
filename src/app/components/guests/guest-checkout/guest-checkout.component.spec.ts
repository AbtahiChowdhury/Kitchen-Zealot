import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCheckoutComponent } from './guest-checkout.component';

describe('GuestCheckoutComponent', () => {
  let component: GuestCheckoutComponent;
  let fixture: ComponentFixture<GuestCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
