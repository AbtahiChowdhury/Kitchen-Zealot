import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryNavbarComponent } from './delivery-navbar.component';

describe('DeliveryNavbarComponent', () => {
  let component: DeliveryNavbarComponent;
  let fixture: ComponentFixture<DeliveryNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
