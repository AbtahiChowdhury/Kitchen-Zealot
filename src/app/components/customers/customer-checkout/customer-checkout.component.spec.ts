import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCheckoutComponent } from './customer-checkout.component';

describe('CustomerCheckoutComponent', () => {
  let component: CustomerCheckoutComponent;
  let fixture: ComponentFixture<CustomerCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
