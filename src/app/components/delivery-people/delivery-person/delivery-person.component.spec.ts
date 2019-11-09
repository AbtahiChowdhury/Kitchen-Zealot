import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPersonComponent } from './delivery-person.component';

describe('DeliveryPersonComponent', () => {
  let component: DeliveryPersonComponent;
  let fixture: ComponentFixture<DeliveryPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
