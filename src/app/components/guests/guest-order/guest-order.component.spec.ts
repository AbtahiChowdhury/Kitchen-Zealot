import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestOrderComponent } from './guest-order.component';

describe('GuestOrderComponent', () => {
  let component: GuestOrderComponent;
  let fixture: ComponentFixture<GuestOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
