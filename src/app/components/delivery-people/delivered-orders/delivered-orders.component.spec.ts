import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredOrdersComponent } from './delivered-orders.component';

describe('DeliveredOrdersComponent', () => {
  let component: DeliveredOrdersComponent;
  let fixture: ComponentFixture<DeliveredOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveredOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveredOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
